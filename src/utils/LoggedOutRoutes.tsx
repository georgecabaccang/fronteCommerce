import { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { Navigate, Outlet } from "react-router-dom";
import { ActiveLinkContext } from "../providers/ActiveLinkProvider";

const LOGIN = "/login";
const SIGN_UP = "/sign-up";

export default function LoggedOutRoutes() {
    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    useEffect(() => {
        if (window.location.pathname == LOGIN) return activeLinkContext.setActiveLink(LOGIN);
        if (window.location.pathname == SIGN_UP) return activeLinkContext.setActiveLink(SIGN_UP);
    }, []);

    return !userContext.user ? <Outlet /> : <Navigate to="/" />;
}
