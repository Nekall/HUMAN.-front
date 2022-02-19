import { useParams } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";

const Product = () => {
  const params = useParams();
  const [Product, SetProduct] = useState();

  let isConnected = localStorage.getItem("human.__session"); //desactivate "add to cart" if not connected

  useEffect(() => {
    fetch(`http://localhost:3000/product/${params.id}`,{
      method:"GET",
    })
    .then((response) => response.json())
    .then((product) => {
      SetProduct(product);
      })
    .catch(err => console.error(err));
  }, [params.id])


  return(
    <div className="container">
      {Product?
        <>
          <h2>{Product.data.name}</h2>
          <p>{Product.data.price} €</p>
          {Product.data.quantity<1 ? <p>Out of stock</p> : <p>In stock</p>}
          <p>{Product.data.description}</p>
          <form>
            <div>
              <select name="sizes" id="sizes-select">
                  <option value="">Choose a size</option>
                  {Product.data.sizes.split(",").map((size) => {
                      return (<option key={uuidv4()} value={size}>{size}</option>)
                    })}
              </select>
            </div>
            <div>
              <select name="colors" id="colors-select">
                  <option value="">Choose a color</option>
                  {Product.data.colors.split(",").map((color) => {
                      return (<option key={uuidv4()} value={color}>{color}</option>)
                    })}
              </select>
            </div>
            <input className="btn-add-cart" type="submit" value="Submit" value="Add to cart"/>
          </form>
          <p>{Product.data.care}</p>
          <p>{Product.data.composition}</p>
        </>
        :
        <p>Chargement. . .</p>
      }
    </div>
)};
export default Product;
