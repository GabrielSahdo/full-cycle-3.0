import CustomerModel from "./customer.model.ts";
import Customer from "../../../../domain/customer/entity/customer.ts";
import Address from "../../../../domain/customer/value-object/address.ts";
import type CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface.ts";
import EventDispatcher from "../../../../domain/@shared/event/event-dispatcher.ts";
import CustomerCreatedEvent from "../../../../domain/customer/event/customer-created.event.ts";
import LogWhenCustomerIsCreatedFirstHandler from "../../../../domain/customer/event/handler/log-when-customer-is-created-first.handler.ts";
import LogWhenCustomerIsCreatedSecondHandler from "../../../../domain/customer/event/handler/log-when-customer-is-created-second.handler.ts";
import CustomerAddressChangedEvent from "../../../../domain/customer/event/customer-address-changed.event.ts";
import LogWhenAddressIsChangedHandler from "../../../../domain/customer/event/handler/log-when-address-is-changed.handler.ts";

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

        return this.parseDbCustomer(foundCustomer);
    }

    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll();

        return customers.map((c) => this.parseDbCustomer(c));
    }

    private parseDbCustomer(dbCustomer: CustomerModel): Customer {
        let address;

        if (dbCustomer.street) {
            address = new Address(
                dbCustomer.street,
                dbCustomer.number,
                dbCustomer.zipcode,
                dbCustomer.city,
            );
        }

        const eventDispatcher = new EventDispatcher();
        eventDispatcher.register(
            CustomerCreatedEvent.getEventName(),
            new LogWhenCustomerIsCreatedFirstHandler(),
        );
        eventDispatcher.register(
            CustomerCreatedEvent.getEventName(),
            new LogWhenCustomerIsCreatedSecondHandler(),
        );
        eventDispatcher.register(
            CustomerAddressChangedEvent.getEventName(),
            new LogWhenAddressIsChangedHandler(),
        );

        const customer = new Customer({
            id: dbCustomer.id,
            name: dbCustomer.name,
            address,
            eventDispatcher,
        });

        if (dbCustomer.active) {
            customer.activate();
        }

        return customer;
    }
}
