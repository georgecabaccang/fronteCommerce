import axios from "../axios";

export const productDetailsReqeust = async (prod_id: string) => {
    try {
        const { data } = await axios.get(`/shop/product/${prod_id}`);
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const searchProductDetailsRequest = async (query: string) => {
    try {
        const { data } = await axios.post("/shop/search-products", { query: query });
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const getProductsRequest = async () => {
    try {
        const { data } = await axios.get("/shop");
        if (typeof data != "string") {
            return data;
        }
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
