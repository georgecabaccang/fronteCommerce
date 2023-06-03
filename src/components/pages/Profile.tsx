import { useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import Button from "../shared/Button";
import ChangePassword from "../ChangePassword";
import { updateSellerStatusRequest } from "../../api/userRequests";

export default function Profile() {
    const [changePasswordShown, setChangePasswordShown] = useState(false);

    const userContext = useContext(UserContext);

    const { email, _id, isSeller } = userContext.userProfileDetails;
    let seller: string;
    if (isSeller) {
        seller = "Yes";
    } else {
        seller = "No";
    }

    const updateSellerStatus = async () => {
        console.log('?')
        const response = await updateSellerStatusRequest(email, _id);
        userContext.updateUserDetailsInStore(response);
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

            {!changePasswordShown && (
                <Button
                    name="Change Password"
                    className="border px-3 rounded bg-blue-200 shadow-sm  hover:bg-blue-500"
                    clickEvent={() => setChangePasswordShown(true)}
                />
            )}
            {changePasswordShown && (
                <ChangePassword setChangePasswordShown={setChangePasswordShown} />
            )}
        </div>
    );
}
