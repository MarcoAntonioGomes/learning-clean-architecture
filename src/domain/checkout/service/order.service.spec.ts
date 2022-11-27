import Customer from "../../customer/entity/costumer";
import Order from "../entity/order";

import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit test", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.getRewardPoints()).toBe(5);
    expect(order.getTotal()).toBe(10);
  });

  it("shuold get total of all orders", () => {
    const orderItem = new OrderItem("i1", "Product 1", 100, "p1", 2);
    const orderItem2 = new OrderItem("i2", "Product 2", 200, "p2", 1);

    const order = new Order("o1", "c1", [orderItem, orderItem2]);
    const order2 = new Order("o2", "c2", [orderItem, orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(800);
  });
});
