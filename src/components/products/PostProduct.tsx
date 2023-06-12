import React, { useState, useEffect, FormEvent } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { postProductRequest } from "../../api/productDetailsReqeust";
import Swal from "sweetalert2";
import useDecryptUser from "../../hooks/useDecryptUser";

interface IPostProduct {
    setPostProductFormShown: React.Dispatch<React.SetStateAction<boolean>>;
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
        <form onSubmit={onSubmitHandler}>
            <div>
                <label>Image:</label>
                <Input type="text" className="border" value={image} setStateString={setImage} />
            </div>
            <div>
                <label>Product Name:</label>
                <Input type="text" className="border" value={name} setStateString={setName} />
            </div>
            <div>
                <label>Description:</label>
                <Input
                    type="text"
                    className="border"
                    value={description}
                    setStateString={setDescription}
                />
            </div>
            <div>
                <label>Price:</label>
                <Input
                    type="number"
                    className="border"
                    value={Number(price).toString()}
                    setStateNumber={setPrice}
                />
            </div>
            <div>
                <label>Discount (In percent):</label>
                <Input
                    type="number"
                    className="border"
                    value={Number(discount).toString()}
                    setStateNumber={setDiscount}
                />
            </div>
            <div>
                <label>Stock:</label>
                <Input
                    type="number"
                    className="border"
                    value={Number(stock).toString()}
                    setStateNumber={setStock}
                />
            </div>
            <Button
                type="submit"
                name="Post Product"
                disabled={!isFormValid}
                className="border bg-blue-200 px-3 rounded disabled:bg-slate-400"
            />
            <Button
                type="button"
                name="Cancel"
                className="border bg-blue-200 px-3 rounded"
                clickEvent={() => props.setPostProductFormShown(false)}
            />
        </form>
    );
}
