import React from "react";

interface IDescription {
    description: string;
    setShowDescriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DescriptionModal(props: IDescription) {
    return (
        <div
            className="flex justify-center items-center absolute bg-black bg-opacity-70 mt-[3.6em] min-h-[100%] min-w-[100vw] z-10"
            onClick={() => props.setShowDescriptionModal(false)}
        >
            <div className="bg-white rounded max-w-[50em] max-h-[20em] min-w-[50em] min-h-[20em] overflow-scroll hide-but-with-function p-3">
                {props.description}
            </div>
        </div>
    );
}
