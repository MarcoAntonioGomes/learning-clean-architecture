export default class OrderItem {
  private id: string;
  private name: string;
  private price: number;
  private productId: string;
  private quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.productId = productId;
    this.quantity = quantity;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPrice(): number {
    return this.price;
  }

  orderItemTotal(): number {
    return this.price * this.quantity;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getProductId(): string {
    return this.productId;
  }
}
