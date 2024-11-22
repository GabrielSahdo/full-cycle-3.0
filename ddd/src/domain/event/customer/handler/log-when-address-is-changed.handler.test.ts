import { describe, it } from "jsr:@std/testing/bdd";
import LogWhenAddressIsChangedHandler from "./log-when-address-is-changed.handler.ts";
import CustomerAddressChangedEvent from "../customer-address-changed.event.ts";
import Customer from "../../../entity/customer.ts";
import Address from "../../../entity/address.ts";
import { assertSpyCallArgs, spy } from "jsr:@std/testing/mock";
import EventDispatcher from "../../@shared/event-dispatcher.ts";

describe("LogWhenAddressIsChangedHandler", () => {
    it("should log the address change", () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("Rua 1", "123", "123", "City");
        customer.setAddress(address, new EventDispatcher());

        const handler = new LogWhenAddressIsChangedHandler();
        const event = new CustomerAddressChangedEvent(customer);

        const spyConsoleLog = spy(console, "log");

        handler.handle(event);

        assertSpyCallArgs(spyConsoleLog, 0, [
            `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address.toString()}`,
        ]);
    });
});
