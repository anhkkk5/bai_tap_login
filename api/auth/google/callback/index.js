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

// Callback handler
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

    const redirectUrl = new URL(CLIENT_URL + "/login");
    redirectUrl.searchParams.set("oauth", "google");
    redirectUrl.searchParams.set("token", token);
    redirectUrl.searchParams.set("name", req.user.name || "");
    redirectUrl.searchParams.set("email", req.user.email || "");

    res.redirect(redirectUrl.toString());
  }
);

export default app;
