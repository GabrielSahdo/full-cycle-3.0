import type OrderItem from "./order_item.ts";

export default class Order {
    private _id: string;
    private _customerID: string;
    private _items: OrderItem[];

    constructor(id: string, customerID: string, items: OrderItem[]) {
        this._id = id;
        this._items = items;
        this._customerID = customerID;

        this.validate();
    }

    validate(): void {
        if (!this._id) {
            throw new Error("ID is required");
        }

        if (!this._items || this._items.length === 0) {
            throw new Error("Items are required");
        }

        if (!this._customerID) {
            throw new Error("Customer ID is required");
        }
    }
}
