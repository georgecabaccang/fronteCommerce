import React, { PropsWithChildren, createContext, useState, useEffect, useContext } from "react";
import { logoutRequest } from "../api/logoutRequest";
import { refreshTokenRequest } from "../api/refreshTokenRequest";
import { useNavigate } from "react-router-dom";
import { ActiveLinkContext } from "./ActiveLinkProvider";
import { userLogin } from "../api/loginRequest";
import CryptoJS from "crypto-js";
import { getUserProfileDetailsRequest } from "../api/userRequests";

interface IIUserProfileDetails {
    email: string;
    _id: string;
    isSeller: boolean;
}

interface IUserContext {
    userProfileDetails: IIUserProfileDetails;
    loginFrom: string;
    user: string | null;
    login: (userCredentials: { email: string; password: string }) => Promise<string>;
    logout: () => void;
    getNewTokens: () => void;
    getUserProfileDetails: () => void;
    // updateUserDetailsInStore: (userDetails: IIUserProfileDetails) => void;
    refreshUserProfileDetails: () => void;
    setLoginFrom: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext>({
    userProfileDetails: {
        email: "",
        _id: "",
        isSeller: false,
    },
    loginFrom: "",
    user: "",
    login: async () => {
        return "";
    },
    logout: () => {},
    getNewTokens: () => {},
    getUserProfileDetails: () => {},
    // updateUserDetailsInStore: () => {},
    refreshUserProfileDetails: () => {},
    setLoginFrom: () => {},
});

export default function UserProvider(props: PropsWithChildren) {
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [userProfileDetails, setUserProfileDetails] = useState<IIUserProfileDetails>({
        email: "",
        _id: "",
        isSeller: false,
    });
    const [loginFrom, setLoginFrom] = useState("login");

    const activeLinkContext = useContext(ActiveLinkContext);

    const navigate = useNavigate();

    const decryptDetails = (hashedDetails: string) => {
        const decrypted = CryptoJS.AES.decrypt(hashedDetails, import.meta.env.VITE_CRYPTO_HASHER!);
        const stringedDetials = decrypted.toString(CryptoJS.enc.Utf8);
        const decryptedDetailsObject = JSON.parse(stringedDetials);
        return decryptedDetailsObject;
    };

    const login = async (userCredentials: { email: string; password: string }) => {
        const response = await userLogin(userCredentials);
        if (response == "user not found" || response == "wrong password") {
            return "something's not right";
        }
        localStorage.setItem("user", response);
        setUser(response);
        if (loginFrom == "login") navigate("/");
        if (loginFrom == "shop") window.history.go(-1);
        return "OK";
    };

    const logout = async () => {
        if (user) {
            const response = await logoutRequest();
            if (response == false) {
                console.log("something went wrong");
                return;
            }
            localStorage.removeItem("user");
            activeLinkContext.setActiveLink("/login");
            setUser(null);
            navigate("/login");
        }
    };

    const getNewTokens = async () => {
        if (userProfileDetails.email) {
            const response = await refreshTokenRequest(userProfileDetails.email);
            if (response != "OK") {
                alert("Refresh Token Invalid. Please Relogin.");
                logout();
            }
        }
    };

    // const updateUserDetailsInStore = (userProfileDetails: IIUserProfileDetails) => {
    //     setUserProfileDetails(userProfileDetails);
    // };

    const refreshUserProfileDetails = async () => {
        if (user) {
            const userDetails = await decryptDetails(user);
            setUserProfileDetails(userDetails);
        }
    };

    const getUserProfileDetails = async () => {
        if (userProfileDetails.email) {
            const user = await getUserProfileDetailsRequest(userProfileDetails.email);
            setUser(user);
        }
    };

    useEffect(() => {
        if (userProfileDetails.email) {
            getNewTokens();
        }
    }, [userProfileDetails.email]);

    useEffect(() => {
        refreshUserProfileDetails();
    }, [user]);

    const userContextValues: IUserContext = {
        userProfileDetails: userProfileDetails,
        loginFrom: loginFrom,
        user: user,
        login: login,
        logout: logout,
        getUserProfileDetails: getUserProfileDetails,
        // updateUserDetailsInStore: updateUserDetailsInStore,
        refreshUserProfileDetails: refreshUserProfileDetails,
        getNewTokens: getNewTokens,
        setLoginFrom: setLoginFrom,
    };

    return <UserContext.Provider value={userContextValues}>{props.children}</UserContext.Provider>;
}
