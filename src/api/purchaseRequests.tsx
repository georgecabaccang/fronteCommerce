import axios from "axios";

export const getPurchasesRequest = async () => {
    try {
        const { data } = await axios.post(
            "https://keen-profiterole-fc0f7a.netlify.app/purchases",
            { email: localStorage.getItem("userEmail") },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
