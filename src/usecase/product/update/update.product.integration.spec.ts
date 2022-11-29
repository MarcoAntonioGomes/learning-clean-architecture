import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/produtc/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/produtc/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const createUseCase = new CreateProductUseCase(productRepository);

    const productCreated = await createUseCase.execute({
      name: "Product 1",
      price: 1,
    });

    const updateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: productCreated.id,
      name: "Product 2",
      price: 2,
    };

    const output = await updateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
