import { describe, it } from "jsr:@std/testing/bdd";
import ConsoleWhenCustomerIsCreatedFirstHandler from "./console-when-customer-is-created-first.handler copy.ts";
import CustomerCreatedEvent from "../customer-created.event.ts";
import { assertSpyCallArgs, spy } from "jsr:@std/testing/mock";

describe("ConsoleWhenCustomerIsCreatedFirstHandler", () => {
    it("should call the console.log with the correct message", () => {
        const handler = new ConsoleWhenCustomerIsCreatedFirstHandler();
        const event = new CustomerCreatedEvent({ name: "John Doe" });

        const consoleSpy = spy(console, "log");

        handler.handle(event);

        assertSpyCallArgs(consoleSpy, 0, [ "Esse é o primeiro console.log do evento: CustomerCreated" ]);
    });
});