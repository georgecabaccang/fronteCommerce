import { IButton } from "../../types/buttonTypes";

export default function Button(props: IButton) {
    const { clickEvent, getStateString, getStateNumber, ...btnProps } = props;

    return (
        <button {...btnProps} className={`${props.className}`} onClick={clickEvent}>
            {props.name}
        </button>
    );
}
