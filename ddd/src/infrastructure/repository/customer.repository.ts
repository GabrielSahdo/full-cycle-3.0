import CustomerModel from "../db/sequelize/model/customer.model.ts";
import Customer from "../../domain/entity/customer.ts";
import Address from "../../domain/entity/address.ts";
import type CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface.ts";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address?.street,
            number: entity.address?.number,
            zipcode: entity.address?.zip,
            city: entity.address?.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
        }).catch((err) => {
            console.log("Error creating customer: ", err);
            throw new Error("Database error");
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address?.street,
                number: entity.address?.number,
                zipcode: entity.address?.zip,
                city: entity.address?.city,
                active: entity.active,
                rewardPoints: entity.rewardPoints,
            },
            {
                where: { id: entity.id },
            },
        ).catch((err) => {
            console.log("Error updating customer: ", err);
            throw new Error("Database error");
        });
    }

    async find(id: string): Promise<Customer> {
        const foundCustomer = await CustomerModel.findByPk(id)
            .catch((err) => {
                console.log("Error finding customer: ", err);
                throw new Error("Database error");
            });

        if (!foundCustomer) throw new Error("Customer not found");

        const customer = new Customer(foundCustomer.id, foundCustomer.name);

        if (foundCustomer.street) {
            const address = new Address(
                foundCustomer.street,
                foundCustomer.number,
                foundCustomer.zipcode,
                foundCustomer.city,
            );
            customer.setAddress(address);
        }

        if (foundCustomer.active) {
            customer.activate();
        }

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll();

        return customers.map((c) => {
            const customer = new Customer(c.id, c.name);

            if (c.street) {
                const address = new Address(
                    c.street,
                    c.number,
                    c.zipcode,
                    c.city,
                );
                customer.setAddress(address);
            }

            if (c.active) {
                customer.activate();
            }

            return customer;
        });
    }
}
