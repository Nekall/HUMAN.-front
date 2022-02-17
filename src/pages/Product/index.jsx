import { useParams } from "react-router-dom";

const Product = () => {

  const params = useParams();

  return(
    <>
      <h1>Product</h1>
      <p>{params.slug}</p>
    </>
)};
export default Product;
