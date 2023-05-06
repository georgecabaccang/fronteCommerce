import { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { Navigate, Outlet } from "react-router-dom";
import { ActiveLinkContext } from "../providers/ActiveLinkProvider";

const LOGIN_LINK = "http://localhost:5173/login";

export default function LoggedOutRoutes() {
    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    useEffect(() => {
        activeLinkContext.setActiveLink(LOGIN_LINK);
    }, []);

    return !userContext.accessToken && !userContext.refreshToken ? <Outlet /> : <Navigate to="/" />;
}
