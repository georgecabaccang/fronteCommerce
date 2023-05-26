import { useContext } from "react";
import Button from "./Button";
import { UserContext } from "../../providers/UserProvider";
import Countdown, { zeroPad } from "react-countdown";
import Swal from "sweetalert2";

const BUTTON_CLASSNAME = "border border-black bg-gray-200 py-1 px-3 rounded hover:bg-gray-300";

interface ILoginTimeAlert {
    setExtendTimePrompt: React.Dispatch<React.SetStateAction<boolean>>;
    extendTimePrompt: boolean;
}

interface ITimes {
    minutes: number;
    seconds: number;
    completed: boolean;
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
        Swal.fire({
            title: "Logged Out Due To Inactivity.",
            confirmButtonColor: "gray",
            confirmButtonText: "Okay",
        });
        props.setExtendTimePrompt(false);
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
        <div className="grid grid-cols-1 text-center">
            <div>Time Remaining:</div>
            {props.extendTimePrompt && (
                <div className="mt-1 mb-3">
                    <Countdown
                        date={Date.now() + 180000}
                        renderer={timer}
                        onComplete={onCompleteHandler}
                    />
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 text-[0.9em]">
                <Button
                    name="Keep Me Logged In"
                    className={BUTTON_CLASSNAME}
                    clickEvent={extendTime}
                />
                <Button
                    name="Log Me Out"
                    className={BUTTON_CLASSNAME}
                    clickEvent={logMeOutHandler}
                />
            </div>
        </div>
    );
}
