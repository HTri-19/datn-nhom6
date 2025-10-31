// Thumbnail click handler
// const thumbnails = document.querySelectorAll('.thumbnail');
// thumbnails.forEach((thumb, index) => {
//     thumb.addEventListener('click', () => {
//         thumbnails.forEach(t => t.classList.remove('active'));
//         thumb.classList.add('active');
//     });
// });

// // Config button handler
// const configBtns = document.querySelectorAll('.config-btn');
// configBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         configBtns.forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');
//     });
// });

// // Buy button handler
// document.querySelector('.btn-buy').addEventListener('click', () => {
//     alert('Đang chuyển đến trang thanh toán...');
// });

// // Cart button handler
// document.querySelector('.btn-cart').addEventListener('click', () => {
//     alert('Đã thêm vào giỏ hàng!');
// });

 const slides = document.querySelectorAll(".slides img");
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === i);
      dots[idx].classList.toggle("active", idx === i);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });

  setInterval(nextSlide, 2000); // tự động chuyển sau mỗi 4 giây