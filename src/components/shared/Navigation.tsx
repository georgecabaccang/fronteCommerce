import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <div className="bg-orange-100 h-[3em]">
            <div className="flex mx-10 h-full items-center">
                <div>
                    <h1>Shop</h1>
                </div>
                <nav className="ms-auto flex w-1/4 h-full items-center navbar">
                    <NavLink
                        to={"/"}
                        className="flex place-content-center items-center w-full h-full link-page"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/shop"}
                        className="flex place-content-center items-center w-full h-full link-page"
                    >
                        Shop
                    </NavLink>
                    <NavLink
                        to={"/cart"}
                        className="flex place-content-center items-center w-full h-full link-page"
                    >
                        Cart
                    </NavLink>
                    <NavLink
                        to={"/login"}
                        className="flex place-content-center items-center w-full h-full link-page"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to={"/sign-up"}
                        className="flex place-content-center items-center w-full h-full link-page"
                    >
                        Sign Up
                    </NavLink>
                </nav>
            </div>
        </div>
    );
}
