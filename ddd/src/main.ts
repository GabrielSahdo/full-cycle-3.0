import Address from "./entity/address.ts";
import Customer from "./entity/customer.ts";
import Order from "./entity/order.ts";
import OrderItem from "./entity/order_item.ts";

const customer = new Customer("123", "Gabriel");
const address = new Address("Street", "123", "12345", "City");

customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "item1", 10);
const item2 = new OrderItem("2", "item2", 20);
const order = new Order("1", customer.id, [item1, item2]);
