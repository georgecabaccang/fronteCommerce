import { useContext } from "react";
import Button from "./Button";
import { refreshTokenRequest } from "../../api/refreshTokenRequest";
import { UserContext } from "../../providers/UserProvider";

interface ILoginTimeAlert {
    setExtendTimePrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginTimeAlert(props: ILoginTimeAlert) {
    const userContext = useContext(UserContext);

    const extendTime = async () => {
        if (userContext.refreshToken && userContext.email) {
            const newTokens = await refreshTokenRequest(
                userContext.refreshToken,
                userContext.email
            );
            localStorage.setItem("token", newTokens.accessToken);
            localStorage.setItem("refreshToken", newTokens.refreshToken);
            userContext.setAccessToken(localStorage.getItem("token"));
            userContext.setRefreshToken(localStorage.getItem("refreshToken"));
            props.setExtendTimePrompt(false);
        }
    };
    return (
        <div>
            <Button name="Yes" clickEvent={extendTime} />
            <Button name="Log Me Out" />
        </div>
    );
}
