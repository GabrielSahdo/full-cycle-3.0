import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface.ts";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event.ts";
import CustomerCreatedEvent from "../event/customer-created.event.ts";
import type Address from "../value-object/address.ts";

interface CustomerProps {
    id: string;
    name: string;
    eventDispatcher: EventDispatcherInterface;
    address?: Address;
}

export default class Customer {
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _rewardPoints: number = 0;
    private _active: boolean = false;
    private _eventDispatcher: EventDispatcherInterface;

    constructor(props: CustomerProps) {
        this._id = props.id;
        this._name = props.name;
        this._address = props.address;
        this._eventDispatcher = props.eventDispatcher;

        this.validate();

        const event = new CustomerCreatedEvent(this);

        this._eventDispatcher.notify(event);
    }

    validate(): void {
        if (!this._name) {
            throw new Error("Name is required");
        }

        if (!this._id) {
            throw new Error("ID is required");
        }

        if (this._rewardPoints < 0) {
            throw new Error("Reward points must be greater than or equal to 0");
        }
    }

    changeAddress(address: Address): void {
        this._address = address;

        const event = new CustomerAddressChangedEvent(this);

        this._eventDispatcher.notify(event);
    }

    changeName(name: string): void {
        this._name = name;

        this.validate();
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
        this.validate();
    }

    deactivate(): void {
        this._active = false;
    }

    activate(): void {
        if (!this._address) {
            throw new Error("Address is required");
        }

        this._active = true;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get active(): boolean {
        return this._active;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address(): Address | undefined {
        return this._address;
    }
}
