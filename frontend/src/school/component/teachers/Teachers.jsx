// import * as React from "react";
// import {
//   Button,
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import {
//   teacherSchema,
//   teacherEditSchema,
// } from "../../../yupSchema/teacherSchema";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { baseApi } from "../../../environment";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function Teachers() {
//   const [edit, setEdit] = React.useState(false);
//   const [editId, setEditId] = React.useState("");
//   const [teachers, setTeachers] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [message, setMessage] = React.useState("");
//   const [type, setType] = React.useState("success");

//   const fileRef = React.useRef(null);

//   React.useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const fetchTeachers = async () => {
//     try {
//       const res = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setTeachers(res.data.teachers);
//     } catch (err) {
//       setMessage("Error fetching data");
//       setType("error");
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       age: "",
//       gender: "",
//       qualification: "",
//       password: "",
//       confirm_password: "",
//     },
//     validationSchema: edit ? teacherEditSchema : teacherSchema,
//     onSubmit: async (vals) => {
//       try {
//         const fd = new FormData();
//         for (const key of [
//           "name",
//           "email",
//           "age",
//           "gender",
//           "qualification",
//           "password",
//         ]) {
//           if (vals[key]) fd.append(key, vals[key]);
//         }
//         if (file) fd.append("image", file);

//         const res = edit
//           ? await axios.patch(`${baseApi}/teacher/update/${editId}`, fd, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             })
//           : await axios.post(`${baseApi}/teacher/register`, fd, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             });

//         setMessage(res.data.message);
//         setType("success");
//         fetchTeachers();
//         formik.resetForm();
//         setEdit(false);
//         setImageUrl(null);
//         setFile(null);
//       } catch (err) {
//         setMessage("Action failed");
//         setType("error");
//       }
//     },
//   });

//   const onImage = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setImageUrl(URL.createObjectURL(selectedFile));
//   };

//   const onEdit = (t) => {
//     setEdit(true);
//     setEditId(t._id);
//     formik.setValues({
//       name: t.name,
//       email: t.email,
//       age: t.age,
//       gender: t.gender,
//       qualification: t.qualification,
//       password: "",
//       confirm_password: "",
//     });
//     setImageUrl(`${baseApi}/uploads/teachers/${t.image}`);
//   };

//   const onDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?"))
//       return;
//     try {
//       const res = await axios.delete(`${baseApi}/teacher/delete/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setMessage(res.data.message);
//       setType("success");
//       fetchTeachers();
//     } catch {
//       setMessage("Delete failed");
//       setType("error");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Typography variant="h4">
//         {edit ? "Edit Teacher" : "Add Teacher"}
//       </Typography>
//       <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
//         {["name", "email", "age", "qualification"].map((field) => (
//           <TextField
//             key={field}
//             name={field}
//             label={field.charAt(0).toUpperCase() + field.slice(1)}
//             fullWidth
//             margin="normal"
//             value={formik.values[field]}
//             onChange={formik.handleChange}
//             error={formik.touched[field] && Boolean(formik.errors[field])}
//             helperText={formik.touched[field] && formik.errors[field]}
//           />
//         ))}

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Gender</InputLabel>
//           <Select
//             name="gender"
//             value={formik.values.gender}
//             onChange={formik.handleChange}
//             error={formik.touched.gender && Boolean(formik.errors.gender)}
//           >
//             <MenuItem value="">Select</MenuItem>
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//           </Select>
//         </FormControl>

//         {!edit &&
//           ["password", "confirm_password"].map((field) => (
//             <TextField
//               key={field}
//               name={field}
//               label={field.replace("_", " ")}
//               type="password"
//               fullWidth
//               margin="normal"
//               value={formik.values[field]}
//               onChange={formik.handleChange}
//               error={formik.touched[field] && Boolean(formik.errors[field])}
//               helperText={formik.touched[field] && formik.errors[field]}
//             />
//           ))}

//         <input
//           type="file"
//           ref={fileRef}
//           onChange={onImage}
//           style={{ marginTop: 10 }}
//         />

//         {imageUrl && (
//           <div style={{ margin: "10px 0" }}>
//             <img src={imageUrl} alt="Preview" width={100} />
//             <Button
//               onClick={() => {
//                 setImageUrl(null);
//                 setFile(null);
//                 fileRef.current.value = "";
//               }}
//             >
//               Remove Image
//             </Button>
//           </div>
//         )}

//         <Button variant="contained" type="submit" color="primary">
//           {edit ? "Update" : "Add"} Teacher
//         </Button>

//         {edit && (
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => {
//               formik.resetForm();
//               setEdit(false);
//               setEditId("");
//               setImageUrl(null);
//               setFile(null);
//             }}
//             style={{ marginLeft: 10 }}
//           >
//             Cancel
//           </Button>
//         )}
//       </form>

//       <Typography variant="h5" style={{ marginTop: 20 }}>
//         All Teachers
//       </Typography>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
//         {teachers.map((t) => (
//           <Card key={t._id} style={{ width: 200 }}>
//             <CardActionArea onClick={() => onEdit(t)}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={`${baseApi}/uploads/teachers/${t.image}`}
//                 alt={t.name}
//               />
//               <CardContent>
//                 <Typography variant="h6">{t.name}</Typography>
//                 <Typography>{t.email}</Typography>
//                 <Typography>{t.gender}</Typography>
//               </CardContent>
//             </CardActionArea>
//             <Button
//               startIcon={<DeleteIcon />}
//               onClick={() => onDelete(t._id)}
//             />
//           </Card>
//         ))}
//       </div>

//       <MessageSnackbar
//         message={message}
//         type={type}
//         open={!!message}
//         onClose={() => setMessage("")}
//       />
//     </div>
//   );
// }


// import * as React from "react";
// import {
//   Button,
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import {
//   teacherSchema,
//   teacherEditSchema,
// } from "../../../yupSchema/teacherSchema";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { baseApi } from "../../../environment";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function Teachers() {
//   const [edit, setEdit] = React.useState(false);
//   const [editId, setEditId] = React.useState("");
//   const [teachers, setTeachers] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [message, setMessage] = React.useState("");
//   const [type, setType] = React.useState("success");

//   const fileRef = React.useRef(null);

//   React.useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const fetchTeachers = async () => {
//     try {
//       const res = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setTeachers(res.data.teachers);
//     } catch (err) {
//       console.error(err);
//       setMessage("Error fetching data");
//       setType("error");
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       age: "",
//       gender: "",
//       qualification: "",
//       password: "",
//       confirm_password: "",
//     },
//     validationSchema: edit ? teacherEditSchema : teacherSchema,
//     onSubmit: async (vals) => {
//       console.log("Submitting:", vals, "File:", file); // debug
//       try {
//         const fd = new FormData();
//         ["name", "email", "age", "gender", "qualification", "password"].forEach(
//           (key) => {
//             if (vals[key]) fd.append(key, vals[key]);
//           }
//         );
//         if (file) fd.append("image", file);

//         const res = edit
//           ? await axios.patch(`${baseApi}/teacher/update/${editId}`, fd, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             })
//           : await axios.post(`${baseApi}/teacher/register`, fd, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             });

//         setMessage(res.data.message);
//         setType("success");
//         fetchTeachers();
//         formik.resetForm();
//         setEdit(false);
//         setEditId("");
//         setImageUrl(null);
//         setFile(null);
//         fileRef.current.value = "";
//       } catch (err) {
//         console.error(err.response?.data || err);
//         setMessage(err.response?.data?.message || "Action failed");
//         setType("error");
//       }
//     },
//   });

//   const onImage = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onload = () => setImageUrl(reader.result);
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const onEdit = (t) => {
//     setEdit(true);
//     setEditId(t._id);
//     formik.setValues({
//       name: t.name,
//       email: t.email,
//       age: t.age,
//       gender: t.gender,
//       qualification: t.qualification,
//       password: "",
//       confirm_password: "",
//     });
//     setImageUrl(t.image); // Cloudinary URL
//   };

//   const onDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?"))
//       return;
//     try {
//       const res = await axios.delete(`${baseApi}/teacher/delete/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setMessage(res.data.message);
//       setType("success");
//       fetchTeachers();
//     } catch (err) {
//       console.error(err);
//       setMessage("Delete failed");
//       setType("error");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Typography variant="h4">
//         {edit ? "Edit Teacher" : "Add Teacher"}
//       </Typography>

//       <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
//         {["name", "email", "age", "qualification"].map((field) => (
//           <TextField
//             key={field}
//             name={field}
//             label={field.charAt(0).toUpperCase() + field.slice(1)}
//             fullWidth
//             margin="normal"
//             value={formik.values[field]}
//             onChange={formik.handleChange}
//             error={formik.touched[field] && Boolean(formik.errors[field])}
//             helperText={formik.touched[field] && formik.errors[field]}
//           />
//         ))}

//         {/* FIXED MUI SELECT */}
//         <FormControl
//           fullWidth
//           margin="normal"
//           error={formik.touched.gender && Boolean(formik.errors.gender)}
//         >
//           <InputLabel>Gender</InputLabel>
//           <Select
//             name="gender"
//             value={formik.values.gender}
//             onChange={(e) => formik.setFieldValue("gender", e.target.value)}
//           >
//             <MenuItem value="">Select</MenuItem>
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//           </Select>
//           {formik.touched.gender && formik.errors.gender && (
//             <Typography variant="caption" color="error">
//               {formik.errors.gender}
//             </Typography>
//           )}
//         </FormControl>

//         {!edit &&
//           ["password", "confirm_password"].map((field) => (
//             <TextField
//               key={field}
//               name={field}
//               label={field.replace("_", " ")}
//               type="password"
//               fullWidth
//               margin="normal"
//               value={formik.values[field]}
//               onChange={formik.handleChange}
//               error={formik.touched[field] && Boolean(formik.errors[field])}
//               helperText={formik.touched[field] && formik.errors[field]}
//             />
//           ))}

//         <input
//           type="file"
//           ref={fileRef}
//           onChange={onImage}
//           style={{ marginTop: 10 }}
//         />

//         {imageUrl && (
//           <div style={{ margin: "10px 0" }}>
//             <img
//               src={imageUrl}
//               alt="Preview"
//               style={{
//                 width: 100,
//                 height: 100,
//                 objectFit: "cover",
//                 borderRadius: 5,
//               }}
//               onError={(e) => (e.target.src = "/fallback-image.jpg")}
//             />
//             <Button
//               onClick={() => {
//                 setImageUrl(null);
//                 setFile(null);
//                 fileRef.current.value = "";
//               }}
//             >
//               Remove Image
//             </Button>
//           </div>
//         )}

//         <Button variant="contained" type="submit" color="primary">
//           {edit ? "Update" : "Add"} Teacher
//         </Button>

//         {edit && (
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => {
//               formik.resetForm();
//               setEdit(false);
//               setEditId("");
//               setImageUrl(null);
//               setFile(null);
//             }}
//             style={{ marginLeft: 10 }}
//           >
//             Cancel
//           </Button>
//         )}
//       </form>

//       <Typography variant="h5" style={{ marginTop: 20 }}>
//         All Teachers
//       </Typography>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
//         {teachers.map((t) => (
//           <Card key={t._id} style={{ width: 200 }}>
//             <CardActionArea onClick={() => onEdit(t)}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={t.image}
//                 alt={t.name}
//               />
//               <CardContent>
//                 <Typography variant="h6">{t.name}</Typography>
//                 <Typography>{t.email}</Typography>
//                 <Typography>{t.gender}</Typography>
//               </CardContent>
//             </CardActionArea>
//             <Button
//               startIcon={<DeleteIcon />}
//               onClick={() => onDelete(t._id)}
//             />
//           </Card>
//         ))}
//       </div>

//       <MessageSnackbar
//         message={message}
//         type={type}
//         open={!!message}
//         onClose={() => setMessage("")}
//       />
//     </div>
//   );
// }






// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   CardMedia,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   CardActionArea,
//   CardContent,
//   IconButton,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { teacherSchema } from "../../../yupSchema/teacherSchema";
// import { baseApi } from "../../../environment";

// export default function Teachers() {
//   const [teachers, setTeachers] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const fileInputRef = React.useRef(null);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const token = localStorage.getItem("token");

//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFile(file);
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(null);
//   };

//   const initialValues = {
//     name: "",
//     email: "",
//     age: "",
//     gender: "",
//     qualification: "",
//     password: "",
//     confirm_password: "",
//   };

//   const fetchTeachers = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeachers(resp.data.teachers);
//     } catch (err) {
//       console.error("Error fetching teachers", err);
//     }
//   };

//   React.useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleEdit = (teacher) => {
//     formik.setValues({
//       name: teacher.name,
//       email: teacher.email,
//       age: teacher.age,
//       qualification: teacher.qualification,
//       gender: teacher.gender,
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(teacher._id);
//     setImageUrl(teacher.image || null); // ✅ use backend field
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?"))
//       return;
//     try {
//       await axios.delete(`${baseApi}/teacher/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Teacher deleted successfully");
//       setMessageType("success");
//       fetchTeachers();
//     } catch (e) {
//       setMessage("Delete failed");
//       setMessageType("error");
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: teacherSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a teacher image");
//         setMessageType("error");
//         return;
//       }

//       const fd = new FormData();
//       if (file) fd.append("teacher_image", file);
//       Object.entries(values).forEach(([key, val]) => {
//         if (key !== "confirm_password") fd.append(key, val);
//       });

//       try {
//         if (editId) {
//           await axios.put(`${baseApi}/teacher/update/${editId}`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher updated successfully");
//         } else {
//           await axios.post(`${baseApi}/teacher/register`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher registered successfully");
//         }

//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         fetchTeachers();
//       } catch (e) {
//         console.error("Register Teacher Error:", e.response?.data || e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       }
//     },
//   });

//   const getError = (field) =>
//     formik.touched[field] && formik.errors[field] ? (
//       <Typography color="error" fontSize="small" mt={-1}>
//         {formik.errors[field]}
//       </Typography>
//     ) : null;

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 6, pb: 6, background: "#f4f4f4" }}>
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
//         sx={{ fontWeight: "bold", mb: 3 }}
//       >
//         Teachers
//       </Typography>

//       {/* Form */}
//       <Box
//         component="form"
//         onSubmit={formik.handleSubmit}
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
//         <Typography>Add Teacher Picture</Typography>
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

//         {/* Input Fields */}
//         {[
//           { name: "name", label: "Name" },
//           { name: "email", label: "Email" },
//           { name: "age", label: "Age" },
//           { name: "qualification", label: "Qualification" },
//           { name: "password", label: "Password", type: "password" },
//           {
//             name: "confirm_password",
//             label: "Confirm Password",
//             type: "password",
//           },
//         ].map(({ name, label, type = "text" }) => (
//           <React.Fragment key={name}>
//             <TextField
//               name={name}
//               label={label}
//               type={type}
//               value={formik.values[name]}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               fullWidth
//               margin="normal"
//             />
//             {getError(name)}
//           </React.Fragment>
//         ))}

//         {/* Gender */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Gender</InputLabel>
//           <Select
//             name="gender"
//             value={formik.values.gender}
//             label="Gender"
//             onChange={formik.handleChange}
//           >
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//         </FormControl>
//         {getError("gender")}

//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//           {editId ? "Update" : "Submit"}
//         </Button>
//       </Box>

//       {/* Teacher Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 2,
//           mt: 4,
//         }}
//       >
//         {teachers.map((teacher) => (
//           <Card key={teacher._id} sx={{ width: 300 }}>
//             <CardActionArea>
//               <img
//                 src={teacher.image || `/placeholder.jpg`} // ✅ updated
//                 alt={teacher.name}
//                 height="140"
//                 width="100%"
//                 style={{ objectFit: "cover" }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{teacher.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Age: {teacher.age}
//                   <br />
//                   Qualification: {teacher.qualification}
//                   <br />
//                   Email: {teacher.email}
//                 </Typography>
//                 <Box display="flex" justifyContent="space-between" mt={2}>
//                   <IconButton
//                     onClick={() => handleEdit(teacher)}
//                     color="primary"
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => handleDelete(teacher._id)}
//                     color="error"
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// }
//------------------------------------------------------------------------------

// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   CardMedia,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   CardActionArea,
//   CardContent,
//   IconButton,
//   Modal,
//   Paper,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { teacherSchema } from "../../../yupSchema/teacherSchema";
// import { baseApi } from "../../../environment";

// export default function Teachers() {
//   const [teachers, setTeachers] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [selectedTeacher, setSelectedTeacher] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const fileInputRef = React.useRef(null);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const token = localStorage.getItem("token");

//   // Image selection
//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFile(file);
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(null);
//   };

//   const initialValues = {
//     name: "",
//     email: "",
//     age: "",
//     gender: "",
//     qualification: "",
//     password: "",
//     confirm_password: "",
//   };

//   // Fetch all teachers
//   const fetchTeachers = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeachers(resp.data.teachers);
//       console.log("RESP",resp)
//     } catch (err) {
//       console.error("Error fetching teachers", err);
//     }
//   };

//   React.useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleEdit = (teacher) => {
//     formik.setValues({
//       name: teacher.name,
//       email: teacher.email,
//       age: teacher.age,
//       qualification: teacher.qualification,
//       gender: teacher.gender,
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(teacher._id);
//     setImageUrl(teacher.image || null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?"))
//       return;
//     try {
//       await axios.delete(`${baseApi}/teacher/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Teacher deleted successfully");
//       setMessageType("success");
//       fetchTeachers();
//     } catch (e) {
//       setMessage("Delete failed");
//       setMessageType("error");
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: teacherSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a teacher image");
//         setMessageType("error");
//         return;
//       }

//       const fd = new FormData();
//       if (file) fd.append("teacher_image", file);
//       Object.entries(values).forEach(([key, val]) => {
//         if (key !== "confirm_password") fd.append(key, val);
//       });

//       try {
//         if (editId) {
//           await axios.put(`${baseApi}/teacher/update/${editId}`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher updated successfully");
//         } else {
//           await axios.post(`${baseApi}/teacher/register`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher registered successfully");
//         }

//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         fetchTeachers();
//       } catch (e) {
//         console.error("Register Teacher Error:", e.response?.data || e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       }
//     },
//   });

//   const getError = (field) =>
//     formik.touched[field] && formik.errors[field] ? (
//       <Typography color="error" fontSize="small" mt={-1}>
//         {formik.errors[field]}
//       </Typography>
//     ) : null;

//   const handleOpenModal = (teacher) => {
//     setSelectedTeacher(teacher);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTeacher(null);
//     setModalOpen(false);
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 6, pb: 6, background: "#f4f4f4" }}>
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
//         sx={{ fontWeight: "bold", mb: 3 }}
//       >
//         Teachers
//       </Typography>

//       {/* Form */}
//       <Box
//         component="form"
//         onSubmit={formik.handleSubmit}
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
//         <Typography>Add Teacher Picture</Typography>
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

//         {/* Input Fields */}
//         {[
//           { name: "name", label: "Name" },
//           { name: "email", label: "Email" },
//           { name: "age", label: "Age" },
//           { name: "qualification", label: "Qualification" },
//           { name: "password", label: "Password", type: "password" },
//           {
//             name: "confirm_password",
//             label: "Confirm Password",
//             type: "password",
//           },
//         ].map(({ name, label, type = "text" }) => (
//           <React.Fragment key={name}>
//             <TextField
//               name={name}
//               label={label}
//               type={type}
//               value={formik.values[name]}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               fullWidth
//               margin="normal"
//             />
//             {getError(name)}
//           </React.Fragment>
//         ))}

//         {/* Gender */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Gender</InputLabel>
//           <Select
//             name="gender"
//             value={formik.values.gender}
//             label="Gender"
//             onChange={formik.handleChange}
//           >
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//         </FormControl>
//         {getError("gender")}

//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//           {editId ? "Update" : "Submit"}
//         </Button>
//       </Box>

//       {/* Teacher Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 2,
//           mt: 4,
//         }}
//       >
//         {teachers.map((teacher) => (
//           <Card key={teacher._id} sx={{ width: 300, position: "relative" }}>
//             <CardActionArea onClick={() => handleOpenModal(teacher)}>
//               <img
//                 src={teacher.image || `/placeholder.jpg`}
//                 alt={teacher.name}
//                 height="140"
//                 width="100%"
//                 style={{ objectFit: "cover" }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{teacher.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Age: {teacher.age}
//                   <br />
//                   Qualification: {teacher.qualification}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>

//             {/* Edit & Delete buttons */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 display: "flex",
//                 gap: 1,
//               }}
//             >
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleEdit(teacher);
//                 }}
//                 color="primary"
//               >
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(teacher._id);
//                 }}
//                 color="error"
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           </Card>
//         ))}
//       </Box>

//       {/* Modal for full details */}
//       <Modal open={modalOpen} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", md: 600 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 3,
//             outline: "none",
//           }}
//         >
//           <IconButton
//             onClick={handleCloseModal}
//             sx={{ position: "absolute", top: 8, right: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {selectedTeacher && (
//             <>
//               <CardMedia
//                 component="img"
//                 height="300"
//                 image={selectedTeacher.image || `/placeholder.jpg`}
//                 sx={{ borderRadius: 2 }}
//               />
//               <Typography variant="h4" mt={2} fontWeight="bold">
//                 {selectedTeacher.name}
//               </Typography>
//               <Typography variant="body1" mt={1}>
//                 Age: {selectedTeacher.age}
//                 <br />
//                 Gender: {selectedTeacher.gender}
//                 <br />
//                 Qualification: {selectedTeacher.qualification}
//                 <br />
//                 Email: {selectedTeacher.email}
//               </Typography>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }


















// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   CardMedia,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   CardActionArea,
//   CardContent,
//   IconButton,
//   Modal,
//   Paper,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { teacherSchema } from "../../../yupSchema/teacherSchema";
// import { baseApi } from "../../../environment";

// export default function Teachers() {
//   const [teachers, setTeachers] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [selectedTeacher, setSelectedTeacher] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const fileInputRef = React.useRef(null);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const token = localStorage.getItem("token");

//   // Image selection
//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFile(file);
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(null);
//   };

//   const initialValues = {
//     name: "",
//     email: "",
//     age: "",
//     gender: "",
//     qualification: "",
//     password: "",
//     confirm_password: "",
//   };

//   // Fetch all teachers
//   const fetchTeachers = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeachers(resp.data.teachers);
//       console.log("RESP", resp);
//     } catch (err) {
//       console.error("Error fetching teachers", err);
//     }
//   };

//   React.useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleEdit = (teacher) => {
//     formik.setValues({
//       name: teacher.name,
//       email: teacher.email,
//       age: teacher.age,
//       qualification: teacher.qualification,
//       gender: teacher.gender,
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(teacher._id);
//     setImageUrl(teacher.image || null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?"))
//       return;
//     try {
//       await axios.delete(`${baseApi}/teacher/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Teacher deleted successfully");
//       setMessageType("success");
//       fetchTeachers();
//     } catch (e) {
//       setMessage("Delete failed");
//       setMessageType("error");
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: teacherSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a teacher image");
//         setMessageType("error");
//         return;
//       }

//       const fd = new FormData();
//       if (file) fd.append("teacher_image", file);
//       Object.entries(values).forEach(([key, val]) => {
//         if (key !== "confirm_password") fd.append(key, val);
//       });

//       try {
//         if (editId) {
//           await axios.put(`${baseApi}/teacher/update/${editId}`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher updated successfully");
//         } else {
//           await axios.post(`${baseApi}/teacher/register`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher registered successfully");
//         }

//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         fetchTeachers();
//       } catch (e) {
//         console.error("Register Teacher Error:", e.response?.data || e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       }
//     },
//   });

//   const getError = (field) =>
//     formik.touched[field] && formik.errors[field] ? (
//       <Typography color="error" fontSize="small" mt={-1}>
//         {formik.errors[field]}
//       </Typography>
//     ) : null;

//   const handleOpenModal = (teacher) => {
//     setSelectedTeacher(teacher);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTeacher(null);
//     setModalOpen(false);
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 6, pb: 6, background: "#f4f4f4" }}>
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
//         sx={{ fontWeight: "bold", mb: 3 }}
//       >
//         Teachers
//       </Typography>

//       {/* Form */}
//       <Box
//         component="form"
//         onSubmit={formik.handleSubmit}
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
//         <Typography>Add Teacher Picture</Typography>
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

//         {/* Input Fields */}
//         {[
//           { name: "name", label: "Name" },
//           { name: "email", label: "Email" },
//           { name: "age", label: "Age" },
//           { name: "qualification", label: "Qualification" },
//           { name: "password", label: "Password", type: "password" },
//           {
//             name: "confirm_password",
//             label: "Confirm Password",
//             type: "password",
//           },
//         ].map(({ name, label, type = "text" }) => (
//           <React.Fragment key={name}>
//             <TextField
//               name={name}
//               label={label}
//               type={type}
//               value={formik.values[name]}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               fullWidth
//               margin="normal"
//             />
//             {getError(name)}
//           </React.Fragment>
//         ))}

//         {/* Gender */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Gender</InputLabel>
//           <Select
//             name="gender"
//             value={formik.values.gender}
//             label="Gender"
//             onChange={formik.handleChange}
//           >
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//         </FormControl>
//         {getError("gender")}

//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//           {editId ? "Update" : "Submit"}
//         </Button>
//       </Box>

//       {/* Teacher Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 2,
//           mt: 4,
//         }}
//       >
//         {teachers.map((teacher) => (
//           <Card
//             key={teacher._id}
//             sx={{
//               width: { xs: "90%", sm: 300 },
//               position: "relative",
//               boxShadow: 3,
//               borderRadius: 2,
//             }}
//           >
//             <CardActionArea onClick={() => handleOpenModal(teacher)}>
//               <img
//                 src={teacher.image || `/placeholder.jpg`}
//                 alt={teacher.name}
//                 height="160"
//                 width="100%"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "8px",
//                   borderTopRightRadius: "8px",
//                 }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{teacher.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Age: {teacher.age}
//                   <br />
//                   Qualification: {teacher.qualification}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>

//             {/* Edit & Delete buttons */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 display: "flex",
//                 gap: 1,
//               }}
//             >
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleEdit(teacher);
//                 }}
//                 color="primary"
//               >
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(teacher._id);
//                 }}
//                 color="error"
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           </Card>
//         ))}
//       </Box>

//       {/* Modal for full details with zoom effect and full mobile support */}
//       <Modal open={modalOpen} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: "85%", md: 600 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 2,
//             outline: "none",
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <IconButton
//             onClick={handleCloseModal}
//             sx={{
//               position: "absolute",
//               top: 8,
//               right: 8,
//               color: "#444",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {selectedTeacher && (
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               textAlign="center"
//             >
//               {/* Zoomable Image */}
//               <Box
//                 sx={{
//                   width: "100%",
//                   overflow: "hidden",
//                   borderRadius: 2,
//                   transition: "transform 0.3s ease-in-out",
//                   "&:hover img": {
//                     transform: "scale(1.1)",
//                   },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="320"
//                   image={selectedTeacher.image || `/placeholder.jpg`}
//                   alt={selectedTeacher.name}
//                   sx={{
//                     width: "100%",
//                     borderRadius: 2,
//                     objectFit: "cover",
//                     transition: "transform 0.3s ease-in-out",
//                   }}
//                 />
//               </Box>

//               {/* Teacher Details */}
//               <Typography
//                 variant="h4"
//                 mt={2}
//                 fontWeight="bold"
//                 sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}
//               >
//                 {selectedTeacher.name}
//               </Typography>

//               <Typography
//                 variant="body1"
//                 mt={1}
//                 sx={{
//                   fontSize: { xs: "0.95rem", md: "1rem" },
//                   color: "text.secondary",
//                 }}
//               >
//                 <strong>Age:</strong> {selectedTeacher.age}
//                 <br />
//                 <strong>Gender:</strong> {selectedTeacher.gender}
//                 <br />
//                 <strong>Qualification:</strong> {selectedTeacher.qualification}
//                 <br />
//                 <strong>Email:</strong> {selectedTeacher.email}
//                 <br />
//                 {selectedTeacher.phone && (
//                   <>
//                     <strong>Phone:</strong> {selectedTeacher.phone}
//                     <br />
//                   </>
//                 )}
//                 {selectedTeacher.address && (
//                   <>
//                     <strong>Address:</strong> {selectedTeacher.address}
//                     <br />
//                   </>
//                 )}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }







































// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   CardMedia,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   CardActionArea,
//   CardContent,
//   IconButton,
//   Modal,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { teacherSchema } from "../../../yupSchema/teacherSchema";
// import { baseApi } from "../../../environment";

// export default function Teachers() {
//   const [teachers, setTeachers] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [selectedTeacher, setSelectedTeacher] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const [showForm, setShowForm] = React.useState(false); // New state for form toggle
//   const fileInputRef = React.useRef(null);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const token = localStorage.getItem("token");

//   // Image selection
//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFile(file);
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(null);
//   };

//   const initialValues = {
//     name: "",
//     email: "",
//     age: "",
//     gender: "",
//     qualification: "",
//     password: "",
//     confirm_password: "",
//   };

//   // Fetch all teachers
//   const fetchTeachers = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeachers(resp.data.teachers);
//     } catch (err) {
//       console.error("Error fetching teachers", err);
//     }
//   };

//   React.useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleEdit = (teacher) => {
//     formik.setValues({
//       name: teacher.name,
//       email: teacher.email,
//       age: teacher.age,
//       qualification: teacher.qualification,
//       gender: teacher.gender,
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(teacher._id);
//     setImageUrl(teacher.image || null);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?"))
//       return;
//     try {
//       await axios.delete(`${baseApi}/teacher/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Teacher deleted successfully");
//       setMessageType("success");
//       fetchTeachers();
//     } catch (e) {
//       setMessage("Delete failed");
//       setMessageType("error");
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: teacherSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a teacher image");
//         setMessageType("error");
//         return;
//       }

//       const fd = new FormData();
//       if (file) fd.append("teacher_image", file);
//       Object.entries(values).forEach(([key, val]) => {
//         if (key !== "confirm_password") fd.append(key, val);
//       });

//       try {
//         if (editId) {
//           await axios.put(`${baseApi}/teacher/update/${editId}`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher updated successfully");
//         } else {
//           await axios.post(`${baseApi}/teacher/register`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher registered successfully");
//         }

//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         setShowForm(false);
//         fetchTeachers();
//       } catch (e) {
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       }
//     },
//   });

//   const getError = (field) =>
//     formik.touched[field] && formik.errors[field] ? (
//       <Typography color="error" fontSize="small" mt={-1}>
//         {formik.errors[field]}
//       </Typography>
//     ) : null;

//   const handleOpenModal = (teacher) => {
//     setSelectedTeacher(teacher);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTeacher(null);
//     setModalOpen(false);
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 6, pb: 6, background: "#f4f4f4" }}>
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
//         sx={{ fontWeight: "bold", mb: 3 }}
//       >
//         Teachers
//       </Typography>

//       {/* Add Teacher Button */}
//       <Box textAlign="center" mb={3}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setShowForm(!showForm)}
//         >
//           Add New Teacher
//         </Button>
//       </Box>

//       {/* Form with animation */}
//       {showForm && (
//         <Box
//           component="form"
//           onSubmit={formik.handleSubmit}
//           sx={{
//             background: "#ffffff",
//             borderRadius: 2,
//             p: 3,
//             width: "90%",
//             maxWidth: "600px",
//             mx: "auto",
//             boxShadow: 3,
//             transition: "all 0.5s ease",
//             transform: showForm ? "scale(1)" : "scale(0.95)",
//             opacity: showForm ? 1 : 0,
//           }}
//         >
//           <Typography sx={{ mb: 1, fontWeight: "bold" }}>
//             Add Teacher Picture
//           </Typography>
//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//           />
//           {imageUrl && (
//             <Box mt={2}>
//               <CardMedia component="img" height="200" image={imageUrl} />
//             </Box>
//           )}

//           {/* Input Fields */}
//           {[
//             { name: "name", label: "Name" },
//             { name: "email", label: "Email" },
//             { name: "age", label: "Age" },
//             { name: "qualification", label: "Qualification" },
//             { name: "password", label: "Password", type: "password" },
//             {
//               name: "confirm_password",
//               label: "Confirm Password",
//               type: "password",
//             },
//           ].map(({ name, label, type = "text" }) => (
//             <React.Fragment key={name}>
//               <TextField
//                 name={name}
//                 label={label}
//                 type={type}
//                 value={formik.values[name]}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 fullWidth
//                 margin="normal"
//               />
//               {getError(name)}
//             </React.Fragment>
//           ))}

//           {/* Gender */}
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Gender</InputLabel>
//             <Select
//               name="gender"
//               value={formik.values.gender}
//               label="Gender"
//               onChange={formik.handleChange}
//             >
//               <MenuItem value="male">Male</MenuItem>
//               <MenuItem value="female">Female</MenuItem>
//               <MenuItem value="other">Other</MenuItem>
//             </Select>
//           </FormControl>
//           {getError("gender")}

//           <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//             {editId ? "Update" : "Submit"}
//           </Button>
//         </Box>
//       )}

//       {/* Teacher Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 2,
//           mt: 4,
//         }}
//       >
//         {teachers.map((teacher) => (
//           <Card
//             key={teacher._id}
//             sx={{
//               width: { xs: "90%", sm: 300 },
//               position: "relative",
//               boxShadow: 3,
//               borderRadius: 2,
//             }}
//           >
//             <CardActionArea onClick={() => handleOpenModal(teacher)}>
//               <img
//                 src={teacher.image || `/placeholder.jpg`}
//                 alt={teacher.name}
//                 height="160"
//                 width="100%"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "8px",
//                   borderTopRightRadius: "8px",
//                   transition: "transform 0.3s",
//                 }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{teacher.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Age: {teacher.age}
//                   <br />
//                   Qualification: {teacher.qualification}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>

//             {/* Edit & Delete buttons */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 display: "flex",
//                 gap: 1,
//               }}
//             >
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleEdit(teacher);
//                 }}
//                 color="primary"
//               >
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(teacher._id);
//                 }}
//                 color="error"
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           </Card>
//         ))}
//       </Box>

//       {/* Modal for full details */}
//       <Modal open={modalOpen} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: "85%", md: 600 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 2,
//             outline: "none",
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <IconButton
//             onClick={handleCloseModal}
//             sx={{ position: "absolute", top: 8, right: 8, color: "#444" }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {selectedTeacher && (
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               textAlign="center"
//             >
//               {/* Zoomable Image */}
//               <Box
//                 sx={{
//                   width: "100%",
//                   overflow: "hidden",
//                   borderRadius: 2,
//                   "&:hover img": { transform: "scale(1.1)" },
//                   transition: "transform 0.3s",
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="320"
//                   image={selectedTeacher.image || `/placeholder.jpg`}
//                   alt={selectedTeacher.name}
//                   sx={{
//                     width: "100%",
//                     borderRadius: 2,
//                     objectFit: "cover",
//                     transition: "transform 0.3s ease-in-out",
//                   }}
//                 />
//               </Box>

//               {/* Teacher Details */}
//               <Typography variant="h4" mt={2} fontWeight="bold">
//                 {selectedTeacher.name}
//               </Typography>

//               <Typography
//                 variant="body1"
//                 mt={1}
//                 sx={{ color: "text.secondary" }}
//               >
//                 <strong>Age:</strong> {selectedTeacher.age} <br />
//                 <strong>Gender:</strong> {selectedTeacher.gender} <br />
//                 <strong>Qualification:</strong> {selectedTeacher.qualification}{" "}
//                 <br />
//                 <strong>Email:</strong> {selectedTeacher.email} <br />
//                 {selectedTeacher.phone && (
//                   <>
//                     <strong>Phone:</strong> {selectedTeacher.phone} <br />
//                   </>
//                 )}
//                 {selectedTeacher.address && (
//                   <>
//                     <strong>Address:</strong> {selectedTeacher.address} <br />
//                   </>
//                 )}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }



























// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   CardMedia,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   CardActionArea,
//   CardContent,
//   IconButton,
//   Modal,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { teacherSchema } from "../../../yupSchema/teacherSchema";
// import { baseApi } from "../../../environment";

// export default function Teachers() {
//   const [teachers, setTeachers] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [selectedTeacher, setSelectedTeacher] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const [showForm, setShowForm] = React.useState(false); // show/hide form
//   const fileInputRef = React.useRef(null);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const token = localStorage.getItem("token");

//   // Image selection
//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFile(file);
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(null);
//   };

//   const initialValues = {
//     name: "",
//     email: "",
//     age: "",
//     gender: "",
//     qualification: "",
//     password: "",
//     confirm_password: "",
//   };

//   // Fetch all teachers
//   const fetchTeachers = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeachers(resp.data.teachers);
//     } catch (err) {
//       console.error("Error fetching teachers", err);
//     }
//   };

//   React.useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleEdit = (teacher) => {
//     formik.setValues({
//       name: teacher.name,
//       email: teacher.email,
//       age: teacher.age,
//       qualification: teacher.qualification,
//       gender: teacher.gender,
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(teacher._id);
//     setImageUrl(teacher.image || null);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?"))
//       return;
//     try {
//       await axios.delete(`${baseApi}/teacher/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Teacher deleted successfully");
//       setMessageType("success");
//       fetchTeachers();
//     } catch (e) {
//       setMessage("Delete failed");
//       setMessageType("error");
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: teacherSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a teacher image");
//         setMessageType("error");
//         return;
//       }

//       const fd = new FormData();
//       if (file) fd.append("teacher_image", file);
//       Object.entries(values).forEach(([key, val]) => {
//         if (key !== "confirm_password") fd.append(key, val);
//       });

//       try {
//         if (editId) {
//           await axios.put(`${baseApi}/teacher/update/${editId}`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher updated successfully");
//         } else {
//           await axios.post(`${baseApi}/teacher/register`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher registered successfully");
//         }

//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         setShowForm(false);
//         fetchTeachers();
//       } catch (e) {
//         console.error("Register Teacher Error:", e.response?.data || e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       }
//     },
//   });

//   const getError = (field) =>
//     formik.touched[field] && formik.errors[field] ? (
//       <Typography color="error" fontSize="small" mt={-1}>
//         {formik.errors[field]}
//       </Typography>
//     ) : null;

//   const handleOpenModal = (teacher) => {
//     setSelectedTeacher(teacher);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTeacher(null);
//     setModalOpen(false);
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 6, pb: 6, background: "#f4f4f4" }}>
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
//         sx={{ fontWeight: "bold", mb: 3 }}
//       >
//         Teachers
//       </Typography>

//       {/* Add New Teacher Button */}
//       <Box textAlign="center" mb={3}>
//         <Button
//           variant="contained"
//           onClick={() => setShowForm(!showForm)}
//           sx={{ bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" } }}
//         >
//           {showForm ? "Hide Form" : "Add New Teacher"}
//         </Button>
//       </Box>

//       {/* Form with close button */}
//       {showForm && (
//         <Box
//           component="form"
//           onSubmit={formik.handleSubmit}
//           sx={{
//             position: "relative",
//             background: "linear-gradient(135deg, #e0f7fa, #80deea)",
//             borderRadius: 3,
//             p: 4,
//             width: "90%",
//             maxWidth: "600px",
//             mx: "auto",
//             boxShadow: 5,
//             transition: "all 0.5s ease",
//             transform: showForm ? "scale(1)" : "scale(0.95)",
//             opacity: showForm ? 1 : 0,
//           }}
//         >
//           {/* Close button */}
//           <IconButton
//             onClick={() => setShowForm(false)}
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               bgcolor: "red",
//               color: "white",
//               "&:hover": { bgcolor: "darkred" },
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           <Typography sx={{ mb: 1, fontWeight: "bold" }}>
//             Add Teacher Picture
//           </Typography>
//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//           />
//           {imageUrl && (
//             <Box mt={2}>
//               <CardMedia component="img" height="200" image={imageUrl} />
//             </Box>
//           )}

//           {/* Input Fields */}
//           {[
//             { name: "name", label: "Name" },
//             { name: "email", label: "Email" },
//             { name: "age", label: "Age" },
//             { name: "qualification", label: "Qualification" },
//             { name: "password", label: "Password", type: "password" },
//             {
//               name: "confirm_password",
//               label: "Confirm Password",
//               type: "password",
//             },
//           ].map(({ name, label, type = "text" }) => (
//             <React.Fragment key={name}>
//               <TextField
//                 name={name}
//                 label={label}
//                 type={type}
//                 value={formik.values[name]}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 fullWidth
//                 margin="normal"
//               />
//               {getError(name)}
//             </React.Fragment>
//           ))}

//           {/* Gender */}
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Gender</InputLabel>
//             <Select
//               name="gender"
//               value={formik.values.gender}
//               label="Gender"
//               onChange={formik.handleChange}
//             >
//               <MenuItem value="male">Male</MenuItem>
//               <MenuItem value="female">Female</MenuItem>
//               <MenuItem value="other">Other</MenuItem>
//             </Select>
//           </FormControl>
//           {getError("gender")}

//           <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//             {editId ? "Update" : "Submit"}
//           </Button>
//         </Box>
//       )}

//       {/* Teacher Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 2,
//           mt: 4,
//         }}
//       >
//         {teachers.map((teacher) => (
//           <Card
//             key={teacher._id}
//             sx={{
//               width: { xs: "90%", sm: 300 },
//               position: "relative",
//               boxShadow: 3,
//               borderRadius: 2,
//             }}
//           >
//             <CardActionArea onClick={() => handleOpenModal(teacher)}>
//               <img
//                 src={teacher.image || `/placeholder.jpg`}
//                 alt={teacher.name}
//                 height="160"
//                 width="100%"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "8px",
//                   borderTopRightRadius: "8px",
//                 }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{teacher.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Age: {teacher.age}
//                   <br />
//                   Qualification: {teacher.qualification}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>

//             {/* Edit & Delete buttons */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 display: "flex",
//                 gap: 1,
//               }}
//             >
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleEdit(teacher);
//                 }}
//                 color="primary"
//               >
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(teacher._id);
//                 }}
//                 color="error"
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           </Card>
//         ))}
//       </Box>

//       {/* Modal for full details with zoom effect */}
//       <Modal open={modalOpen} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: "85%", md: 600 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 2,
//             outline: "none",
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <IconButton
//             onClick={handleCloseModal}
//             sx={{
//               position: "absolute",
//               top: 8,
//               right: 8,
//               bgcolor: "black",
//               color: "white",
//               "&:hover": { bgcolor: "#333" },
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {selectedTeacher && (
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               textAlign="center"
//             >
//               <Box
//                 sx={{
//                   width: "100%",
//                   overflow: "hidden",
//                   borderRadius: 2,
//                   transition: "transform 0.3s ease-in-out",
//                   "&:hover img": { transform: "scale(1.1)" },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="320"
//                   image={selectedTeacher.image || `/placeholder.jpg`}
//                   alt={selectedTeacher.name}
//                   sx={{
//                     width: "100%",
//                     borderRadius: 2,
//                     objectFit: "cover",
//                     transition: "transform 0.3s ease-in-out",
//                   }}
//                 />
//               </Box>

//               <Typography
//                 variant="h4"
//                 mt={2}
//                 fontWeight="bold"
//                 sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}
//               >
//                 {selectedTeacher.name}
//               </Typography>

//               <Typography
//                 variant="body1"
//                 mt={1}
//                 sx={{
//                   fontSize: { xs: "0.95rem", md: "1rem" },
//                   color: "text.secondary",
//                 }}
//               >
//                 <strong>Age:</strong> {selectedTeacher.age}
//                 <br />
//                 <strong>Gender:</strong> {selectedTeacher.gender}
//                 <br />
//                 <strong>Qualification:</strong> {selectedTeacher.qualification}
//                 <br />
//                 <strong>Email:</strong> {selectedTeacher.email}
//                 <br />
//                 {selectedTeacher.phone && (
//                   <>
//                     <strong>Phone:</strong> {selectedTeacher.phone}
//                     <br />
//                   </>
//                 )}
//                 {selectedTeacher.address && (
//                   <>
//                     <strong>Address:</strong> {selectedTeacher.address}
//                     <br />
//                   </>
//                 )}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }





























// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   CardMedia,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   CardActionArea,
//   CardContent,
//   IconButton,
//   Modal,
//   Paper,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { teacherSchema } from "../../../yupSchema/teacherSchema";
// import { baseApi } from "../../../environment";

// export default function Teachers() {
//   const [teachers, setTeachers] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [selectedTeacher, setSelectedTeacher] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const [showForm, setShowForm] = React.useState(false);
//   const fileInputRef = React.useRef(null);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const token = localStorage.getItem("token");

//   // Image selection
//   const addImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFile(file);
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(null);
//   };

//   const initialValues = {
//     name: "",
//     email: "",
//     age: "",
//     gender: "",
//     qualification: "",
//     password: "",
//     confirm_password: "",
//   };

//   // Fetch all teachers
//   const fetchTeachers = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeachers(resp.data.teachers);
//     } catch (err) {
//       console.error("Error fetching teachers", err);
//     }
//   };

//   React.useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleEdit = (teacher) => {
//     formik.setValues({
//       name: teacher.name,
//       email: teacher.email,
//       age: teacher.age,
//       qualification: teacher.qualification,
//       gender: teacher.gender,
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(teacher._id);
//     setImageUrl(teacher.image || null);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?"))
//       return;
//     try {
//       await axios.delete(`${baseApi}/teacher/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Teacher deleted successfully");
//       setMessageType("success");
//       fetchTeachers();
//     } catch (e) {
//       setMessage("Delete failed");
//       setMessageType("error");
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: teacherSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a teacher image");
//         setMessageType("error");
//         return;
//       }

//       const fd = new FormData();
//       if (file) fd.append("teacher_image", file);
//       Object.entries(values).forEach(([key, val]) => {
//         if (key !== "confirm_password") fd.append(key, val);
//       });

//       try {
//         if (editId) {
//           await axios.put(`${baseApi}/teacher/update/${editId}`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher updated successfully");
//         } else {
//           await axios.post(`${baseApi}/teacher/register`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Teacher registered successfully");
//         }

//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         setShowForm(false);
//         fetchTeachers();
//       } catch (e) {
//         console.error("Register Teacher Error:", e.response?.data || e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       }
//     },
//   });

//   const getError = (field) =>
//     formik.touched[field] && formik.errors[field] ? (
//       <Typography color="error" fontSize="small" mt={-1}>
//         {formik.errors[field]}
//       </Typography>
//     ) : null;

//   const handleOpenModal = (teacher) => {
//     setSelectedTeacher(teacher);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTeacher(null);
//     setModalOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         pt: 6,
//         pb: 6,
//         background: "linear-gradient(135deg, #2196f3, #21cbf3)", // attractive background
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
//         sx={{
//           fontWeight: "bold",
//           mb: 3,
//           color: "#fff",
//           textShadow: "1px 1px 5px #000",
//         }}
//       >
//         Teachers
//       </Typography>

//       <Box display="flex" justifyContent="center" mb={3}>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close Form" : "Add New Teacher"}
//         </Button>
//       </Box>

//       {showForm && (
//         <Box
//           component="form"
//           onSubmit={formik.handleSubmit}
//           sx={{
//             background: "linear-gradient(135deg, #e0f7fa, #80deea)",
//             borderRadius: 3,
//             p: 3,
//             width: "90%",
//             maxWidth: "600px",
//             mx: "auto",
//             boxShadow: 5,
//             mb: 4,
//             transition: "all 0.5s ease-in-out",
//           }}
//         >
//           <Typography fontWeight="bold" mb={1}>
//             Add Teacher Picture
//           </Typography>
//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//           />
//           {imageUrl && (
//             <Box mt={2}>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={imageUrl}
//                 sx={{
//                   borderRadius: 2,
//                   transition: "transform 0.3s ease-in-out",
//                   "&:hover": { transform: "scale(1.05)" },
//                 }}
//               />
//             </Box>
//           )}

//           {[
//             { name: "name", label: "Name" },
//             { name: "email", label: "Email" },
//             { name: "age", label: "Age" },
//             { name: "qualification", label: "Qualification" },
//             { name: "password", label: "Password", type: "password" },
//             {
//               name: "confirm_password",
//               label: "Confirm Password",
//               type: "password",
//             },
//           ].map(({ name, label, type = "text" }) => (
//             <React.Fragment key={name}>
//               <TextField
//                 name={name}
//                 label={label}
//                 type={type}
//                 value={formik.values[name]}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 fullWidth
//                 margin="normal"
//               />
//               {getError(name)}
//             </React.Fragment>
//           ))}

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Gender</InputLabel>
//             <Select
//               name="gender"
//               value={formik.values.gender}
//               label="Gender"
//               onChange={formik.handleChange}
//             >
//               <MenuItem value="male">Male</MenuItem>
//               <MenuItem value="female">Female</MenuItem>
//               <MenuItem value="other">Other</MenuItem>
//             </Select>
//           </FormControl>
//           {getError("gender")}

//           <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//             {editId ? "Update" : "Submit"}
//           </Button>
//         </Box>
//       )}

//       {/* Teacher Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 2,
//           mt: 4,
//         }}
//       >
//         {teachers.map((teacher) => (
//           <Card
//             key={teacher._id}
//             sx={{
//               width: { xs: "90%", sm: 300 },
//               position: "relative",
//               boxShadow: 5,
//               borderRadius: 3,
//               transition: "transform 0.3s ease-in-out",
//               "&:hover": { transform: "translateY(-5px)" },
//             }}
//           >
//             <CardActionArea onClick={() => handleOpenModal(teacher)}>
//               <img
//                 src={teacher.image || `/placeholder.jpg`}
//                 alt={teacher.name}
//                 height="160"
//                 width="100%"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "8px",
//                   borderTopRightRadius: "8px",
//                 }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{teacher.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Age: {teacher.age}
//                   <br />
//                   Qualification: {teacher.qualification}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>

//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 display: "flex",
//                 gap: 1,
//               }}
//             >
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleEdit(teacher);
//                 }}
//                 color="primary"
//               >
//                 <EditIcon />
//               </IconButton>
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(teacher._id);
//                 }}
//                 color="error"
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           </Card>
//         ))}
//       </Box>

//       {/* Modal */}
//       <Modal open={modalOpen} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: "85%", md: 600 },
//             bgcolor: "#fff",
//             borderRadius: 3,
//             boxShadow: 24,
//             p: 2,
//             outline: "none",
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <IconButton
//             onClick={handleCloseModal}
//             sx={{
//               position: "absolute",
//               top: 8,
//               right: 8,
//               backgroundColor: "#f50057",
//               color: "#fff",
//               "&:hover": { backgroundColor: "#c51162" },
//               zIndex: 10,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {selectedTeacher && (
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               textAlign="center"
//             >
//               <Box
//                 sx={{
//                   width: "100%",
//                   overflow: "hidden",
//                   borderRadius: 3,
//                   transition: "transform 0.3s ease-in-out",
//                   "&:hover img": { transform: "scale(1.1)" },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="320"
//                   image={selectedTeacher.image || `/placeholder.jpg`}
//                   alt={selectedTeacher.name}
//                   sx={{
//                     width: "100%",
//                     borderRadius: 3,
//                     objectFit: "cover",
//                     transition: "transform 0.3s ease-in-out",
//                   }}
//                 />
//               </Box>

//               <Typography
//                 variant="h4"
//                 mt={2}
//                 fontWeight="bold"
//                 sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}
//               >
//                 {selectedTeacher.name}
//               </Typography>

//               <Typography
//                 variant="body1"
//                 mt={1}
//                 sx={{
//                   fontSize: { xs: "0.95rem", md: "1rem" },
//                   color: "text.secondary",
//                 }}
//               >
//                 <strong>Age:</strong> {selectedTeacher.age}
//                 <br />
//                 <strong>Gender:</strong> {selectedTeacher.gender}
//                 <br />
//                 <strong>Qualification:</strong> {selectedTeacher.qualification}
//                 <br />
//                 <strong>Email:</strong> {selectedTeacher.email}
//                 <br />
//                 {selectedTeacher.phone && (
//                   <>
//                     <strong>Phone:</strong> {selectedTeacher.phone}
//                     <br />
//                   </>
//                 )}
//                 {selectedTeacher.address && (
//                   <>
//                     <strong>Address:</strong> {selectedTeacher.address}
//                     <br />
//                   </>
//                 )}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

































import * as React from "react";
import {
  Box,
  TextField,
  Button,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Modal,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { teacherSchema } from "../../../yupSchema/teacherSchema";
import { baseApi } from "../../../environment";

export default function Teachers() {
  const [teachers, setTeachers] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [editId, setEditId] = React.useState(null);
  const [selectedTeacher, setSelectedTeacher] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => setMessage("");

  const token = localStorage.getItem("token");

  const cardColors = [
    "#FFCDD2",
    "#C8E6C9",
    "#BBDEFB",
    "#FFF9C4",
    "#D1C4E9",
    "#FFECB3",
  ];

  const addImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleClearFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFile(null);
    setImageUrl(null);
  };

  const initialValues = {
    name: "",
    email: "",
    age: "",
    gender: "",
    qualification: "",
    password: "",
    confirm_password: "",
  };

  const fetchTeachers = async () => {
    try {
      const resp = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(resp.data.teachers);
    } catch (err) {
      console.error("Error fetching teachers", err);
    }
  };

  React.useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    formik.setValues({
      name: teacher.name,
      email: teacher.email,
      age: teacher.age,
      qualification: teacher.qualification,
      gender: teacher.gender,
      password: "",
      confirm_password: "",
    });
    setEditId(teacher._id);
    setImageUrl(teacher.image || null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;
    try {
      await axios.delete(`${baseApi}/teacher/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Teacher deleted successfully");
      setMessageType("success");
      fetchTeachers();
    } catch (e) {
      setMessage("Delete failed");
      setMessageType("error");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: teacherSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!file && !editId) {
        setMessage("Please add a teacher image");
        setMessageType("error");
        return;
      }

      const fd = new FormData();
      if (file) fd.append("teacher_image", file);
      Object.entries(values).forEach(([key, val]) => {
        if (key !== "confirm_password") fd.append(key, val);
      });

      try {
        if (editId) {
          await axios.put(`${baseApi}/teacher/update/${editId}`, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          setMessage("Teacher updated successfully");
        } else {
          await axios.post(`${baseApi}/teacher/register`, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          setMessage("Teacher registered successfully");
        }

        setMessageType("success");
        handleClearFile();
        resetForm();
        setEditId(null);
        setShowForm(false);
        fetchTeachers();
      } catch (e) {
        console.error("Register Teacher Error:", e.response?.data || e);
        setMessage(e.response?.data?.message || "Operation failed");
        setMessageType("error");
      }
    },
  });

  const getError = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <Typography color="error" fontSize="small" mt={-1}>
        {formik.errors[field]}
      </Typography>
    ) : null;

  const handleOpenModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
    setModalOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", pt: 6, pb: 6, background: "#f0f4f8" }}>
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
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Teachers
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add New Teacher"}
        </Button>
      </Box>

      {showForm && (
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            background: "#ffffff",
            borderRadius: 3,
            p: 4,
            width: "90%",
            maxWidth: "600px",
            mx: "auto",
            boxShadow: 5,
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Typography variant="h6" mb={2} fontWeight="bold">
            {editId ? "Edit Teacher" : "Add New Teacher"}
          </Typography>
          <TextField
            type="file"
            inputRef={fileInputRef}
            onChange={addImage}
            fullWidth
            sx={{ mb: 2 }}
          />
          {imageUrl && (
            <Box mt={2}>
              <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                sx={{
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </Box>
          )}

          {[
            { name: "name", label: "Name" },
            { name: "email", label: "Email" },
            { name: "age", label: "Age" },
            { name: "qualification", label: "Qualification" },
            { name: "password", label: "Password", type: "password" },
            {
              name: "confirm_password",
              label: "Confirm Password",
              type: "password",
            },
          ].map(({ name, label, type = "text" }) => (
            <React.Fragment key={name}>
              <TextField
                name={name}
                label={label}
                type={type}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
              />
              {getError(name)}
            </React.Fragment>
          ))}

          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formik.values.gender}
              label="Gender"
              onChange={formik.handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          {getError("gender")}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            {editId ? "Update Teacher" : "Submit Teacher"}
          </Button>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        {teachers.map((teacher, index) => (
          <Card
            key={teacher._id}
            sx={{
              width: { xs: "90%", sm: 300 },
              position: "relative",
              boxShadow: 5,
              borderRadius: 3,
              backgroundColor: cardColors[index % cardColors.length],
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardActionArea onClick={() => handleOpenModal(teacher)}>
              <img
                src={teacher.image || `/placeholder.jpg`}
                alt={teacher.name}
                height="160"
                width="100%"
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <CardContent>
                <Typography variant="h6">{teacher.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {teacher.age}
                  <br />
                  Qualification: {teacher.qualification}
                </Typography>
              </CardContent>
            </CardActionArea>

            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(teacher);
                }}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(teacher._id);
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "85%", md: 600 },
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
            outline: "none",
            maxHeight: "90vh",
            overflowY: "auto",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "#ff1744",
              color: "#fff",
              "&:hover": { bgcolor: "#f01440" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedTeacher && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover img": { transform: "scale(1.1)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="320"
                  image={selectedTeacher.image || `/placeholder.jpg`}
                  alt={selectedTeacher.name}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    objectFit: "cover",
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </Box>

              <Typography variant="h4" mt={2} fontWeight="bold">
                {selectedTeacher.name}
              </Typography>

              <Typography
                variant="body1"
                mt={1}
                sx={{ color: "text.secondary" }}
              >
                <strong>Age:</strong> {selectedTeacher.age}
                <br />
                <strong>Gender:</strong> {selectedTeacher.gender}
                <br />
                <strong>Qualification:</strong> {selectedTeacher.qualification}
                <br />
                <strong>Email:</strong> {selectedTeacher.email}
                <br />
                {selectedTeacher.phone && (
                  <>
                    <strong>Phone:</strong> {selectedTeacher.phone}
                    <br />
                  </>
                )}
                {selectedTeacher.address && (
                  <>
                    <strong>Address:</strong> {selectedTeacher.address}
                    <br />
                  </>
                )}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
