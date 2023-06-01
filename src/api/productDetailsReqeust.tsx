import axios from "axios";

export const productDetailsReqeust = async (prod_id: string) => {
    try {
        const { data } = await axios.get(
            `https://backend-commerce.vercel.app/shop/product/${prod_id}`
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const searchProductDetailsRequest = async (query: string) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/shop/search-products",
            { query: query },
            { headers: { Authorization: localStorage.getItem("token") } }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
