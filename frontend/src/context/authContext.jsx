import React,{useContext,createContext} from "react";
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
const value={storeToken,storeToken}
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}