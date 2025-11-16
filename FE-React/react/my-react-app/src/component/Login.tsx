import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

// Import Assets
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import google from "../assets/images/google.png";
import payment from "../assets/images/visa.png";

// --- Types ---
interface FormData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

const API_LOGIN_URL = 'http://localhost:8080/api/v1/auth/login';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [type]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post<LoginResponse>(API_LOGIN_URL, {
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);

      navigate('/');
      
    } catch (err: any) {
      let errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại Email và Mật khẩu.';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
            <Link to="/Cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </Link>

            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* FORM LOGIN */}
      <section className="form-cotrol">
        <div className="login-container">
          <h2>Đăng Nhập Tài Khoản</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Thông tin đăng nhập</label>

            {error && (
              <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '15px' }}>
                {error}
              </p>
            )}

            <input 
              type="email" 
              placeholder="Nhập email *" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            
            <input 
              type="password" 
              placeholder="Nhập mật khẩu *" 
              value={formData.password}
              onChange={handleInputChange}
              required 
            />

            <a href="#" className="forgot-password">Quên mật khẩu?</a>

            <button 
              type="submit" 
              className="btn-login" 
              disabled={loading}
            >
              {loading ? 'Đang xác thực...' : 'ĐĂNG NHẬP'}
            </button>

            <button type="button" className="btn-google">
              <img src={google} alt="Google" />
              Đăng nhập bằng tài khoản Google
            </button>

            <Link to="/Regiter" className="signup-text">
              Bạn chưa có tài khoản? <span>Đăng ký ngay</span>
            </Link>
          </form>
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

export default Login;
