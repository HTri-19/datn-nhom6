import "./App.css";
import "./assets/form.css";
import "./assets/product.css";


import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Cart from "./component/Cart";
import Checkcart from "./component/Checkcart";
import CompleteOrder from "./component/CompleteOrder"; // <--- THÊM IMPORT NÀY

import "@fortawesome/fontawesome-free/css/all.min.css";
import Productdetail from "./component/Productdetail";
import Category from "./component/Category";

// 💡 BƯỚC 1: IMPORT CartProvider
import { CartProvider } from "./component/CartContext"; 

const App = () => {
  return (
    // 💡 BƯỚC 2: BỌC TOÀN BỘ ỨNG DỤNG BẰNG CartProvider
    <CartProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkcart" element={<Checkcart />} />
          <Route path="/product_detail" element={<Productdetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/complete-order" element={<CompleteOrder />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;