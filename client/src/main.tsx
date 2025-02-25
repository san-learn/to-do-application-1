import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";

import { HomePage } from "./pages/home-page";
import { SignInPage } from "./pages/sign-in-page";
import { SignUpPage } from "./pages/sign-up-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="bottom-center" />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
