import { assertEquals } from "jsr:@std/assert";
import { assertThrows } from "jsr:@std/assert/throws";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { assertSpyCalls, spy } from "jsr:@std/testing/mock";

import Customer from "./customer.ts";
import Address from "./address.ts";
import EventDispatcher from "../event/@shared/event-dispatcher.ts";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event.ts";
import LogWhenAddressIsChangedHandler from "../event/customer/handler/log-when-address-is-changed.handler.ts";
import EventDispatcherInterface from "../event/@shared/event-dispatcher.interface.ts";
import EventDispatcherFactory from "../event/@shared/event.dispatcher.factory.ts";

describe("Customer Unit Tests", () => {
    let eventDispatcher: EventDispatcherInterface;

    beforeEach(() => {
        eventDispatcher = EventDispatcherFactory.create();
    });

    it("Should create a customer", () => {
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
        });
        assertEquals(customer.id, "123");
        assertEquals(customer.name, "Gabriel");
    });

    it("Should create a customer with status inactive", () => {
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
        });
        assertEquals(customer.active, false);
    });

    it("Should fail to activate customer without address", () => {
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
        });
        assertThrows(() => customer.activate(), Error, "Address is required");
    });

    it("should create a customer with address", () => {
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
            address,
        });

        assertEquals(customer.address, address);
    });

    it("should change a address for a customer successfully", () => {
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
        });
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");

        customer.changeAddress(address);

        assertEquals(customer.address, address);
    });

    it("Should activate customer with address", () => {
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
            address,
        });

        customer.activate();

        assertEquals(customer.active, true);
    });

    it("should call the dispatcher when the address is changed", () => {
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
        });
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");

        const eventNotifySpy = spy(eventDispatcher, "notify");
        customer.changeAddress(address);
        
        assertSpyCalls(eventNotifySpy, 1);
    });

    it("Should deactivate customer", () => {
        const address = new Address("Rua 1", "123", "12345-123", "Cidade");
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
            address,
        });

        customer.activate();
        customer.deactivate();

        assertEquals(customer.active, false);
    });

    it("Should not be possible to create a customer without id", () => {
        assertThrows(
            () =>
                new Customer({
                    id: "",
                    name: "Gabriel",
                    eventDispatcher,
                }),
            Error,
            "ID is required",
        );
    });

    it("Should not be possible to create a customer without name", () => {
        assertThrows(
            () =>
                new Customer({
                    id: "123",
                    name: "",
                    eventDispatcher,
                }),
            Error,
            "Name is required",
        );
        const customer = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
        });
        assertThrows(() => customer.changeName(""), Error, "Name is required");
    });

    it("should not be possible to have a negative reward points", () => {
        assertThrows(
            () => {
                const c = new Customer({
                    id: "123",
                    name: "Gabriel",
                    eventDispatcher,
                });
                return c.addRewardPoints(-1);
            },
            Error,
            "Reward points must be greater than or equal to 0",
        );
    });

    it("should add the reward points successfully", () => {
        const c = new Customer({
            id: "123",
            name: "Gabriel",
            eventDispatcher,
        });
        c.addRewardPoints(10);

        assertEquals(c.rewardPoints, 10);
    });
});
