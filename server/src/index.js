import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const DEV_URLS = ["http://localhost:3000", "http://localhost:3001"];

// Cấu hình CORS để chấp nhận request từ nhiều origin
app.use(
  cors({
    origin: function (origin, callback) {
      // Cho phép requests không có origin (như mobile apps hoặc curl requests)
      if (!origin) return callback(null, true);

      // Kiểm tra nếu origin nằm trong danh sách cho phép
      if (process.env.NODE_ENV === "production") {
        // Trong môi trường production, chỉ chấp nhận CLIENT_URL
        if (origin === CLIENT_URL) {
          return callback(null, true);
        }
      } else {
        // Trong môi trường development, chấp nhận các URL dev
        if (DEV_URLS.indexOf(origin) !== -1) {
          return callback(null, true);
        }
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "your-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
      callbackURL: "/api/auth/google/callback", // Sử dụng đường dẫn tương đối
      proxy: true, // Quan trọng: cho phép proxy qua Vercel
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        avatar: profile.photos?.[0]?.value,
      };
      return done(null, user);
    }
  )
);

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Debug route để test
app.get("/api/test", (req, res) =>
  res.json({ message: "API is working", timestamp: new Date().toISOString() })
);

// Route với prefix /api
app.get(
  "/api/auth/google",
  (req, res, next) => {
    // Lưu URL gốc để sử dụng trong callback
    const fullUrl = req.protocol + "://" + req.get("host");
    req.fullHostUrl = fullUrl;
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route không có prefix /api (để tương thích)
app.get(
  "/auth/google",
  (req, res, next) => {
    // Lưu URL gốc để sử dụng trong callback
    const fullUrl = req.protocol + "://" + req.get("host");
    req.fullHostUrl = fullUrl;
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback với prefix /api
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: CLIENT_URL + "/login?error=google",
  }),
  (req, res) => {
    const token = jwt.sign(
      { sub: req.user.id, email: req.user.email, name: req.user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Sử dụng CLIENT_URL từ biến môi trường
    const redirectUrl = new URL(CLIENT_URL + "/login");
    redirectUrl.searchParams.set("oauth", "google");
    redirectUrl.searchParams.set("token", token);
    redirectUrl.searchParams.set("name", req.user.name || "");
    redirectUrl.searchParams.set("email", req.user.email || "");

    // Chuyển hướng đến URL frontend
    res.redirect(redirectUrl.toString());
  }
);

// Callback không có prefix /api (để tương thích)
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: CLIENT_URL + "/login?error=google",
  }),
  (req, res) => {
    const token = jwt.sign(
      { sub: req.user.id, email: req.user.email, name: req.user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Sử dụng CLIENT_URL từ biến môi trường
    const redirectUrl = new URL(CLIENT_URL + "/login");
    redirectUrl.searchParams.set("oauth", "google");
    redirectUrl.searchParams.set("token", token);
    redirectUrl.searchParams.set("name", req.user.name || "");
    redirectUrl.searchParams.set("email", req.user.email || "");

    // Chuyển hướng đến URL frontend
    res.redirect(redirectUrl.toString());
  }
);

// Export app for Vercel
export default app;

// Only start server when running locally
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Auth server running on http://localhost:${PORT}`);
  });
}
