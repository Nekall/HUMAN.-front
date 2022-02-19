import { useParams } from "react-router-dom";
import React, {useState, useEffect} from 'react';

const Product = () => {
  const params = useParams();
  const [Product, SetProduct] = useState()

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

  if(Product){
    console.log(Product.data.colors);
  }

  return(
    <div className="container">
      {Product?
        <>
          <h2>{Product.data.name}</h2>
          <p>{Product.data.price} €</p>
          <p>{Product.data.sizes}</p>
          <select name="sizes" id="sizes-select">
              <option value="">Choose a size</option>
              <option value="s">S</option>
              <option value="m">M</option>
          </select>
          {Product.data.quantity<1 ? <p>Out of stock</p> : <p>In stock</p>}
          <p>{Product.data.description}</p>
          <p>{Product.data.colors}</p>
          <select name="colors" id="colors-select">
              <option value="">Choose a color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
          </select>
          <p>{Product.data.care}</p>
          <p>{Product.data.composition}</p>
          <button className="btn-add-cart" type="button">Add to cart</button>
        </>
        :
        <p>Chargement. . .</p>
      }
    </div>
)};
export default Product;
