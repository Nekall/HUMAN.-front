import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//import { element } from "prop-types"
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

export const CheckoutForm = (props) =>{
  //console.log("check:", props);
  //console.log(props.props);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const alert = useAlert();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const {error, paymentMethod } = await stripe.createPaymentMethod({
      billing_details: {
        address: {
          city: props.props.user.data.city,
          postal_code: props.props.user.data.zipCode,
          state: props.props.user.data.state
        },
        name: props.props.user.data.lastName,
        phone: props.props.user.data.phone,
        email: props.props.user.data.email,
      },
      type: "card",
      card: elements.getElement(CardElement),
    });
    if(!error){
      console.log("stripe_token :", paymentMethod);
      try{
        const { id } = paymentMethod;
        await fetch(`${process.env.REACT_APP_DOMAIN}stripe/charge`,{
              method:"POST",
              body: JSON.stringify({
                amount: props.props.total,
                id: id,
              })
            })
            .then((response) => response.json())
            .then((payment) => {
                console.log("Successful payment");
                alert.success("");
                history.push("/cart/success");
                //And save in CARTS BDD
              })
            .catch((error) => {
              alert.error(error);
              console.error(error)
            });
      }
      catch(error){
        console.log(error);
      }
    }else{
      console.log(error.message);
    }
  }

  return(
    <form onSubmit={handleSubmit} style={{ minWidth: 335 }}>
      <CardElement options={{hidePostalCode: true}}/>
      <button className="stylized-btn">Place order</button>
    </form>
  )
}
