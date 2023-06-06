import { PropsWithChildren, useState, useEffect, useContext, useRef } from "react";
import Navigation from "./Navigation";
import LoginTimeAlert from "./LoginTimeAlert";
import { UserContext } from "../../providers/UserProvider";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";

const TIME_FOR_PROMPT = 300000;

export default function Layout(props: PropsWithChildren) {
    const timer = useRef<number>();
    const [extendTimePrompt, setExtendTimePrompt] = useState(false);

    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    useEffect(() => {
        if (userContext.user) {
            timer.current = window.setTimeout(() => {
                // set window.setTimeout because using @types/nodes in dependencies
                setExtendTimePrompt(true);
            }, TIME_FOR_PROMPT);
            return;
        }
        return () => {
            clearTimeout(timer.current);
            setExtendTimePrompt(false);
        };
    }, [userContext.user, activeLinkContext.link]);

    return (
        <div>
            {extendTimePrompt && (
                <div className="flex fixed z-50 bg-black bg-opacity-60 min-h-full min-w-full place-content-center items-center">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white max-h-[10em] min-h-[8em]">
                        <div className="px-6 py-4">
                            <div className="flex place-content-center font-bold text-xl mb-2">
                                Are You Still There?
                            </div>
                            <LoginTimeAlert
                                setExtendTimePrompt={setExtendTimePrompt}
                                extendTimePrompt={extendTimePrompt}
                            />
                        </div>
                    </div>
                </div>
            )}
            <Navigation />
            <div>{props.children}</div>
        </div>
    );
}
