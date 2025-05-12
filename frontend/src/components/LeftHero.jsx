import React from 'react';
import AzubiLogo from "../assets/Azubi-Logo.svg";
import Blending from "../assets/blending.svg";
import Person from "../assets/person.svg";

const LeftHero = () => {
  return (
    <div className="relative flex flex-col w-[534px] h-screen bg-[#01589A] overflow-visible">
      
      {/* Header Section */}
      <div className="flex flex-col pt-10 pl-[75px] z-20">
        <div className="flex items-center gap-2 mb-4">
          <img src={AzubiLogo} alt="Logo" />
          <span className="font-lusitana font-extrabold text-white text-[37px] leading-[49px]">CLient</span>
        </div>
        <div className="w-[384px]">
          <h4 className="font-lato font-bold text-white text-[32px] leading-[40px]">
            Create Your Account <br />
            to Manage and Access <br />
            the Dashboard Effortlessly.
          </h4>
        </div>
      </div>

      {/* Blending Wave */}
      <div className="absolute z-10 top-[300px] -left-[90px] w-[530px] pointer-events-none">
        <img 
          src={Blending} 
          alt="Wave of white lines" 
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Person Illustration */}
      <div className="absolute bottom-0 z-0">
        <img src={Person} alt="Running Learners on Scooters" />
      </div>

    </div>
  );
};

export default LeftHero;
