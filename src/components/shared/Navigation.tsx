import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";
import { CartContext } from "../../providers/CartProvider";
import { Link } from "react-router-dom";
import useDecryptUser from "../../hooks/useDecryptUser";

const LOGIN = "/login";
const SIGN_UP = "/sign-up";

const LOGGED_IN_CLASSNAME = "ms-auto flex w-1/3 h-full items-center navbar";
const LOGGED_OUT_CLASSNAME = "ms-auto flex w-1/4 h-full items-center navbar";

export default function Navigation() {
    const { userDetails } = useDecryptUser();
    const userContext = useContext(UserContext);
    const cartContext = useContext(CartContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const NAV_CLASSNAME = userContext.user ? LOGGED_IN_CLASSNAME : LOGGED_OUT_CLASSNAME;

    const navigate = useNavigate();

    const logoutHandler = async () => {
        userContext.logout();
        navigate("/login");
    };

    return (
        <div className="bg-gray-200 h-[3em] sticky top-0 z-30 shadow-md">
            <div className="flex mx-10 h-full items-center">
                <div>
                    <Link to={"/"}>Shop</Link>
                </div>
                <nav className={NAV_CLASSNAME}>
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
                    {userContext.user && (
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
                                to={`/user/profile/${userDetails?._id}`}
                                className="flex place-content-center items-center w-full h-full link-page"
                                onClick={() => {
                                    activeLinkContext.setActiveLink("profile");
                                }}
                            >
                                Profile
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
                    {!userContext.user && (
                        <>
                            {activeLinkContext.link == LOGIN ? (
                                ""
                            ) : (
                                <NavLink
                                    to={"/login"}
                                    className="flex place-content-center items-center w-full h-full link-page"
                                    onClick={() => activeLinkContext.setActiveLink(LOGIN)}
                                >
                                    Login
                                </NavLink>
                            )}
                            {activeLinkContext.link == SIGN_UP ? (
                                ""
                            ) : (
                                <NavLink
                                    to={"/sign-up"}
                                    className="flex place-content-center items-center w-full h-full link-page"
                                    onClick={() => activeLinkContext.setActiveLink(SIGN_UP)}
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
