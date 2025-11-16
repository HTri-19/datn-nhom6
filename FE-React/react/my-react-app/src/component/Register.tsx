import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

// Import Assets của bạn
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

// Interface
interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface RegisterResponse {
  message: string;
}

// API
const API_REGISTER_URL = 'http://localhost:8080/api/v1/auth/register';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      setLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError("Bạn phải đồng ý với các điều khoản và điều kiện.");
      setLoading(false);
      return;
    }

    const dataToSend = {
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post<RegisterResponse>(API_REGISTER_URL, dataToSend);

      alert(response.data.message || "Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");

    } catch (err: any) {
      let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";

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
            <a className="menu-btn">
              <i className="fa-solid fa-bars"></i> Danh mục
            </a>
            <a className="location-btn">
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
            <a className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </a>

            <Link to="/login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* FORM ĐĂNG KÝ */}
      <section className="form-cotrol">
        <div className="login-container">
          <h2>Đăng ký Tài Khoản</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Thông tin đăng nhập</label>

            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
            )}

            <input
              type="text"
              name="name"
              placeholder="Họ và tên*"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại*"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu*"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận lại mật khẩu*"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />

            <div style={{ display: "flex", alignItems: "center", margin: "15px 0" }}>
              <input
                type="checkbox"
                id="agree"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <label htmlFor="agree" style={{ marginLeft: "8px" }}>
                Tôi đồng ý với các điều khoản
              </label>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Đang đăng ký..." : "ĐĂNG KÝ"}
            </button>

            <button type="button" className="btn-google">
              <img src={google} alt="Google" /> Đăng Ký bằng Google
            </button>

            <p className="signup-text">
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">

          <div className="footer-column">
            <h3>Về T&T Center</h3>
            <ul>
              <li><a>Về chúng tôi</a></li>
              <li><a>Tuyển dụng</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Chính sách</h3>
            <ul>
              <li><a>Chính sách bảo hành</a></li>
              <li><a>Chính sách bán hàng</a></li>
              <li><a>Chính sách kiểm hàng</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Thông tin</h3>
            <ul>
              <li><a>Hệ thống cửa hàng</a></li>
              <li><a>Hướng dẫn đặt hàng Online</a></li>
              <li><a>Tin tức</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Tổng đài</h3>
            <p>Hotline: <strong>0898.143.789</strong></p>
            <p>Email: ttcentersale@gmail.com</p>
          </div>

          <div className="footer-column">
            <h3>Phương thức thanh toán</h3>
            <img src={payment} alt="Visa" />

            <h3>Đơn vị vận chuyển</h3>
            <img src={vanchuyen} alt="GHN" />
          </div>

        </div>

        <div className="footer-bottom">
          <div className="social">
            <p>Liên kết mạng xã hội</p>
            <div className="social-icons">
              <a><img src={facebook} alt="Facebook" /></a>
              <a><img src={tiktok} alt="TikTok" /></a>
              <a><img src={youtube} alt="YouTube" /></a>
              <a><img src={zalo} alt="Zalo" /></a>
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

export default Register;
