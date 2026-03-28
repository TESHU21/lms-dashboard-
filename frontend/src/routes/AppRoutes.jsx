import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom"; // Ensure Routes and Route are imported
import ProtectedRoute from "@/components/ProtectedRoute";

// Import your components
const Layout = lazy(() => import("@/pages/layouts/Layout"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Invoices = lazy(() => import("@/pages/invoices/Invoices"));
const Learners = lazy(() => import("@/pages/learners/Learners"));
const Report = lazy(() => import("@/pages/report/Report"));
const Tracks = lazy(() => import("@/pages/tracks/Tracks"));
const TrackDetail = lazy(() => import("@/pages/tracks/components/TrackDetail"));
const Courses = lazy(() => import("@/pages/courses/Courses"));
const SignUp = lazy(() => import("@/pages/registration/SignUp"));
const Login = lazy(() => import("../pages/login/Login"));
const Logout = lazy(() => import("@/pages/logout/Logout"));
const ForgotPassword = lazy(
  () => import("@/pages/login/forgotpassword/ForgotPassword"),
);
const PasswordRest = lazy(
  () => import("@/pages/login/forgotpassword/PasswordRest"),
);
const CreateLearner = lazy(
  () => import("@/pages/learners/components/LearnerFormDialog"),
);
const CreateInvoices = lazy(
  () => import("@/pages/invoices/components/CreateInvoices"),
);
const TrackUpdate = lazy(
  () => import("@/pages/tracks/components/TrackFormDialog"),
);
const EmailVerification = lazy(
  () => import("@/pages/login/forgotpassword/EmailVerification"),
);
const VerifyEmail = lazy(() => import("@/components/VerifyEmail"));
const Settings = lazy(() => import("@/pages/settings/Settings"));

const AppRoutes = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:token"
            element={<EmailVerification />}
          />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="password" element={<PasswordRest />} />

          <Route path="/app" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="invoices"
              element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="learners"
              element={
                <ProtectedRoute>
                  <Learners />
                </ProtectedRoute>
              }
            />
            <Route
              path="report"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />
            <Route
              path="tracks"
              element={
                <ProtectedRoute>
                  <Tracks />
                </ProtectedRoute>
              }
            />
            <Route
              path="tracks/:id"
              element={
                <ProtectedRoute>
                  <TrackDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-learner"
              element={
                <ProtectedRoute>
                  <CreateLearner />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-invoice"
              element={
                <ProtectedRoute>
                  <CreateInvoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="track-update"
              element={
                <ProtectedRoute>
                  <TrackUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRoutes;
