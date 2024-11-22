import Product from "../entity/product.ts";
import ProductRepositoryInterface from "./product.repository.interface.ts";

export default class ProductRepositoryMock
    implements ProductRepositoryInterface {
    create(entity: Product): Promise<void> {
        console.log(`Product created: ${entity.name}`);
        return Promise.resolve();
    }

    update(entity: Product): Promise<void> {
        console.log(`Product updated: ${entity.name}`);
        return Promise.resolve();
    }

    findAll(): Promise<Product[]> {
        console.log("Products found");

        return Promise.resolve([]);
    }

    find(id: string): Promise<Product> {
        console.log(`Product found: ${id}`);

        return Promise.resolve(
            new Product(
                id,
                "Product Name",
                100,
            ),
        );
    }
}
