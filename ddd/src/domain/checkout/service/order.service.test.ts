import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";

import Order from "../entity/order.ts";
import OrderItem from "../entity/order_item.ts";
import OrderService from "./order.service.ts";
import Customer from "../../customer/entity/customer.ts";
import { assertThrows } from "jsr:@std/assert/throws";
import EventDispatcher from "../../@shared/event/event-dispatcher.ts";
import EventDispatcherFactory from "../../@shared/event/event.dispatcher.factory.ts";

describe("Order service unit tests", () => {
    let eventDispatcher: EventDispatcher;

    beforeEach(() => {
        eventDispatcher = EventDispatcherFactory.create();
    });

    it("should get total of all orders", () => {
        const item1 = new OrderItem("id1", "name", 100, "pid1", 1);
        const item2 = new OrderItem("id2", "name", 200, "pid2", 2);

        const order1 = new Order("id1", "c1", [item1]);
        const order2 = new Order("id2", "c2", [item2]);

        const total = OrderService.total([order1, order2]);
        assertEquals(total, 500);
    });

    it("should place an order", () => {
        const customer = new Customer({
            id: "c1",
            name: "Customer 1",
            eventDispatcher,
        });
        const item1 = new OrderItem("id1", "name", 10, "pid1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        assertEquals(customer.rewardPoints, 5);
        assertEquals(order.total(), 10);
    });

    it("should not be possible to place an order without items", () => {
        const customer = new Customer({
            id: "c1",
            name: "Customer 1",
            eventDispatcher,
        });

        assertThrows(
            () => OrderService.placeOrder(customer, []),
            Error,
            "Items are required",
        );
    });
});
