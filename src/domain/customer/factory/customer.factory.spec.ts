import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("Jonh");
    expect(customer.getId()).toBeDefined();
    expect(customer.getName()).toBe("Jonh");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Street", 10, "352221212", "City 1");
    let customer = CustomerFactory.createWithAddress("Jonh", address);

    expect(customer.getId()).toBeDefined();
    expect(customer.getName()).toBe("Jonh");
    expect(customer.Address).toBe(address);
  });
});
