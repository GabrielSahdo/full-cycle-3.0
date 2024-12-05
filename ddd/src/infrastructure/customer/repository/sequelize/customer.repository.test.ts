import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertRejects } from "jsr:@std/assert";
import { Sequelize } from "npm:sequelize-typescript";

import CustomerModel from "./customer.model.ts";
import Customer from "../../../../domain/customer/entity/customer.ts";
import Address from "../../../../domain/customer/value-object/address.ts";
import CustomerRepository from "./customer.repository.ts";
import EventDispatcherInterface from "../../../../domain/@shared/event/event-dispatcher.interface.ts";
import EventDispatcherFactory from "../../../../domain/@shared/event/event.dispatcher.factory.ts";

describe("Customer Repository Test", () => {
    let sequelize: Sequelize;
    let customerRepository: CustomerRepository;
    let eventDispatcher: EventDispatcherInterface;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
            models: [CustomerModel],
        });

        await sequelize.sync();

        customerRepository = new CustomerRepository();

        eventDispatcher = EventDispatcherFactory.create();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer with address", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "1",
            name: "Customer 1",
            address,
            eventDispatcher,
        });

        await customerRepository.create(customer);

        const customerDB = await CustomerModel.findByPk(customer.id);

        assertEquals(customerDB?.toJSON(), {
            id: customer.id,
            name: customer.name,
            street: customer.address?.street,
            number: customer.address?.number,
            zipcode: customer.address?.zip,
            city: customer.address?.city,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should create a customer without a address", async () => {
        const customer = new Customer({
            id: "1",
            name: "Customer 1",
            eventDispatcher,
        });
        await customerRepository.create(customer);

        const customerDB = await CustomerModel.findByPk(customer.id);

        assertEquals(customerDB?.toJSON(), {
            id: customer.id,
            name: customer.name,
            street: null,
            number: null,
            zipcode: null,
            city: null,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should update a customer", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "1",
            name: "Customer 1",
            address,
            eventDispatcher,
        });
        await customerRepository.create(customer);

        customer.changeName("Customer changed");
        const newAddress = new Address(
            "New Street",
            "47",
            "64124",
            "Townsville",
        );
        customer.changeAddress(newAddress);
        customer.activate();
        await customerRepository.update(customer);

        const updatedCustomer = await CustomerModel.findByPk(customer.id);

        assertEquals(updatedCustomer?.toJSON(), {
            id: customer.id,
            name: customer.name,
            street: customer.address?.street,
            number: customer.address?.number,
            zipcode: customer.address?.zip,
            city: customer.address?.city,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should find a customer by id", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customerWithAddress = new Customer({
            id: "1",
            name: "Customer 1",
            address,
            eventDispatcher,
        });
        await customerRepository.create(customerWithAddress);

        const foundCustomer = await customerRepository.find(
            customerWithAddress.id,
        );

        assertEquals(foundCustomer, customerWithAddress);

        const customerWithoutAddress = new Customer({
            id: "2",
            name: "Customer 2",
            eventDispatcher,
        });
        await customerRepository.create(customerWithoutAddress);

        const foundCustomerWithoutAddress = await customerRepository.find(
            customerWithoutAddress.id,
        );

        assertEquals(foundCustomerWithoutAddress, customerWithoutAddress);
    });

    it("should throw an error if could not find a customer", async () => {
        const address = new Address("Street", "47", "64124", "Townsville");
        const customer = new Customer({
            id: "1",
            name: "Customer 1",
            address,
            eventDispatcher,
        });
        await customerRepository.create(customer);

        await assertRejects(
            () => customerRepository.find("2"),
            Error,
            "Customer not found",
        );
    });

    it("should find all the customers", async () => {
        const address1 = new Address("Street", "47", "64124", "Townsville");
        const customer1 = new Customer({
            id: "1",
            name: "Customer 1",
            address: address1,
            eventDispatcher,
        });
        await customerRepository.create(customer1);

        const address2 = new Address("Street", "47", "64124", "Townsville");
        const customer2 = new Customer({
            id: "2",
            name: "Customer 2",
            address: address2,
            eventDispatcher,
        });
        customer2.activate();
        await customerRepository.create(customer2);

        const customer3 = new Customer({
            id: "3",
            name: "Customer 3",
            eventDispatcher,
        });
        await customerRepository.create(customer3);

        const customers = await customerRepository.findAll();

        assertEquals(customers, [customer1, customer2, customer3]);
    });
});
