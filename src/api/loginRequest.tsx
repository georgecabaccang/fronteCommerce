import axios from "axios";
import { ILoginUser } from "../types/userRequestTypes";

export const userLogin = async (userCredentials: ILoginUser) => {
    const { data } = await axios.post("http://localhost:8002/user/login", {
        email: userCredentials.email,
        password: userCredentials.password,
    });
    return data;
};
