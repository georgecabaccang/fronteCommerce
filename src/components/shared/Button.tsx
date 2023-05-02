import { IButton } from "../../types/buttonTypes";

export default function Button(props: IButton<string | number>) {
    const { clickEvent, getState, ...btnProps } = props;

    return (
        <button
            {...btnProps}
            className={`${props.className} ${
                props.disabled ? "bg-slate-200" : ""
            }`}
            onClick={clickEvent}
        >
            {props.name}
        </button>
    );
}
