import { PropsWithChildren, useState, useEffect, useContext } from "react";
import Navigation from "./Navigation";
import LoginTimeAlert from "./LoginTimeAlert";
import { UserContext } from "../../providers/UserProvider";

export default function Layout(props: PropsWithChildren) {
    const [extendTimePrompt, setExtendTimePrompt] = useState(false);

    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.accessToken) {
            setTimeout(() => {
                setExtendTimePrompt(true);
            }, 5000);
            return;
        }
        setExtendTimePrompt(false);
    }, [userContext.accessToken]);

    return (
        <div>
            {extendTimePrompt && <LoginTimeAlert setExtendTimePrompt={setExtendTimePrompt} />}
            <Navigation />
            <div>{props.children}</div>
        </div>
    );
}
