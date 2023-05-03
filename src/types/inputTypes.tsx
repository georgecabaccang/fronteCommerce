import React, { SetStateAction } from "react";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    setState: React.Dispatch<SetStateAction<string | number>>;
    isDisabled?: boolean;
}
