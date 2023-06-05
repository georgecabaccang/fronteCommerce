import React, { createContext, useState, PropsWithChildren } from "react";

interface IActiveLink {
    link: string;
    setActiveLink: React.Dispatch<React.SetStateAction<string>>;
}

export const ActiveLinkContext = createContext<IActiveLink>({
    link: "",
    setActiveLink: () => {},
});

export default function ActiveLinkProvider(props: PropsWithChildren) {
    const [activeLink, setActiveLink] = useState(window.location.pathname);

    const activeLinkContextValues = {
        link: activeLink,
        setActiveLink: setActiveLink,
    };

    return (
        <ActiveLinkContext.Provider value={activeLinkContextValues}>
            {props.children}
        </ActiveLinkContext.Provider>
    );
}
