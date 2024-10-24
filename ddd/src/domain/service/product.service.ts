import type Product from "../entity/product.ts";

export default class ProductService {
    static increasePrice(products: Product[], increasePercentage: number) {
        products.forEach((product) => {
            product.changePrice(
                product.price + (product.price * (increasePercentage / 100)),
            );
        });
    }
}
