import axios from "axios";

export const productDetailsReqeust = async (productID: string) => {
    try {
        const { data } = await axios.get(`http://localhost:8002/shop/product/${productID}`);
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
