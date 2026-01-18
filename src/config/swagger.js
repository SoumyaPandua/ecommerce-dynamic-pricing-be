import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dynamic Pricing Engine API",
      version: "1.0.0",
      description:
        "Backend API for dynamic pricing engine (products, inventory, pricing, alerts)",
    },
    tags: [
      { name: "Products" },
      { name: "Inventory" },
      { name: "Pricing" },
      { name: "Analytics" },
      { name: "Alerts" },
    ],
    servers: [
      {
        url: "https://ecommerce-dynamic-pricing-be.onrender.com",
      },
    ],
  },
  apis: ["./src/modules/**/*.routes.js"], // IMPORTANT
});
