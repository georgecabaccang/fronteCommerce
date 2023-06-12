import { Link } from "react-router-dom";
import styles from "../../styles/product.module.css";

interface IProdcutDetails {
    product: {
        _id: string;
        image: string;
        productName: string;
        description: string;
        price: number;
        discount: number;
        discountedPrice: number;
        stock: number;
        salesCount: number;
        postedBy: string;
    };

    // For seller updating their product
    isSeller?: boolean;
    user_id?: string;
}

export default function Product(props: IProdcutDetails) {
    const product = props.product;
    const user_id = props.user_id;
    const prod_id = product._id;

    let isSellerOfProduct: boolean = false;
    if (user_id) {
        isSellerOfProduct = product.postedBy === user_id;
    }

    return (
        <Link
            to={
                isSellerOfProduct
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
