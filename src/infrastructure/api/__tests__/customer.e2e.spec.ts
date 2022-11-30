import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test customer api", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Jonh",
        address: {
          street: "Street 1",
          city: "City 1",
          number: 123,
          zipCode: "12345222",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Jonh");
    expect(response.body.address.street).toBe("Street 1");
    expect(response.body.address.city).toBe("City 1");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zipCode).toBe("12345222");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "Jonh",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Jonh",
        address: {
          street: "Street 1",
          city: "City 1",
          number: 123,
          zipCode: "12345222",
        },
      });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane",
        address: {
          street: "Street 2",
          city: "City 2",
          number: 1234,
          zipCode: "123452222",
        },
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe("Jonh");
    expect(customer.address.street).toBe("Street 1");

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("Jane");
    expect(customer2.address.street).toBe("Street 2");
  });
});
