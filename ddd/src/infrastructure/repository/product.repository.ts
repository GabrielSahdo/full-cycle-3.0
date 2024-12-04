import Product from "../../domain/product/entity/product.ts";
import type ProductRepositoryInterface from "../../domain/product/repository/product.repository.interface.ts";
import ProductModel from "../db/sequelize/model/product.model.ts";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price,
            },
            {
                where: { id: entity.id },
            },
        );
    }

    async find(id: string): Promise<Product> {
        const dbProduct = await ProductModel.findByPk(id);

        if (!dbProduct) throw new Error("Product not found");

        return new Product(dbProduct.id, dbProduct.name, dbProduct.price);
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();

        return products.map((p) => new Product(p.id, p.name, p.price));
    }
}
