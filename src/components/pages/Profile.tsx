import { useState } from "react";
import Button from "../shared/Button";
import ChangePassword from "../ChangePassword";
import { getUserProfileDetailsRequest, updateSellerStatusRequest } from "../../api/userRequests";
import PostProduct from "../products/PostProduct";
import { Link } from "react-router-dom";
import useDecryptUser from "../../hooks/useDecryptUser";

export default function Profile() {
    const { userDetails, isNull, setUserChange } = useDecryptUser();
    const [changePasswordShown, setChangePasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [postProductFormShown, setPostProductFormShown] = useState(false);

    const updateSellerStatus = async () => {
        if (!isNull) {
            const response = await updateSellerStatusRequest(userDetails!.email, userDetails!._id);
            if (response === "OK") {
                setPostProductFormShown(false);
                return await getUserProfileDetails();
            }
            setPostProductFormShown(false);
            setIsLoading(false);
            return "something wrong happened when updating seller status";
        } else {
            setIsLoading(false);
            return console.log("no user");
        }
    };

    const getUserProfileDetails = async () => {
        if (userDetails) {
            const response = await getUserProfileDetailsRequest(userDetails.email);
            localStorage.setItem("user", response);
            setIsLoading(false);
            setUserChange((prev) => !prev);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>User ID: {userDetails?._id}</div>
            <div>Email: {userDetails?.email}</div>
            <div>
                Seller:
                {userDetails?.isSeller ? "Yes" : "No"}
            </div>
            <div>
                <Button
                    type="button"
                    name={userDetails?.isSeller ? "Revert To Buyer" : "Become Seller"}
                    className="border px-3 rounded bg-blue-200 shadow-sm  hover:bg-blue-500"
                    clickEvent={updateSellerStatus}
                />
            </div>
            {userDetails?.isSeller && (
                <div>
                    {postProductFormShown ? (
                        <div>
                            <PostProduct setPostProductFormShown={setPostProductFormShown} />
                        </div>
                    ) : (
                        <div>
                            <Button
                                name="Post Product"
                                type="button"
                                className="border px-3 rounded bg-blue-200 shadow-sm  hover:bg-blue-500"
                                clickEvent={() => setPostProductFormShown(true)}
                            />
                        </div>
                    )}
                    <div>
                        <Link
                            to={`/user/${userDetails._id}/my-products`}
                            className="border px-3 rounded bg-blue-200 shadow-sm  hover:bg-blue-500"
                        >
                            My Products
                        </Link>
                    </div>
                </div>
            )}

            {!changePasswordShown && (
                <Button
                    name="Change Password"
                    className="border px-3 rounded bg-blue-200 shadow-sm  hover:bg-blue-500"
                    clickEvent={() => setChangePasswordShown(true)}
                />
            )}
            {changePasswordShown && (
                <ChangePassword
                    email={userDetails!.email}
                    user_id={userDetails!._id}
                    setChangePasswordShown={setChangePasswordShown}
                />
            )}
        </div>
    );
}
