import { useEffect, useState } from "react";
import useDecryptUser from "../../hooks/useDecryptUser";
import { getOrderDetailsRequest } from "../../api/orderRequests";
import { useParams } from "react-router-dom";
import { IOrder } from "../../types/orderTypes";
import ItemDetails from "./ItemDetails";

export default function OrderDetails() {
    const { userDetails, isNull } = useDecryptUser();
    const [orderDetails, setOrderDetails] = useState<IOrder>();
    const [isLoading, setIsLoading] = useState(true);

    const { order_id } = useParams();

    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const getOrderDetails = async () => {
        if (userDetails && !isNull && order_id) {
            setIsLoading(true);
            const details = await getOrderDetailsRequest(userDetails.email, order_id);
            setOrderDetails(details);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, [userDetails]);

    if (isLoading) {
        return <div>Order Details Loading...</div>;
    }

    return (
        <div>
            <div className="grid gap-4 min-w-full place-content-center mt-10 mb-15">
                <div>
                    Order Status:
                    {` ${orderDetails?.status.charAt(0).toUpperCase()}${orderDetails?.status.slice(
                        1
                    )}`}
                </div>
                {orderDetails?.items.map((item) => {
                    return (
                        <ItemDetails
                            key={item._id}
                            _id={item._id}
                            prod_id={item.prod_id}
                            image={item.image}
                            productName={item.productName}
                            price={item.price}
                            discount={item.discount}
                            discountedPrice={item.discountedPrice}
                            quantity={item.quantity}
                        />
                    );
                })}
            </div>
            <div className="min-w-[100%] text-right fixed bottom-0 border bg-gray-100 z-10 py-[1.3em]">
                <div className="inline mr-16">
                    Order Total Amount: {currencyFormat.format(orderDetails!.totalAmount)}
                </div>
            </div>
        </div>
    );
}
