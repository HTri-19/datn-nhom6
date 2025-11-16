import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import { Link } from "react-router-dom";
// Nếu bạn có ảnh thanh toán visa, bạn có thể thêm vào đây
// import payment from "../assets/images/visa.png"; 

const CompleteOrder = () => {
  return (
    <>
      {/* MAIN HEADER (Tái sử dụng) */}
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
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </Link>
            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH: HOÀN TẤT ĐẶT HÀNG */}
      <section className="complete-section">
        <div className="container-tt">
          {/* Progress Bar (Bước cuối) */}
          <div className="progress-bar mt-5">
            <div className="step">Chọn sản phẩm</div>
            <div className="step">Thông tin đặt hàng</div>
            <div className="step active">Hoàn tất đặt hàng</div>
          </div>

          <div className="complete-content">
            {/* Icon Checkmark lớn */}
            <i className="fa-solid fa-circle-check check-icon"></i> 
            <h2>Cảm ơn bạn đã đặt hàng tại T&T Center!</h2>
            <p>
              Đơn hàng của bạn **#TT000001** đã được ghi nhận thành công.
            </p>
            <p className="note">
              Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút để xác nhận lại thông tin giao hàng chi tiết. Vui lòng giữ liên lạc.
            </p>
            
            <div className="actions">
                {/* Nút chính: Về trang chủ */}
                <Link to="/" className="btn-primary complete-btn">
                    VỀ TRANG CHỦ
                </Link>
                {/* Nút phụ: Tra cứu đơn hàng */}
                <button className="btn-secondary complete-btn" onClick={() => alert("Chức năng tra cứu đơn hàng sẽ được phát triển sau.")}>
                    TRA CỨU ĐƠN HÀNG
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (Tái sử dụng) */}
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

export default CompleteOrder;