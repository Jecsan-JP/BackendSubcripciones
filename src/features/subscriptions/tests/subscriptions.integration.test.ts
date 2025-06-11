import request from "supertest";
import { createExpressApp } from "../../../common/config/express";
import dotenv from "dotenv";
import { connectDB } from "../../../common/config/database";
jest.setTimeout(20000);
dotenv.config();

const app = createExpressApp();

beforeAll(async () => {
  await connectDB();
});

describe("Integración Stripe - Suscripciones", () => {
  let customerId: string;

  it("Crea una sesión de checkout y devuelve customerId y url", async () => {
    const res = await request(app)
      .post("/api/subscriptions/checkout-session")
      .send({
        name: "Jecsan Ortega",
        email: `jeck@jeck.com`,
        priceId: "price_1RYJ7c2QypCxhenCgpYTvnag", // Usa tu priceId real
        successUrl: "http://localhost:3000/success",
        cancelUrl: "http://localhost:3000/cancel",
      });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("customerId");
    expect(res.body.data).toHaveProperty("url");
    expect(res.body.data.url).toContain("https://checkout.stripe.com");

    customerId = res.body.data.customerId;
  });

  it("Consulta el estado de la suscripción del customer", async () => {
    const res = await request(app).get(
      `/api/subscriptions/status/${customerId}`
    );

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("email");
    expect(res.body.data).toHaveProperty("status");
  });
});
