import type OrderItem from "../entity/order_item.ts";
import type Customer from "../../customer/entity/customer.ts";
import Order from "../entity/order.ts";
import { randomUUID } from "node:crypto";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => {
            return acc + order.total();
        }, 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        const order = new Order(randomUUID(), customer.id, items);

        customer.addRewardPoints(order.rewardPoints());

        return order;
    }
}
