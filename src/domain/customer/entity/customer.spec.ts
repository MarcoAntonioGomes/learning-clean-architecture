import Address from "../value-object/address";
import Customer from "./costumer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Jonh");
    }).toThrowError("Customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Customer: Name is required");
  });

  it("should throw error when name and id are empty", () => {
    expect(() => {
      let customer = new Customer("", "");
    }).toThrowError("Customer: Name is required,Customer: Id is required");
  });

  it("should change name", () => {
    //Arrange
    let customer = new Customer("123", "Jonh");

    //Act
    customer.changeName("Jonh Doe");

    //Assert
    expect(customer).toHaveProperty("name", "Jonh Doe");
  });

  it("should activate name", () => {
    const customer = new Customer("1", "Customer 1");

    const address = new Address("Street 1", 111, "State 1", "City 1");

    customer.Address = address;

    customer.activate();

    expect(customer.isActived()).toBe(true);
  });

  it("should deactivate name", () => {
    const customer = new Customer("1", "Customer 1");

    customer.desactive();

    expect(customer.isActived()).toBe(false);
  });

  it("should  throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");

    expect(customer.getRewardPoints()).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.getRewardPoints()).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.getRewardPoints()).toBe(20);
  });
});
