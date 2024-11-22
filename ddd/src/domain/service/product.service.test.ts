import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";

import Product from "../entity/product.ts";
import ProductService from "./product.service.ts";
import EventDispatcherMock from "../event/@shared/event-dispatcher.mock.ts";
import ProductRepositoryMock from "../repository/product.repository.mock.ts";
import { assertSpyCalls, spy } from "jsr:@std/testing/mock";

describe("Product service unit test", () => {
    let service: ProductService;
    const eventDispatcher = new EventDispatcherMock();
    const productRepository = new ProductRepositoryMock();

    beforeEach(() => {
        service = new ProductService(
            eventDispatcher,
            productRepository,
        );
    });

    it("should change the prices of all products", () => {
        const p1 = new Product("1", "Product 1", 10);
        const p2 = new Product("2", "Product 2", 20);
        const products = [p1, p2];

        service.increasePrice(products, 100);

        assertEquals(p1.price, 20);
        assertEquals(p2.price, 40);
    });

    it("should save a product", async () => {
        const p1 = new Product("1", "Product 1", 10);

        const notifySpy = spy(eventDispatcher, "notify");
        const createSpy = spy(productRepository, "create");

        await service.saveProduct(p1);

        assertSpyCalls(notifySpy, 1);
        assertSpyCalls(createSpy, 1);
    });
});
