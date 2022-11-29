import { v4 as uuidv4 } from "uuid";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zipCode,
        input.address.city
      )
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.getId(),
      name: customer.getName(),
      address: {
        street: customer.Address.getStreet(),
        number: customer.Address.getNumber(),
        zipCode: customer.Address.getZipCode(),
        city: customer.Address.getCity(),
      },
    };
  }
}
