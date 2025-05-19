import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import React from 'react';
import Blending from '../../../assets/blending.svg';
import OtpHeroIcon from '../../../assets/OtpHeroIcon.svg';
import AzubiLogo from '../../../assets/Azubi-Logo.svg';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


const EmailVerification = () => {
  const { token } = useParams(); // Get the token from URL
  const { verifyEmail } = useAuth();

  const [status, setStatus] = useState("Verifying...");
  const data={token:JSON.stringify(token)}
  console.log("Token",token)

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(data); // No need to parse token
        setStatus("✅ Email verified successfully.");
      } catch (error) {
        console.error(error);
        setStatus("❌ Email verification failed. Please try again.");
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("❌ Invalid token.");
    }
  }, [token, verifyEmail]);

  return (
       <div className="flex h-screen">
      {/* Left Panel */}
      <div className="relative w-[534px] bg-[#01589A] flex flex-col pt-10 pl-[75px] text-white">
        {/* Logo & Heading */}
        <div className="z-20">
          <div className="flex items-center gap-2 mb-4">
            <img src={AzubiLogo} alt="Logo" />
            <span className="font-lusitana font-extrabold text-[37px] leading-[49px]">Client</span>
          </div>
          <h4 className="font-lato font-bold text-[32px] leading-[40px] w-[384px]">
            Secure Your Account with OTP Verification.<br />
            Simply enter the code we’ve sent to <br />
            ensure your information stays safe and protected.
          </h4>
        </div>

        {/* Illustration */}
        <div className="absolute bottom-0">
          <img src={OtpHeroIcon} alt="OTP Illustration" className="w-fit" />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 px-10 py-16">
        {/* Back Button */}
        <div className="mb-10">
         <h5 className="font-bold font-lusitana text-3xl">Email Verification</h5>
        </div>
        <p className="mt-20">{status}
</p>  
        
      </div>
    
  
    </div>
  )
};

export default EmailVerification;
