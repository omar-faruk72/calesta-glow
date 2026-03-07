import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </div>
    </AuthProvider>
  </StrictMode>,
);
