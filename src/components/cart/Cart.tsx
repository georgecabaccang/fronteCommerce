import { useContext, FormEvent, useState, useEffect } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";
import useDecryptUser from "../../hooks/useDecryptUser";
import { getUserCartRequest } from "../../api/cartRequests";

const CHECKOUT_URL = "/cart/checkout";

interface ICart {
    items: Array<{
        _id: string;
        prod_id: string;
        image: string;
        productName: string;
        description: string;
        price: number;
        discount: number;
        discountedPrice: number;
        stock: number;
        quantity: number;
    }>;
    _id: string;
    cartOwner: string;
}

export default function Cart() {
    const { userDetails, isNull } = useDecryptUser();
    const [cart, setCart] = useState<ICart>();
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    const cartContext = useContext(CartContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const navigate = useNavigate();

    const totalAmountToPay = cartContext.checkOutDetails.totalAmountToPay;
    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const checkoutHandler = (event: FormEvent) => {
        event.preventDefault();
        navigate(CHECKOUT_URL);
    };

    useEffect(() => {
        if (cartContext.checkOutDetails.items.length != 0) {
            return setIsDisabled(false);
        }
        return setIsDisabled(true);
    }, [cartContext.checkOutDetails]);

    const getUserCart = async () => {
        setIsLoading(true);
        if (userDetails && !isNull) {
            const cartData = await getUserCartRequest(userDetails.email);
            setCart(cartData);
            return setIsLoading(false);
        }
        return setIsLoading(false);
    };

    useEffect(() => {
        if (userDetails) {
            getUserCart();
        }
    }, [userDetails]);

    return (
        <div className="mt-5 mb-20 ">
            <form onSubmit={checkoutHandler}>
                {isLoading && (
                    <div className="grid mt-5 text-center place-content-center min-h-[80vh]">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    </div>
                )}
                {!isLoading && cart?.items.length === 0 ? (
                    <div className="text-center">Cart Is Empty</div>
                ) : (
                    <div>
                        {cart?.items
                            .map((item) => {
                                return (
                                    <CartItem
                                        key={item._id}
                                        prod_id={item.prod_id}
                                        productName={item.productName}
                                        description={item.description}
                                        price={item.price}
                                        discount={item.discount}
                                        discountedPrice={item.discountedPrice}
                                        stock={item.stock}
                                        image={item.image}
                                        item_id={item._id}
                                        quantity={item.quantity}
                                        getUserCart={getUserCart}
                                    />
                                );
                            })
                            .reverse()}
                    </div>
                )}
                <div className="min-w-[100%] text-right fixed bottom-0 border bg-gray-100 z-10">
                    <div className="inline mr-16">
                        Checkout Total Amount: {currencyFormat.format(totalAmountToPay)}
                    </div>
                    <div className="my-2 inline mr-10">
                        <Button
                            className="border py-2 px-5 my-3 bg-gray-300 disabled:text-gray-400 disabled:hover:shadow-sm rounded disabled:hover:bg-gray-300 shadow-sm hover:shadow-md hover:bg-white"
                            type="submit"
                            name="Checkout"
                            disabled={isDisabled}
                            onClick={() => {
                                activeLinkContext.setActiveLink("checkout");
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
