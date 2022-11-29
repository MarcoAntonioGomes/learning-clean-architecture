import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/produtc/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/produtc/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usercase";

describe("Integration Test list product use case", () => {
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

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const listUseCase = new ListProductUseCase(productRepository);

    const createProductUseCase = new CreateProductUseCase(productRepository);

    const product1 = await createProductUseCase.execute({
      name: "Product 1",
      price: 1,
    });
    const product2 = await createProductUseCase.execute({
      name: "Product 2",
      price: 2,
    });

    const products = await listUseCase.execute({});

    expect(products.products).toEqual([product1, product2]);
  });
});
