import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Ensure Routes and Route are imported

// Import your components
import Layout from '@/pages/layouts/Layout';
import Dashboard from '@/pages/dashboard/Dashboard';
import Invoices from '@/pages/invoices/Invoices';
import Learners from '@/pages/learners/Learners';
import Report from '@/pages/report/Report';
import Tracks from '@/pages/tracks/Tracks';
import Courses from '@/pages/courses/Courses';
import SignUp from '@/pages/registration/SignUp';
import Login from "../pages/login/Login"; // Correct path if needed
import Logout from '@/pages/logout/Logout';
import ForgotPassword from '@/pages/login/forgotpassword/ForgotPassword';
import OtpVerification from '@/pages/login/forgotpassword/OtpVerification';
import PasswordRest from '@/pages/login/forgotpassword/PasswordRest';
import CreateLearner from '@/pages/learners/components/LearnerFormDialog';
import CreateInvoices from '@/pages/invoices/components/CreateInvoices';
import CourseDetail from '@/pages/tracks/components/TrackDetail';
import TrackUpdate from '@/pages/tracks/components/TrackFormDialog';
import EmailVerification from '@/pages/login/forgotpassword/EmailVerification';
import TrackDetail from '@/pages/tracks/components/TrackDetail';
import VerifyEmail from '@/components/VerifyEmail';
import Settings from '@/pages/settings/Settings';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
    
        <Route path="/" element={<Login />} />


        <Route path='signup' element={<SignUp />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
         <Route path="/reset-password/:token" element={<EmailVerification/>}/>
         <Route  path="/verify-email" element={<VerifyEmail/>}/>

        {/* <Route path='otp' element={<OtpVerification />} /> */}
        <Route path='password' element={<PasswordRest />} />

        <Route path="/app" element={<Layout />}>
       
          <Route index element={<Dashboard />} />
       
          <Route path="invoices" element={<Invoices />} />
          <Route path="learners" element={<Learners />} />
          <Route path="report" element={<Report />} />
          <Route path="tracks" element={<Tracks />} />
          <Route path="tracks/:id" element={<TrackDetail/>}/>
          <Route path="courses" element={<Courses />} />
          <Route path="create-learner" element={<CreateLearner />} />
          <Route path="create-invoice" element={<CreateInvoices />} />
          <Route path='track-update' element={<TrackUpdate />} />
          <Route path="settings" element={<Settings/>}/>
           <Route path='logout' element={<Logout/>}/>

        </Route>

      

      </Routes>
    </div>
  );
}

export default AppRoutes;
