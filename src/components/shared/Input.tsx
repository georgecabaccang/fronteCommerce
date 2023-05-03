import { IInput } from "../../types/inputTypes";

export default function Input(props: IInput) {
    const { setState, isDisabled, ...inputProps } = props;
    const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (props.type) {
            case "email":
                setState?.(event.target.value);
                console.log("email");
                break;
            case "password":
                setState?.(event.target.value);
                console.log("password");
                break;
            case "number":
                setState?.(+event.target.value);
                break;
            default:
                break;
        }
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
