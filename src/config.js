const config = {
  authServerUrl:
    process.env.REACT_APP_AUTH_SERVER_URL || "http://localhost:4000",

  // Google OAuth Configuration
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,

  // API Configuration - Sử dụng relative path cho production
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "/api",
};

export default config;
