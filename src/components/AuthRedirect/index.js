import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";

/**
 * Component để redirect về trang phù hợp dựa trên authentication status
 * Nếu đã đăng nhập: redirect về home hoặc returnUrl nếu có
 * Nếu chưa đăng nhập: redirect về login
 */
function AuthRedirect() {
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const token = getCookie("token");
  const location = useLocation();
  
  // Lấy returnUrl từ query params nếu có
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get("returnUrl") || "/home";
  
  // Kiểm tra cả Redux state và token trong cookie
  const isAuthenticated = isLoggedIn && token;
  
  useEffect(() => {
    // Log để debug
    console.log("AuthRedirect: Authentication status:", isAuthenticated);
    console.log("AuthRedirect: Return URL:", returnUrl);
  }, [isAuthenticated, returnUrl]);
  
  if (isAuthenticated) {
    // Nếu đã đăng nhập, redirect về returnUrl hoặc trang chủ
    return <Navigate to={returnUrl} replace />;
  } else {
    // Nếu chưa đăng nhập, redirect về trang login với returnUrl
    return <Navigate to={`/login?returnUrl=${encodeURIComponent(returnUrl)}`} replace />;
  }
}

export default AuthRedirect;