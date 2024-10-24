import Product from "./product.ts";
import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertThrows } from "jsr:@std/assert";

describe("Product Unit Tests", () => {
    it("Should be created with id, name and price", () => {
        const product = new Product("123", "Product", 10);
        assertEquals(product.id, "123");
        assertEquals(product.name, "Product");
        assertEquals(product.price, 10);
    });

    it("Should not be possible to create a product without id", () => {
        assertThrows(
            () => new Product("", "Product", 10),
            Error,
            "ID is required",
        );
    });

    it("Should not be possible to create a product without name", () => {
        assertThrows(
            () => new Product("123", "", 10),
            Error,
            "Name is required",
        );
    });

    it("Should not be possible to create a product without price", () => {
        assertThrows(
            () => new Product("123", "Product", 0),
            Error,
            "Price must be greater than 0",
        );
    });

    it("Should not be possible to create a product with negative price", () => {
        assertThrows(
            () => new Product("123", "Product", -10),
            Error,
            "Price must be greater than 0",
        );
    });

    it("Should be possible to change the name", () => {
        const product = new Product("123", "Product", 10);
        product.changeName("New Product");
        assertEquals(product.name, "New Product");
    });

    it("Should be possible to change the price", () => {
        const product = new Product("123", "Product", 10);
        product.changePrice(20);
        assertEquals(product.price, 20);
    });
});
