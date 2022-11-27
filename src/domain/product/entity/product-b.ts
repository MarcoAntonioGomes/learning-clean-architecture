import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {
  private id: string;
  private name: string;
  private price: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.validate();
  }

  validate(): boolean {
    if (this.id.length === 0) {
      throw new Error("Id is required");
    }
    if (this.name.length === 0) {
      throw new Error("Name is required");
    }
    if (this.price === 0) {
      throw new Error("Price is required");
    }
    if (this.price < 0) {
      throw new Error("Price must be greater than zero");
    }

    return true;
  }

  getId(): string {
    return this.id;
  }

  changePrice(price: number) {
    this.price = price;
    this.validate();
  }

  getPrice(): number {
    return this.price * 2;
  }

  getName(): string {
    return this.name;
  }

  changeName(name: string) {
    this.name = name;
    this.validate();
  }
}
