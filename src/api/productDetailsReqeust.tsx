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

export const postProductRequest = async (
    email: string,
    product: {
        image: string;
        productName: string;
        description: string;
        price: number;
        discount: number;
        stock: number;
    }
) => {
    try {
        const { data } = await axios.post(
            "/shop/add-product",
            {
                email: email,
                product: product,
            },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const getUserProductsRequest = async (email: string) => {
    try {
        const { data } = await axios.post(
            "/shop/my-products",
            {
                email: email,
            },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
