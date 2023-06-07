import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function SellerRoutes() {
    const userContext = useContext(UserContext);

    return userContext.userProfileDetails.isSeller ? (
        <Outlet />
    ) : (
        <Navigate to={`/user/profile/${userContext.userProfileDetails._id}`} />
    );
}
