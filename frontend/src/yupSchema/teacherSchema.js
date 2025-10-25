import * as yup from "yup";

export const teacherSchema = yup.object({
  name: yup
    .string()
    .min(3, "Teacher name must contain at least 3 characters.")
    .required("Teacher name is required."),
  email: yup
    .string()
    .email("It must be a valid Email.")
    .required("Email is required."),
  age: yup
    .number()
    .typeError("Age must be a number.")
    .min(18, "Minimum age must be 18.")
    .required("Age is a required field."),
  gender: yup.string().required("Gender is a required field."),
  qualification: yup
    .string()
    .min(4, "Qualification must contain at least 4 characters.")
    .required("Qualification is a required field."),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .required("Password is a required field."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password must match Password.")
    .required("Confirm Password is required."),
});

export const teacherEditSchema = yup.object({
  name: yup
    .string()
    .min(3, "Teacher name must contain at least 3 characters.")
    .required("Teacher name is required."),
  email: yup
    .string()
    .email("It must be a valid Email.")
    .required("Email is required."),
  age: yup
    .number()
    .typeError("Age must be a number.")
    .min(18, "Minimum age must be 18.")
    .required("Age is a required field."),
  gender: yup.string().required("Gender is a required field."),
  qualification: yup
    .string()
    .min(4, "Qualification must contain at least 4 characters.")
    .required("Qualification is a required field."),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .notRequired(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password must match Password.")
    .when("password", {
      is: (val) => !!val && val.length > 0,
      then: (schema) => schema.required("Confirm Password is required."),
    }),
});
