export default class Address {
    private _street: string;
    private _number: string;
    private _zip: string;
    private _city: string;

    constructor(street: string, number: string, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    validate(): void {
        if (!this._street || this._street.trim().length === 0) {
            throw new Error("Street is required");
        }
        if (!this._number || this._number.trim().length === 0) {
            throw new Error("Number is required");
        }
        if (!this._zip || this._zip.trim().length === 0) {
            throw new Error("ZIP code is required");
        }
        if (!this._city || this._city.trim().length === 0) {
            throw new Error("City is required");
        }
    }

    toString(): string {
        return `${this._street} ${this._number}, ${this._zip} ${this._city}`;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }
}
