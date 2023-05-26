import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductsProvider from "./providers/ProductsProvider.tsx";
import UserProvider from "./providers/UserProvider.tsx";
import CartProvider from "./providers/CartProvider.tsx";
import ActiveLinkProvider from "./providers/ActiveLinkProvider.tsx";
import OrdersProvider from "./providers/OrdersProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ActiveLinkProvider>
                <UserProvider>
                    <ProductsProvider>
                        <OrdersProvider>
                            <CartProvider>
                                <App />
                            </CartProvider>
                        </OrdersProvider>
                    </ProductsProvider>
                </UserProvider>
            </ActiveLinkProvider>
        </BrowserRouter>
    </React.StrictMode>
);
