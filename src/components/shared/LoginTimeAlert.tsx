import { useContext } from "react";
import Button from "./Button";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";

interface ILoginTimeAlert {
    setExtendTimePrompt: React.Dispatch<React.SetStateAction<boolean>>;
    countDown: number;
}

export default function LoginTimeAlert(props: ILoginTimeAlert) {
    const userContext = useContext(UserContext);

    const extendTime = async () => {
        userContext.getNewTokens();
        props.setExtendTimePrompt(false);
    };

    const logMeOutHandler = () => {
        userContext.logout();
    };

    return (
        <div>
            {props.countDown}
            <Button name="Yes" clickEvent={extendTime} />
            <Link to={"/logout"} onClick={logMeOutHandler}>
                Log Me Out
            </Link>
        </div>
    );
}
