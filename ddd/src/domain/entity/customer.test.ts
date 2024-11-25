import { assertEquals } from "jsr:@std/assert";
import { assertThrows } from "jsr:@std/assert/throws";
import { describe, it } from "jsr:@std/testing/bdd";
import { assertSpyCalls, spy } from "jsr:@std/testing/mock";

import Customer from "./customer.ts";
import Address from "./address.ts";
import EventDispatcher from "../event/@shared/event-dispatcher.ts";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event.ts";
import LogWhenAddressIsChangedHandler from "../event/customer/handler/log-when-address-is-changed.handler.ts";

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

    it("should create a customer with address", () => {
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");
        const customer = new Customer("123", "Gabriel", address);

        assertEquals(customer.address, address);
    });

    it("should change a address for a customer successfully", () => {
        const eventDispatcher = new EventDispatcher();

        const customer = new Customer("123", "Gabriel");
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");

        customer.changeAddress(address, eventDispatcher);

        assertEquals(customer.address, address);
    });

    it("Should activate customer with address", () => {
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");
        const customer = new Customer("123", "Gabriel", address);

        customer.activate();

        assertEquals(customer.active, true);
    });

    it("should call the dispatcher when the address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const handler = new LogWhenAddressIsChangedHandler();
        eventDispatcher.register(
            CustomerAddressChangedEvent.getEventName(),
            handler,
        );

        const handlerSpy = spy(handler, "handle");

        const customer = new Customer("123", "Gabriel");
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");

        customer.changeAddress(address, eventDispatcher);

        assertSpyCalls(handlerSpy, 1);
    });

    it("Should deactivate customer", () => {
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");
        const customer = new Customer("123", "Gabriel", address);

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
