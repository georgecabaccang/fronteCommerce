import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";

interface ILoginTimeAlert {
    setExtendTimePrompt: React.Dispatch<React.SetStateAction<boolean>>;
    extendTimePrompt: boolean;
    countDown: number;
    setCountDown: React.Dispatch<React.SetStateAction<number>>;
}

export default function LoginTimeAlert(props: ILoginTimeAlert) {
    const userContext = useContext(UserContext);

    const extendTime = async () => {
        userContext.getNewTokens();
        props.setExtendTimePrompt(false);
    };

    const logMeOutHandler = () => {
        props.setExtendTimePrompt(false);
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
