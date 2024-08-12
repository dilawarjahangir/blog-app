import Image from "next/image";
import Link from "next/link";

const Card = ({id, title, price, category, thumbnail }) => {
  return (

      <div className="card" style={{ margin: "auto",width: "18rem" }} >
        <Image className="card-img-top" src={thumbnail} width={200} height={300} alt="pic" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{price}</p>
          <p className="card-text">{category}</p>
          <Link className="btn btn-primary" href={`blog/${id}`} > See details </Link>
        </div>
      </div>
    
  );
};

export default Card;
