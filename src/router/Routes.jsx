import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { Home } from "../pages/common/home/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignUp } from "../pages/auth/SignUp";
import { SignIn } from "../pages/auth/SignIn";
import { SuperAdminDashboard } from "../pages/dashboard/superadmin/SuperAdminDashboard";
import { AdminDashboard } from "../pages/dashboard/admin/AdminDashboard";
import { HrManagerDashboard } from "../pages/dashboard/hrmanager/HrManagerDashboard";
import { HrExecutiveDashboard } from "../pages/dashboard/hrexecutive/HrExecutiveDashboard";
import { RegistrationForm } from "../pages/common/registrationform/RegistrationForm";
import DownloadDocument from "../api/service/downloadDocument/DownloadDocument";
import { data } from "../components/ui/Utils";
import { AllCandidates } from "../pages/common/AllCandidates/AllCandidates";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/download",
        element: <DownloadDocument data={data} />,
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute
            allowedRoles={["SUPERADMIN", "ADMIN", "HRMANAGER", "HREXECUTIVE"]}
          />
        ),
        children: [
          {
            path: "/user/sadmin",
            element: <ProtectedRoute allowedRoles={["SUPERADMIN"]} />,
            children: [
              {
                path: "/user/sadmin/dashboard",
                element: <SuperAdminDashboard />,
              },
            ],
          },
          {
            path: "/user/admin",
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
              {
                path: "/user/admin/dashboard",
                element: <AdminDashboard />,
              },
            ],
          },
          {
            path: "/user/hr-manager",
            element: <ProtectedRoute allowedRoles={["HRMANAGER"]} />,
            children: [
              {
                path: "/user/hr-manager/dashboard",
                element: <HrManagerDashboard />,
              },
            ],
          },
          {
            path: "/user/hr-executive",
            element: <ProtectedRoute allowedRoles={["HREXECUTIVE"]} />,
            children: [
              {
                path: "/user/hr-executive/dashboard",
                element: <HrExecutiveDashboard />,
              },
              {
                path: "/user/hr-executive/registration",
                element: <RegistrationForm />,
              },
              {
                path: "/user/hr-executive/all-candidates",
                element: <AllCandidates />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
