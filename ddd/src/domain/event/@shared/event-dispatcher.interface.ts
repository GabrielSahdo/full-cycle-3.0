import type EventHandlerInterface from "./event-handler.interface.ts";
import type EventInterface from "./event.interface.ts";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
}
