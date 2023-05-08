import { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { Navigate, Outlet } from "react-router-dom";
import { ActiveLinkContext } from "../providers/ActiveLinkProvider";

const LOGIN_LINK = "http://localhost:5173/login";
const SIGN_UP_LINK = "http://localhost:5173/sign-up";

export default function LoggedOutRoutes() {
    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    useEffect(() => {
        if (window.location.href == LOGIN_LINK) return activeLinkContext.setActiveLink(LOGIN_LINK);
        if (window.location.href == SIGN_UP_LINK)
            return activeLinkContext.setActiveLink(SIGN_UP_LINK);
    }, []);

    return !userContext.accessToken && !userContext.refreshToken ? <Outlet /> : <Navigate to="/" />;
}
