import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

interface IIUserProfileDetails {
    email: string;
    _id: string;
    isSeller: boolean;
    date: number;
}

export default function useDecryptUser() {
    const [userDetails, setUserDetails] = useState<IIUserProfileDetails>();
    const [userChange, setUserChange] = useState(false);
    const [isNull, setIsNull] = useState(true);
    const user = localStorage.getItem("user");

    useEffect(() => {
        let stop = false;
        if (!stop) {
            if (user) {
                const decrypted = CryptoJS.AES.decrypt(user, import.meta.env.VITE_CRYPTO_HASHER!);
                const stringedDetials = decrypted.toString(CryptoJS.enc.Utf8);
                const decryptedDetailsObject = JSON.parse(stringedDetials);
                setUserDetails(decryptedDetailsObject);
                setIsNull(false);
            } else {
                setIsNull(true);
            }
        }
        return () => {
            stop = true;
            setIsNull(true);
        };
    }, [userChange]);

    return { userDetails, isNull, setUserChange };
}
