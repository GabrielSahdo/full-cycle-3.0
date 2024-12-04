import Product from "../entity/product.ts";
import type RepositoryInterface from "../../@shared/repository/repository.interface.ts";

export default interface ProductRepositoryInterface
    extends RepositoryInterface<Product> {}
