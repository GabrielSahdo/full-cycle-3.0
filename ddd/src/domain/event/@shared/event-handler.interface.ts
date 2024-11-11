import type EventInterface from "./event.interface.ts";

export default interface EventHandlerInterface<
    T extends EventInterface = EventInterface,
> {
    handle(event: T): void;
}
