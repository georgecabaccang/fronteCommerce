import React, { SetStateAction } from "react";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    setStateString?: React.Dispatch<SetStateAction<string>>;
    setStateNumber?: React.Dispatch<SetStateAction<number>>;
    setStateBoolean?: React.Dispatch<SetStateAction<boolean>>;
    isDisabled?: boolean;
    type?: string;
    getState?: string | number | boolean;
}
