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
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState("");

    const updateSellerStatus = async () => {
        if (!isNull) {
            setIsLoading(true);
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

    return (
        <div className={`grid place-items-center my-8`}>
            <div
                className={`grid ${
                    form != "" && "grid-cols-2 min-w-[50em]"
                } border rounded shadow-md min-w-[23em] min-h-[30em]`}
            >
                <div className="border-r p-10">
                    <div className="mb-10 mt-5">
                        <div>User ID: {userDetails?._id}</div>
                        <div>Email: {userDetails?.email}</div>
                        <div>
                            Seller:{" "}
                            {isLoading && (
                                <div className="inline" role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-3 h-3 ml-1 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                </div>
                            )}
                            {!isLoading && (
                                <div className="inline">{userDetails?.isSeller ? "Yes" : "No"}</div>
                            )}
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Button
                            type="button"
                            name={userDetails?.isSeller ? "Revert To Buyer" : "Become Seller"}
                            className="border px-3 rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md w-full"
                            clickEvent={updateSellerStatus}
                        />

                        <Button
                            name="Change Password"
                            className="border px-3 rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md w-full"
                            clickEvent={() => setForm(CHANGE_PASSWORD_FORM)}
                        />

                        {userDetails?.isSeller && (
                            <div className="grid gap-2">
                                <div>
                                    <Button
                                        name="Post Product"
                                        type="button"
                                        className="border px-3 rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md w-full"
                                        clickEvent={() => setForm(POST_PRODUCT_FORM)}
                                    />
                                </div>
                                <div>
                                    <Link to={`/user/${userDetails?._id}/my-products`}>
                                        <div className="text-center border px-3 rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md w-full">
                                            My Products
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid place-content-center">
                    {userDetails?.isSeller && form == POST_PRODUCT_FORM && (
                        <div>
                            <PostProduct setForm={setForm} />
                        </div>
                    )}
                    {form == CHANGE_PASSWORD_FORM && (
                        <div className="w-[17.5em]">
                            <ChangePassword
                                email={userDetails!.email}
                                user_id={userDetails!._id}
                                setForm={setForm}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
