import React from "react";
import LayoutDefault from "../Layout/LayoutDefault";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthRedirect from "../components/AuthRedirect";
import AuthRedirectPage from "../pages/AuthRedirect";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Logout from "../pages/Logout";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <AuthRedirect />,
      },
      {
        path: "auth/redirect",
        element: <AuthRedirectPage />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
];
