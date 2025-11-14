import React, { useState, useEffect} from "react";
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import banner1 from "../assets/images/banner-1.png";
import lap1 from "../assets/images/lap-1.png";
import mac1 from "../assets/images/mac-1.png";
// import mac2 from "../assets/images/mac-2.png";
import mac4 from "../assets/images/mac-4.png";
import mac3 from "../assets/images/mac-3.png";
import laptop1 from "../assets/images/laptop-seller-1.png";
// import welcome from "../assets/images/welcome.png";
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
// import daile from "../assets/images/daile.png";
// import backtoshool from "../assets/images/back-to-school-2025.png";
// import muoithangmuoi from "../assets/images/10-10-sale.png";
// import tintuc1 from "../assets/images/tintuc1.png";
// import fix from "../assets/images/fix.png";
// import macboo from "../assets/images/macboo-mdm.png";
// import hangapple from "../assets/images/hang-apple-refurbished-la-gi-co-nen-mua-hang-apple-refurbished-khong-1697107354.png";
import { Link, useSearchParams } from "react-router-dom";


interface Product {
  name: string;
  img: string;
  price: string;
}

const allProducts: Product[] = [
    { name: "MacBook Pro M1 13inch 16GB 256GB", img: lap1, price: "16.490.000đ" },
    { name: "Macbook Air M2 13inch 16GB 256GB | New", img: mac1, price: "19.290.000đ" },
    { name: "Macbook Pro 14inch M1 Pro 16GB 1TB | New", img: mac3, price: "29.990.000đ" },
    { name: "MacBook Pro M3 Pro 14 inch (18GB 512GB)", img: mac4, price: "36.990.000đ" },
    { name: "Lenovo LOQ 2024 15IAX9E | Core i5-12450HX 12GB 512GB RTX 2050", img: laptop1, price: "16.790.000đ" },
    { name: "HP OmniBook X Flip 14 inch 2-in-1", img: laptop2, price: "18.990.000đ" },
    { name: "Dell Inspiron 14 5445 (2024)", img: laptopdell, price: "15.790.000đ" },
    { name: "Acer Nitro 5 AN515-57 | Core i5-11400H", img: laptopcu1, price: "12.490.000đ" },
    { name: "ASUS TUF A15 FA506 | Ryzen 7-4800H", img: laptopcu2, price: "11.990.000đ" },
    { name: "Asus Vivobook Go 14 E1404FA", img: Asusvivobook1, price: "11.890.000đ" },
  ];
const Category = () => {
  const [searchParams] = useSearchParams();
  
  const initialSearchQuery = searchParams.get('q') || "";
  
  // State quản lý từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  
  // KHỞI TẠO displayedProducts LÀ MẢNG RỖNG
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  // Logic lọc sản phẩm (Chạy khi load trang và khi người dùng gõ)
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      // Lọc sản phẩm nếu có từ khóa
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(query)
      );
      setDisplayedProducts(filtered);
    } else {
      // Nếu KHÔNG có từ khóa tìm kiếm (kể cả khi ô tìm kiếm trống), không hiển thị gì cả
      setDisplayedProducts([]); 
    }
  }, [searchQuery]); // Chạy lại khi searchQuery thay đổi

  
  // Hàm xử lý khi người dùng gõ vào ô tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Hàm xử lý khi người dùng bấm nút tìm kiếm (hoặc Enter)
  const handleSearchSubmit = () => {
    // Việc lọc đã được xử lý trong useEffect, chỉ cần đảm bảo input không mất focus nếu cần
    // Trong React, việc này thường không cần thiết
    console.log("Tìm kiếm đã được thực hiện với từ khóa:", searchQuery);
  };
  return (
    <>
      <header className="main-header">
        <div className="container header-inner">
          <Link to="/">
            <div className="logo">
              <img src={Frame65} alt="T&T Center" />
            </div>
          </Link>

          <nav className="header-nav">
            <a href="#" className="menu-btn">
              <i className="fa-solid fa-bars"></i> Danh mục
            </a>
            <a href="#" className="location-btn">
              <i className="fa-solid fa-location-dot"></i> Xem giá tại Hà Nội
            </a>
          </nav>

          {/* THANH TÌM KIẾM MỚI TRÊN TRANG CATEGORY */}
          <div className="search-box" style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Tìm kiếm trong danh mục này..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            <button onClick={handleSearchSubmit}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="header-actions">
            <Link to="/cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </Link>
            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>



      {/* banner */}
      <section className="banner">
        <div className="slider">
          <div className="slides">
            <img src={banner1} alt="Banner 1" className="active" />
            {/* <img src={banner2} alt="Banner 2" />
            <img src={banner3} alt="Banner 3" /> */}
          </div>

          <div className="dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>
      <div>

        {/* Bộ lọc */}
        <div className="filters">
          <select>
            <option>Nhu cầu</option>
            <option>Văn phòng</option>
            <option>Gaming</option>
          </select>
          <select>
            <option>Mức giá</option>
            <option>Dưới 10 triệu</option>
            <option>10 - 20 triệu</option>
          </select>
          <select>
            <option>Sắp xếp theo</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
          </select>
        </div>

        

        {/* Danh mục */}
        <div className="categories">
          <button>Văn phòng</button>
          <button>Gaming</button>
          <button>Đồ họa - Kỹ thuật</button>
          <button>Cao cấp - sang trọng</button>
          <button>Mỏng nhẹ</button>
          <button>Sinh viên</button>
          <button>Cảm ứng</button>
          <button>Pin trâu</button>
        </div>

        <div className="container">
        {/* HIỂN THỊ KẾT QUẢ TÌM KIẾM / DANH MỤC */}
          <section className="product-results-section mt-5">
            {displayedProducts.length > 0 ? (
              <div className="product-list">
                {displayedProducts.map((p, i) => (
                  <div key={i} className="product-card">
                    <img src={p.img} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p className="price-new">{p.price}</p>
                    <button type="submit" className="btn-success">
                      <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                    </button>
                  </div>
                ))}
              </div>
            ) : (
               <p>Không tìm thấy sản phẩm nào.</p>
            )}
          </section>
      </div>

        {/* Danh sách sản phẩm */}
        <section className="product-category">
          <div className="container">
            <div className="product-list">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <div className="product-card" key={index}>
                    <img src={laptopdell} alt="MacBook Pro" />
                    <h3>MacBook Pro M1 13inch 16GB 256GB</h3>
                    <p className="price-new">16.490.000đ</p>
                    <div className="price-info">
                      <span className="price-old">23.990.000đ</span>
                      <span className="discount">Giảm 31%</span>
                    </div>
                    <p className="compare">
                      <i className="fa-regular fa-heart"></i> Yêu Thích
                    </p>
                    <button type="button" className="btn-success">
                      <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                      hàng
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Nút xem thêm */}
        <div className="cart-buttons" style={{ marginBottom: "20px" }}>
          <button className="btn btn-primary">Xem thêm 200 sản phẩm</button>
        </div>
      </div>
      {/* footer */}
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

export default Category;
