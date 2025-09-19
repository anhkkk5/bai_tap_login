import React from "react";
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Button,
  message,
  Typography,
  Checkbox,
  Divider,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import {
  LockOutlined,
  MailOutlined,
  AppleFilled,
  GoogleOutlined,
} from "@ant-design/icons";
import { loginUser } from "../../services/authService";
import config from "../../config";
import { setCookie } from "../../helpers/cookie";

const { Title, Text } = Typography;

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // No shared rules needed here

  const onFinish = async (values) => {
    try {
      const res = await loginUser({
        email: values.email,
        password: values.password,
        remember: values.remember || false,
      });
      if (!res.ok) return messageApi.error(res.error);
      // set auth cookies for 1 day
      setCookie("token", res.token, 1);
      setCookie("userEmail", res.user.email, 1);
      setCookie("userName", res.user.name, 1);
      dispatch(checkLogin(true));
      messageApi.success("Đăng nhập thành công!");
      setTimeout(() => navigate("/home"), 800);
    } catch (error) {
      messageApi.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Login error:", error);
    }
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("oauth") === "google" && params.get("token")) {
      setCookie("token", params.get("token"), 1);
      if (params.get("email")) setCookie("userEmail", params.get("email"), 1);
      if (params.get("name")) setCookie("userName", params.get("name"), 1);
      dispatch(checkLogin(true));
      messageApi.success("Đăng nhập bằng Google thành công!");
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => navigate("/home"), 500);
    }
  }, [dispatch, messageApi, navigate]);

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }
        `}
      </style>
      {contextHolder}
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 50%, #2a2f3e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "60%",
            height: "120%",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "40%",
            height: "80%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(30px)",
          }}
        />
        <div
          style={{
            width: "100%",
            maxWidth: 1000,
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: 32,
            overflow: "hidden",
            boxShadow:
              "0 40px 120px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Row gutter={0}>
            <Col
              xs={24}
              md={12}
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
                padding: 40,
                position: "relative",
              }}
            >
              <Space direction="vertical" size={4} style={{ width: "100%" }}>
                <Space align="center" size={12} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "#0b1020",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        background: "#ffffff",
                      }}
                    />
                  </div>
                  <Title level={4} style={{ margin: 0, color: "#0b1020" }}>
                    Gradiator
                  </Title>
                </Space>

                <Title level={5} style={{ margin: 0, color: "#0b1020" }}>
                  Welcome Back Creative!
                </Title>
                <Text type="secondary">We Are Happy To See You Again</Text>

                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <Button
                    type="primary"
                    style={{
                      borderRadius: 24,
                      background: "#2b6bf3",
                      border: "none",
                      padding: "0 16px",
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    style={{ borderRadius: 24, padding: "0 16px" }}
                  >
                    Sign Up
                  </Button>
                </div>

                <Card
                  style={{
                    marginTop: 16,
                    borderRadius: 14,
                    border: "1px solid #eef1f7",
                    boxShadow: "none",
                  }}
                  bodyStyle={{ padding: 16 }}
                >
                  <Form layout="vertical" onFinish={onFinish} size="large">
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Trường này là bắt buộc!" },
                        { type: "email", message: "Email không hợp lệ!" },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Enter your email"
                        style={{ borderRadius: 24, padding: "10px 14px" }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Trường này là bắt buộc!" },
                        {
                          min: 6,
                          message: "Mật khẩu phải có ít nhất 6 ký tự!",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Enter your password"
                        style={{ borderRadius: 24, padding: "10px 14px" }}
                      />
                    </Form.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 16,
                      }}
                    >
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                      <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot Password?
                      </Button>
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      style={{
                        height: 44,
                        borderRadius: 24,
                        background: "#2b6bf3",
                        border: "none",
                      }}
                    >
                      Login
                    </Button>
                  </Form>
                </Card>

                <Divider style={{ margin: 18 }}>OR</Divider>

                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Button
                    block
                    icon={<AppleFilled />}
                    style={{
                      height: 44,
                      borderRadius: 24,
                      background: "#0b0b0b",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Log in with Apple
                  </Button>
                  <Button
                    block
                    icon={<GoogleOutlined style={{ color: "#ea4335" }} />}
                    style={{ height: 44, borderRadius: 24 }}
                    onClick={() => {
                      window.location.href = `${config.authServerUrl}/auth/google`;
                    }}
                  >
                    Log in with Google
                  </Button>
                </Space>

                <div style={{ marginTop: 16 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}></Text>
                </div>
              </Space>
            </Col>
            <Col
              xs={0}
              md={12}
              style={{
                position: "relative",
                minHeight: 600,
                background:
                  "linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #dbeafe 100%)",
                overflow: "hidden",
              }}
            >
              {/* Flowing wave effects */}
              <div
                style={{
                  position: "absolute",
                  top: "-20%",
                  left: "-20%",
                  width: "140%",
                  height: "140%",
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  borderRadius: "50%",
                  filter: "blur(20px)",
                  animation: "float 6s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30%",
                  right: "-30%",
                  width: "120%",
                  height: "120%",
                  background:
                    "radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                  borderRadius: "50%",
                  filter: "blur(30px)",
                  animation: "float 8s ease-in-out infinite reverse",
                }}
              />
              {/* Flowing curves */}
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "10%",
                  width: "200px",
                  height: "400px",
                  background:
                    "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  borderRadius: "50% 20% 50% 20%",
                  filter: "blur(1px)",
                  transform: "rotate(15deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "15%",
                  width: "150px",
                  height: "300px",
                  background:
                    "linear-gradient(-45deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                  borderRadius: "20% 50% 20% 50%",
                  filter: "blur(2px)",
                  transform: "rotate(-20deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 32,
                  right: 32,
                  left: 32,
                  color: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  padding: "16px 20px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.95)",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  © 2025 Gradiator. All rights reserved.
                </Text>
                <br />
                <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
                  Unauthorized use or reproduction of any content or materials
                  from this site is prohibited. For more information, visit our
                  Terms of Service and Privacy Policy.
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Login;
