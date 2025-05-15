import React from 'react'
import Layout from '@/pages/layouts/Layout'
import Dashboard from '@/pages/dashboard/Dashboard'
import Invoices from '@/pages/invoices/Invoices'
import Learners from '@/pages/learners/Learners'
import Report from '@/pages/report/Report'
import Tracks from '@/pages/tracks/Tracks'
import Courses from '@/pages/courses/Courses'
import SignUp from '@/pages/registration/SignUp'
import { Routes,Route } from 'react-router-dom'
import Login from "../pages/login/Login"
import ForgotPassword from '@/pages/login/forgotpassword/ForgotPassword'
import OtpVerification from '@/pages/login/forgotpassword/OtpVerification'
import PasswordRest from '@/pages/login/forgotpassword/PasswordRest'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Layout/>}>
             <Route index element={<Dashboard/>}/>
             <Route path="invoices" element={<Invoices/>}/>
             <Route path="learners" element={<Learners/>}/>
             <Route path="report" element={<Report/>}/>
             <Route path="tracks" element={<Tracks/>}/>
             <Route path="courses" element={<Courses/>}/>

            </Route>
         <Route path='signup' element={<SignUp/>}/>
         <Route path='login' element={<Login/>}/>
         <Route path="forgot-password" element={<ForgotPassword/>}/>
         <Route path='otp' element={<OtpVerification/>}/>
         <Route path='password' element={<PasswordRest/>}/>

        </Routes>


    </div>
  )
}

export default AppRoutes