import type { RouteObject } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { ApiDocumentationPage } from "@/pages/ApiDocumentationPage";
import { SwaggerPage } from "@/pages/SwaggerPage";

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
