import * as yup from 'yup';

export const loginSchema = yup.object({
    
    email: yup.string().email("It must b an Email.").required("Email is required"),
    
    password: yup.string().min(8, "Password must contain 8 characters.").required("Password is a required field."),
   
})