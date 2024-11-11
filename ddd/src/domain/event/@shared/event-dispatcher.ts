import type EventDispatcherInterface from "./event-dispatcher.interface.ts";
import type EventHandlerInterface from "./event-handler.interface.ts";
import type EventInterface from "./event.interface.ts";

export default class EventDispatcher implements EventDispatcherInterface {
    notify(event: EventInterface): void {
        
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {

    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {

    }

    unregisterAll(): void {

    }
}