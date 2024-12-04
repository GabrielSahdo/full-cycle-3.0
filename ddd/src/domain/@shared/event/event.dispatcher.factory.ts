import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event.ts";
import CustomerCreatedEvent from "../../customer/event/customer-created.event.ts";
import LogWhenAddressIsChangedHandler from "../../customer/event/handler/log-when-address-is-changed.handler.ts";
import LogWhenCustomerIsCreatedFirstHandler from "../../customer/event/handler/log-when-customer-is-created-first.handler.ts";
import LogWhenCustomerIsCreatedSecondHandler from "../../customer/event/handler/log-when-customer-is-created-second.handler.ts";
import EventDispatcher from "./event-dispatcher.ts";

export default class EventDispatcherFactory {
    static create() {
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register(
            CustomerCreatedEvent.getEventName(),
            new LogWhenCustomerIsCreatedFirstHandler(),
        );

        eventDispatcher.register(
            CustomerCreatedEvent.getEventName(),
            new LogWhenCustomerIsCreatedSecondHandler(),
        );

        eventDispatcher.register(
            CustomerAddressChangedEvent.getEventName(),
            new LogWhenAddressIsChangedHandler(),
        );

        return eventDispatcher;
    }
}
