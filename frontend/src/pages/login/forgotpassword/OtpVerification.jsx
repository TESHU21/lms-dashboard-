import React from 'react';
import Blending from '../../../assets/blending.svg';
import OtpHeroIcon from '../../../assets/OtpHeroIcon.svg';
import AzubiLogo from '../../../assets/Azubi-Logo.svg';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FormComp from '@/components/FormComp';

// Zod schema for OTP
const OtpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

const initialValues = {
  otp: '',
};

const fields = [
  {
    name: 'otp',
    placeholder: 'Enter OTP',
    type: 'text',
    className: 'col-span-2',
  },
];

const OtpVerification = () => {
  // Form submit handler
//   const handleSubmit = (data: { otp: string }) => {
//     console.log('OTP Submitted:', data);
//     // You can redirect or trigger backend call here
//   };

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
          <Button className="flex items-center gap-3 bg-white text-[#01589A] border border-[#01589A] hover:bg-white">
            <ArrowLeft size={18} />
            Back
          </Button>
        </div>

        {/* Form */}
        <div className="max-w-lg mt-16 ml-[186px]">
          <h3 className="mb-8 font-lato text-base text-center mt-[193px] ">Enter the verification code we sent to your  <br/> admindemo@gmail.com</h3>
          <FormComp
            schema={OtpSchema}
            fields={fields}
            initialValues={initialValues}
            submitBtnText="Verify OTP"
           
          />
          <p className="mt-14 text-center text-base leading-6 text-gray-600">
          Didn’t you receive the OPT? <span className='text-[#01589A]'> Resesnd OTP</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
