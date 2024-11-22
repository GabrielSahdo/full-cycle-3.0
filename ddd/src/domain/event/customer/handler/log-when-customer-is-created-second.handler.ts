import EventHandlerInterface from "../../@shared/event-handler.interface.ts";
import CustomerCreatedEvent from "../customer-created.event.ts";

export default class LogWhenCustomerIsCreatedSecondHandler
    implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}
