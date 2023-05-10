import { PropsWithChildren, useState, useEffect, useContext } from "react";
import Navigation from "./Navigation";
import LoginTimeAlert from "./LoginTimeAlert";
import { UserContext } from "../../providers/UserProvider";

export default function Layout(props: PropsWithChildren) {
    const [extendTime, setExtendTime] = useState(false);

    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.accessToken) {
            setTimeout(() => {
                setExtendTime(true);
            }, 5000);
            return;
        }
        setExtendTime(false);
    }, [userContext.accessToken]);

    return (
        <div>
            {extendTime && <LoginTimeAlert />}
            <Navigation />
            <div>{props.children}</div>
        </div>
    );
}
