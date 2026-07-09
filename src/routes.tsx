import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { AppLayout } from "@/layouts/AppLayout";

const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const ApiDocumentationPage = lazy(() =>
  import("@/pages/ApiDocumentationPage").then((m) => ({
    default: m.ApiDocumentationPage,
  })),
);
const SwaggerPage = lazy(() =>
  import("@/pages/SwaggerPage").then((m) => ({ default: m.SwaggerPage })),
);

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/apis",
        element: <ApiDocumentationPage />,
      },
      {
        path: "/apis/:partner",
        element: <ApiDocumentationPage />,
      },
      {
        path: "/swagger",
        element: <SwaggerPage />,
      },
    ],
  },
];
