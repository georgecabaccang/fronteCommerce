import { useContext } from "react";
import Button from "./Button";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import Countdown, { zeroPad } from "react-countdown";

interface ILoginTimeAlert {
    setExtendTimePrompt: React.Dispatch<React.SetStateAction<boolean>>;
    extendTimePrompt: boolean;
    countDown: number;
    setCountDown: React.Dispatch<React.SetStateAction<number>>;
}

interface ITimes {
    minutes: number;
    seconds: number;
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

    const onCompleteHandler = () => {
        return userContext.logout();
    };

    const timer = (times: ITimes) => {
        return (
            <span>
                {zeroPad(times.minutes)}:{zeroPad(times.seconds)}
            </span>
        );
    };

    return (
        <div>
            {props.extendTimePrompt && (
                <div className="text-red-800">
                    <Countdown
                        date={Date.now() + 180000}
                        renderer={timer}
                        onComplete={onCompleteHandler}
                    />
                </div>
            )}
            <Button name="Yes" clickEvent={extendTime} />
            <Link to={"/logout"} onClick={logMeOutHandler}>
                Log Me Out
            </Link>
        </div>
    );
}
