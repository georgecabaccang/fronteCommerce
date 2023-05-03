import { IButton } from "../../types/buttonTypes";

export default function Button(props: IButton<string | number>) {
    const { clickEvent, getState, ...btnProps } = props;

    return (
        <button
            {...btnProps}
            className={`${props.className}`}
            onClick={clickEvent}
        >
            {props.name}
        </button>
    );
}
