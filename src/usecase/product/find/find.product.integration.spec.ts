import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/produtc/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/produtc/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import FindProductUseCase from "./find.product.usecase";

describe("Integration Test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const createUseCase = new CreateProductUseCase(productRepository);

    const productCreated = await createUseCase.execute({
      name: "Product 1",
      price: 1,
    });

    const findUserCase = new FindProductUseCase(productRepository);

    const productFound = await findUserCase.execute({ id: productCreated.id });

    expect(productFound).toEqual(productCreated);
  });
});
