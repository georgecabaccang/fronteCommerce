import { Link } from "react-router-dom";
import styles from "../../styles/item.module.css";

interface Iitems {
    product: IProductProperties;
}

export default function Product(props: Iitems) {
    const item = props.product;

    return (
        <Link
            to={`/shop/product/${item._id}`}
            className={`${styles.card} grid grid-cols-1 p-2`}
        >
            <div className="flex place-content-center">
                <img src={item.image} className="max-h-[10em] min-h-[10em]" />
            </div>
            <div className="pt-2">
                <h3>{item.productName}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}
