import { Link } from "react-router-dom";
import styles from "../styles/item.module.css";

interface Iitems {
    item: ItemProperties;
}

export default function Item(props: Iitems) {
    const item = props.item;

    return (
        <Link
            to={`/shop/item/${item.id}`}
            className={`${styles.card} grid grid-cols-1 p-2`}
        >
            <div className="flex place-content-center">
                <img src={item.image} className="max-h-[10em] min-h-[10em]" />
            </div>
            <div className="pt-2">
                <h3>{item.itemName}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}
