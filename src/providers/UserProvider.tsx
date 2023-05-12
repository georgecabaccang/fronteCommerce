import React, { PropsWithChildren, createContext, useState } from "react";

interface IUserContext {
    email: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAdmin: boolean;
    loginFrom: string;
    setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
    setLoginFrom: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext>({
    email: "",
    accessToken: "",
    refreshToken: "",
    isAdmin: false,
    loginFrom: "",
    setUserEmail: () => {},
    setAccessToken: () => {},
    setRefreshToken: () => {},
    setLoginFrom: () => {},
});

export default function UserProvider(props: PropsWithChildren) {
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
    const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [loginFrom, setLoginFrom] = useState("login");

    const userContextValues: IUserContext = {
        email: userEmail,
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAdmin: false,
        loginFrom: loginFrom,
        setUserEmail: setUserEmail,
        setAccessToken: setAccessToken,
        setRefreshToken: setRefreshToken,
        setLoginFrom: setLoginFrom,
    };

    return <UserContext.Provider value={userContextValues}>{props.children}</UserContext.Provider>;
}
