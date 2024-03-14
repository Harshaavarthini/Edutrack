import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Index";
import LoginForm from "./pages/home/Login";
import { RegisterForm } from "./pages/home/Register";
import { AdminHome } from "./pages/admin/AdminHome";
import { AdminTasks } from "./pages/admin/AdminTasks";
import { StudentTask } from "./pages/student/StudentTask";
import { Pending } from "./pages/student/Pending";
import AccountsPage from "./components/Acoount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
  },
  {
    path: "/admin/alltask",
    element: <AdminTasks />,
  },
  {
    path: "/student/:studentId",
    element: <StudentTask />,
  },
  {
    path: "/student/pending",
    element: <Pending />,
  },
  {
    path: "/account",
    element: <AccountsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
