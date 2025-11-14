import React, { useState } from 'react';
import axios from 'axios'; // Import axios
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
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface RegisterResponse {
  message: string;
  // Backend có thể trả về thêm dữ liệu người dùng/token
}

// **THAY THẾ BẰNG ENDPOINT BACKEND ĐĂNG KÝ CỦA BẠN**
const API_REGISTER_URL = 'http://localhost:8080/api/v1/auth/register'; 

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false, // Thêm state cho checkbox
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Hàm xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy name, value, checked từ target
    const { name, value, checked, type } = e.target;
    
    // Xử lý checkbox riêng
    if (type === 'checkbox' && name === 'agreeTerms') {
        setFormData(prevData => ({
            ...prevData,
            [name]: checked,
        }));
    } else {
        // Xử lý các input khác
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }
  };
  

  // 2. Hàm xử lý gửi form (Đăng ký)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // KIỂM TRA VALIDATION (Phía Frontend)git add src/component/Register.tsx
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      setLoading(false);
      return;
    }
    
    if (!formData.agreeTerms) {
        setError('Bạn phải đồng ý với các điều khoản và điều kiện.');
        setLoading(false);
        return;
    }

    try {
      // Dữ liệu gửi đi (Không cần gửi confirmPassword và agreeTerms)
      const dataToSend = {
        fullName: formData.name, // Giả sử Backend dùng 'fullName'
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      };

      // Gửi yêu cầu POST đến API Backend
      const response = await axios.post<RegisterResponse>(API_REGISTER_URL, dataToSend);

      // 3. Xử lý thành công
      alert(response.data.message || 'Đăng ký thành công! Vui lòng đăng nhập.');
      
      // Chuyển hướng người dùng đến trang đăng nhập
      navigate('/login');
      
    } catch (err: any) {
      // 4. Xử lý lỗi
      let errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.';
      
      if (axios.isAxiosError(err) && err.response) {
        // Lấy thông báo lỗi từ server (ví dụ: email đã tồn tại)
        errorMessage = err.response.data.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
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
            <a href="cart.html" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </a>

            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>
      
      {/* FORM ĐĂNG KÝ (ĐÃ THÊM LOGIC) */}
      <section className="form-cotrol">
        <div className="login-container">
          <h2>Đăng ký Tài Khoản</h2>
          <form className="login-form" onSubmit={handleSubmit}> {/* THÊM onSubmit */}
            <label>Thông tin đăng nhập</label>

            {/* HIỂN THỊ THÔNG BÁO LỖI */}
            {error && (
                <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '15px' }}>
                    {error}
                </p>
            )}
            
            {/* HỌ VÀ TÊN */}
            <input 
                type="text" 
                name="name" // Đặt name để handleInputChange hoạt động
                placeholder="Họ và tên*" 
                value={formData.name}
                onChange={handleInputChange}
                required 
            />
            {/* SỐ ĐIỆN THOẠI */}
            <input 
                type="tel" 
                name="phone"
                placeholder="Số điện thoại*" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
            />
            {/* EMAIL */}
            <input 
                type="email" 
                name="email"
                placeholder="Email*" 
                value={formData.email}
                onChange={handleInputChange}
                required 
            />
            {/* MẬT KHẨU */}
            <input 
                type="password" 
                name="password"
                placeholder="Nhập mật khẩu*" 
                value={formData.password}
                onChange={handleInputChange}
                required 
            />
            {/* XÁC NHẬN MẬT KHẨU */}
            <input
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận lại mật khẩu*"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
            />
            
            {/* CHECKBOX ĐIỀU KHOẢN */}
            <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}>
                <input 
                    type="checkbox" 
                    id="agree" 
                    name="agreeTerms" // Đặt name cho checkbox
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    style={{marginRight: '10px'}}
                /> 
                <label htmlFor="agree" style={{marginBottom: '0', fontWeight: 'normal'}}>
                    Tôi đồng ý với các điều khoản
                </label>
            </div>
            
            {/* NÚT ĐĂNG KÝ */}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'ĐĂNG KÝ'}
            </button>
            
            <button type="button" className="btn-google">
              <img src={google} alt="Google" />
              Đăng Ký bằng tài khoản Google
            </button>
            
            <p className="signup-text">
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        {/* ... (Code Footer) ... */}
      </footer>
    </>
  );
};

export default Register;