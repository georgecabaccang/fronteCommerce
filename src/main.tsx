import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductsProvider from "./providers/ProductsProvider.tsx";
import UserProvider from "./providers/UserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <UserProvider>
            <ProductsProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ProductsProvider>
        </UserProvider>
    </React.StrictMode>
);
