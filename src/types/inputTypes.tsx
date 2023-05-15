import React, { SetStateAction } from "react";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    setState: React.Dispatch<SetStateAction<string | number | boolean>>;
    isDisabled?: boolean;
    type?: string;
    getState?: string | number | boolean;
}
