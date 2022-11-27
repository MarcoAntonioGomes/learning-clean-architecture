import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("p1", "Product 1", 100);
    const product2 = new Product("p2", "Product 2", 200);

    let products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.getPrice()).toBe(200);
    expect(product2.getPrice()).toBe(400);
  });
});
