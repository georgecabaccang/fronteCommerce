import { useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import Button from "../shared/Button";
import ChangePassword from "../ChangePassword";
import { updateSellerStatusRequest } from "../../api/userRequests";
import PostProduct from "../products/PostProduct";
import { Link } from "react-router-dom";

export default function Profile() {
    const [changePasswordShown, setChangePasswordShown] = useState(false);
    const [postProductFormShown, setPostProductFormShown] = useState(false);

    const userContext = useContext(UserContext);

    const { email, _id, isSeller } = userContext.userProfileDetails;
    let seller: string;
    if (isSeller) {
        seller = "Yes";
    } else {
        seller = "No";
    }

    const updateSellerStatus = async () => {
        const response = await updateSellerStatusRequest(email, _id);
        if (response === "OK") {
            setPostProductFormShown(false);
            return userContext.getUserProfileDetails();
        }
        setPostProductFormShown(false);
        return "something wrong happened when updating seller status";
    };

    return (
        <div>
            <div>User ID: {_id}</div>
            <div>Email: {email}</div>
            <div>
                <div>Seller: {seller}</div>
                <div>
                    <Button
                        type="button"
                        name={isSeller ? "Revert To Buyer" : "Become Seller"}
                        className="border px-3 rounded bg-blue-200 shadow-sm  hover:bg-blue-500"
                        clickEvent={updateSellerStatus}
                    />
                </div>
            </div>
            {isSeller && (
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
                            to={`/user/${userContext.userProfileDetails._id}/my-products`}
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
                    email={email}
                    user_id={_id}
                    setChangePasswordShown={setChangePasswordShown}
                />
            )}
        </div>
    );
}
