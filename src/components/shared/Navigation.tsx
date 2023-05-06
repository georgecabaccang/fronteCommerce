import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { logout } from "../../api/logoutRequest";

export default function Navigation() {
    const [theLink, setTheLink] = useState("");
    const [login, setLogin] = useState(true);
    const [signUp, setSignUp] = useState(true);

    const userContext = useContext(UserContext);

    const URLCheck = () => {
        if (window.location.href == "http://localhost:5173/login") {
            setLogin(false);
            setSignUp(true);
            return;
        }
        if (window.location.href == "http://localhost:5173/sign-up") {
            setLogin(true);
            setSignUp(false);
            return;
        }
        setLogin(true);
        setSignUp(true);
    };

    useEffect(() => {
        URLCheck();
    }, [theLink]);

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
                        onClick={() => setTheLink("home")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/shop"}
                        className="flex place-content-center items-center w-full h-full link-page"
                        onClick={() => setTheLink("shop")}
                    >
                        Shop
                    </NavLink>
                    {userContext.accessToken && (
                        <>
                            <NavLink
                                to={"/cart"}
                                className="flex place-content-center items-center w-full h-full link-page"
                                onClick={() => setTheLink("cart")}
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
                            {login ? (
                                <NavLink
                                    to={"/login"}
                                    className="flex place-content-center items-center w-full h-full link-page"
                                    onClick={() => setTheLink("login")}
                                >
                                    Login
                                </NavLink>
                            ) : (
                                ""
                            )}
                            {signUp ? (
                                <NavLink
                                    to={"/sign-up"}
                                    className="flex place-content-center items-center w-full h-full link-page"
                                    onClick={() => setTheLink("sign-up")}
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
