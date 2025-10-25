import * as yup from 'yup';

export const registerSchema = yup.object({
    school_name: yup.string().min(8, "School name must contain 8 characters.").required("School Name is required."),
    email: yup.string().email("It must b an Email.").required("Email is required"),
    owner_name: yup.string().min(3, "Owner name must have 8 characters.").required("It is required field."),
    password: yup.string().min(8, "Password must contain 8 characters.").required("Password is a required field."),
    confirm_password:yup.string().oneOf([yup.ref('password')],"Confirm Password Must Match With Password.").required("Confirm Password is required field.")
})