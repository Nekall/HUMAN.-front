import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Cards = (props) => {

return (
  <div className="cards">
    {props.props.map((products) => (
      <div className="card" key={uuidv4()}>
        <Link className="card-link" to={`/product/${products.slug}/${products.id}`}>
          <p>{products.name}</p>
          <p>{products.price} €</p>
        </Link>
      </div>
    ))}
  </div>
)};

export default Cards;
