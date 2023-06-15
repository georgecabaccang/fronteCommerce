import { Link } from "react-router-dom";
import Button from "../shared/Button";
import useDecryptUser from "../../hooks/useDecryptUser";

interface IProduct {
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
}

export default function MyProduct(props: IProduct) {
    const { userDetails } = useDecryptUser();

    const product = props.product;

    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className="border grid grid-cols-9 py-4 mx-10 my-5 shadow-sm rounded">
            <div className="flex place-content-center col-span-2 p-3">
                <img src={product?.image} className="max-h-[10em] min-h-[10em]" />
            </div>

            <div className="col-span-2 my-4">
                <h3 className="font-semibold mb-1 truncate">{product?.productName}</h3>
                <div className="text-[1em]">Price: {currencyFormat.format(product.price)}</div>
                <div className="text-[1em]  ms-2"></div>
                <div className="text-[1em]">Discount: {product.discount * 100}%</div>
                <div className="text-[1em]">
                    Discounted Price: {currencyFormat.format(product.discountedPrice)}
                </div>
                <div className="text-[1em]">Stock: {product.stock}</div>
                <div className="text-[1em]">Sales Count: {product.salesCount}</div>
            </div>
            <div className="col-span-3 my-[0.8em]">
                <div className="overflow-hidden">
                    Description:
                    <p className="text-sm line-clamp-7 resize-none min-h-[10em] max-h-[10em] min-w-[24em] max-w-[24em]">
                        {product.description}
                    </p>
                </div>
            </div>
            <div className="col-span-2 grid gap-3 p-10">
                <Link
                    to={`/user/${userDetails?._id}/my-products/${product._id}/update`}
                    className="border bg-gray-300 disabled:text-gray-400 disabled:hover:shadow-sm rounded disabled:hover:bg-gray-300 shadow-sm hover:shadow-md hover:bg-white flex justify-center items-center"
                >
                    Edit Product
                </Link>
                <Button
                    name="Delete Product"
                    className="border bg-gray-300 disabled:text-gray-400 disabled:hover:shadow-sm rounded disabled:hover:bg-gray-300 shadow-sm hover:shadow-md hover:bg-white"
                />
            </div>
        </div>
    );
}
