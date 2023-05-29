import axios from "axios";

export const productDetailsReqeust = async (prod_id: string) => {
    try {
        const { data } = await axios.get(`https://ecommercebackend.netlify.app/shop/product/${prod_id}`);
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
