import { assertEquals } from "jsr:@std/assert/equals";
import { assertExists } from "jsr:@std/assert/exists";
import { describe, it } from "jsr:@std/testing/bdd";
import { assertSpyCalls, spy } from "jsr:@std/testing/mock";
import EventDispatcher from "./event-dispatcher.ts";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler.ts";
import ProductCreatedEvent from "../../product/event/product-created.event.ts";

describe("Domain Event Test", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register(
            ProductCreatedEvent.getEventName(),
            eventHandler,
        );

        const eventHandlers = eventDispatcher.getEventHandlers();

        assertExists(eventHandlers);
        assertEquals(eventHandlers.size, 1);

        const productCreatedHandlers = eventHandlers.get(
            ProductCreatedEvent.getEventName(),
        );
        assertExists(productCreatedHandlers);
        assertEquals(productCreatedHandlers[0], eventHandler);
    });

    it("shoud unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register(
            ProductCreatedEvent.getEventName(),
            eventHandler,
        );
        eventDispatcher.unregister(
            ProductCreatedEvent.getEventName(),
            eventHandler,
        );

        const eventHandlers = eventDispatcher.getEventHandlers();

        assertExists(eventHandlers);
        assertEquals(eventHandlers.size, 0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register(
            ProductCreatedEvent.getEventName(),
            eventHandler,
        );
        eventDispatcher.unregisterAll();

        const eventHandlers = eventDispatcher.getEventHandlers();

        assertExists(eventHandlers);
        assertEquals(eventHandlers.size, 0);
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const funct = spy(eventHandler, "handle");

        eventDispatcher.register(
            ProductCreatedEvent.getEventName(),
            eventHandler,
        );

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 100,
        });

        eventDispatcher.notify(productCreatedEvent);

        assertSpyCalls(funct, 1);
    });
});
