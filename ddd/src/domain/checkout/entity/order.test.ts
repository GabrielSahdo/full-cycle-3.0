import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertThrows } from "jsr:@std/assert";

import OrderItem from "./order_item.ts";
import Order from "./order.ts";

describe("Order Unit Tests", () => {
    it("Order should be created with id, customerID and items", () => {
        const customerID = "123";
        const items = [
            new OrderItem("1", "Item 1", 10, "p1", 1),
        ];
        const order = new Order("123", customerID, items);

        assertEquals(order.total(), 10);
    });

    it("Should not be possible to create an order without id", () => {
        const customerID = "123";
        const items = [
            new OrderItem("1", "Item 1", 10, "p1", 1),
        ];

        assertThrows(
            () => new Order("", customerID, items),
            Error,
            "ID is required",
        );
    });

    it("Should not be possible to create an order without items", () => {
        assertThrows(
            () => new Order("123", "123", []),
            Error,
            "Items are required",
        );
    });

    it("Should not be possible to create an order without customerID", () => {
        const items = [
            new OrderItem("1", "Item 1", 10, "p1", 1),
        ];

        assertThrows(
            () => new Order("123", "", items),
            Error,
            "Customer ID is required",
        );
    });

    it("Should return the total of the order", () => {
        const customerID = "123";
        const items = [
            new OrderItem("1", "Item 1", 10, "p1", 1),
            new OrderItem("2", "Item 2", 20, "p2", 2),
        ];
        const order = new Order("123", customerID, items);

        assertEquals(order.total(), 50);
    });

    it("should not be able to create a order item without product id", () => {
        assertThrows(
            () => new OrderItem("1", "Item 1", 10, "", 1),
            Error,
            "Product ID is required",
        );
    });

    it("should not be able to create a order item with invalid quantity", () => {
        assertThrows(
            () => new OrderItem("1", "Item 1", 10, "p1", 0),
            Error,
            "Quantity must be greater than 0",
        );

        assertThrows(
            () => new OrderItem("1", "Item 1", 10, "p1", -1),
            Error,
            "Quantity must be greater than 0",
        );
    });
});
