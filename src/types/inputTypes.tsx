import React, { SetStateAction } from "react";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    setQuantity?: React.Dispatch<SetStateAction<number>>;
    isDisabled?: boolean;
}
