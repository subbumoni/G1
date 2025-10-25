










// import * as React from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
// import { useFormik } from "formik";
// import { loginSchema } from "../../../yupSchema/loginSchema";
// import { Button, Typography } from "@mui/material";
// import axios from "axios";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { AuthContext } from "../../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { baseApi } from "../../../environment";

// export default function Login() {
//   const [role, setRole] = React.useState("student");
//   const navigate = useNavigate();
//   const { login } = React.useContext(AuthContext);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const Formik = useFormik({
//     initialValues,
//     validationSchema: loginSchema,
//     onSubmit: async (values) => {
//       let URL = "";
//       if (role === "student") URL = `${baseApi}/api/student/login`;
//       else if (role === "teacher")
//         URL = `${baseApi}/api/teacher/login`;
//       else if (role === "school")
//         URL = `${baseApi}/api/school/login`;

//       try {
//         const response = await axios.post(URL, values, {
//           withCredentials: true,
//         });

//         console.log("🔹 Full login response:", response.data);

//         // ✅ Fix: Extract token & user properly regardless of backend key names
//         const token = response.data?.token || response.data?.data?.token;
//         const user =
//           response.data?.user ||
//           response.data?.teacher ||
//           response.data?.student ||
//           response.data?.school ||
//           response.data?.data?.user;

//         if (!token) {
//           console.warn("⚠️ Token not received from backend:", response.data);
//         } else {
//           localStorage.setItem("token", token);
//         }

//         if (user) {
//           // Save role in uppercase for ProtecteRouter
//           user.role = role.toUpperCase(); // STUDENT, TEACHER, SCHOOL
//           localStorage.setItem("user", JSON.stringify(user));
//           login(user); // update AuthContext
//         }

//         setMessage(response.data.message || "Login successful");
//         setMessageType("success");
//         Formik.resetForm();

//         // Navigate based on role
//         switch (user?.role) {
//           case "SCHOOL":
//             navigate("/school");
//             break;
//           case "TEACHER":
//             navigate("/teacher");
//             break;
//           case "STUDENT":
//             navigate("/student");
//             break;
//           default:
//             navigate("/");
//         }
//       } catch (error) {
//         console.error("❌ Login error:", error.response?.data || error);
//         setMessage(error.response?.data?.message || "Login failed");
//         setMessageType("error");
//       }
//     },
//   });

//   return (
//     <Box
//       sx={{
//         background:
//           "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f2f2f2",
//         backgroundRepeat: "no-repeat",
//         padding: 2,
//       }}
//     >
//       {message && (
//         <MessageSnackbar
//           message={message}
//           messageType={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}

//       <Box
//         component="form"
//         sx={{
//           width: "100%",
//           maxWidth: 400,
//           p: 4,
//           backgroundColor: "white",
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//         onSubmit={Formik.handleSubmit}
//       >
//         <Typography
//           variant="h5"
//           sx={{ textAlign: "center", mb: 3, fontSize: "3.1rem" }}
//         >
//           Login
//         </Typography>

//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <InputLabel id="role-label">Role</InputLabel>
//           <Select
//             labelId="role-label"
//             id="role-select"
//             value={role}
//             label="Role"
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <MenuItem value="student">Student</MenuItem>
//             <MenuItem value="teacher">Teacher</MenuItem>
//             <MenuItem value="school">School</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           name="email"
//           label="Email"
//           fullWidth
//           value={Formik.values.email}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//           sx={{ mb: 2 }}
//         />
//         {Formik.touched.email && Formik.errors.email && (
//           <p style={{ color: "red" }}>{Formik.errors.email}</p>
//         )}

//         <TextField
//           name="password"
//           label="Password"
//           type="password"
//           fullWidth
//           value={Formik.values.password}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//           sx={{ mb: 2 }}
//         />
//         {Formik.touched.password && Formik.errors.password && (
//           <p style={{ color: "red" }}>{Formik.errors.password}</p>
//         )}

//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//           Login
//         </Button>
//       </Box>
//     </Box>
//   );
// }











































import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { loginSchema } from "../../../yupSchema/loginSchema";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../../environment";

export default function Login() {
  const [role, setRole] = React.useState("student");
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");

  const handleMessageClose = () => setMessage("");

  const initialValues = {
    email: "",
    password: "",
  };

  const Formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      let URL = "";

      if (role === "student") URL = `${baseApi}/student/login`;
      if (role === "teacher") URL = `${baseApi}/teacher/login`;
      if (role === "school") URL = `${baseApi}/school/login`;

      try {
        const response = await axios.post(URL, values, {
          withCredentials: true,
        });

        console.log("✅ Login Response:", response.data);

        const token = response.data.token;
        const user =
          response.data.user ||
          response.data.teacher ||
          response.data.student ||
          response.data.school;

        if (token) localStorage.setItem("token", token);

        if (user) {
          user.role = role.toUpperCase();
          localStorage.setItem("user", JSON.stringify(user));
          login(user);
        }

        setMessage("Login Successful ✅");
        setMessageType("success");
        Formik.resetForm();

        if (user?.role === "SCHOOL") navigate("/school");
        if (user?.role === "TEACHER") navigate("/teacher");
        if (user?.role === "STUDENT") navigate("/student");
      } catch (error) {
        console.error("❌ Login Error:", error.response?.data || error);
        setMessage(error.response?.data?.message || "Login Failed ❌");
        setMessageType("error");
      }
    },
  });

  return (
    <Box
      sx={{
        background:
          "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        backgroundRepeat: "no-repeat",
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}

      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
        onSubmit={Formik.handleSubmit}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
        >
          Login
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="school">School</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="email"
          label="Email"
          fullWidth
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          sx={{ mb: 2 }}
        />
        {Formik.touched.email && Formik.errors.email && (
          <p style={{ color: "red" }}>{Formik.errors.email}</p>
        )}

        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          sx={{ mb: 2 }}
        />
        {Formik.touched.password && Formik.errors.password && (
          <p style={{ color: "red" }}>{Formik.errors.password}</p>
        )}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
