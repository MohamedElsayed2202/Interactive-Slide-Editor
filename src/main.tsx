import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout.tsx";
import Slides from "./pages/sildes/index.tsx";
import { authLoader, editSlideLoader, indexLoader } from "./utils/loader.ts";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Login from "./pages/login/index.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import ForgetPassword from "./pages/forget-password/index.tsx";
import EditSlide from "./pages/edit-slide/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: indexLoader,
    children: [
      { index: true, element: <Slides /> },
      { path: "slides/:id", element: <EditSlide />, loader: editSlideLoader },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    loader: authLoader,
    children: [
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgetPassword /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
