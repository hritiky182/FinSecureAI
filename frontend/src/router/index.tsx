import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "@/store/app-store";

// Import layout
import AppLayout from "@/routes/_app";

// Import pages
import IndexRoute from "@/routes/index";
import LoginPage from "@/routes/login";
import AIPage from "@/routes/_app.ai-assistant";
import AlertsPage from "@/routes/_app.alerts";
import CompPage from "@/routes/_app.compliance";
import CyberPage from "@/routes/_app.cybersecurity";
import Dashboard from "@/routes/_app.dashboard";
import DIPage from "@/routes/_app.data-intelligence";
import DBPage from "@/routes/_app.database";
import ExecPage from "@/routes/_app.executive";
import FraudPage from "@/routes/_app.fraud";
import IncPage from "@/routes/_app.incidents";
import IntPage from "@/routes/_app.integrations";
import NotifPage from "@/routes/_app.notifications";
import ReconPage from "@/routes/_app.reconciliation";
import ReportsPage from "@/routes/_app.reports";
import RiskPage from "@/routes/_app.risk-rating";
import SettingsPage from "@/routes/_app.settings";
import TxPage from "@/routes/_app.transactions";
import UsersPage from "@/routes/_app.users";

// Protected Route wrapper
function ProtectedRoute() {
  const authed = useAppStore((state) => state.authed);
  return authed ? <Outlet /> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexRoute />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/executive",
            element: <ExecPage />,
          },
          {
            path: "/data-intelligence",
            element: <DIPage />,
          },
          {
            path: "/transactions",
            element: <TxPage />,
          },
          {
            path: "/fraud",
            element: <FraudPage />,
          },
          {
            path: "/integrations",
            element: <IntPage />,
          },
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: "/database",
            element: <DBPage />,
          },
          {
            path: "/cybersecurity",
            element: <CyberPage />,
          },
          {
            path: "/reconciliation",
            element: <ReconPage />,
          },
          {
            path: "/compliance",
            element: <CompPage />,
          },
          {
            path: "/risk-rating",
            element: <RiskPage />,
          },
          {
            path: "/incidents",
            element: <IncPage />,
          },
          {
            path: "/alerts",
            element: <AlertsPage />,
          },
          {
            path: "/reports",
            element: <ReportsPage />,
          },
          {
            path: "/ai-assistant",
            element: <AIPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/notifications",
            element: <NotifPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
