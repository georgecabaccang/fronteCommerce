import { IButton } from "../../types/buttonTypes";

export default function Button(props: IButton) {
    const { clickEvent, getStateString, getStateNumber, image, imageProps, ...btnProps } = props;

    return (
        <button {...btnProps} className={`${props.className}`} onClick={clickEvent}>
            {image && <img src={image} className={imageProps} />}
            {props.name}
        </button>
    );
}
