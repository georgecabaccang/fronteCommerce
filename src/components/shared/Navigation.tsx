import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

export default function Navigation() {
    const [activeLink, setActiveLink] = useState("home");
    const userContext = useContext(UserContext);

    return (
        <div className="bg-orange-100 h-[3em] sticky top-0 z-10">
            <div className="flex mx-10 h-full items-center">
                <div>
                    <h1>Shop</h1>
                </div>
                <nav className="ms-auto flex w-1/4 h-full items-center navbar">
                    <NavLink
                        to={"/"}
                        className="flex place-content-center items-center w-full h-full link-page"
                        onClick={() => setActiveLink("home")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/shop"}
                        className="flex place-content-center items-center w-full h-full link-page"
                        onClick={() => setActiveLink("shop")}
                    >
                        Shop
                    </NavLink>
                    {userContext.accessToken && (
                        <NavLink
                            to={"/cart"}
                            className="flex place-content-center items-center w-full h-full link-page"
                            onClick={() => setActiveLink("cart")}
                        >
                            Cart
                        </NavLink>
                    )}
                    {!userContext.accessToken && (
                        <>
                            {activeLink === "sign-up" ||
                            activeLink === "home" ||
                            activeLink === "shop" ? (
                                <NavLink
                                    to={"/login"}
                                    className="flex place-content-center items-center w-full h-full link-page"
                                    onClick={() => setActiveLink("login")}
                                >
                                    Login
                                </NavLink>
                            ) : (
                                ""
                            )}
                            {activeLink === "login" ||
                            activeLink === "home" ||
                            activeLink === "shop" ? (
                                <NavLink
                                    to={"/sign-up"}
                                    className="flex place-content-center items-center w-full h-full link-page"
                                    onClick={() => setActiveLink("sign-up")}
                                >
                                    Sign Up
                                </NavLink>
                            ) : (
                                ""
                            )}
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
}
