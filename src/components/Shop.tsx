import React from "react";

const DUMMY_ITEMS: Array<ItemProperties> = [
    {
        itemName: "Item One",
        price: 3.99,
    },
    {
        itemName: "Item Two",
        price: 5,
    },
    {
        itemName: "Item Three",
        price: 2,
    },
];

export default function Shop() {
    return (
        <div>
            Shop
            <div>
                <ul>
                    {DUMMY_ITEMS?.map((item) => {
                        return (
                            <li>
                                <h3>{item.itemName}</h3>
                                <p>{item.price.toFixed(2)}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
