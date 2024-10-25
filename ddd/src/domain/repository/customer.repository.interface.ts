import Customer from "../entity/customer.ts";
import type RepositoryInterface from "./repository.interface.ts";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer> {}
