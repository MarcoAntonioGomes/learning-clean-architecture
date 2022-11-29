import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street 1", 1, "Zipcode 1", "City 1")
);

const input = {
  id: customer.getId(),
  name: "Jonh Updated",
  address: {
    street: "Street 1 Updated",
    number: 123,
    zipCode: "Zipcode 1 Updated",
    city: "City 1 Updated",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipCode: input.address.zipCode,
        city: input.address.city,
      },
    });
  });
});
