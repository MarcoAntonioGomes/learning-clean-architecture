export default class Address {
  private street: string = "";
  private number: number = 0;
  private zipCode: string = "";
  private city: string = "";

  constructor(street: string, number: number, zipCode: string, city: string) {
    this.street = street;
    this.number = number;
    this.zipCode = zipCode;
    this.city = city;

    this.validate();
  }

  validate() {
    if (this.street.length === 0) {
      throw new Error("Street is required");
    }
    if (this.number === 0) {
      throw new Error("Number is required");
    }
    if (this.zipCode.length === 0) {
      throw new Error("Zip is required");
    }
    if (this.city.length === 0) {
      throw new Error("City is required");
    }
  }

  getStreet(): string {
    return this.street;
  }

  getNumber(): number {
    return this.number;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  getCity(): string {
    return this.city;
  }

  toString() {
    return `${this.street}, ${this.number}, ${this.zipCode} ${this.city}`;
  }
}
