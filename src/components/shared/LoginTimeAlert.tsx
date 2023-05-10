import { useContext } from "react";
import Button from "./Button";
import { refreshTokenRequest } from "../../api/refreshTokenRequest";
import { UserContext } from "../../providers/UserProvider";

export default function LoginTimeAlert() {
    const userContext = useContext(UserContext);

    const extendTime = async () => {
        if (userContext.refreshToken && userContext.email)
            await refreshTokenRequest(userContext.refreshToken, userContext.email);
    };
    return (
        <div>
            <Button name="Yes" clickEvent={extendTime} />
            <Button name="Log Me Out" />
        </div>
    );
}
