import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "~/server/db";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "94250cfa-b045-4ff4-8916-7f238fdc7e10",
              slug: "small",
            },
            {
              productId: "c0ee31b4-a938-41f6-bb3e-c5dd405cec17",
              slug: "medium",
            },
            {
              productId: "2ce58b61-6d7e-4aef-83f1-b3cb37fc22ed",
              slug: "large",
            },
          ],
          successUrl: "/",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;
            if (!externalCustomerId) {
              console.error("No external customer ID found for order");
              throw new Error("No external customer ID found");
            }

            const productId = order.data.productId;
            let creditsToAdd = 0;

            switch (productId) {
              case "94250cfa-b045-4ff4-8916-7f238fdc7e10": // small
                creditsToAdd = 10;
                break;
              case "c0ee31b4-a938-41f6-bb3e-c5dd405cec17": // medium
                creditsToAdd = 25;
                break;
              case "2ce58b61-6d7e-4aef-83f1-b3cb37fc22ed": // large
                creditsToAdd = 50;
                break;
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});
