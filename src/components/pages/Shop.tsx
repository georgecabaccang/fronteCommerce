import Product from "../products/Product";

const DUMMY_ITEMS: Array<IProductProperties> = [
    {
        productName: "Item One",
        price: 3.99,
        image: "https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        id: "1",
    },
    {
        productName: "Item Two",
        price: 5,
        image: "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg",
        id: "2",
    },
    {
        productName: "Item Three",
        price: 2,
        image: "https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        id: "3",
    },
    {
        productName: "Item Four",
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
                    return <Product item={item} key={item.id} />;
                })}
            </div>
        </div>
    );
}
