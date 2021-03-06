import { Link, useParams } from "react-router-dom";
import React, {useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from "uuid";
import { SessionContext } from "../../context/SessionContext";
import { useAlert } from "react-alert";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState();
  //const [quantity, setQuantity] = useState();
  let quantity = 1;
  const [size, setSize] = useState();
  const {session} = useContext(SessionContext);
  const alert = useAlert();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}product/${params.id}`,{
      method:"GET",
    })
    .then((response) => response.json())
    .then((product) => {
      setProduct(product);
      })
    .catch(err => console.error(err));
  }, [params.id])

    const updateCart = (e) => {
      alert.success("Article added to your cart");
      let actualCart = []
      if(localStorage.getItem("human.__cart")){
          actualCart = JSON.parse(localStorage.getItem("human.__cart"));
      }
      actualCart.push({id: uuidv4(),'name' : product.data.name, 'quantity' : quantity, 'price' : product.data.price, 'size' : size, 'reference' : product.data.reference });
      localStorage.setItem("human.__cart", JSON.stringify(actualCart));
    }

    const choseSize = (value, id) => {
      let sizesBtn = document.getElementsByClassName("size-btn");
      for(let i = 0; i < sizesBtn.length; i++){
        sizesBtn[i].classList.remove("active");
      }
      document.getElementById(id).classList.add("active");
      React.setSize(value);
    }


  return(
    <div className="container product-page">
      <div className="photos-product"></div>
      <div className="updateCart">
        {product?
          <>
            <h2>{product.data.name}</h2>
            <p>{product.data.price} €</p>
            {product.data.quantity<1 ? <p className="bold">Out of stock</p> : <p>In stock</p>}
            <p>Color : {product.data.colors}</p>
            <p>Composition : {product.data.composition}</p>
            <p>Description : {product.data.description}</p>
            <div>
            {product.data.sizes.split(",").map((size, index) => {
                return (<button className="stylized-btn size-btn" id={`size-${index}`} onClick={(e)=> choseSize(e.target.value, `size-${index}`)} key={uuidv4()} value={size}>{size}</button>)
              })}
            </div>
            {session?
              (product.data.quantity<1?
                <input className="btn-add-cart stylized-btn" type="submit" value="Submit" value="Add to cart" disabled/>
                :
                <div>
                  {/*<div><input id="number" type="number" min="1" max={product.data.quantity} onChange={(e) => setQuantity(e.target.value)} required/></div>*/}
                  <div><button onClick={()=>updateCart()} className="btn-add-cart stylized-btn" type="submit" value="Submit">Add one to cart</button></div>
                </div>)
                 : <span>To add this product to your cart : <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link></span>}
            <p>Details & Care : {product.data.care}</p>
            <p>Reference : {product.data.reference}</p>
          </>
          :
          <p>Loading. . .</p>
        }
      </div>
    </div>
)};
export default Product;
