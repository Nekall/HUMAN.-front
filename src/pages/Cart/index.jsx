import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { v4 as uuidv4 } from "uuid";
import StripeContainer from "../../stripe/StripeContainer";

const Cart = () => {
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
    let userId = localStorage.getItem("human.__userId");
    const [userData, setUserData] = useState();

  const removeProduct = (productRef) => {
    let products = storageProducts.filter(product => product.productRef !== productRef );
    localStorage.setItem("human.__cart", JSON.stringify(products));
  }

  const handleSubmit = async (e) =>{
    console.log("handleP");
    e.preventDefault();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}user/${userId}`,{
      method:"GET",
    })
    .then((response) => response.json())
    .then((user) => {
        setUserData(user);
      })
    .catch(err => console.error(err));
  }, [])

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
          <hr/>
          <div className="center-text">
          <h2>Billing informations</h2>
            {userData?
              <div>
                <p>{userData.data.firstName} {userData.data.lastName}</p>
                <p>{userData.data.email}</p>
                <p>{userData.data.streetAddress}</p>
                <p>{userData.data.city} {userData.data.zipCode}</p>
                <p>{userData.data.state}</p>
                <p>{userData.data.country}</p>
                <p>{userData.data.phone}</p>
                <Link className="" to="/profile/modify">Edit your informations</Link>
              </div>
            :""}
            <p>―</p>
          </div>
          <div className="center">
            <StripeContainer total={total} user={userData}/>
          </div>
        </div>
      </div>
    )
  }
};
export default Cart;
