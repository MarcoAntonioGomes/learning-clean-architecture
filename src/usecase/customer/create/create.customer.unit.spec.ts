import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "Customer 1",
  address: {
    street: "Street 1",
    number: 1,
    zipCode: "Zipcode 1",
    city: "City 1",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipCode: input.address.zipCode,
        city: input.address.city,
      },
    });
  });

  it("should throw an error when nam is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });
});
