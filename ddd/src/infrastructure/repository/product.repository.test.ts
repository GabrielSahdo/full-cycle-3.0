import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";

import { Sequelize } from "npm:sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model.ts";
import Product from "../../domain/entity/product.ts";
import ProductRepository from "./product.repository.ts";

describe("ProductRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
            models: [ProductModel],
        });

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const repo = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await repo.create(product);

        const productDB = await ProductModel.findByPk(product.id);
        
        console.log(product, productDB?.toJSON())
        assertEquals(productDB?.toJSON(), {
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });

    it("should update a product", async () => {
        const repo = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await repo.create(product);

        product.changeName("Product changed");
        product.changePrice(200);

        await repo.update(product);

        const found = await ProductModel.findByPk(product.id);

        assertEquals(found?.toJSON(), {
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });

    it("should find a product", async () => {
        const repo = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await repo.create(product);
        const found = await repo.find(product.id);

        assertEquals(found, product);
    });

    it("should find all products", async () => {
        const repo = new ProductRepository();

        const p1 = new Product("1", "Product 1", 100);
        await repo.create(p1);

        const p2 = new Product("2", "Product 2", 200);
        await repo.create(p2);

        const foundProducts = await repo.findAll();

        assertEquals(foundProducts.length, 2);
        assertEquals(foundProducts[0], p1);
        assertEquals(foundProducts[1], p2);
    });
});
