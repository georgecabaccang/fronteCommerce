import { useContext, FormEvent, useEffect } from "react";

import Product from "../products/Product";
import { ProductsContext } from "../../providers/ProductsProvider";
import { useSearchParams } from "react-router-dom";
import Button from "../shared/Button";

export default function Shop() {
    const productsContext = useContext(ProductsContext);

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

    const submitSearchHandler = (event: FormEvent) => {
        event.preventDefault();
        if (SEARCH_PARAMS_FIND) return productsContext.searchProducts(SEARCH_PARAMS_FIND!);
    };

    useEffect(() => {
        if (productsContext.products.length == 0) {
            productsContext.getProducts();
        }
    }, []);

    return (
        <div className="mx-5 mt-5">
            <div className="flex min-w-100% border justify-center">
                <form onSubmit={submitSearchHandler}>
                    <input
                        type="text"
                        className="border min-w-[50%]"
                        value={SEARCH_PARAMS_FIND as string}
                        onChange={(event) => setSearchParams({ find: event.target.value })}
                    />
                    <Button
                        name="Search"
                        className="border rounded px-2 hover:bg-gray-300 ms-2"
                        type="submit"
                    />
                </form>
            </div>
            <div>
                {productsContext.products.length != 0 ? (
                    <div className="grid grid-cols-5 gap-2">
                        {productsContext.products.map((product) => {
                            return <Product product={product} key={product._id} isSeller={false} />;
                        })}
                    </div>
                ) : (
                    <div>No Products Found</div>
                )}
            </div>
        </div>
    );
}
