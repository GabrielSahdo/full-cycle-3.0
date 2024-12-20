import type Order from "../entity/order.ts";
import type RepositoryInterface from "../../@shared/repository/repository.interface.ts";

export default interface OrderRepositoryInterface
    extends RepositoryInterface<Order> {}
