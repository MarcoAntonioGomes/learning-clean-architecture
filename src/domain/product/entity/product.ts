import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
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

  validate() {
    ProductValidatorFactory.create().validate(this);
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
