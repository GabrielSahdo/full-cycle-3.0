import Customer from "../../entity/customer.ts";
import EventInterface from "../@shared/event.interface.ts";

export default class CustomerAddressChangedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: Customer;
    eventName: string;

    constructor(eventData: Customer) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
        this.eventName = CustomerAddressChangedEvent.getEventName();
    }

    static getEventName(): string {
        return "CustomerAddressChangedEvent";
    }
}
