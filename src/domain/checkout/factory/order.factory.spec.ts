import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
  it("should create an order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Product 1",
          productId: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);
    expect(order.getId()).toBe(orderProps.id);
    expect(order.getCustomerId()).toBe(orderProps.customerId);
    expect(order.getItems().length).toBe(1);
  });
});
