import { IButton } from "../../types/buttonTypes";

export default function Button(props: IButton<string | number>) {
    const { clickEvent, getState, action, ...btnProps } = props;

    return (
        <button
            {...btnProps}
            className={props.className}
            onClick={clickEvent}
            disabled={
                (getState == 1 && action == "subtract") ||
                (getState == 10 && action == "add")
                    ? true
                    : false
            }
        >
            {props.name}
        </button>
    );
}
