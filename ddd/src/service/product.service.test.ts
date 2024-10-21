import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

import Product from "../entity/product.ts";
import ProductService from "./product.service.ts";

describe("Product service unit test", () => {
    it("should change the prices of all products", () => {
        const p1 = new Product("1", "Product 1", 10);
        const p2 = new Product("2", "Product 2", 20);
        const products = [p1, p2];

        ProductService.increasePrice(products, 100);

        assertEquals(p1.price, 20);
        assertEquals(p2.price, 40);
    });
});
