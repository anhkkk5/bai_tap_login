import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";

/**
 * Component bảo vệ các route cần authentication
 * Kiểm tra cả Redux state và cookie token
 */
function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const token = getCookie("token");
  
  // Kiểm tra cả Redux state và token trong cookie
  const isAuthenticated = isLoggedIn && token;
  
  // Nếu chưa đăng nhập, redirect về trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Nếu đã đăng nhập, render component con
  return children;
}

export default ProtectedRoute;