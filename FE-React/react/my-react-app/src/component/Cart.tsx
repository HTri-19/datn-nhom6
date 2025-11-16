// Cart.tsx
import React from 'react';
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import payment from "../assets/images/visa.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import { Link } from "react-router-dom";
import banner3 from "../assets/images/banner-3.png";
import { useCart } from '../component/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDisplay = new Intl.NumberFormat('vi-VN').format(totalAmount);

  const isCartEmpty = cartItems.length === 0;

  const handleQuantityChange = (itemId: number, delta: number) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + delta);
    }
  };

  return (
    <>
      {/* MAIN HEADER */}
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

          <div className="search-box">
            <input type="text" placeholder="Nhập tên sản phẩm cần tìm..." />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
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

      {/* BANNER */}
      <section className="banner">
        <div className="container">
          <img src={banner3} alt="Banner" />
        </div>
      </section>

      {/* BODY */}
      <section className="section-body">
        <div className="cart-container">
          <h2>🛒 Giỏ hàng của bạn</h2>

          <div className="progress-bar">
            <div className="step active">Chọn sản phẩm</div>
            <div className="step">Thông tin đặt hàng</div>
            <div className="step">Hoàn tất đặt hàng</div>
          </div>

          {isCartEmpty ? (
            <div className="empty-cart-message" style={{ textAlign: 'center', margin: '50px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <p style={{ fontSize: '1.2rem', color: '#888' }}>**Giỏ hàng của bạn hiện đang trống.**</p>
              <p style={{ marginTop: '15px' }}>Vui lòng quay lại trang chủ để chọn sản phẩm.</p>
              <Link to="/" className="btn-success" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', textDecoration: 'none', color: 'white', backgroundColor: '#007bff', borderRadius: '5px' }}>
                <i className="fa-solid fa-arrow-left"></i> Quay lại mua sắm
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.img} alt={item.name} />

                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="price">
                      Giá: <strong>{new Intl.NumberFormat('vi-VN').format(item.price)} ₫</strong>
                    </p>

                    <div className="quantity-wrapper">
                      <span className="label">Số lượng:</span>
                      <div className="quantity">
                        <button className="minus" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <input type="text" value={item.quantity} readOnly />
                        <button className="plus" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                    </div>

                    <p className="total">
                      Tổng tiền: <strong>{new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)} ₫</strong>
                    </p>
                  </div>

                  <button className="delete-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
                </div>
              ))}

              {/* SUMMARY */}
              <div className="cart-summary">
                <p>
                  Tổng tiền tạm tính: <span>{totalDisplay} ₫</span>
                </p>

                <div className="discount">
                  <input type="text" placeholder="Nhập mã giảm giá" />
                  <button>Áp dụng</button>
                </div>

                <p>Giảm giá: <span>0 ₫</span></p>

                <h3>Tổng tiền thanh toán: <span>{totalDisplay} ₫</span></h3>

                <div className="cart-buttons">
                  {/* Nút Chính: Tiến hành đặt hàng (Màu xanh đậm) */}
                  <Link to="/checkcart" className="btn-primary btn-link-fix">
                    Tiến hành đặt hàng
                  </Link>

                  {/* Nút Phụ: Chọn thêm sản phẩm khác (Nền xám nhạt, viền mỏng) */}
                  <Link to="/" className="btn-secondary btn-link-fix">
                    Chọn thêm sản phẩm khác
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">

          <div className="footer-column">
            <h3>Về T&T Center</h3>
            <ul>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Tuyển dụng</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Chính sách</h3>
            <ul>
              <li><a href="#">Chính sách bảo hành</a></li>
              <li><a href="#">Chính sách bán hàng</a></li>
              <li><a href="#">Chính sách kiểm hàng</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Thông tin</h3>
            <ul>
              <li><a href="#">Hệ thống cửa hàng</a></li>
              <li><a href="#">Hướng dẫn đặt hàng Online</a></li>
              <li><a href="#">Tin tức</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Tổng đài hỗ trợ và bảo hành</h3>
            <p>Hotline: <strong>0898.143.789</strong></p>
            <p>Email: <a href="mailto:ttcentersale@gmail.com">ttcentersale@gmail.com</a></p>
          </div>

          <div className="footer-column">
            <h3>Phương thức thanh toán</h3>
            <div className="payment-icons">
              <img src={payment} alt="Visa" />
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
              <a href="#"><img src={facebook} alt="Facebook" /></a>
              <a href="#"><img src={tiktok} alt="TikTok" /></a>
              <a href="#"><img src={youtube} alt="YouTube" /></a>
              <a href="#"><img src={zalo} alt="Zalo" /></a>
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

export default Cart;
