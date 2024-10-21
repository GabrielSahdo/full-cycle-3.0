import Address from "./entity/address.ts";
import Customer from "./entity/customer.ts";
import Order from "./entity/order.ts";
import OrderItem from "./entity/order_item.ts";

const customer = new Customer("123", "Gabriel");
const address = new Address("Street", "123", "12345", "City");

customer.setAddress(address);
customer.activate();
