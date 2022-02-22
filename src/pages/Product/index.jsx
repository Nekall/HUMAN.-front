import { Link, useParams } from "react-router-dom";
import React, {useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from "uuid";
import { SessionContext } from "../../context/SessionContext";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const {session} = useContext(SessionContext);

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
      let actualCart = []
      if(localStorage.getItem("human.__cart")){
          actualCart = JSON.parse(localStorage.getItem("human.__cart"));
      }
      actualCart.push({'name' : product.data.name, 'quantity' : quantity, 'price' : product.data.price, 'size' : size, 'reference' : product.data.reference });
      localStorage.setItem("human.__cart", JSON.stringify(actualCart));
    }

  return(
    <div className="updateCart">
      {product?
        <>
          <h2>{product.data.name}</h2>
          <p>{product.data.price} €</p>
          {product.data.quantity<1 ? <p className="bold">Out of stock</p> : <p>In stock</p>}
          <p>Color :{product.data.colors}</p>
          <p>Composition :{product.data.composition}</p>
          <p>Description :{product.data.description}</p>
          <form onSubmit={updateCart}>
            <div>
              <select name="sizes" id="sizes-select" onChange={(e) => setSize(e.target.value)}>
                  <option value="">Choose a size</option>
                  {product.data.sizes.split(",").map((size) => {
                      return (<option key={uuidv4()} value={size}>{size}</option>)
                    })}
              </select>
            </div>
            {session?
              (product.data.quantity<1?
                <input className="btn-add-cart" type="submit" value="Submit" value="Add to cart" disabled/>
                :
                <div>
                  <div><input id="number" type="number" min="1" max={product.data.quantity} onChange={(e) => setQuantity(e.target.value)} required/></div>
                  <div><input className="btn-add-cart" type="submit" value="Submit" value="Add to cart"/></div>
                </div>)
                 : <span>To add this product to your cart : <Link className="" to="/login">Login</Link> or <Link className="" to="/signup">Signup</Link></span>}
          </form>
          <p>Details & Care :{product.data.care}</p>
          <p>Reference :{product.data.reference}</p>
        </>
        :
        <p>Loading. . .</p>
      }
    </div>
)};
export default Product;
