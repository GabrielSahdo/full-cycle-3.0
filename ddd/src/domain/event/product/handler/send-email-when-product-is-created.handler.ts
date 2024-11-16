import type EventHandlerInterface from "../../@shared/event-handler.interface.ts";
import type ProductCreatedEvent from "../product-created.event.ts";

export default class SendEmailWhenProductIsCreatedHandler
    implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email to ${event.eventData.email}...`);
    }
}
