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
import useDecryptUser from "../hooks/useDecryptUser";

interface IUserContext {
    loginFrom: string;
    user: string | null;
    login: (hashedCredentials: string) => Promise<string>;
    logout: () => void;
    getNewTokens: () => void;
    setLoginFrom: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext>({
    loginFrom: "",
    user: "",
    login: async () => {
        return "";
    },
    logout: () => {},
    getNewTokens: () => {},
    setLoginFrom: () => {},
});

export default function UserProvider(props: PropsWithChildren) {
    const [user, setUser] = useState(localStorage.getItem("user"));
    const { userDetails } = useDecryptUser();
    const [loginFrom, setLoginFrom] = useState("login");

    const refreshTimer = useRef<number>();

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
            setUser(null);
            activeLinkContext.setActiveLink("/login");
            setUser(null);
            navigate("/login");
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
                alert(updatedUserToken);
                logout();
            }
            setUser(updatedUserToken);
        }
    };

    // Will make a request for new tokens every 10 mins to keep user logged in
    useEffect(() => {
        if (user && userDetails) {
            refreshTimer.current = window.setTimeout(() => {
                getNewTokens();
            }, 600000);
        }
        return () => {
            clearTimeout(refreshTimer.current);
        };
    }, []);

    // useEffect(() => {
    //     getNewTokens();
    // }, []);

    const userContextValues: IUserContext = {
        loginFrom: loginFrom,
        user: user,
        login: login,
        logout: logout,
        getNewTokens: getNewTokens,
        setLoginFrom: setLoginFrom,
    };

    return <UserContext.Provider value={userContextValues}>{props.children}</UserContext.Provider>;
}
