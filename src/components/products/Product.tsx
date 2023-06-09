import { Link } from "react-router-dom";

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
}

export default function Product(props: IProdcutDetails) {
    const product = props.product;
    const prod_id = product._id;

    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className="border rounded p-1 shadow-sm hover:shadow-md hover:border-gray-300 text-sm">
            <Link to={`/shop/product/${prod_id}`}>
                <div className="flex justify-center bottom relative">
                    {product.discount != 0 && (
                        <div className="absolute bg-gray-200 text-[0.7em] px-1 rounded-s rounded-t-none rounded-br-none rounded-r end-0">
                            <p>{product.discount * 100}% Off</p>
                        </div>
                    )}
                    <img src={product.image} className="max-h-[10em] min-h-[10em] rounded" />
                </div>
                <div className="pt-2 text-xs">
                    <h3 className="my-2">{product.productName}</h3>
                    <p className="inline text-[1em]">Price: </p>
                    <p
                        className={`inline ${
                            product.discount && "line-through text-[0.8em] text-gray-400"
                        }`}
                    >
                        {currencyFormat.format(product.price)}
                    </p>
                    {product.discount != 0 && (
                        <p className="inline text-[1em]">
                            {" "}
                            {currencyFormat.format(product.discountedPrice)}
                        </p>
                    )}
                </div>
                <div className="flex place-content-end">
                    <p className="text-xs">{product.salesCount} Sold</p>
                </div>
            </Link>
        </div>
    );
}
