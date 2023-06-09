import { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedInRoutes() {
    const userContext = useContext(UserContext);

    useEffect(() => {
        userContext.setLoginFrom("shop");
    }, []);

    return userContext.user ? <Outlet /> : <Navigate to="/login" />;
}
