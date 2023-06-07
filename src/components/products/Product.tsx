import { Link } from "react-router-dom";
import styles from "../../styles/product.module.css";
import { IProductProperties } from "../../types/productTypes";

interface IProdcuts {
    product: IProductProperties;
    isSeller: boolean;
    user_id?: string;
}

export default function Product(props: IProdcuts) {
    const product = props.product;
    const user_id = props.user_id;
    const prod_id = product._id;

    return (
        <Link
            to={
                props.isSeller
                    ? `/user/${user_id}/my-products/${prod_id}/update`
                    : `/shop/product/${prod_id}`
            }
            className={`${styles.card} grid grid-cols-1 p-2`}
        >
            <div className="flex place-content-center">
                <img src={product.image} className="max-h-[10em] min-h-[10em]" />
            </div>
            <div className="pt-2">
                <h3>{product.productName}</h3>
                <p>Price: ${product.price && product.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}
