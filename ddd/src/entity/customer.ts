import type Address from "./address.ts";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    validate(): void {
        if (!this._name) {
            throw new Error("Name is required");
        }

        if (!this._id) {
            throw new Error("ID is required");
        }
    }

    setAddress(address: Address): void {
        this._address = address;
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
}
