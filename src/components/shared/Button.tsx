import { IButton } from "../../types/buttonTypes";

export default function Button(props: IButton) {
    const { clickEvent, ...btnProps } = props;

    return (
        <div>
            <button
                {...btnProps}
                className={props.className}
                onClick={clickEvent}
            >
                {props.name}
            </button>
        </div>
    );
}
