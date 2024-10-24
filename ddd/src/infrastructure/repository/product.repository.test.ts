import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import ProductModel from "../db/sequelize/model/product.model.ts";
import { assertEquals } from "@std/assert";

describe("ProductRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("test", () => {
        assertEquals(1, 1);
    });
});
