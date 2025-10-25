import * as yup from 'yup';

export const noticeSchema = yup.object({
  title: yup
    .string()
    .min(2, "Atleast 2 character are required")
    .required("title Text is required"),

  message: yup
      .string()
      .min(8,"Atleast 8 characters are required.")
        .required("Description Number is required."),
  audience:yup.string().required("Audience is required field.")
});