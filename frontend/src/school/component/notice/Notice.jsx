// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useFormik } from "formik";
// import * as React from "react";
// import { noticeSchema } from "../../../yupSchema/noticeSchema";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

// export default function Notice() {
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [notices, setNotices] = React.useState([]);
//   const [edit, setEdit] = React.useState(false);
//   const [editId, setEditId] = React.useState(null);

//   const handleMessageClose = () => setMessage("");

//   // ✅ Formik setup
//   const Formik = useFormik({
//     initialValues: { title: "", message: "", audience: "" },
//     validationSchema: noticeSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = {
//           headers: { Authorization: `Bearer ${token}` },
//         };

//         if (edit) {
//           const resp = await axios.patch(
//             `${baseApi}/notice/update/${editId}`,
//             values,
//             config
//           );
//           setMessage(resp.data.message);
//           setMessageType("success");
//           setEdit(false);
//           setEditId(null);
//           resetForm();
//           fetchAllNotices();
//         } else {
//           const resp = await axios.post(
//             `${baseApi}/notice/create`,
//             values,
//             config
//           );
//           setMessage(resp.data.message);
//           setMessageType("success");
//           resetForm();
//           fetchAllNotices();
//         }
//       } catch (e) {
//         console.error("Error creating/updating notice:", e);
//         setMessage(
//           e.response?.data?.message || "Error creating/updating notice"
//         );
//         setMessageType("error");
//       }
//     },
//   });

//   // ✅ Fetch all notices
//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotices(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();
//   }, []);

//   const handleEdit = (id, title, message, audience) => {
//     setEdit(true);
//     setEditId(id);
//     Formik.setValues({ title, message, audience });
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.delete(`${baseApi}/notice/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage(resp.data.message);
//       setMessageType("success");
//       fetchAllNotices();
//     } catch (e) {
//       console.error("Error deleting notice:", e);
//       setMessage("Error deleting notice");
//       setMessageType("error");
//     }
//   };

//   const cancelEdit = () => {
//     setEdit(false);
//     setEditId(null);
//     Formik.resetForm();
//   };

//   return (
//     <>
//       {message && (
//         <MessageSnackbar
//           message={message}
//           messageType={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}

//       <Box
//         component="form"
//         onSubmit={Formik.handleSubmit}
//         sx={{
//           maxWidth: 700,
//           p: 4,
//           backgroundColor: "white",
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{ textAlign: "center", mb: 3, fontSize: "2rem" }}
//         >
//           {edit ? "Edit Notice" : "Add New Notice"}
//         </Typography>

//         <TextField
//           name="title"
//           label="Title"
//           fullWidth
//           value={Formik.values.title}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//         />
//         {Formik.touched.title && Formik.errors.title && (
//           <p style={{ color: "red" }}>{Formik.errors.title}</p>
//         )}

//         <TextField
//           name="message"
//           label="Message"
//           fullWidth
//           multiline
//           rows={4}
//           sx={{ mt: 2 }}
//           value={Formik.values.message}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//         />
//         {Formik.touched.message && Formik.errors.message && (
//           <p style={{ color: "red" }}>{Formik.errors.message}</p>
//         )}

//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel id="audience-label">Audience</InputLabel>
//           <Select
//             labelId="audience-label"
//             id="audience"
//             name="audience"
//             value={Formik.values.audience}
//             label="Audience"
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleBlur}
//           >
//             <MenuItem value="">Select Audience</MenuItem>
//             <MenuItem value="teacher">Teacher</MenuItem>
//             <MenuItem value="student">Student</MenuItem>
//           </Select>
//           {Formik.touched.audience && Formik.errors.audience && (
//             <p style={{ color: "red" }}>{Formik.errors.audience}</p>
//           )}
//         </FormControl>

//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
//           {edit ? "Update Notice" : "Submit"}
//         </Button>

//         {edit && (
//           <Button
//             onClick={cancelEdit}
//             type="button"
//             variant="outlined"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Cancel
//           </Button>
//         )}
//       </Box>

//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
//         {notices.map((x) => (
//           <Paper
//             key={x._id}
//             sx={{
//               p: 3,
//               borderRadius: 3,
//               boxShadow: 4,
//               backgroundColor: "#f9f9f9",
//               width: 450,
//             }}
//           >
//             <Typography variant="h6">Notice: {x.title}</Typography>
//             <Typography variant="body2">Message: {x.message}</Typography>
//             <Typography variant="body2">Audience: {x.audience}</Typography>

//             <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
//               <Button
//                 onClick={() =>
//                   handleEdit(x._id, x.title, x.message, x.audience)
//                 }
//                 variant="contained"
//                 size="small"
//                 startIcon={<EditIcon />}
//               >
//                 Edit
//               </Button>
//               <Button
//                 onClick={() => handleDelete(x._id)}
//                 variant="outlined"
//                 color="error"
//                 size="small"
//                 startIcon={<DeleteIcon />}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     </>
//   );
// }
















// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useFormik } from "formik";
// import * as React from "react";
// import { noticeSchema } from "../../../yupSchema/noticeSchema";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { motion } from "framer-motion";
// import moment from "moment"; // 🕒 for formatting date-time

// export default function Notice() {
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [notices, setNotices] = React.useState([]);
//   const [edit, setEdit] = React.useState(false);
//   const [editId, setEditId] = React.useState(null);

//   const handleMessageClose = () => setMessage("");

//   // ✅ Formik setup
//   const Formik = useFormik({
//     initialValues: { title: "", message: "", audience: "" },
//     validationSchema: noticeSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = { headers: { Authorization: `Bearer ${token}` } };

//         if (edit) {
//           const resp = await axios.patch(
//             `${baseApi}/notice/update/${editId}`,
//             values,
//             config
//           );
//           setMessage(resp.data.message);
//           setMessageType("success");
//           setEdit(false);
//           setEditId(null);
//           resetForm();
//           fetchAllNotices();
//         } else {
//           const resp = await axios.post(
//             `${baseApi}/notice/create`,
//             values,
//             config
//           );
//           setMessage(resp.data.message);
//           setMessageType("success");
//           resetForm();
//           fetchAllNotices();
//         }
//       } catch (e) {
//         console.error("Error creating/updating notice:", e);
//         setMessage(
//           e.response?.data?.message || "Error creating/updating notice"
//         );
//         setMessageType("error");
//       }
//     },
//   });

//   // ✅ Fetch all notices
//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotices(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();
//   }, []);

//   const handleEdit = (id, title, message, audience) => {
//     setEdit(true);
//     setEditId(id);
//     Formik.setValues({ title, message, audience });
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.delete(`${baseApi}/notice/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage(resp.data.message);
//       setMessageType("success");
//       fetchAllNotices();
//     } catch (e) {
//       console.error("Error deleting notice:", e);
//       setMessage("Error deleting notice");
//       setMessageType("error");
//     }
//   };

//   const cancelEdit = () => {
//     setEdit(false);
//     setEditId(null);
//     Formik.resetForm();
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         py: 5,
//       }}
//     >
//       {message && (
//         <MessageSnackbar
//           message={message}
//           messageType={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}

//       {/* 🎨 Animated Form */}
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, type: "spring" }}
//       >
//         <Box
//           component="form"
//           onSubmit={Formik.handleSubmit}
//           sx={{
//             width: "90%",
//             maxWidth: 700,
//             p: 4,
//             backgroundColor: "rgba(255,255,255,0.1)",
//             borderRadius: 4,
//             boxShadow: "0px 4px 20px rgba(0,0,0,0.6)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{
//               textAlign: "center",
//               mb: 3,
//               fontSize: "2rem",
//               fontWeight: 700,
//               color: "#fff",
//               textShadow: "0 0 10px #00ffff",
//             }}
//           >
//             {edit ? "✏️ Edit Notice" : "📢 Add New Notice"}
//           </Typography>

//           <TextField
//             name="title"
//             label="Title"
//             fullWidth
//             value={Formik.values.title}
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleBlur}
//             sx={{
//               input: { color: "#fff" },
//               label: { color: "#aaa" },
//               mt: 1,
//             }}
//           />
//           {Formik.touched.title && Formik.errors.title && (
//             <p style={{ color: "red" }}>{Formik.errors.title}</p>
//           )}

//           <TextField
//             name="message"
//             label="Message"
//             fullWidth
//             multiline
//             rows={4}
//             sx={{
//               mt: 2,
//               textarea: { color: "#fff" },
//               label: { color: "#aaa" },
//             }}
//             value={Formik.values.message}
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleBlur}
//           />
//           {Formik.touched.message && Formik.errors.message && (
//             <p style={{ color: "red" }}>{Formik.errors.message}</p>
//           )}

//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="audience-label" sx={{ color: "#aaa" }}>
//               Audience
//             </InputLabel>
//             <Select
//               labelId="audience-label"
//               id="audience"
//               name="audience"
//               value={Formik.values.audience}
//               label="Audience"
//               onChange={Formik.handleChange}
//               onBlur={Formik.handleBlur}
//               sx={{
//                 color: "#fff",
//                 ".MuiSvgIcon-root": { color: "#fff" },
//               }}
//             >
//               <MenuItem value="">Select Audience</MenuItem>
//               <MenuItem value="teacher">Teacher</MenuItem>
//               <MenuItem value="student">Student</MenuItem>
//             </Select>
//             {Formik.touched.audience && Formik.errors.audience && (
//               <p style={{ color: "red" }}>{Formik.errors.audience}</p>
//             )}
//           </FormControl>

//           <motion.div
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 mt: 3,
//                 py: 1.2,
//                 fontSize: "1.1rem",
//                 background: "linear-gradient(45deg, #00c6ff, #0072ff)",
//                 boxShadow: "0 0 15px #00c6ff",
//               }}
//             >
//               {edit ? "Update Notice" : "Submit"}
//             </Button>
//           </motion.div>

//           {edit && (
//             <Button
//               onClick={cancelEdit}
//               type="button"
//               variant="outlined"
//               fullWidth
//               sx={{
//                 mt: 2,
//                 color: "#fff",
//                 borderColor: "#00ffff",
//                 "&:hover": { backgroundColor: "rgba(0,255,255,0.2)" },
//               }}
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </motion.div>

//       {/* 🧾 Animated Notice Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 3,
//           justifyContent: "center",
//           mt: 5,
//           px: 2,
//         }}
//       >
//         {notices.map((x, i) => (
//           <motion.div
//             key={x._id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1, duration: 0.5 }}
//           >
//             <Paper
//               elevation={6}
//               sx={{
//                 p: 3,
//                 borderRadius: 4,
//                 width: 320,
//                 background:
//                   "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,0,0,0.4))",
//                 color: "#fff",
//                 backdropFilter: "blur(8px)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-6px)",
//                   boxShadow: "0 0 20px #00ffff",
//                 },
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color: "#00e5ff",
//                   mb: 1,
//                   textShadow: "0 0 10px #00e5ff",
//                 }}
//               >
//                 {x.title}
//               </Typography>

//               <Typography variant="body2">{x.message}</Typography>

//               <Typography
//                 variant="caption"
//                 sx={{ mt: 1, display: "block", color: "#ccc" }}
//               >
//                 Audience: {x.audience}
//               </Typography>

//               {/* 🕒 Sending Time Display */}
//               <Typography
//                 variant="caption"
//                 sx={{
//                   mt: 1,
//                   display: "block",
//                   fontSize: "0.8rem",
//                   color: "#00ffff",
//                   textShadow: "0 0 5px #00ffff",
//                 }}
//               >
//                 Sent: {moment(x.createdAt).format("DD MMM YYYY, hh:mm A")}
//               </Typography>

//               <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
//                 <Button
//                   onClick={() =>
//                     handleEdit(x._id, x.title, x.message, x.audience)
//                   }
//                   variant="contained"
//                   size="small"
//                   startIcon={<EditIcon />}
//                   sx={{
//                     background: "linear-gradient(45deg, #00e5ff, #0072ff)",
//                     color: "#fff",
//                   }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(x._id)}
//                   variant="outlined"
//                   color="error"
//                   size="small"
//                   startIcon={<DeleteIcon />}
//                   sx={{
//                     borderColor: "#ff1744",
//                     color: "#ff5252",
//                     "&:hover": { backgroundColor: "rgba(255,23,68,0.1)" },
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </Paper>
//           </motion.div>
//         ))}
//       </Box>
//     </Box>
//   );
// }


























import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { useFormik } from "formik";
// import { noticeSchema } from "../../../yupSchema/noticeSchema";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { motion } from "framer-motion";
// import moment from "moment";

// export default function Notice() {
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("success");
//   const [notices, setNotices] = useState([]);
//   const [edit, setEdit] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const isMobile = useMediaQuery("(max-width:768px)");

//   const handleMessageClose = () => setMessage("");

//   const formik = useFormik({
//     initialValues: { title: "", message: "", audience: "" },
//     validationSchema: noticeSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = { headers: { Authorization: `Bearer ${token}` } };

//         if (edit) {
//           const resp = await axios.patch(
//             `${baseApi}/notice/update/${editId}`,
//             values,
//             config
//           );
//           setMessage(resp.data.message);
//           setMessageType("success");
//           setEdit(false);
//           setEditId(null);
//           resetForm();
//           fetchAllNotices();
//         } else {
//           const resp = await axios.post(
//             `${baseApi}/notice/create`,
//             values,
//             config
//           );
//           setMessage(resp.data.message);
//           setMessageType("success");
//           resetForm();
//           fetchAllNotices();
//         }
//       } catch (e) {
//         console.error(e);
//         setMessage(
//           e.response?.data?.message || "Error creating/updating notice"
//         );
//         setMessageType("error");
//       }
//     },
//   });

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotices(resp.data.data || []);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     fetchAllNotices();
//   }, []);

//   const handleEdit = (id, title, message, audience) => {
//     setEdit(true);
//     setEditId(id);
//     formik.setValues({ title, message, audience });
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.delete(`${baseApi}/notice/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage(resp.data.message);
//       setMessageType("success");
//       fetchAllNotices();
//     } catch (e) {
//       console.error(e);
//       setMessage("Error deleting notice");
//       setMessageType("error");
//     }
//   };

//   const cancelEdit = () => {
//     setEdit(false);
//     setEditId(null);
//     formik.resetForm();
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         py: 5,
//         px: 2,
//       }}
//     >
//       {message && (
//         <MessageSnackbar
//           message={message}
//           messageType={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}

//       {/* Animated Form */}
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, type: "spring" }}
//       >
//         <Box
//           component="form"
//           onSubmit={formik.handleSubmit}
//           sx={{
//             width: isMobile ? "100%" : "90%",
//             maxWidth: 700,
//             p: 4,
//             backgroundColor: "rgba(255,255,255,0.1)",
//             borderRadius: 4,
//             boxShadow: "0px 4px 20px rgba(0,0,0,0.6)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{
//               textAlign: "center",
//               mb: 3,
//               fontSize: isMobile ? "1.8rem" : "2rem",
//               fontWeight: 700,
//               color: "#fff",
//               textShadow: "0 0 10px #00ffff",
//             }}
//           >
//             {edit ? "✏️ Edit Notice" : "📢 Add New Notice"}
//           </Typography>

//           <TextField
//             name="title"
//             label="Title"
//             fullWidth
//             value={formik.values.title}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             sx={{
//               input: { color: "#fff" },
//               label: { color: "#aaa" },
//               mt: 1,
//             }}
//           />
//           {formik.touched.title && formik.errors.title && (
//             <Typography color="error" fontSize="0.85rem">
//               {formik.errors.title}
//             </Typography>
//           )}

//           <TextField
//             name="message"
//             label="Message"
//             fullWidth
//             multiline
//             rows={4}
//             sx={{
//               mt: 2,
//               textarea: { color: "#fff" },
//               label: { color: "#aaa" },
//             }}
//             value={formik.values.message}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.message && formik.errors.message && (
//             <Typography color="error" fontSize="0.85rem">
//               {formik.errors.message}
//             </Typography>
//           )}

//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="audience-label" sx={{ color: "#aaa" }}>
//               Audience
//             </InputLabel>
//             <Select
//               labelId="audience-label"
//               id="audience"
//               name="audience"
//               value={formik.values.audience}
//               label="Audience"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               sx={{ color: "#fff", ".MuiSvgIcon-root": { color: "#fff" } }}
//             >
//               <MenuItem value="">Select Audience</MenuItem>
//               <MenuItem value="teacher">Teacher</MenuItem>
//               <MenuItem value="student">Student</MenuItem>
//             </Select>
//             {formik.touched.audience && formik.errors.audience && (
//               <Typography color="error" fontSize="0.85rem">
//                 {formik.errors.audience}
//               </Typography>
//             )}
//           </FormControl>

//           <motion.div
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 mt: 3,
//                 py: 1.2,
//                 fontSize: "1.1rem",
//                 background: "linear-gradient(45deg, #00c6ff, #0072ff)",
//                 boxShadow: "0 0 15px #00c6ff",
//               }}
//             >
//               {edit ? "Update Notice" : "Submit"}
//             </Button>
//           </motion.div>

//           {edit && (
//             <Button
//               onClick={cancelEdit}
//               type="button"
//               variant="outlined"
//               fullWidth
//               sx={{
//                 mt: 2,
//                 color: "#fff",
//                 borderColor: "#00ffff",
//                 "&:hover": { backgroundColor: "rgba(0,255,255,0.2)" },
//               }}
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </motion.div>

//       {/* Notice Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           flexWrap: "wrap",
//           gap: 3,
//           justifyContent: "center",
//           mt: 5,
//           px: 1,
//         }}
//       >
//         {notices.map((x, i) => (
//           <motion.div
//             key={x._id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1, duration: 0.5 }}
//             style={{ width: isMobile ? "100%" : 320 }}
//           >
//             <Paper
//               elevation={6}
//               sx={{
//                 p: 3,
//                 borderRadius: 4,
//                 background:
//                   "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,0,0,0.4))",
//                 color: "#fff",
//                 backdropFilter: "blur(8px)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-6px)",
//                   boxShadow: "0 0 20px #00ffff",
//                 },
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color: "#00e5ff",
//                   mb: 1,
//                   textShadow: "0 0 10px #00e5ff",
//                   fontSize: isMobile ? "1.2rem" : "1.5rem",
//                 }}
//               >
//                 {x.title}
//               </Typography>

//               <Typography variant="body2">{x.message}</Typography>

//               <Typography
//                 variant="caption"
//                 sx={{ mt: 1, display: "block", color: "#ccc" }}
//               >
//                 Audience: {x.audience}
//               </Typography>

//               <Typography
//                 variant="caption"
//                 sx={{
//                   mt: 1,
//                   display: "block",
//                   fontSize: "0.8rem",
//                   color: "#00ffff",
//                   textShadow: "0 0 5px #00ffff",
//                 }}
//               >
//                 Sent: {moment(x.createdAt).format("DD MMM YYYY, hh:mm A")}
//               </Typography>

//               <Box
//                 sx={{
//                   mt: 2,
//                   display: "flex",
//                   gap: 1,
//                   flexDirection: isMobile ? "column" : "row",
//                 }}
//               >
//                 <Button
//                   onClick={() =>
//                     handleEdit(x._id, x.title, x.message, x.audience)
//                   }
//                   variant="contained"
//                   size="small"
//                   startIcon={<EditIcon />}
//                   sx={{
//                     background: "linear-gradient(45deg, #00e5ff, #0072ff)",
//                     color: "#fff",
//                     width: isMobile ? "100%" : "auto",
//                   }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(x._id)}
//                   variant="outlined"
//                   color="error"
//                   size="small"
//                   startIcon={<DeleteIcon />}
//                   sx={{
//                     borderColor: "#ff1744",
//                     color: "#ff5252",
//                     "&:hover": { backgroundColor: "rgba(255,23,68,0.1)" },
//                     width: isMobile ? "100%" : "auto",
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </Paper>
//           </motion.div>
//         ))}
//       </Box>
//     </Box>
//   );
// }

























































import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { noticeSchema } from "../../../yupSchema/noticeSchema";
import axios from "axios";
import { baseApi } from "../../../environment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

export default function Notice() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [notices, setNotices] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // toggle state

  const isMobile = useMediaQuery("(max-width:768px)");

  const handleMessageClose = () => setMessage("");

  const formik = useFormik({
    initialValues: { title: "", message: "", audience: "" },
    validationSchema: noticeSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        if (edit) {
          const resp = await axios.patch(
            `${baseApi}/notice/update/${editId}`,
            values,
            config
          );
          setMessage(resp.data.message);
          setMessageType("success");
          setEdit(false);
          setEditId(null);
          resetForm();
          fetchAllNotices();
        } else {
          const resp = await axios.post(
            `${baseApi}/notice/create`,
            values,
            config
          );
          setMessage(resp.data.message);
          setMessageType("success");
          resetForm();
          fetchAllNotices();
        }
      } catch (e) {
        console.error(e);
        setMessage(
          e.response?.data?.message || "Error creating/updating notice"
        );
        setMessageType("error");
      }
    },
  });

  const fetchAllNotices = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(`${baseApi}/notice/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotices(resp.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllNotices();
  }, []);

  const handleEdit = (id, title, message, audience) => {
    setEdit(true);
    setEditId(id);
    setShowForm(true); // open form when editing
    formik.setValues({ title, message, audience });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.delete(`${baseApi}/notice/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(resp.data.message);
      setMessageType("success");
      fetchAllNotices();
    } catch (e) {
      console.error(e);
      setMessage("Error deleting notice");
      setMessageType("error");
    }
  };

  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    formik.resetForm();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
        px: 2,
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}

      {/* Add New Notice Toggle Button */}
      <Button
        variant="contained"
        onClick={() => setShowForm((prev) => !prev)}
        sx={{
          mb: 3,
          background: "linear-gradient(45deg, #00c6ff, #0072ff)",
          color: "#fff",
          py: 1.2,
          fontSize: "1.1rem",
          boxShadow: "0 0 15px #00c6ff",
        }}
      >
        {showForm ? "Close Form" : "Add New Notice"}
      </Button>

      {/* Animated Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                width: isMobile ? "100%" : "90%",
                maxWidth: 700,
                p: 4,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 4,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  mb: 3,
                  fontSize: isMobile ? "1.8rem" : "2rem",
                  fontWeight: 700,
                  color: "#fff",
                  textShadow: "0 0 10px #00ffff",
                }}
              >
                {edit ? "✏️ Edit Notice" : "📢 Add New Notice"}
              </Typography>

              <TextField
                name="title"
                label="Title"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{
                  input: { color: "#fff" },
                  label: { color: "#aaa" },
                  mt: 1,
                }}
              />
              {formik.touched.title && formik.errors.title && (
                <Typography color="error" fontSize="0.85rem">
                  {formik.errors.title}
                </Typography>
              )}

              <TextField
                name="message"
                label="Message"
                fullWidth
                multiline
                rows={4}
                sx={{
                  mt: 2,
                  textarea: { color: "#fff" },
                  label: { color: "#aaa" },
                }}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message && (
                <Typography color="error" fontSize="0.85rem">
                  {formik.errors.message}
                </Typography>
              )}

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="audience-label" sx={{ color: "#aaa" }}>
                  Audience
                </InputLabel>
                <Select
                  labelId="audience-label"
                  id="audience"
                  name="audience"
                  value={formik.values.audience}
                  label="Audience"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ color: "#fff", ".MuiSvgIcon-root": { color: "#fff" } }}
                >
                  <MenuItem value="">Select Audience</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                </Select>
                {formik.touched.audience && formik.errors.audience && (
                  <Typography color="error" fontSize="0.85rem">
                    {formik.errors.audience}
                  </Typography>
                )}
              </FormControl>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.2,
                    fontSize: "1.1rem",
                    background: "linear-gradient(45deg, #00c6ff, #0072ff)",
                    boxShadow: "0 0 15px #00c6ff",
                  }}
                >
                  {edit ? "Update Notice" : "Submit"}
                </Button>
              </motion.div>

              {edit && (
                <Button
                  onClick={cancelEdit}
                  type="button"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    color: "#fff",
                    borderColor: "#00ffff",
                    "&:hover": { backgroundColor: "rgba(0,255,255,0.2)" },
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notice Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          mt: 5,
          px: 1,
        }}
      >
        {notices.map((x, i) => (
          <motion.div
            key={x._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ width: isMobile ? "100%" : 320 }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,0,0,0.4))",
                color: "#fff",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 0 20px #00ffff",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#00e5ff",
                  mb: 1,
                  textShadow: "0 0 10px #00e5ff",
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              >
                {x.title}
              </Typography>

              <Typography variant="body2">{x.message}</Typography>

              <Typography
                variant="caption"
                sx={{ mt: 1, display: "block", color: "#ccc" }}
              >
                Audience: {x.audience}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  display: "block",
                  fontSize: "0.8rem",
                  color: "#00ffff",
                  textShadow: "0 0 5px #00ffff",
                }}
              >
                Sent: {moment(x.createdAt).format("DD MMM YYYY, hh:mm A")}
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 1,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <Button
                  onClick={() =>
                    handleEdit(x._id, x.title, x.message, x.audience)
                  }
                  variant="contained"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{
                    background: "linear-gradient(45deg, #00e5ff, #0072ff)",
                    color: "#fff",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(x._id)}
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  sx={{
                    borderColor: "#ff1744",
                    color: "#ff5252",
                    "&:hover": { backgroundColor: "rgba(255,23,68,0.1)" },
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
