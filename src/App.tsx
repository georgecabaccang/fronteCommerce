import "./index.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Shop from "./components/pages/Shop";
import Layout from "./components/shared/Layout";
import Product from "./components/products/ProductPage";

function App() {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/product/:id" element={<Product />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
