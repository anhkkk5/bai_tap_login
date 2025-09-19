import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";
import "./styles.css";

/**
 * Trang chuyển hướng sau xác thực
 * Hiển thị loading trong khi kiểm tra trạng thái xác thực
 * Sau đó chuyển hướng đến trang phù hợp
 */
function AuthRedirectPage() {
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const token = getCookie("token");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  // Lấy returnUrl từ query params nếu có
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get("returnUrl") || "/home";
  
  // Kiểm tra cả Redux state và token trong cookie
  const isAuthenticated = isLoggedIn && token;
  
  useEffect(() => {
    // Giả lập thời gian kiểm tra xác thực
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="auth-redirect-container">
        <div className="auth-redirect-paper"
          >
          <h1 className="auth-redirect-title">Đang xác thực...</h1>
          <div className="auth-redirect-loading">
            <div className="auth-redirect-spinner"></div>
            <p className="auth-redirect-text">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    // Nếu đã đăng nhập, redirect về returnUrl hoặc trang chủ
    return <Navigate to={returnUrl} replace />;
  } else {
    // Nếu chưa đăng nhập, redirect về trang login với returnUrl
    return <Navigate to={`/login?returnUrl=${encodeURIComponent(returnUrl)}`} replace />;
  }
}

export default AuthRedirectPage;