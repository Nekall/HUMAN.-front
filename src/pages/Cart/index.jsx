import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { v4 as uuidv4 } from "uuid";
import StripeContainer from "../../stripe/StripeContainer";

const Cart = () => {
  const {session} = useContext(SessionContext);
  const history = useHistory();
  if(!session){history.push("/")};
  let storageProducts = JSON.parse(localStorage.getItem("human.__cart"));
  let total = 0;
  //let date = new Date();
  //let time = ((date.getHours().toString()).length>1? date.getHours() : "0"+date.getHours()) +":"+ ((date.getMinutes().toString()).length>1? date.getMinutes() : "0"+date.getMinutes());
  /*let dotd =
    ((date.getDate().toString()).length>1? date.getDate() : "0"+date.getDate())
    +"/"+
    (((date.getMonth()+1).toString()).length>1? (date.getMonth()+1) : "0"+(date.getMonth()+1))
    +"/"+
    date.getFullYear();
  */
    let userId = localStorage.getItem("human.__userId");
    const [userData, setUserData] = useState();

  const removeProduct = (productId, id) => {
    let products = storageProducts.filter(product => product.id !== productId);
    localStorage.setItem("human.__cart", JSON.stringify(products));
    document.getElementById(id).remove();
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
  }, [userId])

//return
  if(storageProducts.length === 0){
    return(
      <div className="container">
        <div className="cart">
          <div className="ticket">
          <p>{("*").repeat(55)}</p>
          <p>*{(" ").repeat(36)}<span className="bold">HUMAN.</span>{(" ").repeat(36)}  *</p>
          <p>*{(" ").repeat(26)}Clothing for humans.{(" ").repeat(26)}*</p>
          <p>{("*").repeat(55)}</p>
          <p>*{(" ").repeat(28)}Details of your cart{(" ").repeat(28)}*</p>
          <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
          <p>*     Names of the products     |   Quantity   | Price *</p>
          <p>* -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - *</p>
          <p>*{(" ").repeat(90)}*</p>
          <p>*{(" ").repeat(90)}*</p>
          <p>*{(" ").repeat(90)}*</p>
          <p>*                           Your cart is empty.                              *</p>
          <p>*{(" ").repeat(90)}*</p>
          <p>*{(" ").repeat(90)}*</p>
          <p>*{(" ").repeat(90)}*</p>
          <p>{("*").repeat(55)}</p>
          <p>*    TVA included                           TOTAL    |        0€    *</p>
          <p>{("*").repeat(55)}</p>
          </div>
        </div>
      </div>
    )
  }else{
    return(
      <div className="container">
        <div className="cart">
          <div className="ticket">
            <p>{("*").repeat(55)}</p>
            <p>*{(" ").repeat(38)}<span className="bold">HUMAN.</span>{(" ").repeat(38)}*</p>
            <p>*{(" ").repeat(27)}Clothing for humans.{(" ").repeat(27)}*</p>
            <p>{("*").repeat(55)}</p>
            <p>*{(" ").repeat(29)}Details of your cart{(" ").repeat(29)}*</p>
            <p>*{(" - ").repeat(28)}*</p>
            <p>*   Names of the products  | Size |   Quantity   |   Price   *</p>
            <p>*{(" - ").repeat(28)}*</p>
            {storageProducts.map((product, index) => {
              total += product.price;
              return(<p key={uuidv4()} id={`item-${index}`}>*        {product.name}            |    {product.size}     |      x{product.quantity} |     {product.price} €    <button onClick={()=> removeProduct(product.id, `item-${index}`)}>✕</button> *</p>)
            })}
            <p>*{(" ").repeat(90)}*</p>
            <p>*{(" ").repeat(90)}*</p>
            <p>{("*").repeat(55)}</p>
            <p>*    TVA included                           <span className="bold">TOTAL</span>    |      {total.toFixed(2)}€    *</p>
            <p>{("*").repeat(55)}</p>
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
                <Link className="" to="/profile/edit">Edit your informations</Link>
              </div>
            :""}
            <p>―</p>
          </div>
          <div className="center">
            <StripeContainer total={total.toFixed(2)} user={userData}/>
          </div>
        </div>
      </div>
    )
  }
};
export default Cart;
