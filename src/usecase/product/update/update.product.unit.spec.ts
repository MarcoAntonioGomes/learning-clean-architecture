import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product A", 1);

const input = {
  id: product.getId(),
  name: "Product A Updated",
  price: 2,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when nam is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateProductUseCase(customerRepository);

    input.name = "";

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });
});
