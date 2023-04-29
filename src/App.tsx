import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/shared/Navigation";
import Cart from "./components/Cart";
import Shop from "./components/Shop";

function App() {
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop" element={<Shop />} />
            </Routes>
        </div>
    );
}

export default App;
