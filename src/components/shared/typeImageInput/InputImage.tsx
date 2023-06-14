import React, { useEffect, useState } from "react";

interface IInputImage {
    imageGetter: string;
    imageSetter: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputImage(props: IInputImage) {
    const [image, setImage] = useState<Array<File>>([]);

    const imageConverter = async () => {
        if (image.length != 0) {
            try {
                const fileReader = new FileReader();
                const convertedImage = await new Promise((resolve, reject) => {
                    fileReader.readAsDataURL(image[0]);
                    fileReader.onload = () => {
                        resolve(fileReader.result);
                    };
                    fileReader.onerror = (error) => {
                        reject(error);
                    };
                });
                const result = await convertedImage;
                if (typeof result === "string") {
                    return props.imageSetter(result as string);
                }
                return console.log(result);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        }
    };

    useEffect(() => {
        imageConverter();
    }, [image]);

    return (
        <div>
            <input
                type="file"
                className="file:rounded file:shadow-sm file:border-0 file:px-3 file:bg-gray-200 file:hover:bg-white file:me-3 file:hover:shadow-md py-2"
                accept=".jpeg, .png, .jpg"
                onChange={(event) => setImage(Array.from(event.target.files ?? []))}
            />
        </div>
    );
}
