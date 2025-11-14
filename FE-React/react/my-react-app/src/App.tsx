<<<<<<< HEAD
import "./App.css";
import "./assets/form.css";
import "./assets/product.css";
=======
>>>>>>> 37a6b765b36580278b52e4f2d4a1ba3732d81850
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Cart from "./component/Cart";
import Checkcart from "./component/Checkcart";
<<<<<<< HEAD
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
          <Route path="/regiter" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkcart" element={<Checkcart />} />
          <Route path="/product_detail" element={<Productdetail />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    // ----------------------------------------------------
=======
import Productdetail from "./component/Productdetail";
import Category from "./component/Category";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regiter" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkcart" element={<Checkcart />} />
        <Route path="/product_detail" element={<Productdetail />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 37a6b765b36580278b52e4f2d4a1ba3732d81850
  );
};

export default App;
