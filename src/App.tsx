import "./index.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Shop from "./components/pages/Shop";
import Layout from "./components/shared/Layout";
import ProductPage from "./components/products/ProductPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route
                        path="/shop/product/:_id"
                        element={<ProductPage />}
                    />
                    <Route path="/login" element={<Login />} />
                    registration
                    <Route path="/sign-up" element={<Register />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
