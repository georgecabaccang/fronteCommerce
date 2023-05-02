export default async function useProductDetails(productID: string) {
    try {
        const response = await fetch(
            `http://localhost:8002/shop/product/${productID}`
        );
        const productDetails = await response.json();
        return productDetails;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
}
