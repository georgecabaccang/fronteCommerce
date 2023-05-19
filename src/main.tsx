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
        <UserProvider>
            <ProductsProvider>
                <OrdersProvider>
                    <CartProvider>
                        <ActiveLinkProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </ActiveLinkProvider>
                    </CartProvider>
                </OrdersProvider>
            </ProductsProvider>
        </UserProvider>
    </React.StrictMode>
);
