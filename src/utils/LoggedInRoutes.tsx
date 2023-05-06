import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedInRoutes() {
    const userContext = useContext(UserContext);

    return userContext.accessToken && userContext.refreshToken ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
}
