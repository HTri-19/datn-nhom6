// src/component/Home.tsx

import React, { useState, useEffect } from "react";
// Imports hình ảnh... (giữ nguyên)
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import banner3 from "../assets/images/banner-3.png";
import lap1 from "../assets/images/lap-1.png";
import mac1 from "../assets/images/mac-1.png";
import mac2 from "../assets/images/mac-2.png";
import mac4 from "../assets/images/mac-4.png";
import mac3 from "../assets/images/mac-3.png";
import laptop1 from "../assets/images/laptop-seller-1.png";
import welcome from "../assets/images/welcome.png";
import laptop2 from "../assets/images/laptop-serller-2.png";
import laptopdell from "../assets/images/dell-lapptop.png";
import laptopcu1 from "../assets/images/laptopcu.png";
import laptopcu2 from "../assets/images/laptopcu2.png";
// import laptopcu3 from "../assets/images/laptopcu3.png";
// import laptopcu4 from "../assets/images/laptopcu4.png";
import Asusvivobook1 from "../assets/images/Asusvivobook1.png";
// import Asusvivobook2 from "../assets/images/Asusvivobook2.jpg";
// import Asusvivobook3 from "../assets/images/Asusvivobook3.png";
// import Asusvivobook4 from "../assets/images/Asusvivobook4.png";
import daile from "../assets/images/daile.png";
import backtoshool from "../assets/images/back-to-school-2025.png";
import muoithangmuoi from "../assets/images/10-10-sale.png";
import tintuc1 from "../assets/images/tintuc1.png";
import fix from "../assets/images/fix.png";
import macboo from "../assets/images/macboo-mdm.png";
import hangapple from "../assets/images/hang-apple-refurbished-la-gi-co-nen-mua-hang-apple-refurbished-khong-1697107354.png";

import { Link, useNavigate } from "react-router-dom";
// 💡 Quan trọng: Đảm bảo đường dẫn Context đúng
import { useCart, CartItem } from '../component/CartContext'; 

// 1. Định nghĩa Interface cho Product (có ID và Price là number)
interface Product {
  id: number;
  name: string;
  img: string;
  price: number; // Đã đổi thành NUMBER để tính toán
  priceDisplay: string; // Thêm trường hiển thị giá
}

// 2. Danh sách sản phẩm chi tiết (đã thêm ID và Price là number)
const allProducts: Product[] = [
    { id: 101, name: "MacBook Pro M1 13inch 16GB 256GB", img: lap1, price: 16490000, priceDisplay: "16.490.000đ" },
    { id: 102, name: "Macbook Air M2 13inch 16GB 256GB | New", img: mac1, price: 19290000, priceDisplay: "19.290.000đ" },
    { id: 103, name: "Macbook Pro 14inch M1 Pro 16GB 1TB | New", img: mac3, price: 29990000, priceDisplay: "29.990.000đ" },
    { id: 104, name: "MacBook Pro M3 Pro 14 inch (18GB 512GB)", img: mac4, price: 36990000, priceDisplay: "36.990.000đ" },
    { id: 105, name: "Lenovo LOQ 2024 15IAX9E | Core i5-12450HX 12GB 512GB RTX 2050", img: laptop1, price: 16790000, priceDisplay: "16.790.000đ" },
    { id: 106, name: "HP OmniBook X Flip 14 inch 2-in-1", img: laptop2, price: 18990000, priceDisplay: "18.990.000đ" },
    { id: 107, name: "Dell Inspiron 14 5445 (2024)", img: laptopdell, price: 15790000, priceDisplay: "15.790.000đ" },
    { id: 108, name: "Acer Nitro 5 AN515-57 | Core i5-11400H", img: laptopcu1, price: 12490000, priceDisplay: "12.490.000đ" },
    { id: 109, name: "ASUS TUF A15 FA506 | Ryzen 7-4800H", img: laptopcu2, price: 11990000, priceDisplay: "11.990.000đ" },
    { id: 110, name: "Asus Vivobook Go 14 E1404FA", img: Asusvivobook1, price: 11890000, priceDisplay: "11.890.000đ" },
];

// Hàm giả lập lấy dữ liệu sản phẩm chi tiết bằng ID
const getFakeProductData = (id: number): Product | undefined => {
    return allProducts.find(p => p.id === id);
};

// Hàm lấy ID sản phẩm từ tên (dùng tạm cho các nút hardcoded)
const getProductIdByName = (productName: string): number | undefined => {
    const product = allProducts.find(p => p.name.toLowerCase().includes(productName.toLowerCase().substring(0, 10)));
    return product ? product.id : undefined;
};


const Home: React.FC = () => {
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart(); // Lấy hàm thêm giỏ hàng VÀ danh sách giỏ hàng để cập nhật số lượng trên header
    
    // --- QUẢN LÝ VỊ TRÍ ---
    const [showLocation, setShowLocation] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState("Hà Nội");
    const [confirmedProvince, setConfirmedProvince] = useState("Hà Nội");
    const [searchProvince, setSearchProvince] = useState("");

    // --- QUẢN LÝ TÌM KIẾM SẢN PHẨM ---
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [/*selectedProduct*/, setSelectedProduct] = useState<Product | null>(null); // Giữ lại state này

    const provinces = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Khác"];

    useEffect(() => {
        // Chỉ lọc khi có query
        if (searchQuery.trim()) {
            const filtered = allProducts.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchQuery]);

    // 3. HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG (ĐÃ SỬA LẠI)
    const handleAddToCart = (productId: number) => {
        const product = getFakeProductData(productId);

        if (product) {
            // Định dạng sản phẩm theo CartItem (bỏ quantity vì Context tự xử lý)
            const itemToAdd: Omit<CartItem, 'quantity'> = {
                id: product.id,
                name: product.name,
                img: product.img,
                price: product.price, // Dùng giá là number
            };
            
            addToCart(itemToAdd); // Gọi Context API
            
            // Hiển thị thông báo (KHÔNG CHUYỂN HƯỚNG NGAY)
            alert(`✅ Đã thêm "${product.name.substring(0, 30)}..." vào giỏ hàng!`);
        } else {
            alert("❌ Không tìm thấy thông tin sản phẩm này.");
        }
    };

    // --- HÀM XỬ LÝ TÌM KIẾM ---
    const handleSearch = () => {
        setShowDropdown(false);
        setSelectedProduct(null);

        // Chuyển hướng sang trang Category/Search Results
        if (searchQuery.trim()) {
            navigate(`/category?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    
    // Hàm để lấy ID sản phẩm từ tên hiển thị hardcode (dùng tạm)
    const getHardcodedProductId = (cardTitle: string): number => {
        if (cardTitle.includes("MacBook Pro M1 13inch")) return 101;
        if (cardTitle.includes("Macbook Air M2 13inch")) return 102;
        if (cardTitle.includes("Lenovo LOQ 2024 15IAX9E")) return 105;
        if (cardTitle.includes("Macbook Pro 14inch M1 Pro")) return 103;
        // Các sản phẩm khác
        if (cardTitle.includes("Acer Nitro 5 AN515-57")) return 108;
        if (cardTitle.includes("ASUS TUF A15 FA506")) return 109;
        if (cardTitle.includes("Dell Latitude 7400")) return 901; // ID giả lập
        if (cardTitle.includes("Dell Gaming G15 5520")) return 902; // ID giả lập
        if (cardTitle.includes("Macbook Pro M2 13inch 16GB 512GB")) return 903; // ID giả lập
        if (cardTitle.includes("MacBook Pro M3 Pro 14 inch (18GB 512GB)")) return 104;
        if (cardTitle.includes("Laptop ASUS VivoBook Go 14 E1404FA-NK177W")) return 110;
        return 999; // ID mặc định khi không tìm thấy
    };
    
    
    return (
        <>
            {/* HEADER */}
            <header className="main-header">
                <div className="container header-inner">
                    <Link to="/">
                        <div className="logo">
                            <img src={Frame65} alt="T&T Center" />
                        </div>
                    </Link>
                    <nav className="header-nav">
                        <Link to="/category" className="menu-btn">
                            <i className="fa-solid fa-bars"></i> Danh mục
                        </Link>
                        <a
                            href="#"
                            className="location-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowLocation(true);
                            }}
                        >
                            <i className="fa-solid fa-location-dot"></i> Xem giá tại {confirmedProvince}
                        </a>
                    </nav>

                    {/* THANH TÌM KIẾM */}
                    <div className="search-box" style={{ position: "relative" }}>
                        <input
                            type="text"
                            placeholder="Nhập tên sản phẩm cần tìm..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowDropdown(true);
                                setSelectedProduct(null);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                        <button onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>

                        {/* DROPDOWN GỢI Ý */}
                        {showDropdown && filteredProducts.length > 0 && (
                            <ul className="search-dropdown">
                                {filteredProducts.map((p, i) => (
                                    <li
                                        key={i}
                                        onClick={() => {
                                            setSelectedProduct(p);
                                            setShowDropdown(false);
                                            setSearchQuery(p.name);
                                            navigate(`/category?q=${encodeURIComponent(p.name)}`);
                                        }}
                                    >
                                        {p.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>


                    <div className="header-actions">
                        <Link to="/cart" className="cart-btn">
                            <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng ({cartItems.length})
                        </Link>
                        <Link to="/Login" className="login-btn">
                            <i className="fa-regular fa-user"></i> Đăng nhập
                        </Link>
                    </div>
                </div>
            </header>

            {/* POPUP CHỌN TỈNH (Giữ nguyên) */}
            {showLocation && (
                <div className="location-modal">
                    <div className="modal-overlay" onClick={() => setShowLocation(false)}></div>

                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowLocation(false)}></button>
                        <h3>Vui lòng chọn tỉnh/thành phố</h3>
                        <input
                            type="text"
                            placeholder="Tìm tỉnh/thành phố..."
                            value={searchProvince}
                            onChange={(e) => setSearchProvince(e.target.value)}
                        />
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            size={Math.min(6, provinces.length)}
                        >
                            {provinces
                                .filter((p) => p.toLowerCase().includes(searchProvince.toLowerCase()))
                                .map((p, i) => (
                                    <option key={i} value={p}>
                                        {p}
                                    </option>
                                ))}
                        </select>
                        <button
                            className="btn-success"
                            onClick={() => {
                                setConfirmedProvince(selectedProvince);
                                setShowLocation(false);
                                setSearchProvince("");
                            }}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}


            {/* BANNER */}
            <section className="banner">
                <div className="container">
                    <img src={banner3} alt="Banner" />
                </div>
            </section>

            {/* PRODUCT CATEGORY SECTION - SẢN PHẨM MỚI NHẤT */}
            <section className="product-category">
                <div className="container">
                    <h2>Sản phẩm mới nhất</h2>
                    <div className="product-list">
                        <div className="product-card">
                            <img src={lap1} alt="Macbook" />
                            <h3>MacBook Pro M1 13inch 16GB 256GB</h3>
                            <p className="price-new">16.490.000đ</p>
                            <div className="price-info">
                                <span className="price-old">23.990.000đ</span>
                                <span className="discount">Giảm 31%</span>
                            </div>
                            <p className="compare">
                                <i className="fa-regular fa-heart"></i> Yêu Thích
                            </p>
                            {/* 4. Thêm vào giỏ hàng: Lấy ID từ tên (hoặc dùng ID cụ thể) */}
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("MacBook Pro M1 13inch"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>

                        <div className="product-card">
                            <img src={mac1} alt="Macbook" />
                            <h3>Macbook Air M2 13inch 16GB 256GB | New</h3>
                            <p className="price-new">19.290.000đ</p>
                            <div className="price-info">
                                <span className="price-old">25.490.000đ</span>
                                <span className="discount">Giảm 24%</span>
                            </div>
                            <p className="compare">
                                <i className="fa-regular fa-heart"></i> Yêu Thích
                            </p>
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("Macbook Air M2 13inch"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>

                        <div className="product-card">
                            <img src={laptop1} alt="Macbook" />
                            <h3>
                                Lenovo LOQ 2024 15IAX9E | Core i5-12450HX 12GB 512GB RTX 2050
                                4GB 15.6'' FHD 144Hz (New)
                            </h3>
                            <p className="price-new">16.790.000</p>
                            <div className="price-info">
                                <span className="price-old">20.490.000 </span>
                                <span className="discount">Giảm 8%</span>
                            </div>
                            <p className="compare">
                                <i className="fa-regular fa-heart"></i> Yêu Thích
                            </p>
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("Lenovo LOQ 2024 15IAX9E"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>

                        <div className="product-card">
                            <img src={mac3} alt="Macbook" />
                            <h3>Macbook Pro 14inch M1 Pro 16GB 1TB | New</h3>
                            <p className="price-new">29.990.000đ</p>
                            <div className="price-info">
                                <span className="price-old">42.990.000đ</span>
                                <span className="discount">Giảm 30%</span>
                            </div>
                            <p className="compare">
                                <i className="fa-regular fa-heart"></i> Yêu Thích
                            </p>
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("Macbook Pro 14inch M1 Pro"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* WELCOME SECTION (Giữ nguyên) */}
            <section className="welcome">
                <div className="container">
                    <img src={welcome} alt="Welcome" />
                </div>
            </section>

            {/* FLASH SALE SECTION (Chỉ sửa nút Thêm vào Giỏ hàng) */}
            <section className="flash-sale">
                <div className="container">
                    {/* ... (Các phần khác giữ nguyên) ... */}
                    <div className="flash-sale-header">
                         <div className="flash-title">⚡ FLASH SALE ĐẦU TUẦN</div>
                         <div className="countdown">
                             Kết thúc sau:
                             <span className="time">1 ngày</span>
                             <span className="time">02 giờ</span>
                             <span className="time">15 phút</span>
                         </div>
                    </div>
                    
                    <div className="product-list-item mt-5">
                        <div className="product-card">
                            <img src={laptopdell} alt="MacBook Pro" />
                            <h3>
                                Dell Inspiron 14 5445 (2024) | Ryzen 7 - 8840HS RAM 16GB SSD
                                512GB 2.2K (New)
                            </h3>
                            <p className="price-new">15.790.000 đ</p>
                            <div className="price-info">
                                <span className="price-old">17.490.000 đ</span>
                                <span className="discount">Giảm 31%</span>
                            </div>
                            <button type="submit" className="btn-sales">
                                còn 7/15 suất
                            </button>
                        </div>
                        {/* ... Các product-card khác trong flash-sale ... (Cần thêm nút Thêm vào giỏ hàng nếu muốn chức năng) */}
                    </div>
                    
                    <div className="see-more">
                        <button className="tab mt-5">Xem tất cả</button>
                    </div>
                </div>
            </section>

            {/* NEWEST PRODUCTS SECTION - Laptop cũ (Chỉ sửa nút Thêm vào Giỏ hàng) */}
            <section className="product-category mt-5">
                <div className="container">
                    {/* ... */}
                    <div className="category-header">
                        <h2>Laptop cũ</h2>
                        {/* ... */}
                    </div>

                    <div className="product-list">
                        <div className="product-card">
                            <img src={laptopcu1} alt="MacBook laptopcu" />
                            <h3>
                                Acer Nitro 5 AN515-57 | Core i5-11400H 8GB 512GB GTX 1650 15.6''
                                FHD IPS 144Hz{" "}
                            </h3>
                            <p className="price-new"> 12.490.000đ</p>
                            <div className="price-info">
                                <span className="price-old">14.990.000đ</span>
                                <span className="discount"> GGiảm 17% </span>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("Acer Nitro 5 AN515-57"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>
                        
                        <div className="product-card">
                             <img src={laptopcu2} alt="laptopcu2" />
                            <h3>
                                ASUS TUF A15 FA506 I Ryzen 7-4800H 16GB 512GB GTX 1650 144Hz
                            </h3>
                            <p className="price-new">11.990.000đ</p>
                            <div className="price-info">
                                <span className="price-old">12.990.000đ</span>
                                <span className="discount">Giảm 8%</span>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("ASUS TUF A15 FA506"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>
                        
                        {/* ... Các product-card khác trong laptop cũ ... */}
                        
                    </div>
                </div>
            </section>
            
            {/* MACBOOK SECTION (Chỉ sửa nút Thêm vào Giỏ hàng) */}
            <section className="product-category mt-5">
                <div className="container">
                    {/* ... */}
                    <div className="product-list">
                        <div className="product-card">
                            <Link to="/product_detail">
                                <img src={mac1} alt="MacBook Pro" />
                                <h3>Macbook Air M2 13inch 16GB 256GB | New</h3>
                            </Link>
                            <p className="price-new">19.290.000đ</p>
                            <div className="price-info">
                                <span className="price-old">25.490.000đ</span>
                                <span className="discount">Giảm 24%</span>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("Macbook Air M2 13inch"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>

                        <div className="product-card">
                            <img src={mac2} alt="MacBook Air" />
                            <h3>Macbook Pro M2 13inch 16GB 512GB</h3>
                            <p className="price-new">22.990.000đ</p>
                            <div className="price-info">
                                <span className="price-old">34.490.000 đ</span>
                                <span className="discount">Giảm 24%</span>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("Macbook Pro M2 13inch 16GB 512GB"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>
                        {/* ... Các product-card khác trong macbook ... */}
                    </div>
                </div>
            </section>

            {/* Asusvivobook (Chỉ sửa nút Thêm vào Giỏ hàng) */}
            <section className="product-category mt-5">
                <div className="container">
                    {/* ... */}
                    <div className="product-list">
                        <div className="product-card">
                            <img src={Asusvivobook1} alt=" Asusvivobook " />
                            <h3>Laptop ASUS VivoBook Go 14 E1404FA-NK177W</h3>
                            <p className="price-new"> 11.890.000đ</p>
                            <div className="price-info">
                                <span className="price-old">14.490.000đ</span>
                                <span className="discount">Giảm 31%</span>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(getHardcodedProductId("Laptop ASUS VivoBook Go 14 E1404FA-NK177W"))} 
                                className="btn-success"
                            >
                                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                            </button>
                        </div>
                        {/* ... Các product-card khác trong asusvivobook ... */}
                    </div>
                </div>
            </section>
            
            {/* Phần Khuyến mãi, Tin tức và Footer giữ nguyên */}
            {/* ... */}
             <section className="promo">
                <div className="container">
                    <div className="section-header">
                        <h3>Khuyến mãi</h3>
                        <a href="#">Xem tất cả</a>
                    </div>
                    <div className="promo-banners">
                        <a href="#">
                            <img src={muoithangmuoi} alt="Promo 1" />
                        </a>
                        <a href="#">
                            <img src={backtoshool} alt="Promo 2" />
                        </a>
                        <a href="#">
                            <img src={daile} alt="Promo 3" />
                        </a>
                    </div>
                </div>
            </section>
            
            <section className="news">
                <div className="container">
                    <div className="section-header">
                        <h3>Tin tức</h3>
                        <a href="#">Xem tất cả</a>
                    </div>
                    <div className="news-list">
                        <div className="news-item">
                            <a href="#">
                                <img src={tintuc1} alt="Tin tức 1" />
                                <h4>Top 5 Laptop Tốt Nhất Dành Cho Tân Sinh Viên</h4>
                            </a>
                        </div>
                        <div className="news-item">
                            <a href="#">
                                <img src={macboo} alt="Tin tức 2" />
                                <h4>Hàng MDM là gì? Có nên mua Macbook MDM hay không?</h4>
                            </a>
                        </div>
                        <div className="news-item">
                            <a href="#">
                                <img src={fix} alt="Tin tức 3" />
                                <h4>Top 7 Cửa Hàng Sửa Chữa Laptop Uy Tín Tại TPHCM</h4>
                            </a>
                        </div>
                        <div className="news-item">
                            <a href="#">
                                <img src={hangapple} alt="Tin tức 4" />
                                <h4>
                                    Hàng Refurbished là gì? Có nên mua hàng Apple Refurbished
                                    không?
                                </h4>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-column">
                        <h3>Về T&T Center</h3>
                        <ul>
                            <li>
                                <a href="#">Về chúng tôi</a>
                            </li>
                            <li>
                                <a href="#">Tuyển dụng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Chính sách</h3>
                        <ul>
                            <li>
                                <a href="#">Chính sách bảo hành</a>
                            </li>
                            <li>
                                <a href="#">Chính sách bán hàng</a>
                            </li>
                            <li>
                                <a href="#">Chính sách kiểm hàng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Thông tin</h3>
                        <ul>
                            <li>
                                <a href="#">Hệ thống cửa hàng</a>
                            </li>
                            <li>
                                <a href="#">Hướng dẫn đặt hàng Online</a>
                            </li>
                            <li>
                                <a href="#">Tin tức</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Tổng đài hỗ trợ và bảo hành</h3>
                        <p>
                            Hotline: <strong>0898.143.789</strong>
                        </p>
                        <p>
                            Email:{" "}
                            <a href="mailto:ttcentersale@gmail.com">ttcentersale@gmail.com</a>
                        </p>
                    </div>
                    <div className="footer-column">
                        <h3>Phương thức thanh toán</h3>
                        <div className="payment-icons">
                            <img src="/images/visa.png" alt="Visa" />
                        </div>
                        <h3>Đơn vị vận chuyển</h3>
                        <div className="shipping-icons">
                            <img src={vanchuyen} alt="GHN" />
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="social">
                        <p>Liên kết mạng xã hội</p>
                        <div className="social-icons">
                            <a href="#">
                                <img src={facebook} alt="Facebook" />
                            </a>
                            <a href="#">
                                <img src={tiktok} alt="TikTok" />
                            </a>
                            <a href="#">
                                <img src={youtube} alt="YouTube" />
                            </a>
                            <a href="#">
                                <img src={zalo} alt="Zalo" />
                            </a>
                        </div>
                    </div>
                    <div className="certificates">
                        <img src={bocongthuong} alt="Bộ Công Thương" />
                        <img src={dmca} alt="DMCA" />
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Home;