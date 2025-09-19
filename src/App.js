import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AllRouter from "./AllRoute/index";
import "./App.css";
import { ConfigProvider } from "antd";
import ErrorBoundary from "./components/ErrorBoundary";
import { getCookie } from "./helpers/cookie";
import { checkLogin } from "./actions/login";

function App() {
  const dispatch = useDispatch();

  // Khởi tạo authentication state từ cookie khi app load
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      // Nếu có token trong cookie, set login state = true
      dispatch(checkLogin(true));
    } else {
      // Nếu không có token, đảm bảo login state = false
      dispatch(checkLogin(false));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ErrorBoundary>
        <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
          <AllRouter />
        </ConfigProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
