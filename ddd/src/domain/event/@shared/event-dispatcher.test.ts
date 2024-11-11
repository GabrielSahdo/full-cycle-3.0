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

        assertExists(eventDispatcher.getEventHandlers("ProductCreatedEvenet"));
        assertEquals(eventDispatcher.getEventHandlers("ProductCreatedEvent").length, 1);
    });
});