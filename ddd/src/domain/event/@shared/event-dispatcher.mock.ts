import type EventDispatcherInterface from "./event-dispatcher.interface.ts";
import type EventHandlerInterface from "./event-handler.interface.ts";
import type EventInterface from "./event.interface.ts";

export default class EventDispatcherMock implements EventDispatcherInterface {
    private eventHandlers: Map<string, EventHandlerInterface[]>;

    constructor() {
        this.eventHandlers = new Map();
    }

    getEventHandlers() {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        console.log(`Event dispatched: ${event.eventName}`);
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        console.log(`Event handler registered: ${eventName}`);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        console.log(`Event handler unregistered: ${eventName}`);
    }

    unregisterAll(): void {
        console.log(`All event handlers unregistered`);
    }
}
