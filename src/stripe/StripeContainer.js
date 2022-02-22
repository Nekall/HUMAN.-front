import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const stripeTestPromise = loadStripe(process.env.REACT_APP_PK_STRIPE);

const Stripe = () => {
  return(
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default Stripe;
