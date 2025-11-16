import { Routes, Route, BrowserRouter } from "react-router-dom";

// USER PAGES
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Cart from "./component/Cart";
import Checkcart from "./component/Checkcart";
import Productdetail from "./component/Productdetail";
import Category from "./component/Category";
import Dashboard from "./admin/pages/Dashboard";
import Productmanager from "./admin/pages/Productmanager";
import Adminlayout from "./admin/pages/Adminlayout";
import Ordermanager from "./admin/pages/Ordermanager";
import Usermanager from "./admin/pages/Usermanager";
import Postmanager from "./admin/pages/Postmanager";
import Reviewmanager from "./admin/pages/Reviewmanager";
// ADMIN LAYOUT + ADMIN PAGES
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regiter" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkcart" element={<Checkcart />} />
        <Route path="/product_detail" element={<Productdetail />} />
        <Route path="/category" element={<Category />} />

        {/* ADMIN ROUTES (WRAPPED IN ADMINLAYOUT) */}
        <Route path="/admin" element={<Adminlayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productmanager" element={<Productmanager />} />
          <Route path="ordermanager" element={<Ordermanager />} />
          <Route path="usermanager" element={<Usermanager />} />
          <Route path="postmanager" element={<Postmanager />} />
          <Route path="reviewmanager" element={<Reviewmanager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
