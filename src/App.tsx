import "./index.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Shop from "./components/pages/Shop";
import Layout from "./components/shared/Layout";
import ProductPage from "./components/products/ProductPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import LoggedOutRoutes from "./utils/LoggedOutRoutes";

function App() {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<Shop />} />

                    <Route path="/shop/product/:_id" element={<ProductPage />} />
                    <Route element={<LoggedOutRoutes />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<Register />} />
                    </Route>
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
