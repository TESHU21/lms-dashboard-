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

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="learners" element={<Learners />} />
            <Route path="report" element={<Report />} />
            <Route path="tracks" element={<Tracks />} />
            <Route path="tracks/:id" element={<TrackDetail />} />
            <Route path="courses" element={<Courses />} />
            <Route path="create-learner" element={<CreateLearner />} />
            <Route path="create-invoice" element={<CreateInvoices />} />
            <Route path="track-update" element={<TrackUpdate />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRoutes;
