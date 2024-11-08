import { assertEquals } from "jsr:@std/assert";
import { assertThrows } from "jsr:@std/assert/throws";
import { describe, it } from "jsr:@std/testing/bdd";

import Customer from "./customer.ts";
import Address from "./address.ts";

describe("Customer Unit Tests", () => {
    it("Should create a customer", () => {
        const customer = new Customer("123", "Gabriel");
        assertEquals(customer.id, "123");
        assertEquals(customer.name, "Gabriel");
    });

    it("Should create a customer with status inactive", () => {
        const customer = new Customer("123", "Gabriel");
        assertEquals(customer.active, false);
    });

    it("Should fail to activate customer without address", () => {
        const customer = new Customer("123", "Gabriel");
        assertThrows(() => customer.activate(), Error, "Address is required");
    });

    it("Should activate customer with address", () => {
        const customer = new Customer("123", "Gabriel");
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");

        customer.setAddress(address);
        customer.activate();

        assertEquals(customer.active, true);
    });

    it("Should deactivate customer", () => {
        const customer = new Customer("123", "Gabriel");
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");

        customer.setAddress(address);
        customer.activate();
        customer.deactivate();

        assertEquals(customer.active, false);
    });

    it("Should not be possible to create a customer without id", () => {
        assertThrows(
            () => new Customer("", "Gabriel"),
            Error,
            "ID is required",
        );
    });

    it("Should not be possible to create a customer without name", () => {
        assertThrows(() => new Customer("123", ""), Error, "Name is required");
        const customer = new Customer("123", "Gabriel");
        assertThrows(() => customer.changeName(""), Error, "Name is required");
    });

    it("should not be possible to have a negative reward points", () => {
        assertThrows(
            () => {
                const c = new Customer("123", "Gabriel");
                return c.addRewardPoints(-1);
            },
            Error,
            "Reward points must be greater than or equal to 0",
        );
    });

    it("should add the reward points successfully", () => {
        const c = new Customer("123", "Gabriel");
        c.addRewardPoints(10);

        assertEquals(c.rewardPoints, 10);
    });
});
