 import * as React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function ProtecteRouter({ children, allowedRoles = [] }) {
    const {user, authenticated} =useContext(AuthContext)
    const [checked,setChecked]=React.useState(false)


    React.useEffect(() => {
      setChecked(true)  
    },[])    
    if (checked && !authenticated) return <Navigate to={'/login'} />
    
    if(checked && allowedRoles && !allowedRoles.includes(user.role))  return <Navigate to={'/login'} />


    if (checked) {
        return children;
 }

    return children;
      
   
}