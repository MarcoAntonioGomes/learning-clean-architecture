import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderModel from "./order.model";

import OrderItemModel from "./order_item.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.getId(),
        customer_id: entity.getCustomerId(),
        total: entity.getTotal(),
        items: entity.getItems().map((item) => ({
          id: item.getId(),
          name: item.getName(),
          price: item.getPrice(),
          product_id: item.getProductId(),
          quantity: item.getQuantity(),
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        total: entity.getTotal(),
        customer_id: entity.getCustomerId(),
        items: entity.getItems().map((item) => ({
          id: item.getId(),
          name: item.getName(),
          price: item.getPrice(),
          product_id: item.getProductId(),
          quantity: item.getQuantity(),
        })),
      },
      {
        where: { id: entity.getId() },
      }
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: ["items"],
      rejectOnEmpty: true,
    });

    const orderItem = orderModel.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      );
    });

    return new Order(orderModel.id, orderModel.customer_id, orderItem);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    const orders = orderModels.map((orderModel) => {
      const orderItem = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      });

      return new Order(orderModel.id, orderModel.customer_id, orderItem);
    });

    return orders;
  }
}
