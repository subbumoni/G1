 import * as React from "react";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";



export default function LogOut() {
    const {logout} =useContext(AuthContext)
    const navigate=useNavigate()


    React.useEffect(() => {
        logout()
        navigate("/login")
    },[])    
    return(<>LogOut</>)
      
   
}