// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { useFormik } from "formik";
// import { registerSchema } from "../../../yupSchema/registerSchema";
// import { Button, CardMedia, Typography, Paper } from "@mui/material";
// import axios from "axios";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

// export default function Register() {
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [registeredData, setRegisteredData] = React.useState(null); // to show registered details

//   const addImage = (event) => {
//     const file = event.target.files[0];
//     setImageUrl(URL.createObjectURL(file));
//     setFile(file);
//   };

//   const fileInputRef = React.useRef(null);
//   const handleClearFile = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     setFile(null);
//     setImageUrl(null);
//   };

//   const initialValues = {
//     school_name: "",
//     email: "",
//     owner_name: "",
//     password: "",
//     confirm_password: "",
//   };

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => {
//     setMessage("");
//   };

//   const Formik = useFormik({
//     initialValues,
//     validationSchema: registerSchema,
//     onSubmit: (values) => {
//       if (file) {
//         const fd = new FormData();
//         fd.append("image", file, file.name);
//         fd.append("school_name", values.school_name);
//         fd.append("email", values.email);
//         fd.append("owner_name", values.owner_name);
//         fd.append("password", values.password);

//         axios
//           .post(`http://localhost:4000/api/school/register`, fd)
//           .then((resp) => {
//             setMessage(resp.data.message);
//             setMessageType("success");

//             // Show form data below
//             setRegisteredData({
//               ...values,
//               imageUrl: URL.createObjectURL(file),
//             });

//             handleClearFile();
//             Formik.resetForm();
//           })
//           .catch((e) => {
//             setMessage(e.response?.data?.message || "Registration failed");
//             setMessageType("error");
//           });
//       } else {
//         setMessage("Please Add School Image");
//         setMessageType("error");
//       }
//     },
//   });

//   return (
//     <Box
//       sx={{
//         background:
//           "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         pt: 6,
//         pb: 6,
//       }}
//     >
//       {message && (
//         <MessageSnackbar
//           message={message}
//           type={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}

//       <Typography
//         variant="h3"
//         align="center"
//         sx={{ color: "#333", fontWeight: "bold", mb: 3 }}
//       >
//         Register
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={Formik.handleSubmit}
//         sx={{
//           background: "white",
//           borderRadius: 2,
//           p: 3,
//           width: "90%",
//           maxWidth: "600px",
//           mx: "auto",
//           boxShadow: 3,
//         }}
//       >
//         <Typography>Add School Picture</Typography>
//         <TextField
//           type="file"
//           inputRef={fileInputRef}
//           onChange={addImage}
//           fullWidth
//         />

//         {imageUrl && (
//           <Box mt={2}>
//             <CardMedia component="img" height="200" image={imageUrl} />
//           </Box>
//         )}

//         <TextField
//           name="school_name"
//           label="School Name"
//           value={Formik.values.school_name}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//           fullWidth
//           margin="normal"
//         />
//         {Formik.touched.school_name && Formik.errors.school_name && (
//           <Typography color="error" variant="body2">
//             {Formik.errors.school_name}
//           </Typography>
//         )}

//         <TextField
//           name="email"
//           label="Email"
//           value={Formik.values.email}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//           fullWidth
//           margin="normal"
//         />
//         {Formik.touched.email && Formik.errors.email && (
//           <Typography color="error" variant="body2">
//             {Formik.errors.email}
//           </Typography>
//         )}

//         <TextField
//           name="owner_name"
//           label="Owner Name"
//           value={Formik.values.owner_name}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//           fullWidth
//           margin="normal"
//         />
//         {Formik.touched.owner_name && Formik.errors.owner_name && (
//           <Typography color="error" variant="body2">
//             {Formik.errors.owner_name}
//           </Typography>
//         )}

//         <TextField
//           type="password"
//           name="password"
//           label="Password"
//           value={Formik.values.password}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//           fullWidth
//           margin="normal"
//         />
//         {Formik.touched.password && Formik.errors.password && (
//           <Typography color="error" variant="body2">
//             {Formik.errors.password}
//           </Typography>
//         )}

//         <TextField
//           type="password"
//           name="confirm_password"
//           label="Confirm Password"
//           value={Formik.values.confirm_password}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//           fullWidth
//           margin="normal"
//         />
//         {Formik.touched.confirm_password && Formik.errors.confirm_password && (
//           <Typography color="error" variant="body2">
//             {Formik.errors.confirm_password}
//           </Typography>
//         )}

//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//           Submit
//         </Button>
//       </Box>

//       {/* 👇 Registered data display box */}
//       {registeredData && (
//         <Paper
//           elevation={6}
//           sx={{
//             mt: 4,
//             mx: "auto",
//             width: "90%",
//             maxWidth: "600px",
//             background: "white",
//             p: 3,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             🎉 Registered School Details
//           </Typography>
//           {registeredData.imageUrl && (
//             <CardMedia
//               component="img"
//               height="200"
//               image={registeredData.imageUrl}
//               sx={{ mb: 2, borderRadius: 1 }}
//             />
//           )}
//           <Typography>
//             <strong>School Name:</strong> {registeredData.school_name}
//           </Typography>
//           <Typography>
//             <strong>Email:</strong> {registeredData.email}
//           </Typography>
//           <Typography>
//             <strong>Owner Name:</strong> {registeredData.owner_name}
//           </Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// }






import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { registerSchema } from "../../../yupSchema/registerSchema";
import { Button, CardMedia, Typography, Paper } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

export default function Register() {
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [registeredData, setRegisteredData] = React.useState(null);

  const addImage = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
  };

  const fileInputRef = React.useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFile(null);
    setImageUrl(null);
  };

  const initialValues = {
    school_name: "",
    email: "",
    owner_name: "",
    password: "",
    confirm_password: "",
  };

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => setMessage("");

  const Formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if (!file) {
        setMessage("Please Add School Image");
        setMessageType("error");
        return;
      }

      const fd = new FormData();
      fd.append("image", file, file.name);
      fd.append("school_name", values.school_name);
      fd.append("email", values.email);
      fd.append("owner_name", values.owner_name);
      fd.append("password", values.password);

      try {
        const resp = await axios.post(
          `http://localhost:4000/api/school/register`,
          fd
        );

        setMessage(resp.data.message || "Registered successfully");
        setMessageType("success");

        // Use Cloudinary URL from backend
        setRegisteredData({
          ...values,
          imageUrl: resp.data.data.school_image,
        });

        handleClearFile();
        Formik.resetForm();
      } catch (e) {
        setMessage(e.response?.data?.message || "Registration failed");
        setMessageType("error");
      }
    },
  });

  return (
    <Box
      sx={{
        background:
          "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        pt: 6,
        pb: 6,
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          type={messageType}
          handleClose={handleMessageClose}
        />
      )}

      <Typography
        variant="h3"
        align="center"
        sx={{ color: "#333", fontWeight: "bold", mb: 3 }}
      >
        Register
      </Typography>

      <Box
        component="form"
        onSubmit={Formik.handleSubmit}
        sx={{
          background: "white",
          borderRadius: 2,
          p: 3,
          width: "90%",
          maxWidth: "600px",
          mx: "auto",
          boxShadow: 3,
        }}
      >
        <Typography>Add School Picture</Typography>
        <TextField
          type="file"
          inputRef={fileInputRef}
          onChange={addImage}
          fullWidth
        />

        {imageUrl && (
          <Box mt={2}>
            <CardMedia component="img" height="200" image={imageUrl} />
          </Box>
        )}

        <TextField
          name="school_name"
          label="School Name"
          value={Formik.values.school_name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          margin="normal"
        />
        {Formik.touched.school_name && Formik.errors.school_name && (
          <Typography color="error" variant="body2">
            {Formik.errors.school_name}
          </Typography>
        )}

        <TextField
          name="email"
          label="Email"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          margin="normal"
        />
        {Formik.touched.email && Formik.errors.email && (
          <Typography color="error" variant="body2">
            {Formik.errors.email}
          </Typography>
        )}

        <TextField
          name="owner_name"
          label="Owner Name"
          value={Formik.values.owner_name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          margin="normal"
        />
        {Formik.touched.owner_name && Formik.errors.owner_name && (
          <Typography color="error" variant="body2">
            {Formik.errors.owner_name}
          </Typography>
        )}

        <TextField
          type="password"
          name="password"
          label="Password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          margin="normal"
        />
        {Formik.touched.password && Formik.errors.password && (
          <Typography color="error" variant="body2">
            {Formik.errors.password}
          </Typography>
        )}

        <TextField
          type="password"
          name="confirm_password"
          label="Confirm Password"
          value={Formik.values.confirm_password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          fullWidth
          margin="normal"
        />
        {Formik.touched.confirm_password && Formik.errors.confirm_password && (
          <Typography color="error" variant="body2">
            {Formik.errors.confirm_password}
          </Typography>
        )}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>

      {registeredData && (
        <Paper
          elevation={6}
          sx={{
            mt: 4,
            mx: "auto",
            width: "90%",
            maxWidth: "600px",
            background: "white",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            🎉 Registered School Details
          </Typography>
          {registeredData.imageUrl && (
            <CardMedia
              component="img"
              height="200"
              image={registeredData.imageUrl}
              sx={{ mb: 2, borderRadius: 1 }}
            />
          )}
          <Typography>
            <strong>School Name:</strong> {registeredData.school_name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {registeredData.email}
          </Typography>
          <Typography>
            <strong>Owner Name:</strong> {registeredData.owner_name}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
