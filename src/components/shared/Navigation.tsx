import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <div>
                <h1>Shop</h1>
            </div>
            <div>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/cart"}>Cart</NavLink>
                <NavLink to={"/shop"}>Shop</NavLink>
            </div>
        </nav>
    );
}
