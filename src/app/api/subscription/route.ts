import stripeClient from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const publicDomain = process.env.NEXT_PUBLIC_DOMAIN;

    const { email, userId, priceId, fullName } = await req.json();

    const isExistingCustomer = await stripeClient.customers.list({ email });

    let customer;

    if (isExistingCustomer.data.length) {
      customer = isExistingCustomer.data[0];
    }

    if (!customer) {
      customer = await stripeClient.customers.create({
        email,
        name: fullName,
        metadata: { userId },
      });
    }

    const subscriptions = await stripeClient.subscriptions.list({
      customer: customer.id,
    });

    const isSubscribed = subscriptions.data.find(
      (sub) => sub.status === "active"
    );

    if (isSubscribed) {
      const portal = await stripeClient.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${publicDomain}`,
      });

      return NextResponse.json(portal.url);
    } else {
      const subscription = await stripeClient.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        customer: customer.id,
        success_url: `${publicDomain}`,
        cancel_url: `${publicDomain}`,
      });

      return NextResponse.json(subscription.url);
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = await new URL(req.url);
    const email = searchParams.get("email");

    const customers = await stripeClient.customers.list({ email: email! });

    if (!customers.data.length) return NextResponse.json("Basic");

    const subscriptions = await stripeClient.subscriptions.list({
      customer: customers.data[0].id,
    });

    if (!subscriptions.data.length) return NextResponse.json("Basic");

    return NextResponse.json("Pro");
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
