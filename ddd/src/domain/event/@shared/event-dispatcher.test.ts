import { assertEquals } from "jsr:@std/assert/equals";
import { assertExists } from "jsr:@std/assert/exists";
import { describe, it } from "jsr:@std/testing/bdd";
import EventDispatcher from "./event-dispatcher.ts";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler.ts";

describe("Domain Event Test", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        const eventHandlers = eventDispatcher.getEventHandlers();

        assertExists(eventHandlers);
        assertEquals(eventHandlers.size, 1);

        const productCreatedHandlers = eventHandlers.get("ProductCreatedEvent");
        assertExists(productCreatedHandlers);
        assertEquals(productCreatedHandlers[0], eventHandler);
    });

    it("shoud unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        const eventHandlers = eventDispatcher.getEventHandlers();

        assertExists(eventHandlers);
        assertEquals(eventHandlers.size, 0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregisterAll();

        const eventHandlers = eventDispatcher.getEventHandlers();

        assertExists(eventHandlers);
        assertEquals(eventHandlers.size, 0);
    });
});
