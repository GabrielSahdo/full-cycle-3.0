import Product from "../entity/product.ts";
import type RepositoryInterface from "./repository.interface.ts";

export default interface ProductRepositoryInterface
    extends RepositoryInterface<Product> {}
