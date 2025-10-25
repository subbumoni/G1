// import * as yup from 'yup';

// export const studentSchema = yup.object({
//     name: yup.string().min(3, "School name must contain 8 characters.").required("School Name is required."),
//     email: yup.string().email("It must be an Email.").required("Email is required"),
//     student_class: yup.string().required("Student Class is Required field"),
//     age: yup.string().required("Age is required field"),
//     gender: yup.string().required("Gender is a required field."),
//     guardian: yup.string().min(4, "Must contain 4 characters.").required("Guardian is a required field."),
//     guardian_phone:yup.string().min(9,"Must contain 9 characters.").max(11,"Can't extend 11 characters.").required("Guardian is a required field."),
//     password: yup.string().min(8, "Password must contain 8 characters.").required("Password is a required field."),
//     confirm_password:yup.string().oneOf([yup.ref('password')],"Confirm Password Must Match With Password.").required("Confirm Password is required field.")
// })



import * as yup from "yup";

export const studentSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must contain at least 3 characters.")
    .required("Name is required."),
  email: yup
    .string()
    .email("It must be a valid email.")
    .required("Email is required."),
  student_class: yup.string().required("Student Class is a required field."), // changed from student_class
  age: yup.string().required("Age is required."),
  gender: yup.string().required("Gender is required."),
  guardian: yup
    .string()
    .min(4, "Must contain at least 4 characters.")
    .required("Guardian is required."),
  guardian_phone: yup
    .string()
    .min(9, "Must contain at least 9 digits.")
    .max(11, "Cannot exceed 11 digits.")
    .required("Guardian phone is required."),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .required("Password is required."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm password must match the password.")
    .required("Confirm password is required."),
});













//   name: {
//     type: String,
//     required: true,
//   },
//   student_class: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   guardian: {
//     type: String,
//     required: true,
//   },
//   guardian_phone: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   student_image: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },



