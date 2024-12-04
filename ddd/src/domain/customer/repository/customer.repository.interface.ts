import Customer from "../entity/customer.ts";
import type RepositoryInterface from "../../@shared/repository/repository.interface.ts";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer> {}
