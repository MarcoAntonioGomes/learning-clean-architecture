import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usercase";

const product1 = ProductFactory.create("a", "Product A", 1);
const product2 = ProductFactory.create("b", "Product B", 2);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test list product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();

    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.getId());
    expect(output.products[0].name).toBe(product1.getName());
    expect(output.products[0].price).toBe(product1.getPrice());

    expect(output.products[1].id).toBe(product2.getId());
    expect(output.products[1].name).toBe(product2.getName());
    expect(output.products[1].price).toBe(product2.getPrice());
  });
});
