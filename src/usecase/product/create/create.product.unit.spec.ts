import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 1,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when nam is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateProductUseCase(customerRepository);

    input.name = "";

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });
});
