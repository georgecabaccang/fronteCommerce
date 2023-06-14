import { useState } from "react";
import Button from "../shared/Button";
import ChangePassword from "../ChangePassword";
import { getUserProfileDetailsRequest, updateSellerStatusRequest } from "../../api/userRequests";
import PostProduct from "../products/PostProduct";
import { Link } from "react-router-dom";
import useDecryptUser from "../../hooks/useDecryptUser";

const CHANGE_PASSWORD_FORM = "change password";
const POST_PRODUCT_FORM = "post product";

export default function Profile() {
    const { userDetails, isNull, setUserChange } = useDecryptUser();
    const [changePasswordShown, setChangePasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState("");

    const updateSellerStatus = async () => {
        if (!isNull) {
            const response = await updateSellerStatusRequest(userDetails!.email, userDetails!._id);
            if (response === "OK") {
                return await getUserProfileDetails();
            }
            setIsLoading(false);
            return "something wrong happened when updating seller status";
        } else {
            setIsLoading(false);
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
        <div className="grid place-items-center my-8">
            <div className="grid grid-cols-2 border rounded shadow-md min-w-[50em] min-h-[30em]">
                <div className="border-r ">
                    <div>User ID: {userDetails?._id}</div>
                    <div>Email: {userDetails?.email}</div>
                    <div>Seller: {userDetails?.isSeller ? "Yes" : "No"}</div>
                    <div>
                        <Button
                            type="button"
                            name={userDetails?.isSeller ? "Revert To Buyer" : "Become Seller"}
                            className="border px-3 rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md"
                            clickEvent={updateSellerStatus}
                        />
                    </div>

                    {!changePasswordShown && (
                        <Button
                            name="Change Password"
                            className="border px-3 rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md"
                            clickEvent={() => setForm(CHANGE_PASSWORD_FORM)}
                        />
                    )}
                    {userDetails?.isSeller && (
                        <div>
                            <div>
                                <Button
                                    name="Post Product"
                                    type="button"
                                    className="border px-3 rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md"
                                    clickEvent={() => setForm(POST_PRODUCT_FORM)}
                                />
                            </div>
                            <div>
                                <Link
                                    to={`/user/${userDetails?._id}/my-products`}
                                    className="border px-3 rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md"
                                >
                                    My Products
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid place-content-center">
                    {userDetails?.isSeller && form == POST_PRODUCT_FORM && (
                        <div>
                            <PostProduct setForm={setForm} />
                        </div>
                    )}
                    {form == CHANGE_PASSWORD_FORM && (
                        <ChangePassword
                            email={userDetails!.email}
                            user_id={userDetails!._id}
                            setChangePasswordShown={setChangePasswordShown}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
