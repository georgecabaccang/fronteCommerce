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
        const resposne = await getProductsRequest();
        setProducts(resposne);
    };

    const submitSearchHandler = async (event: FormEvent) => {
        event.preventDefault();
        if (SEARCH_PARAMS_FIND) {
            const response = await searchProductDetailsRequest(SEARCH_PARAMS_FIND!);
            setProducts(response);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="mx-5 mt-5">
            <div className="grid grid-cols-1 text-center min-w-full my-2">
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
            <div>
                {products.length != 0 ? (
                    <div className="grid grid-cols-6 gap-2">
                        {products.map((product) => {
                            return <Product product={product} key={product._id} isSeller={false} />;
                        })}
                    </div>
                ) : (
                    <div className="text-center">No Products Found</div>
                )}
            </div>
        </div>
    );
}
