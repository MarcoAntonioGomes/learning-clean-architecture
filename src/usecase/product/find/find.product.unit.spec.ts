import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product A", 1);

const input = {
  id: product.getId(),
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: product.getName(),
      price: product.getPrice(),
    });
  });

  it("should throw an error when product not found", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    await expect(useCase.execute(input)).rejects.toThrow("Product not found");
  });
});
