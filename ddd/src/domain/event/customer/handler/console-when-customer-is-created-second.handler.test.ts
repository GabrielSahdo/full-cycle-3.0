import { describe, it } from "jsr:@std/testing/bdd";
import CustomerCreatedEvent from "../customer-created.event.ts";
import { assertSpyCallArgs, spy } from "jsr:@std/testing/mock";
import ConsoleWhenCustomerIsCreatedSecondHandler from "./console-when-customer-is-created-second.handler.ts";

describe("ConsoleWhenCustomerIsCreatedSecondHandler", () => {
    it("should call the console.log with the correct message", () => {
        const handler = new ConsoleWhenCustomerIsCreatedSecondHandler();
        const event = new CustomerCreatedEvent({ name: "John Doe" });

        const consoleSpy = spy(console, "log");

        handler.handle(event);

        assertSpyCallArgs(consoleSpy, 0, [ "Esse é o segundo console.log do evento: CustomerCreated" ]);
    });
});