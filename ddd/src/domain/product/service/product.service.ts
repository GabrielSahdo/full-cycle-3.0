import type Product from "../entity/product.ts";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface.ts";
import ProductCreatedEvent from "../event/product-created.event.ts";
import ProductRepositoryInterface from "../repository/product.repository.interface.ts";

export default class ProductService {
    private eventDispatcher: EventDispatcherInterface;
    private productRepository: ProductRepositoryInterface;

    constructor(
        eventDispatcher: EventDispatcherInterface,
        productRepository: ProductRepositoryInterface,
    ) {
        this.eventDispatcher = eventDispatcher;
        this.productRepository = productRepository;
    }

    increasePrice(products: Product[], increasePercentage: number) {
        products.forEach((product) => {
            product.changePrice(
                product.price + (product.price * (increasePercentage / 100)),
            );
        });
    }

    async saveProduct(product: Product) {
        await this.productRepository.create(product);

        const productCreatedEvent = new ProductCreatedEvent(product);

        this.eventDispatcher.notify(productCreatedEvent);
    }
}
