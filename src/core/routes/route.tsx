import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { DefaultLoader } from "@/common/components";
import { MainLayout } from "@/layouts";
import { PATHS } from "./path";

const HomePage = lazy(() =>
  import("@/pages/Home").then((module) => ({
    default: module.HomePage,
  })),
);
const ComponentLibraryPage = lazy(() =>
  import("@/pages/ComponentLibrary").then((module) => ({
    default: module.ComponentLibraryPage,
  })),
);
const ProfilePage = lazy(() =>
  import("@/pages/Profile").then((module) => ({
    default: module.ProfilePage,
  })),
);
const LoginPage = lazy(() =>
  import("@/pages/Login").then((module) => ({
    default: module.LoginPage,
  })),
);

export const ROUTER = createBrowserRouter([
  {
    path: PATHS.login,
    element: (
      <Suspense fallback={<DefaultLoader center="screen" />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.ui_kit,
        element: <ComponentLibraryPage />,
      },
      {
        path: PATHS.profile,
        element: <ProfilePage />,
      },
    ],
  },
  { path: "*", element: <Navigate to={PATHS.home} replace /> },
]);
