import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductsProvider from "./providers/ProductsProvider.tsx";
import UserProvider from "./providers/UserProvider.tsx";
import CartProvider from "./providers/CartProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <UserProvider>
            <ProductsProvider>
                <CartProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </CartProvider>
            </ProductsProvider>
        </UserProvider>
    </React.StrictMode>
);
