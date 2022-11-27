import { v4 as uuid } from "uuid";
import Customer from "../../customer/entity/costumer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {
  static total(orders: Order[]) {
    let total = 0;
    orders.forEach((order) => {
      total += order.getTotal();
    });
    return total;
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order(uuid(), customer.getId(), items);
    customer.addRewardPoints(order.getTotal() / 2);
    return order;
  }
}
