import type EventInterface from "../../@shared/event/event.interface.ts";

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;
    eventName: string;

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
        this.eventName = CustomerCreatedEvent.getEventName();
    }

    static getEventName(): string {
        return "CustomerCreatedEvent";
    }
}
