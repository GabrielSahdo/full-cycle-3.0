import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";

import "npm:sqlite3";
import { Sequelize } from "npm:sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model.ts";

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

    it("test1", async () => {
        await ProductModel.create({
            id: "id1",
            name: "Gabriel",
            price: 10,
        })

        const product = await ProductModel.findOne();

        assertEquals(product?.name, "Gabriel");
    });

    it("test2", async () => {
        await ProductModel.create({
            id: "id1",
            name: "Gabriel1",
            price: 10,
        })

        const product = await ProductModel.findOne();

        assertEquals(product?.name, "Gabriel1");
    });
});
