import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productDetailsReqeust, updateProductRequest } from "../../api/productDetailsReqeust";
import Input from "../shared/Input";
import InputImage from "../shared/typeImageInput/InputImage";
import useDecryptUser from "../../hooks/useDecryptUser";
import Button from "../shared/Button";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

interface IProductDetails {
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
    message?: string;
}

export default function UpdateMyProduct() {
    const { userDetails, isNull } = useDecryptUser();
    const [image, setImage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [discountedPrice, setDiscountedPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);

    const [productFound, setProductFound] = useState(false);
    const [isOwnProduct, setIsOwnProduct] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isPriceNegative, setIsPriceNegative] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const { prod_id } = useParams();
    const navigate = useNavigate();

    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        let confirmStockIsZero = true;
        if (stock == 0) {
            await Swal.fire({
                title: "Number of Stock Is Zero (0).",
                text: "Products With Zero (0) Will Not Be Shown In The Shop.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Proceed",
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmStockIsZero = true;
                }
                if (result.isDismissed) {
                    confirmStockIsZero = false;
                }
            });
        }

        if (!confirmStockIsZero) return;

        if (!isDisabled && image && name && price && description) {
            const newProductDetails = {
                prod_id: prod_id,
                image: image,
                productName: name,
                description: description,
                price: price,
                discount: discount / 100,
                stock: stock,
            };
            const response = (await updateProductRequest(
                userDetails!.email,
                newProductDetails
            )) as AxiosResponse;
            if (response.status == 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Product Has Been Updated!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return navigate(`/user/${userDetails?._id}/my-products`);
            }
        }
    };

    const getDetails = async () => {
        setIsLoading(true);

        const returnedDetails: IProductDetails = await productDetailsReqeust(prod_id!);
        if (userDetails && !isNull) {
            if (userDetails?._id != returnedDetails.postedBy) {
                setIsLoading(false);
                setProductFound(true);
                return setIsOwnProduct(false);
            }
        }
        setIsOwnProduct(true);
        setImage(returnedDetails.image);
        setName(returnedDetails.productName);
        setDescription(returnedDetails.description);
        setPrice(returnedDetails.price);
        setDiscount(returnedDetails.discount * 100);
        setDiscountedPrice(returnedDetails.discountedPrice);
        setStock(returnedDetails.stock);

        if (returnedDetails.message) {
            setProductFound(false);
            setIsLoading(false);
            return;
        }
        setProductFound(true);
        setIsLoading(false);
    };

    useEffect(() => {
        if (isPriceNegative || !name || !price || !description || !image) {
            return setIsDisabled(true);
        }
        return setIsDisabled(false);
    }, [isPriceNegative, price, description, name, image]);

    useEffect(() => {
        const newDiscountedPrice = price * (1 - discount / 100);
        let toBeSetNewDiscountPrice = Math.abs(newDiscountedPrice);
        if (newDiscountedPrice < 0 || price < 0) {
            toBeSetNewDiscountPrice = newDiscountedPrice;
            setIsPriceNegative(true);
        } else {
            setIsPriceNegative(false);
        }

        setDiscountedPrice(toBeSetNewDiscountPrice);
    }, [price, discount]);

    useEffect(() => {
        getDetails();
    }, [userDetails]);

    return (
        <div>
            {isLoading && <div>Loading. . .</div>}
            {!isOwnProduct && !isLoading && <div>The Product You Are Accessing Is Not Yours</div>}
            {!productFound && !isLoading && <div>Product Not Found</div>}
            {productFound && !isLoading && isOwnProduct && (
                <div className="flex flex-col justify-center items-center min-h-[33rem] min-w-[100vw]">
                    <form onSubmit={submitHandler}>
                        <div className="grid grid-cols-2 border rounded shadow-md min-h-[25rem] min-w-[50rem] p-4">
                            <div className="flex justify-center items-center mr-5">
                                <img
                                    src={image}
                                    className="min-h-[5em] max-h-[20em] max-w-[20em] min-w-[5em] inline mx-5"
                                />
                            </div>
                            <div>
                                <div>
                                    <InputImage imageGetter={image} imageSetter={setImage} />
                                </div>
                                <div className="mb-1">
                                    <div className="block">
                                        <div className="inline">Product Name: </div>
                                        {!name && (
                                            <div className="text-red-500 inline text-sm">
                                                Product Name Cannot Be Empty
                                            </div>
                                        )}
                                    </div>
                                    <Input
                                        type="text"
                                        className="border rounded shadow-sm min-w-full py-[0.2em] px-2 text-sm"
                                        value={name}
                                        setStateString={setName}
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <div className="inline">Description: </div>
                                        {!description && (
                                            <div className="text-red-500 inline text-sm">
                                                Description Cannot Be Empty
                                            </div>
                                        )}
                                    </div>
                                    <textarea
                                        className="border rounded shadow-sm min-w-full resize-none min-h-[4em] px-2 py-[0.3em] text-sm hide-but-with-function"
                                        maxLength={500}
                                        value={description}
                                        onChange={(event) => {
                                            setDescription(event.target.value);
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-3">
                                    <div className="col-span-2 pr-6">
                                        <div>
                                            <label className="block">Price (In Dollars):</label>
                                            <Input
                                                type="number"
                                                className="border rounded shadow-sm min-w-full py-[0.2em] px-2 text-sm"
                                                value={Number(price).toString()}
                                                setStateNumber={setPrice}
                                            />
                                        </div>
                                        <div>
                                            <label className="block">Discount (In percent):</label>
                                            <Input
                                                type="number"
                                                className="border rounded shadow-sm min-w-full py-[0.2em] px-2 text-sm"
                                                value={Number(discount).toString()}
                                                setStateNumber={setDiscount}
                                            />
                                        </div>
                                        <div>
                                            <label className="block">
                                                Discounted Price (In Dollars):
                                            </label>
                                            <div>{currencyFormat.format(discountedPrice)}</div>
                                        </div>
                                        <div>
                                            <label className="mr-2">Stock:</label>
                                            <Input
                                                type="number"
                                                className="border rounded shadow-sm  py-[0.2em] px-2 text-sm inline min-w-[5em] max-w-[5em]"
                                                value={Number(stock).toString()}
                                                setStateNumber={setStock}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 justify-end">
                                        {isPriceNegative && (
                                            <div className="text-red-500 text-xs text-center mb-4 max-w-[10em]">
                                                Price/Discounted Price Is Negative
                                            </div>
                                        )}
                                        <Button
                                            type="submit"
                                            name="Update Product"
                                            className=" py-2 border px-3 rounded  bg-gray-200 shadow-sm hover:bg-white hover:shadow-md disabled:hover:shadow-sm disabled:hover:bg-gray-200 disabled:text-gray-500"
                                            disabled={isDisabled}
                                        />
                                        <Link to={`/user/${userDetails?._id}/my-products`}>
                                            <Button
                                                name="Cancel Update"
                                                type="button"
                                                className=" py-2 border px-3 min-w-full rounded  bg-gray-200 shadow-sm hover:bg-white hover:shadow-md"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
