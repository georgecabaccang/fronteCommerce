import { useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import Button from "../shared/Button";
import ChangePassword from "../ChangePassword";

export default function Profile() {
    const [changePassword, setChangePassword] = useState(false);

    const userContext = useContext(UserContext);

    const { email, _id, isSeller } = userContext.userProfileDetails;
    let seller: string;
    if (isSeller) {
        seller = "Yes";
    } else {
        seller = "No";
    }
    console.log(changePassword);

    return (
        <div>
            <div>User ID: {_id}</div>
            <div>Email: {email}</div>
            <div>Seller: {seller}</div>
            <Button
                name="Change Password"
                className="border px-3 rounded bg-blue-200 shadow-sm"
                clickEvent={() => setChangePassword(true)}
            />
            {changePassword && <ChangePassword />}
        </div>
    );
}
