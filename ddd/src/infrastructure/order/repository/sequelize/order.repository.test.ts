import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertRejects } from "jsr:@std/assert";
import { Sequelize } from "npm:sequelize-typescript";

import CustomerModel from "../../../customer/repository/sequelize/customer.model.ts";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository.ts";
import OrderModel from "./order.model.ts";
import OrderItemModel from "./order-item.model.ts";
import ProductModel from "../../../product/repository/sequelize/product.model.ts";
import Customer from "../../../../domain/customer/entity/customer.ts";
import Address from "../../../../domain/customer/value-object/address.ts";
import type ProductRepositoryInterface from "../../../../domain/product/repository/product.repository.interface.ts";
import type CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface.ts";
import ProductRepository from "../../../product/repository/sequelize/product.repository.ts";
import Product from "../../../../domain/product/entity/product.ts";
import OrderItem from "../../../../domain/checkout/entity/order_item.ts";
import Order from "../../../../domain/checkout/entity/order.ts";
import OrderRepository from "./order.repository.ts";
import EventDispatcher from "../../../../domain/@shared/event/event-dispatcher.ts";

describe("Order Repository Test", () => {
    let sequelize: Sequelize;
    let orderRepository: OrderRepository;
    let customerRepository: CustomerRepositoryInterface;
    let productRepository: ProductRepositoryInterface;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
            models: [CustomerModel, OrderModel, OrderItemModel, ProductModel],
        });

        await sequelize.sync();
        orderRepository = new OrderRepository();
        customerRepository = new CustomerRepository();
        productRepository = new ProductRepository();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a new order", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "123",
            name: "Customer 1",
            address,
            eventDispatcher: new EventDispatcher(),
        });
        await customerRepository.create(customer);

        const product = new Product("123", "Prouct 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "oi1",
            product.name,
            product.price,
            product.id,
            2,
        );
        const order = new Order("o1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderDb = await OrderModel.findByPk(order.id, {
            include: OrderItemModel,
        });

        assertEquals(orderDb?.toJSON(), {
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                },
            ],
        });
    });

    it("should find a newly created order", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "123",
            name: "Customer 1",
            address,
            eventDispatcher: new EventDispatcher(),
        });
        await customerRepository.create(customer);

        const product = new Product("123", "Prouct 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "oi1",
            product.name,
            product.price,
            product.id,
            2,
        );
        const order = new Order("o1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const found = await orderRepository.find(order.id);

        assertEquals(found, order);
    });

    it("should fail to find an order that does not exist", async () => {
        await assertRejects(
            () => orderRepository.find("123"),
            Error,
            "Order not found",
        );
    });

    it("should find all orders", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "123",
            name: "Customer 1",
            address,
            eventDispatcher: new EventDispatcher(),
        });
        await customerRepository.create(customer);

        const product = new Product("123", "Prouct 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "oi1",
            product.name,
            product.price,
            product.id,
            2,
        );
        const order = new Order("o1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderItem2 = new OrderItem(
            "oi2",
            product.name,
            product.price,
            product.id,
            2,
        );
        const order2 = new Order("o2", customer.id, [orderItem2]);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        assertEquals(orders, [order, order2]);
    });

    it("should successfully delete an order item from an order", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "123",
            name: "Customer 1",
            address,
            eventDispatcher: new EventDispatcher(),
        });
        await customerRepository.create(customer);

        const product = new Product("123", "Prouct 1", 10);
        await productRepository.create(product);

        const orderItem1 = new OrderItem(
            "oi1",
            product.name,
            product.price,
            product.id,
            2,
        );
        const orderItem2 = new OrderItem(
            "oi2",
            product.name,
            product.price,
            product.id,
            2,
        );

        const order = new Order("o1", customer.id, [orderItem1, orderItem2]);
        await orderRepository.create(order);

        order.removeItem(orderItem1.id);
        await orderRepository.update(order);

        const orderDB = await orderRepository.find(order.id);

        assertEquals(orderDB, order);
    });

    it("should successfully update an order item from an order", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "123",
            name: "Customer 1",
            address,
            eventDispatcher: new EventDispatcher(),
        });
        await customerRepository.create(customer);

        const product = new Product("123", "Prouct 1", 10);
        await productRepository.create(product);

        const orderItem1 = new OrderItem(
            "oi1",
            product.name,
            product.price,
            product.id,
            2,
        );
        const orderItem2 = new OrderItem(
            "oi2",
            product.name,
            product.price,
            product.id,
            2,
        );

        const order = new Order("o1", customer.id, [orderItem1, orderItem2]);
        await orderRepository.create(order);

        orderItem1.changeName("Product 2");
        await orderRepository.update(order);

        const orderDB = await orderRepository.find(order.id);

        assertEquals(orderDB, order);
    });

    it("should successfully add an order item to an existing order", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "123",
            name: "Customer 1",
            address,
            eventDispatcher: new EventDispatcher(),
        });
        await customerRepository.create(customer);

        const product = new Product("123", "Prouct 1", 10);
        await productRepository.create(product);

        const orderItem1 = new OrderItem(
            "oi1",
            product.name,
            product.price,
            product.id,
            2,
        );
        const orderItem2 = new OrderItem(
            "oi2",
            product.name,
            product.price,
            product.id,
            2,
        );

        const order = new Order("o1", customer.id, [orderItem1]);
        await orderRepository.create(order);

        order.addItem(orderItem2);
        await orderRepository.update(order);

        const orderDB = await orderRepository.find(order.id);

        assertEquals(orderDB, order);
    });
});
