import React,{useContext,createContext} from "react";
import axiosInstance from "@/lib/axiosInstance";
const AuthContext=createContext();
export const useAuth=()=>{
    return useContext(AuthContext)
}
export const AuthProvider=({children})=>{
    const storeToken=(token)=>{
  sessionStorage.setItem("Token",JSON.stringify(token))

}
// store user in session storage
const storeUser=(user)=>{
  sessionStorage.setItem("User",JSON.stringify(user))

}
  // Register Admin
  const signup = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/signup/admin', data);
      return response.data;
    } catch (error) {
      console.log('Signup Failed', error);
      throw error;
    }
  };

  // Admin Login
  const signin = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      if(response?.status===200){
        storeToken(response.data.token)
        storeUser(response.data.user)
      }
      return response;
    } catch (error) {
      console.log('Login Failed', error);
      throw error;
    }
  };
  // Verify Email Function
  const verifyEmail=async(data)=>{
    try{
      const response=await axiosInstance.post('auth/verify-email',data)
      return response
    }
    catch(error){
      throw error
    }

  }
const value={storeToken,storeUser,signup,signin,verifyEmail}
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}