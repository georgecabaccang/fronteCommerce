import { PropsWithChildren, useState, useEffect, useContext, useRef } from "react";
import Navigation from "./Navigation";
import LoginTimeAlert from "./LoginTimeAlert";
import { UserContext } from "../../providers/UserProvider";

const TIME_FOR_PROMPT = 3000;
const COUNT_DOWN_TIMER = 10;

export default function Layout(props: PropsWithChildren) {
    const timer = useRef<number>();
    const [extendTimePrompt, setExtendTimePrompt] = useState(false);
    const [countDown, setCountDown] = useState(COUNT_DOWN_TIMER);

    const userContext = useContext(UserContext);

    // MAYBE JUST GET THE TIME FROM BACKEND@@@@@@@@@@@@@@@@@@@@@@@
    // let count = COUNT_DOWN_TIMER;
    // const startCountDown = () => {
    //     if (count > 0) {
    //         setInterval(() => {
    //             setCountDown(count);
    //             count--;
    //             console.log(count);
    //             startCountDown();
    //         }, 1000);
    //     }
    // };

    useEffect(() => {
        if (userContext.accessToken) {
            timer.current = setTimeout(() => {
                setExtendTimePrompt(true);
                // startCountDown();
            }, 1000);
            return;
        }
        if (!userContext.accessToken) {
            clearTimeout(timer.current);
            setExtendTimePrompt(false);
            return;
        }
    }, [userContext.accessToken]);

    return (
        <div>
            {extendTimePrompt && (
                <LoginTimeAlert
                    setExtendTimePrompt={setExtendTimePrompt}
                    extendTimePrompt={extendTimePrompt}
                    countDown={countDown}
                    setCountDown={setCountDown}
                />
            )}
            <Navigation />
            <div>{props.children}</div>
        </div>
    );
}
