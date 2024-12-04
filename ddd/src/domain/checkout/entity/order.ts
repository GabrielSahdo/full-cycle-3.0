import type OrderItem from "./order_item.ts";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._items = items;
        this._customerId = customerId;

        this.validate();
    }

    total(): number {
        return this._items.reduce(
            (total, item) => total + item.total(),
            0,
        );
    }

    rewardPoints(): number {
        return this.total() / 2;
    }

    validate(): void {
        if (!this._id) {
            throw new Error("ID is required");
        }

        if (Array.isArray(this._items) && this._items.length === 0) {
            throw new Error("Items are required");
        }

        if (!this._customerId) {
            throw new Error("Customer ID is required");
        }
    }

    removeItem(orderItemId: string): void {
        this._items = this._items.filter((item) => item.id !== orderItemId);
        this.validate();
    }

    addItem(item: OrderItem): void {
        this._items.push(item);
        this.validate();
    }
}
