import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng

// Import Assets của bạn (Giữ nguyên)
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import google from "../assets/images/google.png";

// --- Định nghĩa Typescript Interfaces ---
interface FormData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string; // Token xác thực (JWT)
  // Có thể thêm user info
}

// **THAY THẾ BẰNG ENDPOINT BACKEND CỦA BẠN**
const API_LOGIN_URL = 'http://localhost:8080/api/v1/auth/login'; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Hàm xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [type]: value,
    }));
  };

  // 2. Hàm xử lý gửi form (Đăng nhập)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Gửi yêu cầu POST đến API Backend
      const response = await axios.post<LoginResponse>(API_LOGIN_URL, {
        email: formData.email,
        password: formData.password,
      });

      // 3. Xử lý thành công
      const { token } = response.data;

      // Lưu token vào Local Storage để xác thực các request sau
      localStorage.setItem('authToken', token);

      // Chuyển hướng người dùng đến trang chủ
      navigate('/');
      
    } catch (err: any) {
      // 4. Xử lý lỗi
      let errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại Email và Mật khẩu.';
      
      if (axios.isAxiosError(err) && err.response) {
        // Lấy thông báo lỗi từ server nếu có
        errorMessage = err.response.data.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN HEADER (Giữ nguyên) */}
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
            <a href="cart.html" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </a>

            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* FORM ĐĂNG NHẬP (ĐÃ THÊM LOGIC) */}
      <section className="form-cotrol">
        <div className="login-container">
          <h2>Đăng Nhập Tài Khoản</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Thông tin đăng nhập</label>

            {/* HIỂN THỊ THÔNG BÁO LỖI */}
            {error && (
                <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '15px' }}>
                    {error}
                </p>
            )}
            
            <input 
              type="email" 
              placeholder="Nhập email *" 
              value={formData.email} // KẾT NỐI STATE
              onChange={handleInputChange} // XỬ LÝ THAY ĐỔI
              required 
            />
            
            <input 
              type="password" 
              placeholder="Nhập mật khẩu *" 
              value={formData.password} // KẾT NỐI STATE
              onChange={handleInputChange} // XỬ LÝ THAY ĐỔI
              required 
            />

            <a href="#" className="forgot-password">
              Quên mật khẩu?
            </a>

            {/* NÚT ĐĂNG NHẬP */}
            <button 
              type="submit" 
              className="btn-login" 
              disabled={loading} // VÔ HIỆU HÓA KHI ĐANG TẢI
            >
              {loading ? 'Đang xác thực...' : 'ĐĂNG NHẬP'}
            </button>

            {/* NÚT ĐĂNG NHẬP GOOGLE */}
            <button type="button" className="btn-google">
              <img src={google} alt="Google" />
              Đăng nhập bằng tài khoản Google
            </button>

            {/* LIÊN KẾT ĐĂNG KÝ */}
            {/* Lưu ý: Bạn đang dùng Link to="/Regiter" (sai chính tả) và a href="register.html" (không dùng trong React Router). 
               Tôi giữ nguyên Link to="/Regiter" theo code bạn, nhưng bạn nên đổi thành Link to="/register" */}
            <Link to="/Regiter" className="signup-text">
              Bạn chưa có tài khoản? <span>Đăng ký ngay</span>
            </Link>
          </form>
        </div>
      </section>

      {/* FOOTER (Giữ nguyên) */}
      <footer className="footer">
        <div className="footer-top">
          {/* ... (Code Footer) ... */}
        </div>
        <div className="footer-bottom">
          {/* ... (Code Footer) ... */}
        </div>
      </footer>
    </>
  );
};

export default Login;