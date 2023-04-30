import "./index.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Shop from "./components/pages/Shop";
import Layout from "./components/shared/Layout";
import Item from "./components/pages/Item";

function App() {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/item/:id" element={<Item />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
