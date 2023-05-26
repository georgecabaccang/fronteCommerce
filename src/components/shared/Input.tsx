import { IInput } from "../../types/inputTypes";

export default function Input(props: IInput) {
    const {
        setStateString,
        setStateNumber,
        setStateBoolean,
        isDisabled,
        getStateBoolean,
        ...inputProps
    } = props;
    const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (props.type) {
            case "text":
                setStateString?.(event.target.value);
                break;
            case "email":
                setStateString?.(event.target.value);
                break;
            case "password":
                setStateString?.(event.target.value);
                break;
            case "number":
                setStateNumber?.(+event.target.value);
                break;
            case "checkbox":
                setStateBoolean?.(!getStateBoolean);
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
            checked={props.type == "checkbox" && getStateBoolean}
        />
    );
}
