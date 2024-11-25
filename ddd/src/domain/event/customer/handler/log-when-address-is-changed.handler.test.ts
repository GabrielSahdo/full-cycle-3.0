import { describe, it } from "jsr:@std/testing/bdd";
import LogWhenAddressIsChangedHandler from "./log-when-address-is-changed.handler.ts";
import CustomerAddressChangedEvent from "../customer-address-changed.event.ts";
import Customer from "../../../entity/customer.ts";
import Address from "../../../entity/address.ts";
import { assertSpyCallArgs, spy } from "jsr:@std/testing/mock";
import EventDispatcher from "../../@shared/event-dispatcher.ts";

describe("LogWhenAddressIsChangedHandler", () => {
    it("should log the address change", () => {
        const address = new Address("Rua 1", "123", "123", "City");
        const customer = new Customer({
            id: "1",
            name: "John Doe",
            eventDispatcher: new EventDispatcher(),
        });
        customer.changeAddress(address);

        const handler = new LogWhenAddressIsChangedHandler();
        const event = new CustomerAddressChangedEvent(customer);

        const spyConsoleLog = spy(console, "log");

        handler.handle(event);

        assertSpyCallArgs(spyConsoleLog, 0, [
            `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address?.toString()}`,
        ]);
    });
});
