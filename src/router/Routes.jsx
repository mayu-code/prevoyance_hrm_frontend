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
import { AllEmployees } from "../pages/common/AllEmployess/AllEnployees";
import { CreatePassword } from "../pages/createPassword/CreatePassword";
import { EmployeeDetails } from "../pages/common/employeeDetails/EmployeeDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Public Routes
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
        path: "/createPassword",
        element: <CreatePassword />,
      },

      // Protected Routes for Super Admin
      {
        path: "/sadmin",
        element: <ProtectedRoute allowedRoles={["SUPERADMIN"]} />,
        children: [
          {
            path: "dashboard",
            element: <SuperAdminDashboard />,
          },
          {
            path: "registration",
            element: <RegistrationForm />,
          },
          {
            path: "all-candidates",
            element: <AllCandidates />,
          },
          {
            path: "all-employees",
            element: <AllEmployees />,
          },
        ],
      },

      // Protected Routes for Admin
      {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "registration",
            element: <RegistrationForm />,
          },
          {
            path: "all-candidates",
            element: <AllCandidates />,
          },
          {
            path: "all-employees",
            element: <AllEmployees />,
          },
        ],
      },

      // Protected Routes for HR Manager
      {
        path: "/hr-manager",
        element: <ProtectedRoute allowedRoles={["HRMANAGER"]} />,
        children: [
          {
            path: "dashboard",
            element: <HrManagerDashboard />,
          },
          {
            path: "registration",
            element: <RegistrationForm />,
          },
          {
            path: "all-candidates",
            element: <AllCandidates />,
          },
          {
            path: "all-employees",
            element: <AllEmployees />,
          },
        ],
      },

      // Protected Routes for HR Executive
      {
        path: "/hr-executive",
        element: <ProtectedRoute allowedRoles={["HREXECUTIVE"]} />,
        children: [
          {
            path: "dashboard",
            element: <HrExecutiveDashboard />,
          },
          {
            path: "registration",
            element: <RegistrationForm />,
          },
          {
            path: "all-candidates",
            element: <AllCandidates />,
          },
          {
            path: "all-employees",
            element: <AllEmployees />,
          },
        ],
      },
    ],
  },
]);
