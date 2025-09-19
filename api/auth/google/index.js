import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Cấu hình CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV === "production") {
        if (origin === CLIENT_URL) {
          return callback(null, true);
        }
      } else {
        const DEV_URLS = ["http://localhost:3000", "http://localhost:3001"];
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
      callbackURL: "/api/auth/google/callback",
      proxy: true,
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

// Google OAuth route
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

export default app;
