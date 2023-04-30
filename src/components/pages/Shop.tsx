import Item from "../Item";

const DUMMY_ITEMS: Array<ItemProperties> = [
    {
        itemName: "Item One",
        price: 3.99,
        image: "https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        id: "1",
    },
    {
        itemName: "Item Two",
        price: 5,
        image: "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg",
        id: "2",
    },
    {
        itemName: "Item Three",
        price: 2,
        image: "https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        id: "3",
    },
    {
        itemName: "Item Four",
        price: 2,
        image: "https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        id: "4",
    },
];

export default function Shop() {
    return (
        <div className="mx-5 mt-5">
            <div className="grid grid-cols-5 gap-2">
                {DUMMY_ITEMS?.map((item) => {
                    return <Item item={item} key={item.id} />;
                })}
            </div>
        </div>
    );
}
