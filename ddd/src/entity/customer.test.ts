import { assertEquals } from "@std/assert";
import { assertThrows } from "@std/assert/throws";
import { describe, it } from "@std/testing/bdd"

import Customer from "./customer.ts";
import Address from "./address.ts";

describe("Customer Unit Tests", () => {
    it("Customer should be created with id and name", () => {
        const customer = new Customer("123", "Gabriel");
        assertEquals(customer.id, "123");
        assertEquals(customer.name, "Gabriel");
    });

    it("Customer should be created inactive", () => {
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
        assertThrows(() => new Customer("", "Gabriel"), Error, "ID is required");
    });

    it("Should not be possible to create a customer without name", () => {
        assertThrows(() => new Customer("123", ""), Error, "Name is required");
        const customer = new Customer("123", "Gabriel");
        assertThrows(() => customer.name = "", Error, "Name is required");
    });
});