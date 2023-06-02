import React, { PropsWithChildren, createContext, useState, useEffect, useContext } from "react";
import { logoutRequest } from "../api/logoutRequest";
import { refreshTokenRequest } from "../api/refreshTokenRequest";
import { useNavigate } from "react-router-dom";
import { ActiveLinkContext } from "./ActiveLinkProvider";
import { userLogin } from "../api/loginRequest";

interface IIUserProfileDetails {
    email: string;
    _id: string;
    isSeller: boolean;
}

interface IUserContext {
    userProfileDetails: IIUserProfileDetails;
    accessToken: string | null;
    refreshToken: string | null;
    isSeller: boolean;
    loginFrom: string;
    logout: () => void;
    getNewTokens: () => void;
    setUserProfileDetails: React.Dispatch<React.SetStateAction<IIUserProfileDetails>>;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
    setLoginFrom: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext>({
    userProfileDetails: {
        email: "",
        _id: "",
        isSeller: false,
    },
    accessToken: "",
    refreshToken: "",
    isSeller: false,
    loginFrom: "",
    logout: () => {},
    getNewTokens: () => {},
    setUserProfileDetails: () => {},
    setAccessToken: () => {},
    setRefreshToken: () => {},
    setLoginFrom: () => {},
});

export default function UserProvider(props: PropsWithChildren) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [userProfileDetails, setUserProfileDetails] = useState<IIUserProfileDetails>({
        email: "",
        _id: "",
        isSeller: false,
    });
    const [loginFrom, setLoginFrom] = useState("login");

    const activeLinkContext = useContext(ActiveLinkContext);

    const navigate = useNavigate();

    const login = async (userCredentials: { email: string; password: string }) => {
        const userDetails = await userLogin(userCredentials);
    };

    const logout = async () => {
        if (refreshToken) {
            const response = await logoutRequest(refreshToken);
            if (response == false) {
                console.log("something went wrong");
                return;
            }
            localStorage.removeItem("userID");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            setAccessToken(null);
            setRefreshToken(null);
            activeLinkContext.setActiveLink("login");

            navigate("/login");
        }
    };

    const getNewTokens = async () => {
        if (refreshToken) {
            const newTokens = await refreshTokenRequest(refreshToken, userProfileDetails.email);
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
        if (accessToken && refreshToken) {
            getNewTokens();
        }
    }, []);

    const userContextValues: IUserContext = {
        userProfileDetails: userProfileDetails,
        accessToken: accessToken,
        refreshToken: refreshToken,
        isSeller: false,
        loginFrom: loginFrom,
        logout: logout,
        getNewTokens: getNewTokens,
        setUserProfileDetails: setUserProfileDetails,
        setAccessToken: setAccessToken,
        setRefreshToken: setRefreshToken,
        setLoginFrom: setLoginFrom,
    };

    return <UserContext.Provider value={userContextValues}>{props.children}</UserContext.Provider>;
}
