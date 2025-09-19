import React from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Space,
  Tag,
  Avatar,
} from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CodeOutlined,
  DatabaseOutlined,
  ApiOutlined,
  ToolOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function Home() {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .hero-section {
            animation: fadeInUp 1s ease-out;
          }
          .skill-card:hover {
            transform: translateY(-5px);
            transition: all 0.3s ease;
          }
          .project-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
        `}
      </style>
      
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "40%",
            height: "40%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-15%",
            width: "50%",
            height: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)",
            borderRadius: "50%",
            filter: "blur(50px)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />

        <div style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
          {/* Hero Section */}
          <Row justify="center" style={{ marginBottom: 80 }}>
            <Col xs={24} md={16} lg={12}>
              <div className="hero-section" style={{ textAlign: "center" }}>
                <Avatar
                  size={120}
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "4px solid rgba(255,255,255,0.3)",
                    marginBottom: 24,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                >
                  <span style={{ fontSize: 48, fontWeight: "bold", color: "white" }}>TA</span>
                </Avatar>
                <Title
                  level={1}
                  style={{
                    color: "white",
                    fontSize: 48,
                    fontWeight: "bold",
                    marginBottom: 16,
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  Nguyễn Tuấn Anh
                </Title>
                <Title
                  level={3}
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: "normal",
                    marginBottom: 24,
                  }}
                >
                  Web Developer
                </Title>
                <Paragraph
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 18,
                    maxWidth: 600,
                    margin: "0 auto 32px",
                    lineHeight: 1.6,
                  }}
                >
                  Chuyên gia phát triển web với đam mê tạo ra những trải nghiệm số đặc biệt. 
                  Kết hợp sáng tạo và công nghệ để mang đến giải pháp hoàn hảo.
                </Paragraph>
                <Space size="large">
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: 25,
                      padding: "0 32px",
                      height: 50,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Khám phá portfolio
                  </Button>
                  <Button
                     size="large"
                     style={{
                       background: "transparent",
                       border: "1px solid rgba(255,255,255,0.5)",
                       color: "white",
                       borderRadius: 25,
                       padding: "0 32px",
                       height: 50,
                     }}
                   >
                    Liên hệ
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>

          {/* About Section */}
          <Row justify="center" style={{ marginBottom: 80 }}>
            <Col xs={24} md={20} lg={16}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: 20,
                  border: "none",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(20px)",
                }}
                bodyStyle={{ padding: 40 }}
              >
                <Title level={2} style={{ textAlign: "center", marginBottom: 32, color: "#2c3e50" }}>
                  Về tôi
                </Title>
                <Row gutter={[32, 32]} align="middle">
                  <Col xs={24} md={12}>
                    <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: "#5a6c7d" }}>
                      Xin chào! Tôi là Nguyễn Tuấn Anh, một nhà phát triển web đam mê công nghệ 
                      và luôn theo đuổi sự hoàn hảo trong từng dòng code. Với kinh nghiệm làm việc 
                      với các công nghệ hiện đại như MongoDB, SQL, React.js, và Node.js.
                    </Paragraph>
                    <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: "#5a6c7d" }}>
                      Tôi tin rằng công nghệ không chỉ là công cụ, mà là cầu nối giữa ý tưởng và 
                      hiện thực. Mục tiêu của tôi là tạo ra những sản phẩm có ý nghĩa, mang lại 
                      giá trị thực sự cho người dùng.
                    </Paragraph>
                  </Col>
                  <Col xs={24} md={12}>
                    <div style={{ textAlign: "center" }}>
                      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                          <EnvironmentOutlined style={{ color: "#667eea", fontSize: 18 }} />
                          <Text style={{ fontSize: 16, color: "#5a6c7d" }}>Hà Đông, Hà Nội</Text>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                          <MailOutlined style={{ color: "#667eea", fontSize: 18 }} />
                          <Text style={{ fontSize: 16, color: "#5a6c7d" }}>tuananh@example.com</Text>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                          <PhoneOutlined style={{ color: "#667eea", fontSize: 18 }} />
                          <Text style={{ fontSize: 16, color: "#5a6c7d" }}>+84 123 456 789</Text>
                        </div>
                      </Space>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Skills Section */}
          <Row justify="center" style={{ marginBottom: 80 }}>
            <Col xs={24} md={20} lg={16}>
              <Title level={2} style={{ textAlign: "center", marginBottom: 48, color: "white" }}>
                Chuyên môn
              </Title>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={6}>
                  <Card
                    className="skill-card"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 16,
                      border: "none",
                      textAlign: "center",
                      height: 200,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <CodeOutlined style={{ fontSize: 48, color: "#667eea", marginBottom: 16 }} />
                    <Title level={4} style={{ marginBottom: 12, color: "#2c3e50" }}>Frontend</Title>
                    <Text style={{ color: "#5a6c7d" }}>HTML5, CSS3, JavaScript, React.js</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card
                    className="skill-card"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 16,
                      border: "none",
                      textAlign: "center",
                      height: 200,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <ApiOutlined style={{ fontSize: 48, color: "#764ba2", marginBottom: 16 }} />
                    <Title level={4} style={{ marginBottom: 12, color: "#2c3e50" }}>Backend</Title>
                    <Text style={{ color: "#5a6c7d" }}>Node.js, Express.js, RESTful API</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card
                    className="skill-card"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 16,
                      border: "none",
                      textAlign: "center",
                      height: 200,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <DatabaseOutlined style={{ fontSize: 48, color: "#667eea", marginBottom: 16 }} />
                    <Title level={4} style={{ marginBottom: 12, color: "#2c3e50" }}>Database</Title>
                    <Text style={{ color: "#5a6c7d" }}>MongoDB, SQL, MySQL</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card
                    className="skill-card"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 16,
                      border: "none",
                      textAlign: "center",
                      height: 200,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <ToolOutlined style={{ fontSize: 48, color: "#764ba2", marginBottom: 16 }} />
                    <Title level={4} style={{ marginBottom: 12, color: "#2c3e50" }}>Tools</Title>
                    <Text style={{ color: "#5a6c7d" }}>Git, VS Code, Postman</Text>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Projects Section */}
          <Row justify="center" style={{ marginBottom: 80 }}>
            <Col xs={24} md={20} lg={16}>
              <Title level={2} style={{ textAlign: "center", marginBottom: 48, color: "white" }}>
                Dự án nổi bật
              </Title>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Card
                    className="project-card"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 16,
                      border: "none",
                      height: 300,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <Title level={4} style={{ marginBottom: 16, color: "#2c3e50" }}>
                      Hệ thống quản lý thực tập
                    </Title>
                    <Paragraph style={{ color: "#5a6c7d", marginBottom: 16 }}>
                      Hệ thống toàn diện kết nối sinh viên và nhà tuyển dụng với tính năng 
                      quản lý hồ sơ và matching thông minh.
                    </Paragraph>
                    <Space wrap>
                      <Tag color="blue">React.js</Tag>
                      <Tag color="purple">ASP.NET</Tag>
                      <Tag color="green">SQL Server</Tag>
                      <Tag color="orange">RESTful API</Tag>
                    </Space>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card
                    className="project-card"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 16,
                      border: "none",
                      height: 300,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <Title level={4} style={{ marginBottom: 16, color: "#2c3e50" }}>
                      Nền tảng tuyển dụng
                    </Title>
                    <Paragraph style={{ color: "#5a6c7d", marginBottom: 16 }}>
                      Nền tảng hiện đại cho phép các công ty đăng tin tuyển dụng và 
                      người tìm việc dễ dàng ứng tuyển.
                    </Paragraph>
                    <Space wrap>
                      <Tag color="blue">React.js</Tag>
                      <Tag color="cyan">JSON Database</Tag>
                      <Tag color="green">Responsive Design</Tag>
                      <Tag color="purple">Modern UI/UX</Tag>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Contact Section */}
          <Row justify="center">
            <Col xs={24} md={16} lg={12}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: 20,
                  border: "none",
                  textAlign: "center",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(20px)",
                }}
                bodyStyle={{ padding: 40 }}
              >
                <Title level={2} style={{ marginBottom: 16, color: "#2c3e50" }}>
                  Kết nối với tôi
                </Title>
                <Paragraph style={{ fontSize: 16, color: "#5a6c7d", marginBottom: 32 }}>
                  Tôi luôn sẵn sàng thảo luận về các cơ hội hợp tác thú vị. 
                  Hãy kết nối và cùng nhau tạo nên những điều tuyệt vời!
                </Paragraph>
                <Space size="large">
                  <Button
                    type="primary"
                    icon={<GithubOutlined />}
                    size="large"
                    style={{
                      background: "#333",
                      border: "none",
                      borderRadius: 25,
                      padding: "0 24px",
                      height: 45,
                    }}
                  >
                    GitHub
                  </Button>
                  <Button
                    type="primary"
                    icon={<LinkedinOutlined />}
                    size="large"
                    style={{
                      background: "#0077b5",
                      border: "none",
                      borderRadius: 25,
                      padding: "0 24px",
                      height: 45,
                    }}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    type="primary"
                    icon={<MailOutlined />}
                    size="large"
                    style={{
                      background: "#667eea",
                      border: "none",
                      borderRadius: 25,
                      padding: "0 24px",
                      height: 45,
                    }}
                  >
                    Email
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Home;
