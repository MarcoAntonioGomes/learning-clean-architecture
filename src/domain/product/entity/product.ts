import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private name: string;
  private price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): boolean {
    if (this.id.length === 0) {
      this.notification.addError({
        context: "Product",
        message: "Id is required",
      });
    }
    if (this.name.length === 0) {
      this.notification.addError({
        context: "Product",
        message: "Name is required",
      });
    }
    if (this.price === 0) {
      this.notification.addError({
        context: "Product",
        message: "price is required",
      });
    }
    if (this.price < 0) {
      this.notification.addError({
        context: "Product",
        message: "Price must be greater than zero",
      });
    }

    return true;
  }

  getId(): string {
    return this.id;
  }

  changePrice(price: number) {
    this.price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }

  changeName(name: string) {
    this.name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
