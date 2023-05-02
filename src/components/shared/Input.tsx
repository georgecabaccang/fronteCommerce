import { IInput } from "../../types/inputTypes";

export default function Input(props: IInput) {
    const { setQuantity, isDisabled, ...inputProps } = props;
    const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity?.(+event.target.value);
    };

    return (
        <input
            {...inputProps}
            className={props.className}
            onChange={(event) => setInput(event)}
            disabled={isDisabled}
        />
    );
}
