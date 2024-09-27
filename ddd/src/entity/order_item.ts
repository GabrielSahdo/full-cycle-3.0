export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    validate(): void {
        if (!this._id) {
            throw new Error("ID is required");
        }

        if (!this._name) {
            throw new Error("Name is required");
        }

        if (!this._price) {
            throw new Error("Price is required");
        } else if (this._price <= 0) {
            throw new Error("Price must be greater than 0");
        }
    }
}
