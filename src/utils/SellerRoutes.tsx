import { useEffect, useState } from "react";

import { Navigate, Outlet } from "react-router-dom";
import useDecryptUser from "../hooks/useDecryptUser";

export default function SellerRoutes() {
    const { userDetails } = useDecryptUser();
    const [isNull, setIsNull] = useState(true);

    useEffect(() => {
        if (userDetails) {
            setIsNull(false);
        }
    }, [userDetails]);

    if (isNull) {
        return <></>;
    }
    return userDetails?.isSeller ? (
        <Outlet />
    ) : (
        <Navigate to={`/user/profile/${userDetails?._id}`} />
    );
}
