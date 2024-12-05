import Order from "../../../../domain/checkout/entity/order.ts";
import OrderItem from "../../../../domain/checkout/entity/order_item.ts";
import type OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface.ts";
import OrderItemModel from "./order-item.model.ts";
import OrderModel from "./order.model.ts";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        }, { include: OrderItemModel }).catch((err) => {
            console.log("Error creating Order: ", err);
            throw new Error("Database error");
        });
    }

    async update(entity: Order): Promise<void> {
        const transaction = await OrderModel.sequelize?.transaction();

        const current = await this.find(entity.id);

        const currentOrderItemIds = new Set(current.items.map((i) => i.id));

        const [toUpdate, toAdd] = entity.items.reduce((acc, item) => {
            if (currentOrderItemIds.has(item.id)) {
                acc[0].push(item);
                currentOrderItemIds.delete(item.id);
                return acc;
            }

            acc[1].push(item);
            return acc;
        }, [[] as OrderItem[], [] as OrderItem[]]);

        const toDelete = current.items.filter((i) =>
            currentOrderItemIds.has(i.id)
        );

        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
        }, { where: { id: entity.id }, transaction }).catch(async (err) => {
            console.log("Error updating Order: ", err);
            await transaction?.rollback();
            throw new Error("Database error");
        });

        if (toAdd.length || toUpdate.length) {
            await OrderItemModel.bulkCreate(
                [...toAdd, ...toUpdate].map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                    order_id: entity.id,
                })),
                {
                    updateOnDuplicate: [
                        "name",
                        "price",
                        "product_id",
                        "quantity",
                    ],
                    transaction,
                },
            ).catch(async (err) => {
                console.log("Error updating OrderItem: ", err);
                await transaction?.rollback();
                throw new Error("Database error");
            });
        }

        if (toDelete.length) {
            await OrderItemModel.destroy({
                where: {
                    id: toDelete.map((i) => i.id),
                },
                transaction,
            }).catch(async (err) => {
                console.log("Error deleting OrderItem: ", err);
                await transaction?.rollback();
                throw new Error("Database error");
            });
        }

        await transaction?.commit();
    }

    async find(id: string): Promise<Order> {
        const dbOrder = await OrderModel.findByPk(id, {
            include: OrderItemModel,
        });

        if (!dbOrder) throw new Error("Order not found");

        return new Order(
            dbOrder.id,
            dbOrder.customer_id,
            dbOrder.items.map((item) =>
                new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity,
                )
            ),
        );
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({
            include: OrderItemModel,
        });

        return orders.map((order) =>
            new Order(
                order.id,
                order.customer_id,
                order.items.map((item) =>
                    new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.product_id,
                        item.quantity,
                    )
                ),
            )
        );
    }
}
