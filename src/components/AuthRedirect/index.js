import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";

/**
 * Component để redirect về trang phù hợp dựa trên authentication status
 * Nếu đã đăng nhập: redirect về home
 * Nếu chưa đăng nhập: redirect về login
 */
function AuthRedirect() {
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const token = getCookie("token");
  
  // Kiểm tra cả Redux state và token trong cookie
  const isAuthenticated = isLoggedIn && token;
  
  if (isAuthenticated) {
    // Nếu đã đăng nhập, redirect về trang chủ
    return <Navigate to="/home" replace />;
  } else {
    // Nếu chưa đăng nhập, redirect về trang login
    return <Navigate to="/login" replace />;
  }
}

export default AuthRedirect;