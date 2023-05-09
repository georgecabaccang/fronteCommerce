import React from "react";
import Button from "./Button";
import Input from "./Input";

interface IQuantity {
    quantity: string | number;
    setQuantity: React.Dispatch<React.SetStateAction<string | number>>;
}

export default function Quantity(props: IQuantity) {
    const { setQuantity, quantity } = props;

    const minusQuantity = () => {
        setQuantity(+quantity - 1);
    };

    const plusQuantity = () => {
        setQuantity(+quantity + 1);
    };
    return (
        <>
            Quantity:
            {
                <Button
                    name="-"
                    className="border px-[0.7em] inline ms-2 disabled:bg-slate-200"
                    clickEvent={minusQuantity}
                    getState={quantity}
                    disabled={quantity == 1 ? true : false}
                />
            }
            {
                <Input
                    type="number"
                    setState={setQuantity}
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
                    disabled={quantity == 10 ? true : false}
                />
            }
        </>
    );
}
