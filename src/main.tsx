import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./providers/UserProvider.tsx";
import CartProvider from "./providers/CartProvider.tsx";
import ActiveLinkProvider from "./providers/ActiveLinkProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ActiveLinkProvider>
                <UserProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </UserProvider>
            </ActiveLinkProvider>
        </BrowserRouter>
    </React.StrictMode>
);
