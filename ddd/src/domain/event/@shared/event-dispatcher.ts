import type EventDispatcherInterface from "./event-dispatcher.interface.ts";
import type EventHandlerInterface from "./event-handler.interface.ts";
import type EventInterface from "./event.interface.ts";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: Map<string, EventHandlerInterface[]>;

    constructor() {
        this.eventHandlers = new Map();
    }

    getEventHandlers() {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        const eventName = event.eventName;
        const handlers = this.eventHandlers.get(eventName);

        if (!handlers) return;

        handlers.forEach((handler) => handler.handle(event));
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if (!this.eventHandlers.has(eventName)) {
            this.eventHandlers.set(eventName, []);
        }

        this.eventHandlers.get(eventName)?.push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        const handlers = this.eventHandlers.get(eventName);

        if (!handlers) {
            return;
        }

        const index = handlers.indexOf(eventHandler);

        if (index === -1) {
            return;
        }

        handlers.splice(index, 1);

        if (handlers.length === 0) {
            this.eventHandlers.delete(eventName);
        }
    }

    unregisterAll(): void {
        this.eventHandlers.clear();
    }
}
