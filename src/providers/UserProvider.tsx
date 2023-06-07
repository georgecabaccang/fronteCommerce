import React, {
    PropsWithChildren,
    createContext,
    useState,
    useEffect,
    useContext,
    useRef,
} from "react";
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
    date: number;
}

interface IUserContext {
    userProfileDetails: IIUserProfileDetails;
    loginFrom: string;
    user: string | null;
    login: (hashedCredentials: string) => Promise<string>;
    logout: () => void;
    getNewTokens: () => void;
    getUserProfileDetails: () => void;
    refreshUserProfileDetails: () => void;
    setLoginFrom: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext>({
    userProfileDetails: {
        email: "",
        _id: "",
        isSeller: false,
        date: 0,
    },
    loginFrom: "",
    user: "",
    login: async () => {
        return "";
    },
    logout: () => {},
    getNewTokens: () => {},
    getUserProfileDetails: () => {},
    refreshUserProfileDetails: () => {},
    setLoginFrom: () => {},
});

export default function UserProvider(props: PropsWithChildren) {
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [userProfileDetails, setUserProfileDetails] = useState<IIUserProfileDetails>({
        email: "",
        _id: "",
        isSeller: false,
        date: 0,
    });
    const refreshTimer = useRef(0);
    const [loginFrom, setLoginFrom] = useState("login");

    const activeLinkContext = useContext(ActiveLinkContext);

    const navigate = useNavigate();

    const decryptDetails = (hashedDetails: string) => {
        const decrypted = CryptoJS.AES.decrypt(hashedDetails, import.meta.env.VITE_CRYPTO_HASHER!);
        const stringedDetials = decrypted.toString(CryptoJS.enc.Utf8);
        const decryptedDetailsObject = JSON.parse(stringedDetials);
        return decryptedDetailsObject;
    };

    const login = async (hashedCredentials: string) => {
        const response = await userLogin(hashedCredentials);
        if (response == "user not found" || response == "wrong password") {
            return "something's not right";
        } else {
            localStorage.setItem("user", response);
            setUser(response);
            if (loginFrom == "login") navigate("/");
            if (loginFrom == "shop") window.history.go(-1);
            return "OK";
        }
    };

    const logout = async () => {
        if (user) {
            const response = await logoutRequest();
            if (response == false) {
                console.log("something went wrong");
                return;
            }
            localStorage.removeItem("user");
            setUserProfileDetails({ email: "", _id: "", isSeller: false, date: 0 });
            activeLinkContext.setActiveLink("/login");
            setUser(null);
            navigate("/login");
        }
    };

    const refreshUserProfileDetails = async () => {
        if (user) {
            const userDetails = await decryptDetails(user);
            setUserProfileDetails(userDetails);
        }
    };

    const getNewTokens = async () => {
        if (user) {
            const userDetails = await decryptDetails(user);
            const updatedUserToken = await refreshTokenRequest(userDetails.email);
            localStorage.setItem("user", updatedUserToken);
            if (
                updatedUserToken == "no refresh token provided" ||
                updatedUserToken == "tampered refresh token"
            ) {
                alert("Refresh Token Invalid. Please Relogin.");
                logout();
            }
            setUser(updatedUserToken);
        }
    };

    const getUserProfileDetails = async () => {
        if (userProfileDetails.email) {
            const user = await getUserProfileDetailsRequest(userProfileDetails.email);
            localStorage.setItem("user", user);
            setUser(user);
        }
    };

    // Will make a request for new tokens every 10 mins to keep user logged in
    useEffect(() => {
        if (user && userProfileDetails.date) {
            refreshTimer.current = window.setTimeout(() => {
                getNewTokens();
            }, 600000);
        }
        return () => {
            clearTimeout(refreshTimer.current);
        };
    }, [userProfileDetails]);

    useEffect(() => {
        refreshUserProfileDetails();
    }, [user]);

    useEffect(() => {
        getNewTokens();
    }, []);

    const userContextValues: IUserContext = {
        userProfileDetails: userProfileDetails,
        loginFrom: loginFrom,
        user: user,
        login: login,
        logout: logout,
        getUserProfileDetails: getUserProfileDetails,
        refreshUserProfileDetails: refreshUserProfileDetails,
        getNewTokens: getNewTokens,
        setLoginFrom: setLoginFrom,
    };

    return <UserContext.Provider value={userContextValues}>{props.children}</UserContext.Provider>;
}
