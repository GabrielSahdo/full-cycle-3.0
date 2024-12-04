import type EventInterface from "../../@shared/event/event.interface.ts";

export default class ProductCreatedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;
    eventName: string;

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
        this.eventName = ProductCreatedEvent.getEventName();
    }

    static getEventName(): string {
        return "ProductCreatedEvent";
    }
}
