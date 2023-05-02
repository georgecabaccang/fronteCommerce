import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductsProvider from "./providers/ProductsProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ProductsProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ProductsProvider>
    </React.StrictMode>
);
