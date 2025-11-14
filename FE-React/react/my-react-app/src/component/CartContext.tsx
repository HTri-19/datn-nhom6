// src/context/CartContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Định nghĩa Interface cho CartItem
export interface CartItem {
  id: number;
  name: string;
  img: string; // Đường dẫn hình ảnh
  price: number; // Giá sản phẩm (dùng số)
  quantity: number;
}

// 2. Định nghĩa Context Type (Các giá trị và hàm mà Context cung cấp)
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
}

// 3. Khởi tạo Context với giá trị mặc định là undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Lấy dữ liệu từ Local Storage nếu có, ngược lại là mảng rỗng
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Could not load cart from localStorage", e);
      return [];
    }
  });

  // Lưu giỏ hàng vào Local Storage mỗi khi cartItems thay đổi
  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Hàm thêm/cập nhật sản phẩm
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu chưa tồn tại, thêm mới với số lượng mặc định là 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Hàm xóa sản phẩm
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Hàm cập nhật số lượng
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// 5. Hook tùy chỉnh để dễ dàng sử dụng Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};