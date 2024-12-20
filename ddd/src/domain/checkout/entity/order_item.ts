export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity: number;
    private _productId: string;

    constructor(
        id: string,
        name: string,
        price: number,
        productId: string,
        quantity: number,
    ) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get productId(): string {
        return this._productId;
    }

    get quantity(): number {
        return this._quantity;
    }

    changeName(newName: string): void {
        this._name = newName;
        this.validate();
    }

    total(): number {
        return this._price * this._quantity;
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

        if (!this._productId) {
            throw new Error("Product ID is required");
        }

        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
    }
}
