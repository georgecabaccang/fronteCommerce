import { useContext } from "react";
import Button from "./Button";
import { refreshTokenRequest } from "../../api/refreshTokenRequest";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";

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
            if (typeof newTokens == "string") {
                alert("Refresh Token Invalid. Please Relogin.");
                userContext.logout();
            }
            localStorage.setItem("token", newTokens.accessToken);
            localStorage.setItem("refreshToken", newTokens.refreshToken);
            userContext.setAccessToken(localStorage.getItem("token"));
            userContext.setRefreshToken(localStorage.getItem("refreshToken"));
            props.setExtendTimePrompt(false);
        }
    };

    const logMeOutHandler = () => {
        userContext.logout();
    };

    return (
        <div>
            <Button name="Yes" clickEvent={extendTime} />
            <Link to={"/logout"} onClick={logMeOutHandler}>
                Log Me Out
            </Link>
        </div>
    );
}
