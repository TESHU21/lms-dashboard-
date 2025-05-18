import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {LogIn} from "lucide-react"

const Logout = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("Role");
    sessionStorage.removeItem("User");
     navigate("/");
  };
  return (
    <div>
      <Button
        className=" border-none bg-transparent text-black hover:bg-transparent ml-0 p-0 m-0 text-normal"
        onClick={handleLogOut}
      >
        <LogIn/> <span className="ml-[8px]"> Logout</span>      </Button>
    </div>
  );
};

export default Logout;
