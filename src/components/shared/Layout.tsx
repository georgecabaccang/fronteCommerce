import { PropsWithChildren, useState, useEffect, useContext, useRef } from "react";
import Navigation from "./Navigation";
import LoginTimeAlert from "./LoginTimeAlert";
import { UserContext } from "../../providers/UserProvider";

export default function Layout(props: PropsWithChildren) {
    const timer = useRef<number>();
    const [extendTimePrompt, setExtendTimePrompt] = useState(false);

    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.accessToken) {
            timer.current = setTimeout(() => {
                setExtendTimePrompt(true);
            }, 2000);
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
            {extendTimePrompt && <LoginTimeAlert setExtendTimePrompt={setExtendTimePrompt} />}
            <Navigation />
            <div>{props.children}</div>
        </div>
    );
}
