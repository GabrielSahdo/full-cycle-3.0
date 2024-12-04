import type EventHandlerInterface from "../event/event-handler.interface.ts";
import type EventInterface from "../event/event.interface.ts";

export default interface EventDispatcherInterface {
    getEventHandlers(): Map<string, EventHandlerInterface[]>;
    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
}
