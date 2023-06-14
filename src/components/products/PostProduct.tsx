import React, { useState, useEffect, FormEvent } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { postProductRequest } from "../../api/productDetailsReqeust";
import Swal from "sweetalert2";
import useDecryptUser from "../../hooks/useDecryptUser";
import InputImage from "../shared/typeImageInput/InputImage";

interface IPostProduct {
    setForm: React.Dispatch<React.SetStateAction<string>>;
}

export default function PostProduct(props: IPostProduct) {
    const { userDetails, isNull } = useDecryptUser();
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (isFormValid && userDetails && !isNull) {
            const product = {
                image: image,
                productName: name,
                description: description,
                price: price,
                discount: discount / 100,
                stock: stock,
            };
            const response = await postProductRequest(userDetails.email, product);
            if (response == "product created") {
                return Swal.fire({
                    icon: "success",
                    title: "Product Posted!",
                });
            }
            return Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Please Try Again!",
            });
        }
    };

    useEffect(() => {
        if (image && name && description && price && stock) {
            return setIsFormValid(true);
        }
        return setIsFormValid(false);
    }, [image, name, description, price, discount, stock]);

    return (
        <div className="text-[0.95em]">
            <form onSubmit={onSubmitHandler}>
                <div></div>
                <div>
                    <label className="inline">
                        Image: <img src={image} className="max-h-[4em] max-w-[7em] inline mx-5" />
                    </label>
                    <InputImage imageGetter={image} imageSetter={setImage} />
                </div>
                <div>
                    <label className="block">Product Name:</label>
                    <Input
                        type="text"
                        className="border rounded shadow-sm min-w-full py-[0.2em] px-2 text-sm"
                        value={name}
                        setStateString={setName}
                    />
                </div>
                <div>
                    <label className="block">Description:</label>
                    <textarea
                        className="border rounded shadow-sm min-w-full resize-none min-h-[4em] px-2 py-[0.3em] text-sm"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                </div>
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
                    <label className="block">Stock:</label>
                    <Input
                        type="number"
                        className="border rounded shadow-sm min-w-full py-[0.2em] px-2 text-sm"
                        value={Number(stock).toString()}
                        setStateNumber={setStock}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button
                        type="submit"
                        name="Post Product"
                        disabled={!isFormValid}
                        className="border rounded px-3 bg-gray-200 shadow-sm hover:bg-white hover:shadow-md disabled:hover:shadow-sm disabled:hover:bg-gray-200 disabled:text-gray-500"
                    />
                    <Button
                        type="button"
                        name="Cancel"
                        className="border px-3 rounded  bg-gray-200 shadow-sm hover:bg-white hover:shadow-md"
                        clickEvent={() => props.setForm("")}
                    />
                </div>
            </form>
        </div>
    );
}
