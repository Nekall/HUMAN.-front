import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { v4 as uuidv4 } from "uuid";
import StripeContainer from "../../stripe/StripeContainer";

const Cart = (props) => {
  const {session} = useContext(SessionContext);
  if(!session){history.push("/")};
  const history = useHistory();
  let storageProducts = JSON.parse(localStorage.getItem("human.__cart"));
  let total = 0;
  let date = new Date();
  let time = ((date.getHours().toString()).length>1? date.getHours() : "0"+date.getHours()) +":"+ ((date.getMinutes().toString()).length>1? date.getMinutes() : "0"+date.getMinutes());
  let dotd =
    ((date.getDate().toString()).length>1? date.getDate() : "0"+date.getDate())
    +"/"+
    (((date.getMonth()+1).toString()).length>1? (date.getMonth()+1) : "0"+(date.getMonth()+1))
    +"/"+
    date.getFullYear();

  const removeProduct = (productRef) => {
    let products = storageProducts.filter(product => product.productRef !== productRef );
    localStorage.setItem("human.__cart", JSON.stringify(products));
  }

  const handleSubmit = async (e) =>{
    console.log("handleP");
    e.preventDefault();
  }

//return
  if(storageProducts.length === 0){
    return(

      <div className="container">
        <div className="cart">
          <div className="ticket">
          <p>*******************************************************</p>
          <p>*                                    <span className="bold">HUMAN.</span>                                      *</p>
          <p>*                         Clothing for humans.                           *</p>
          <p>*******************************************************</p>
          <p>*                           Details of your cart                              *</p>
          <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
          <p>*       Names of the products     |   Quantity   |   Price   *</p>
          <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
          <p>*                                                                                          *</p>
          <p>*                                                                                          *</p>
          <p>*                                                                                          *</p>
          <p>*                           Your cart is empty.                              *</p>
          <p>*                                                                                          *</p>
          <p>*                                                                                          *</p>
          <p>*                                                                                          *</p>
          <p>*******************************************************</p>
          <p>*    TVA included                           TOTAL    |        0€    *</p>
          <p>*******************************************************</p>
          </div>
        </div>
      </div>
    )
  }else{
    return(
      <div className="container">
        <div className="cart">
          <div className="ticket">
            <p>*******************************************************</p>
            <p>*                                    <span className="bold">HUMAN.</span>                                      *</p>
            <p>*                         Clothing for humans.                           *</p>
            <p>*******************************************************</p>
            <p>*                           Details of your cart                              *</p>
            <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
            <p>*   Names of the products  | Size |   Quantity   |   Price   *</p>
            <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
            {storageProducts.map((product) => {
              total += product.price;
              return(<p key={uuidv4()} >*        {product.name}            |    {product.size}     |      x{product.quantity} |     {product.price} €       *</p>)
            })}
            <p>*                                                                                          *</p>
            <p>*                                                                                          *</p>
            <p>*******************************************************</p>
            <p>*    TVA included                           <span className="bold">TOTAL</span>    |      {total}€    *</p>
            <p>*******************************************************</p>
          </div>
          <div>
            <StripeContainer/>
          </div>
        </div>
      </div>
    )
  }

};
export default Cart;
