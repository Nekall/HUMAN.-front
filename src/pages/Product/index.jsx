import { useParams } from "react-router-dom";

const Product = () => {

  const params = useParams();

  return(
    <div className="container">
      <h1>Product</h1>
      <p>{params.slug}</p>
    </div>
)};
export default Product;
