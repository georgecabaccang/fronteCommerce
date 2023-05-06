import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { logout } from "../../api/logoutRequest";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";

const LOGIN_LINK = "http://localhost:5173/login";
const SIGN_UP_LINK = "http://localhost:5173/sign-up";
const HOME_LINK = "http://localhost:5173";
const SHOP_LINK = "http://localhost:5173/shop";

export default function Navigation() {
    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const logoutHandler = async () => {
        if (userContext.refreshToken) {
            const response = await logout(userContext.refreshToken);
            if (response != "logout successful") {
                console.log("something went wrong");
                return;
            }
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            userContext.setAccessToken("");
            userContext.setRefreshToken("");
            // setActiveLink("logout");
        }
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
                                onClick={() => activeLinkContext.setActiveLink("cart")}
                            >
                                Cart
                            </NavLink>
                            <NavLink
                                to={"/logout"}
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
