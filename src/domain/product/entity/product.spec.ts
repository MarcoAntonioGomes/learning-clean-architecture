import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("p1", "", 100);
    }).toThrowError("Product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("p1", "Product 1", -1);
    }).toThrowError("Product: Price must be greater than zero");
  });

  it("should throw error when price is less than zero and name is invalid", () => {
    expect(() => {
      const product = new Product("p1", "", -1);
    }).toThrowError(
      "Product: Name is required,Product: Price must be greater than zero"
    );
  });

  it("should  change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");

    expect(product.getName()).toBe("Product 2");
  });

  it("should  change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);

    expect(product.getPrice()).toBe(150);
  });
});
