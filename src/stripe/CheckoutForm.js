import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { element } from "prop-types"

export const CheckoutForm = () =>{
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const {error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if(!error){
      console.log("stripe_token :", paymentMethod);
      try{
        const { id } = paymentMethod;
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}stripe/charge`,{
              method:"POST",
              body: JSON.stringify({
                amount: 100,
                id: id,
              })
            })
            .then((response) => response.json())
            .then((payment) => {
                console.log("Successful payment");
              })
            .catch(error => console.error(error));
      }
      catch(error){
        console.log("ERROR:", error);
      }
    }else{
      console.log(error.message);
    }
  }

  return(
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement options={{hidePostalCode: true}}/>
      <button>Place order</button>
    </form>
  )
}
