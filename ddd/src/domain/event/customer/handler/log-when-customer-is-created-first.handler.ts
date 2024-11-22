import EventHandlerInterface from "../../@shared/event-handler.interface.ts";
import CustomerCreatedEvent from "../customer-created.event.ts";

export default class LogWhenCustomerIsCreatedFirstHandler
    implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}
