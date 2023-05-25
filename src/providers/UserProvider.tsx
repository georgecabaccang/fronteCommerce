import React, { PropsWithChildren, createContext, useState, useEffect } from "react";
import { logoutRequest } from "../api/logoutRequest";
import { refreshTokenRequest } from "../api/refreshTokenRequest";

interface IUserContext {
    email: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAdmin: boolean;
    loginFrom: string;
    logout: () => void;
    getNewTokens: () => void;
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
    logout: () => {},
    getNewTokens: () => {},
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

    const logout = async () => {
        if (refreshToken) {
            const response = await logoutRequest(refreshToken);
            if (response == false) {
                console.log("something went wrong");
                return;
            }
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            setUserEmail(null);
            setAccessToken(null);
            setRefreshToken(null);
        }
    };

    const getNewTokens = async () => {
        if (refreshToken && userEmail) {
            const newTokens = await refreshTokenRequest(refreshToken, userEmail);
            if (typeof newTokens == "string") {
                alert("Refresh Token Invalid. Please Relogin.");
                logout();
            }
            localStorage.setItem("token", newTokens.accessToken);
            localStorage.setItem("refreshToken", newTokens.refreshToken);
            setAccessToken(localStorage.getItem("token"));
            setRefreshToken(localStorage.getItem("refreshToken"));
        }
    };

    useEffect(() => {
        getNewTokens();
    }, []);

    const userContextValues: IUserContext = {
        email: userEmail,
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAdmin: false,
        loginFrom: loginFrom,
        logout: logout,
        getNewTokens: getNewTokens,
        setUserEmail: setUserEmail,
        setAccessToken: setAccessToken,
        setRefreshToken: setRefreshToken,
        setLoginFrom: setLoginFrom,
    };

    return <UserContext.Provider value={userContextValues}>{props.children}</UserContext.Provider>;
}
