import React, {useState, useEffect} from 'react';
import Card from "components/Card";

const Shop = () => {
  const [AllProducts, SetAllProducts] = useState()

  useEffect(() => {
    fetch("http://localhost:3000/products",{
      method:"GET",
    })
    .then((response) => response.json())
    .then((products) => {
      SetAllProducts(products.data);
      })
    .catch(err => console.error(err));
  }, [])

return(
  <div className="container">
    <h1>Shop</h1>
    {AllProducts? <Card props={AllProducts}/> : <p>Chargement. . . </p>}
  </div>
)};
export default Shop;
