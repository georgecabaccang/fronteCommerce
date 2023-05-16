import React, { useContext } from "react";
import Button from "./Button";
import Input from "./Input";
import { CartContext } from "../../providers/CartProvider";

interface IQuantity {
    prod_id?: string;
    quantityFrom?: string;
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export default function Quantity(props: IQuantity) {
    const { setQuantity, quantity } = props;

    const minusQuantity = () => {
        return setQuantity(quantity - 1);
    };

    const plusQuantity = () => {
        return setQuantity(quantity + 1);
    };

    let quantityCheck: boolean = true;
    if (props.quantityFrom === "shop") {
        quantityCheck = quantity == 1 ? true : false;
    } else {
        quantityCheck = false;
    }

    return (
        <>
            Quantity:
            {
                <Button
                    name="-"
                    className="border px-[0.7em] inline ms-2 disabled:bg-slate-200"
                    clickEvent={minusQuantity}
                    getState={quantity}
                    disabled={quantityCheck}
                />
            }
            {
                <Input
                    type="number"
                    setStateNumber={setQuantity}
                    value={quantity}
                    min={1}
                    max={10}
                    isDisabled={true}
                    className="inline px-2 border max-w-[2.5em] text-center"
                />
            }
            {
                <Button
                    name="+"
                    className="border px-[0.6em] inline disabled:bg-slate-200"
                    getState={quantity}
                    clickEvent={plusQuantity}
                    // think about implementing this or not
                    // disabled={quantity == 10 ? true : false}
                />
            }
        </>
    );
}
