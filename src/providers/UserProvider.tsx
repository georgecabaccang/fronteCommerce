import React, { PropsWithChildren, createContext, useState } from "react";

interface IUserContext {
    accessToken: string | null;
    refreshToken: string | null;
    isAdmin: boolean;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<IUserContext>({
    accessToken: "",
    refreshToken: "",
    isAdmin: false,
    setAccessToken: () => {},
    setRefreshToken: () => {},
});

export default function UserProvider(props: PropsWithChildren) {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("token")
    );
    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem("refreshToken")
    );

    const userContextValues: IUserContext = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAdmin: false,
        setAccessToken: setAccessToken,
        setRefreshToken: setRefreshToken,
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {props.children}
        </UserContext.Provider>
    );
}
