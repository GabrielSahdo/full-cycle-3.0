import EventDispatcherInterface from "../event/@shared/event-dispatcher.interface.ts";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event.ts";
import type Address from "./address.ts";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _rewardPoints: number = 0;
    private _active: boolean = false;

    constructor(id: string, name: string, address?: Address) {
        this._id = id;
        this._name = name;
        this._address = address;

        this.validate();
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

    changeAddress(
        address: Address,
        eventDispatcher: EventDispatcherInterface,
    ): void {
        this._address = address;

        const event = new CustomerAddressChangedEvent(this);

        eventDispatcher.notify(event);
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
