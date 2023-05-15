import { IInput } from "../../types/inputTypes";

export default function Input(props: IInput) {
    const { setState, isDisabled, getState, ...inputProps } = props;
    const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (props.type) {
            case "email":
                setState?.(event.target.value);
                break;
            case "password":
                setState?.(event.target.value);
                break;
            case "number":
                setState?.(+event.target.value);
                break;
            case "checkbox":
                setState?.(!getState);
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
