import React, { useState, useEffect } from 'react';
import FormComp from '@/components/FormComp';
import { z } from 'zod';
import { useAuth } from '@/contexts/authContext';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [timer, setTimer] = useState(0);
  const [isLoading,setIsLoading]=useState(false)
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { verifyEmail, resendVerificationToken } = useAuth();
  const navigate=useNavigate()

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Zod validation
  const otpSchema = z.object({
    token: z
      .string()
      .length(6, 'OTP must be exactly 6 digits')
      .regex(/^\d{6}$/, 'OTP must contain only numbers'),
  });

  const initialValues = { token: '' };
  const fields = [
    {
      name: 'token',
      type: 'token',
      className: 'col-span-2',
      placeholder: '123456',
    },
  ];

  // Handle verification
  const handleVerifyEmail = async (data) => {
    try {
        setIsLoading(true)
      const response = await verifyEmail(data);
      console.log('OTP verified:', response);
      setSuccessMessage('Email verified successfully!');
      setErrorMessage('');
      navigate("/")
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Verification failed';
      setErrorMessage(msg);
      setSuccessMessage('');
    }
    finally{
        setIsLoading(false)
    }
  };

  // Handle resend
  const handleResendVerificationToken = async () => {
    try {
      const response = await resendVerificationToken();
      console.log('OTP resent:', response);
      setSuccessMessage('OTP resent successfully!');
      setErrorMessage('');
      setTimer(30); // Start countdown only after successful resend
     
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Failed to resend OTP';
      setErrorMessage(msg);
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex justify-center md:gap-[49px]">
      {/* Left Image */}
      <div className="hidden md:flex md:ml-[190px]">
        <img
          src={HeroImage}
          alt="Work desk illustration"
          className="w-[418px] h-[418px] object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="md:w-[431px] px-4 md:px-0 py-24">
        <h3 className="font-lato text-center font-bold text-[28px] md:text-[40px] leading-12 mb-[15px]">
          Email Verification
        </h3>
        <p className="leading-6 text-base font-inter mb-6">
          Verify your account using the six-digit code sent to your email.
        </p>

        {/* Alerts */}
        {successMessage && (
          <p className="text-green-600 text-sm mb-2">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
        )}

        {/* OTP Form */}
        <FormComp
          schema={otpSchema}
          initialValues={initialValues}
          fields={fields}
          submitBtnText="Reset password"
          onSubmit={handleVerifyEmail}
        
        />

        {/* Resend with Countdown */}
        <div className="text-sm mt-4">
          <span>Didn't receive the OTP code? </span>
          <button
            onClick={handleResendVerificationToken}
            disabled={timer > 0}
            className="text-blue-600 underline hover:text-blue-800 transition disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Resend
          </button>
          {timer > 0 && <span className="ml-2 text-gray-500">({timer}s)</span>}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
