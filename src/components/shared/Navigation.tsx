import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";
import { CartContext } from "../../providers/CartProvider";

const LOGIN_LINK = "http://localhost:5173/login";
const SIGN_UP_LINK = "http://localhost:5173/sign-up";

export default function Navigation() {
    const userContext = useContext(UserContext);
    const cartContext = useContext(CartContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const logoutHandler = async () => {
        userContext.logout();
    };

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
                        onClick={() => activeLinkContext.setActiveLink("home")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/shop"}
                        className="flex place-content-center items-center w-full h-full link-page"
                        onClick={() => activeLinkContext.setActiveLink("shop")}
                    >
                        Shop
                    </NavLink>
                    {userContext.accessToken && (
                        <>
                            <NavLink
                                to={"/cart"}
                                className="flex place-content-center items-center w-full h-full link-page"
                                onClick={() => {
                                    activeLinkContext.setActiveLink("cart");
                                    cartContext.resetCheckout();
                                }}
                            >
                                Cart
                            </NavLink>
                            <NavLink
                                to={"/orders"}
                                className="flex place-content-center items-center w-full h-full link-page"
                                onClick={() => activeLinkContext.setActiveLink("orders")}
                            >
                                Orders
                            </NavLink>
                            <NavLink
                                to={"/login"}
                                className="flex place-content-center items-center w-full h-full link-page"
                                onClick={logoutHandler}
                            >
                                Logout
                            </NavLink>
                        </>
                    )}
                    {!userContext.accessToken && (
                        <>
                            {activeLinkContext.link == LOGIN_LINK ? (
                                ""
                            ) : (
                                <NavLink
                                    to={"/login"}
                                    className="flex place-content-center items-center w-full h-full link-page"
                                    onClick={() => activeLinkContext.setActiveLink(LOGIN_LINK)}
                                >
                                    Login
                                </NavLink>
                            )}
                            {activeLinkContext.link == SIGN_UP_LINK ? (
                                ""
                            ) : (
                                <NavLink
                                    to={"/sign-up"}
                                    className="flex place-content-center items-center w-full h-full link-page"
                                    onClick={() => activeLinkContext.setActiveLink(SIGN_UP_LINK)}
                                >
                                    Sign Up
                                </NavLink>
                            )}
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
}
