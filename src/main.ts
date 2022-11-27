import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/costumer";
import Order from "./domain/checkout/entity/order";
import Address from "./domain/customer/value-object/address";

let customer = new Customer("123", "Marco Antonio");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 10);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 10);
const order = new Order("1", "123", [item1, item2]);