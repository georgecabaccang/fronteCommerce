import "./index.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Cart from "./components/cart/Cart";
import Shop from "./components/pages/Shop";
import Layout from "./components/shared/Layout";
import ProductPage from "./components/products/ProductPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import CheckOutItems from "./components/cart/CheckOutItems";
import OrdersList from "./components/orders/OrdersList";
import Profile from "./components/pages/Profile";
import MyProducts from "./components/products/MyProducts";

import SellerRoutes from "./utils/SellerRoutes";
import LoggedOutRoutes from "./utils/LoggedOutRoutes";
import LoggedInRoutes from "./utils/LoggedInRoutes";
import UpdateMyProduct from "./components/products/UpdateMyProduct";

function App() {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/product/:prod_id" element={<ProductPage />} />

                    {/* Should-be-logged-IN-to-access routes */}
                    <Route element={<LoggedInRoutes />}>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/cart/checkout" element={<CheckOutItems />} />
                        <Route path="/orders" element={<OrdersList />} />
                        <Route path="/user/profile/:user_id" element={<Profile />} />
                    </Route>

                    {/* Seller Routes */}
                    <Route element={<SellerRoutes />}>
                        <Route path="/user/:user_id/my-products" element={<MyProducts />} />
                        <Route
                            path="/user/:user_id/my-products/:prod_id/update"
                            element={<UpdateMyProduct />}
                        />
                    </Route>

                    {/* Should-be-logged-OUT-to-access routes */}
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
