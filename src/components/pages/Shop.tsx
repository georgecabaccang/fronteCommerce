import { useState, FormEvent, useEffect } from "react";

import Product from "../products/Product";
import { useSearchParams } from "react-router-dom";
import Button from "../shared/Button";
import { getProductsRequest, searchProductDetailsRequest } from "../../api/productDetailsReqeust";

interface IProduct {
    _id: string;
    image: string;
    productName: string;
    description: string;
    price: number;
    discount: number;
    discountedPrice: number;
    stock: number;
    salesCount: number;
    postedBy: string;
}

export default function Shop() {
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const SEARCH_PARAMS_FIND = searchParams.get("find") ? searchParams.get("find") : "";

    // BETTER SEARCH, BUT NOT GOOD FOR ECOMMERCE WHERE NEEDS TO BE IN BACKEND
    // const matchingFunction = (index: number, array: Array<IProductProperties>, query: string) => {
    //     const queryLowerAndNoSpace = query.replace(/\s/g, "").toLocaleLowerCase()!;
    //     console.log(queryLowerAndNoSpace);
    //     const letterArray = queryLowerAndNoSpace.split("");
    //     const productNameLowerCased = array[index].productName.toLocaleLowerCase();

    //     let letterIndexInLetterArray = 0;
    //     let numberOfMatchedLetters = 0;

    //     for (let indexLetterArray = 0; indexLetterArray < letterArray.length; indexLetterArray++) {
    //         for (
    //             let indexProductNameLowerCased = 0;
    //             indexProductNameLowerCased < productNameLowerCased.length;
    //             indexProductNameLowerCased++
    //         ) {
    //             if (
    //                 productNameLowerCased.charAt(indexProductNameLowerCased) ===
    //                 letterArray[letterIndexInLetterArray]
    //             ) {
    //                 console.log(productNameLowerCased, letterArray[letterIndexInLetterArray]);
    //                 numberOfMatchedLetters++;
    //                 continue;
    //             } else {
    //                 numberOfMatchedLetters--;
    //                 continue;
    //             }
    //         }
    //         letterIndexInLetterArray++;
    //     }

    //     console.log(numberOfMatchedLetters);
    //     return numberOfMatchedLetters;
    // };

    // const searchFunction = () => {
    //     const productsThatMatched: Array<IProductProperties> = [];
    //     for (let indexInShop = 0; indexInShop < productsContext.products.length; indexInShop++) {
    //         if (
    //             productsContext.products[indexInShop].productName
    //                 .toLocaleLowerCase()
    //                 .includes(SEARCH_PARAMS_FIND!)
    //         ) {
    //             console.log(
    //                 productsContext.products[indexInShop].productName,
    //                 "has",
    //                 SEARCH_PARAMS_FIND
    //             );
    //             productsThatMatched.unshift(productsContext.products[indexInShop]);
    //         } else {
    //             const numberOfMatches = matchingFunction(
    //                 indexInShop,
    //                 productsContext.products,
    //                 SEARCH_PARAMS_FIND!
    //             );
    //             const productWithMatchCount = {
    //                 ...productsContext.products[indexInShop],
    //                 matchCount: numberOfMatches,
    //             };
    //             console.log(productWithMatchCount.matchCount);
    //             if (numberOfMatches == 0) {
    //                 continue;
    //             }

    //             if (productsThatMatched.length == 0) {
    //                 productsThatMatched.push(productWithMatchCount);
    //             } else {
    //                 for (
    //                     let indexProductsThatMatched = 0;
    //                     indexProductsThatMatched < productsThatMatched.length;
    //                     indexProductsThatMatched++
    //                 ) {
    //                     if (
    //                         productWithMatchCount.matchCount >=
    //                         productsThatMatched[indexProductsThatMatched].matchCount!
    //                     ) {
    //                         productsThatMatched.splice(
    //                             indexProductsThatMatched,
    //                             0,
    //                             productWithMatchCount
    //                         );
    //                         break;
    //                     } else {
    //                         productsThatMatched.splice(
    //                             indexProductsThatMatched + 1,
    //                             0,
    //                             productWithMatchCount
    //                         );
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     console.log(productsThatMatched);
    //     return productsThatMatched;
    // };

    // const foundProducts = useMemo(() => {
    //     if (SEARCH_PARAMS_FIND) {
    //         setFilteredProducts(searchFunction()!);
    //         return filteredProducts;
    //     }
    //     return productsContext.products;
    // }, [SEARCH_PARAMS_FIND, productsContext.products]);

    // OLD WAY ---- THIS ONLY HANDLES PERFECT MATCH OF QUERY------------------------- BETTER IN THIS CASE
    // const foundProducts = useMemo(() => {
    //     return inShop.filter((product) => {
    //         if (!SEARCH_PARAMS_FIND) {
    //             return inShop;
    //         }
    //         return product.productName
    //             .toLowerCase()
    //             .includes(SEARCH_PARAMS_FIND?.toLocaleLowerCase() as string);
    //     });
    // }, [SEARCH_PARAMS_FIND, inShop]);

    // useEffect(() => {
    //     if (productsContext.products) {
    //         setInShop(productsContext.products);
    //     }
    // }, [productsContext.products]);

    const getProducts = async () => {
        setIsLoading(true);
        const resposne = await getProductsRequest();
        setProducts(resposne);
        setIsLoading(false);
    };

    const submitSearchHandler = async (event: FormEvent) => {
        event.preventDefault();
        if (SEARCH_PARAMS_FIND) {
            setIsLoading(true);
            const response = await searchProductDetailsRequest(SEARCH_PARAMS_FIND!);
            setProducts(response);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="mx-5 mt-5">
            <div className="grid grid-cols-1 text-center min-w-full mt-10">
                <form onSubmit={submitSearchHandler}>
                    <Button
                        name="All Products"
                        type="button"
                        className="border rounded px-2 mx-2 bg-white shadow-sm align-middle hover:shadow-md"
                        clickEvent={() => {
                            getProducts();
                        }}
                    />
                    <input
                        type="text"
                        className="border min-w-[50%] rounded focus:outline-none focus:shadow-md hover:shadow-md py-1 px-2 text-[0.8em]"
                        value={SEARCH_PARAMS_FIND as string}
                        onChange={(event) => setSearchParams({ find: event.target.value })}
                    />
                    <Button
                        name="Search"
                        className="border rounded px-2 mx-2 bg-white shadow-sm align-middle hover:shadow-md"
                        type="submit"
                    />
                </form>
            </div>
            <div className="mt-14">
                {isLoading && (
                    <div className="grid mt-5 text-center place-content-center min-h-[80vh]">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    </div>
                )}
                {!isLoading && products.length != 0 && (
                    <div className="grid grid-cols-6 gap-2">
                        {products.map((product) => {
                            return <Product product={product} key={product._id} />;
                        })}
                    </div>
                )}

                {!isLoading && products.length == 0 && (
                    <div className="text-center">No Products Found</div>
                )}
            </div>
        </div>
    );
}
