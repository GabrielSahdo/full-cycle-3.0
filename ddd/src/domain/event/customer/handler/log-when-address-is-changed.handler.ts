import EventHandlerInterface from "../../@shared/event-handler.interface.ts";
import CustomerAddressChangedEvent from "../customer-address-changed.event.ts";

export default class LogWhenAddressIsChangedHandler
    implements EventHandlerInterface<CustomerAddressChangedEvent> {
    constructor() {}

    handle(event: CustomerAddressChangedEvent): void {
        console.log(
            `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address?.toString()}`,
        );
    }
}
