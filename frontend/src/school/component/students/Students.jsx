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
//   CircularProgress,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import CancelIcon from "@mui/icons-material/Cancel";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { studentSchema } from "../../../yupSchema/studentSchema";
// import { baseApi } from "../../../environment";

// export default function Students() {
//   const [classes, setClasses] = React.useState([]);
//   const [students, setStudents] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [selectedStudent, setSelectedStudent] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const fileInputRef = React.useRef(null);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [loading, setLoading] = React.useState(false);
//   const [submitting, setSubmitting] = React.useState(false);

//   const handleMessageClose = () => setMessage("");
//   const token = localStorage.getItem("token");

//   // Helper to get class name from ID
//   const getClassName = (classId) => {
//     const cls = classes.find((c) => c._id === classId);
//     return cls ? `${cls.class_text} (${cls.class_num})` : "N/A";
//   };

//   // Image selection
//   const addImage = (event) => {
//     const f = event.target.files[0];
//     if (f) {
//       setFile(f);
//       setImageUrl(URL.createObjectURL(f));
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
//     student_class: "",
//     guardian: "",
//     guardian_phone: "",
//     password: "",
//     confirm_password: "",
//   };

//   // Fetch students
//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const sorted = (resp.data.students || [])
//         .slice()
//         .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
//       setStudents(sorted);
//     } catch (err) {
//       console.error("Error fetching students", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch classes for dropdown
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error("Error Fetching Classes.", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleEdit = (student) => {
//     formik.setValues({
//       name: student.name || "",
//       email: student.email || "",
//       age: student.age || "",
//       gender: student.gender || "",
//       student_class: student.student_class || "",
//       guardian: student.guardian || "",
//       guardian_phone: student.guardian_phone || "",
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(student._id);
//     setImageUrl(student.student_image || null);
//     setFile(null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleCancelEdit = (resetForm) => {
//     resetForm();
//     setEditId(null);
//     handleClearFile();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       setSubmitting(true);
//       await axios.delete(`${baseApi}/student/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Student deleted successfully");
//       setMessageType("success");
//       fetchStudents();
//     } catch (e) {
//       console.error(e);
//       setMessage("Delete failed");
//       setMessageType("error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: studentSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a student image");
//         setMessageType("error");
//         return;
//       }

//       const fd = new FormData();
//       if (file) fd.append("student_image", file);
//       Object.entries(values).forEach(([key, val]) => {
//         if (key !== "confirm_password") fd.append(key, val ?? "");
//       });

//       try {
//         setSubmitting(true);
//         if (editId) {
//           await axios.put(`${baseApi}/student/update/${editId}`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Student updated successfully");
//         } else {
//           await axios.post(`${baseApi}/student/register`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Student registered successfully");
//         }
//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         fetchStudents();
//       } catch (e) {
//         console.error("Student Error:", e.response?.data || e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   const getError = (field) =>
//     formik.touched[field] && formik.errors[field] ? (
//       <Typography color="error" fontSize="small" mt={-1}>
//         {formik.errors[field]}
//       </Typography>
//     ) : null;

//   const handleOpenModal = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedStudent(null);
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
//         sx={{ fontWeight: "bold", mb: 1 }}
//       >
//         Students
//       </Typography>

//       <Typography align="center" sx={{ mb: 3 }}>
//         Total Students: <strong>{students.length}</strong>
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
//           mb: 4,
//         }}
//       >
//         <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
//           <Typography sx={{ minWidth: 140 }}>Add Student Picture</Typography>
//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//             inputProps={{ accept: "image/*" }}
//           />
//           {imageUrl && (
//             <IconButton onClick={handleClearFile} title="Clear image">
//               <CancelIcon />
//             </IconButton>
//           )}
//         </Box>

//         {imageUrl && (
//           <Box mt={1}>
//             <CardMedia component="img" height="200" image={imageUrl} />
//           </Box>
//         )}

//         {/* Input Fields */}
//         {[
//           { name: "name", label: "Name" },
//           { name: "email", label: "Email" },
//           { name: "age", label: "Age" },
//           { name: "guardian", label: "Guardian Name" },
//           { name: "guardian_phone", label: "Guardian Phone" },
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

//         {/* Class */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Class</InputLabel>
//           <Select
//             name="student_class"
//             value={formik.values.student_class}
//             onChange={formik.handleChange}
//             label="Class"
//           >
//             <MenuItem value="">Select Class</MenuItem>
//             {classes.map((x) => (
//               <MenuItem key={x._id} value={x._id}>
//                 {x.class_text} ({x.class_num})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         {getError("student_class")}

//         {/* Gender */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Gender</InputLabel>
//           <Select
//             name="gender"
//             value={formik.values.gender}
//             onChange={formik.handleChange}
//             label="Gender"
//           >
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//         </FormControl>
//         {getError("gender")}

//         <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             disabled={submitting}
//             startIcon={submitting ? <CircularProgress size={18} /> : null}
//           >
//             {editId ? "Update" : "Submit"}
//           </Button>
//           {editId && (
//             <Button
//               variant="outlined"
//               color="inherit"
//               onClick={() => handleCancelEdit(formik.resetForm)}
//               disabled={submitting}
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Box>

//       {/* Student Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 2,
//           mt: 2,
//         }}
//       >
//         {loading ? (
//           <CircularProgress />
//         ) : students.length === 0 ? (
//           <Typography mt={4}>No students found.</Typography>
//         ) : (
//           students.map((student) => (
//             <Card key={student._id} sx={{ width: 300, position: "relative" }}>
//               <CardActionArea onClick={() => handleOpenModal(student)}>
//                 <img
//                   src={student.student_image || `/placeholder.jpg`}
//                   alt={student.name}
//                   height="140"
//                   width="100%"
//                   style={{ objectFit: "cover" }}
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{student.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Age: {student.age}
//                     <br />
//                     Class: {getClassName(student.student_class)}
//                     <br />
//                     Guardian: {student.guardian}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>

//               {/* Edit & Delete */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 8,
//                   right: 8,
//                   display: "flex",
//                   gap: 1,
//                 }}
//               >
//                 <IconButton
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleEdit(student);
//                   }}
//                   color="primary"
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(student._id);
//                   }}
//                   color="error"
//                   disabled={submitting}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Card>
//           ))
//         )}
//       </Box>

//       {/* Modal */}
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

//           {selectedStudent && (
//             <>
//               <CardMedia
//                 component="img"
//                 height="300"
//                 image={selectedStudent.student_image || `/placeholder.jpg`}
//                 sx={{ borderRadius: 2 }}
//               />
//               <Typography variant="h4" mt={2} fontWeight="bold">
//                 {selectedStudent.name}
//               </Typography>
//               <Typography variant="body1" mt={1}>
//                 Age: {selectedStudent.age}
//                 <br />
//                 Gender: {selectedStudent.gender}
//                 <br />
//                 Class: {getClassName(selectedStudent.student_class)}
//                 <br />
//                 Guardian: {selectedStudent.guardian} (
//                 {selectedStudent.guardian_phone})
//                 <br />
//                 Email: {selectedStudent.email}
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
//   CircularProgress,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import CancelIcon from "@mui/icons-material/Cancel";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { studentSchema } from "../../../yupSchema/studentSchema";
// import { baseApi } from "../../../environment";

// export default function Students() {
//   const [classes, setClasses] = React.useState([]);
//   const [students, setStudents] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [selectedStudent, setSelectedStudent] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const fileInputRef = React.useRef(null);

//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [loading, setLoading] = React.useState(false);
//   const [submitting, setSubmitting] = React.useState(false);

//   const handleMessageClose = () => setMessage("");
//   const token = localStorage.getItem("token");

//   // Helper to get class name from populated object
//   const getClassName = (studentClass) => {
//     return studentClass
//       ? `${studentClass.class_text} (${studentClass.class_num})`
//       : "N/A";
//   };

//   // Image selection
//   const addImage = (event) => {
//     const f = event.target.files[0];
//     if (f) {
//       setFile(f);
//       setImageUrl(URL.createObjectURL(f));
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
//     student_class: "",
//     guardian: "",
//     guardian_phone: "",
//     password: "",
//     confirm_password: "",
//   };

//   // Fetch students
//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const sorted = (resp.data.students || [])
//         .slice()
//         .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
//       setStudents(sorted);
//     } catch (err) {
//       console.error("Error fetching students", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch classes for dropdown
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error("Error Fetching Classes.", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleEdit = (student) => {
//     formik.setValues({
//       name: student.name || "",
//       email: student.email || "",
//       age: student.age || "",
//       gender: student.gender || "",
//       student_class: student.student_class?._id || "",
//       guardian: student.guardian || "",
//       guardian_phone: student.guardian_phone || "",
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(student._id);
//     setImageUrl(student.student_image || null);
//     setFile(null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleCancelEdit = (resetForm) => {
//     resetForm();
//     setEditId(null);
//     handleClearFile();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       setSubmitting(true);
//       await axios.delete(`${baseApi}/student/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Student deleted successfully");
//       setMessageType("success");
//       fetchStudents();
//     } catch (e) {
//       console.error(e);
//       setMessage("Delete failed");
//       setMessageType("error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: studentSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a student image");
//         setMessageType("error");
//         return;
//       }

//       const fd = new FormData();
//       if (file) fd.append("student_image", file);
//       Object.entries(values).forEach(([key, val]) => {
//         if (key !== "confirm_password") fd.append(key, val ?? "");
//       });

//       try {
//         setSubmitting(true);
//         if (editId) {
//           await axios.put(`${baseApi}/student/update/${editId}`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Student updated successfully");
//         } else {
//           await axios.post(`${baseApi}/student/register`, fd, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessage("Student registered successfully");
//         }
//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         fetchStudents();
//       } catch (e) {
//         console.error("Student Error:", e.response?.data || e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   const getError = (field) =>
//     formik.touched[field] && formik.errors[field] ? (
//       <Typography color="error" fontSize="small" mt={-1}>
//         {formik.errors[field]}
//       </Typography>
//     ) : null;

//   const handleOpenModal = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedStudent(null);
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
//         sx={{ fontWeight: "bold", mb: 1 }}
//       >
//         Students
//       </Typography>

//       <Typography align="center" sx={{ mb: 3 }}>
//         Total Students: <strong>{students.length}</strong>
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
//           mb: 4,
//         }}
//       >
//         <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
//           <Typography sx={{ minWidth: 140 }}>Add Student Picture</Typography>
//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//             inputProps={{ accept: "image/*" }}
//           />
//           {imageUrl && (
//             <IconButton onClick={handleClearFile} title="Clear image">
//               <CancelIcon />
//             </IconButton>
//           )}
//         </Box>

//         {imageUrl && (
//           <Box mt={1}>
//             <CardMedia component="img" height="200" image={imageUrl} />
//           </Box>
//         )}

//         {/* Input Fields */}
//         {[
//           { name: "name", label: "Name" },
//           { name: "email", label: "Email" },
//           { name: "age", label: "Age" },
//           { name: "guardian", label: "Guardian Name" },
//           { name: "guardian_phone", label: "Guardian Phone" },
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

//         {/* Class */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Class</InputLabel>
//           <Select
//             name="student_class"
//             value={formik.values.student_class}
//             onChange={formik.handleChange}
//             label="Class"
//           >
//             <MenuItem value="">Select Class</MenuItem>
//             {classes.map((x) => (
//               <MenuItem key={x._id} value={x._id}>
//                 {x.class_text} ({x.class_num})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         {getError("student_class")}

//         {/* Gender */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Gender</InputLabel>
//           <Select
//             name="gender"
//             value={formik.values.gender}
//             onChange={formik.handleChange}
//             label="Gender"
//           >
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//         </FormControl>
//         {getError("gender")}

//         <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             disabled={submitting}
//             startIcon={submitting ? <CircularProgress size={18} /> : null}
//           >
//             {editId ? "Update" : "Submit"}
//           </Button>
//           {editId && (
//             <Button
//               variant="outlined"
//               color="inherit"
//               onClick={() => handleCancelEdit(formik.resetForm)}
//               disabled={submitting}
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Box>

//       {/* Student Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 2,
//           mt: 2,
//         }}
//       >
//         {loading ? (
//           <CircularProgress />
//         ) : students.length === 0 ? (
//           <Typography mt={4}>No students found.</Typography>
//         ) : (
//           students.map((student) => (
//             <Card key={student._id} sx={{ width: 300, position: "relative" }}>
//               <CardActionArea onClick={() => handleOpenModal(student)}>
//                 <img
//                   src={student.student_image || `/placeholder.jpg`}
//                   alt={student.name}
//                   height="140"
//                   width="100%"
//                   style={{ objectFit: "cover" }}
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{student.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Age: {student.age}
//                     <br />
//                     Class: {getClassName(student.student_class)}
//                     <br />
//                     Guardian: {student.guardian}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>

//               {/* Edit & Delete */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 8,
//                   right: 8,
//                   display: "flex",
//                   gap: 1,
//                 }}
//               >
//                 <IconButton
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleEdit(student);
//                   }}
//                   color="primary"
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(student._id);
//                   }}
//                   color="error"
//                   disabled={submitting}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Card>
//           ))
//         )}
//       </Box>

//       {/* Modal */}
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

//           {selectedStudent && (
//             <>
//               <CardMedia
//                 component="img"
//                 height="300"
//                 image={selectedStudent.student_image || `/placeholder.jpg`}
//                 sx={{ borderRadius: 2 }}
//               />
//               <Typography variant="h4" mt={2} fontWeight="bold">
//                 {selectedStudent.name}
//               </Typography>
//               <Typography variant="body1" mt={1}>
//                 Age: {selectedStudent.age}
//                 <br />
//                 Gender: {selectedStudent.gender}
//                 <br />
//                 Class: {getClassName(selectedStudent.student_class)}
//                 <br />
//                 Guardian: {selectedStudent.guardian} (
//                 {selectedStudent.guardian_phone})
//                 <br />
//                 Email: {selectedStudent.email}
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
//   CircularProgress,
//   useMediaQuery,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { motion, AnimatePresence } from "framer-motion";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { studentSchema } from "../../../yupSchema/studentSchema";
// import { baseApi } from "../../../environment";

// export default function Students() {
//   const [classes, setClasses] = React.useState([]);
//   const [students, setStudents] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [selectedStudent, setSelectedStudent] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const fileInputRef = React.useRef(null);
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [loading, setLoading] = React.useState(false);
//   const [submitting, setSubmitting] = React.useState(false);
//   const token = localStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const handleMessageClose = () => setMessage("");

//   const getClassName = (studentClass) =>
//     studentClass
//       ? `${studentClass.class_text} (${studentClass.class_num})`
//       : "N/A";

//   const addImage = (e) => {
//     const f = e.target.files[0];
//     if (f) {
//       setFile(f);
//       setImageUrl(URL.createObjectURL(f));
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
//     student_class: "",
//     guardian: "",
//     guardian_phone: "",
//     password: "",
//     confirm_password: "",
//   };

//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(
//         (resp.data.students || []).sort((a, b) =>
//           (a.name || "").localeCompare(b.name || "")
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//   }, []);

//   const handleEdit = (student) => {
//     formik.setValues({
//       name: student.name || "",
//       email: student.email || "",
//       age: student.age || "",
//       gender: student.gender || "",
//       student_class: student.student_class?._id || "",
//       guardian: student.guardian || "",
//       guardian_phone: student.guardian_phone || "",
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(student._id);
//     setImageUrl(student.student_image || null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       setSubmitting(true);
//       await axios.delete(`${baseApi}/student/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Student deleted successfully");
//       setMessageType("success");
//       fetchStudents();
//     } catch (e) {
//       setMessage("Delete failed");
//       setMessageType("error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: studentSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a student image");
//         setMessageType("error");
//         return;
//       }
//       const fd = new FormData();
//       if (file) fd.append("student_image", file);
//       Object.entries(values).forEach(
//         ([k, v]) => k !== "confirm_password" && fd.append(k, v)
//       );

//       try {
//         setSubmitting(true);
//         if (editId) {
//           await axios.put(`${baseApi}/student/update/${editId}`, fd, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setMessage("Student updated successfully");
//         } else {
//           await axios.post(`${baseApi}/student/register`, fd, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setMessage("Student registered successfully");
//         }
//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         fetchStudents();
//       } catch (e) {
//         console.error(e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       } finally {
//         setSubmitting(false);
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
//     <Box
//       sx={{
//         minHeight: "100vh",
//         py: 5,
//         background: "linear-gradient(135deg, #111827, #1f2937)",
//         color: "#fff",
//       }}
//     >
//       {message && (
//         <MessageSnackbar
//           message={message}
//           type={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}

//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Typography
//           variant="h3"
//           align="center"
//           sx={{
//             fontWeight: "bold",
//             mb: 1,
//             color: "#38bdf8",
//             textShadow: "0 2px 10px rgba(56,189,248,0.4)",
//           }}
//         >
//           Students
//         </Typography>

//         <Typography align="center" sx={{ mb: 3, color: "#f1f5f9" }}>
//           Total Students: <strong>{students.length}</strong>
//         </Typography>
//       </motion.div>

//       {/* Form */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Box
//           component="form"
//           onSubmit={formik.handleSubmit}
//           sx={{
//             background: "#1f2937",
//             borderRadius: 3,
//             p: 3,
//             width: "90%",
//             maxWidth: 600,
//             mx: "auto",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//           }}
//         >
//           <Typography variant="h6" mb={2} color="#38bdf8">
//             {editId ? "Edit Student" : "Add New Student"}
//           </Typography>

//           <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
//             <TextField
//               type="file"
//               inputRef={fileInputRef}
//               onChange={addImage}
//               fullWidth
//               inputProps={{ accept: "image/*" }}
//               sx={{
//                 bgcolor: "#f9fafb",
//                 borderRadius: 1,
//               }}
//             />
//             {imageUrl && (
//               <IconButton onClick={handleClearFile}>
//                 <CancelIcon sx={{ color: "#f87171" }} />
//               </IconButton>
//             )}
//           </Box>

//           {imageUrl && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={imageUrl}
//                 sx={{ borderRadius: 2, mb: 2 }}
//               />
//             </motion.div>
//           )}

//           {[
//             { name: "name", label: "Name" },
//             { name: "email", label: "Email" },
//             { name: "age", label: "Age" },
//             { name: "guardian", label: "Guardian Name" },
//             { name: "guardian_phone", label: "Guardian Phone" },
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
//                 sx={{
//                   input: { color: "#fff" },
//                   "& .MuiInputLabel-root": { color: "#cbd5e1" },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#334155" },
//                     "&:hover fieldset": { borderColor: "#38bdf8" },
//                   },
//                 }}
//               />
//               {getError(name)}
//             </React.Fragment>
//           ))}

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Class</InputLabel>
//             <Select
//               name="student_class"
//               value={formik.values.student_class}
//               onChange={formik.handleChange}
//               sx={{ color: "#fff" }}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((x) => (
//                 <MenuItem key={x._id} value={x._id}>
//                   {x.class_text} ({x.class_num})
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           {getError("student_class")}

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Gender</InputLabel>
//             <Select
//               name="gender"
//               value={formik.values.gender}
//               onChange={formik.handleChange}
//               sx={{ color: "#fff" }}
//             >
//               <MenuItem value="male">Male</MenuItem>
//               <MenuItem value="female">Female</MenuItem>
//               <MenuItem value="other">Other</MenuItem>
//             </Select>
//           </FormControl>
//           {getError("gender")}

//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={submitting}
//               startIcon={submitting ? <CircularProgress size={18} /> : null}
//               sx={{
//                 bgcolor: "#38bdf8",
//                 "&:hover": { bgcolor: "#0ea5e9" },
//                 borderRadius: 2,
//               }}
//             >
//               {editId ? "Update" : "Submit"}
//             </Button>
//             {editId && (
//               <Button
//                 variant="outlined"
//                 color="inherit"
//                 onClick={() => {
//                   formik.resetForm();
//                   setEditId(null);
//                   handleClearFile();
//                 }}
//               >
//                 Cancel
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </motion.div>

//       {/* Student Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 3,
//           mt: 4,
//           px: 2,
//         }}
//       >
//         {loading ? (
//           <CircularProgress color="info" />
//         ) : (
//           <AnimatePresence>
//             {students.map((student) => (
//               <motion.div
//                 key={student._id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card
//                   sx={{
//                     width: isMobile ? 280 : 300,
//                     background: "#1e293b",
//                     color: "#fff",
//                     borderRadius: 3,
//                     boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
//                     overflow: "hidden",
//                     position: "relative",
//                   }}
//                 >
//                   <CardActionArea onClick={() => setModalOpen(student)}>
//                     <img
//                       src={student.student_image || `/placeholder.jpg`}
//                       alt={student.name}
//                       height="180"
//                       width="100%"
//                       style={{ objectFit: "cover" }}
//                     />
//                     <CardContent>
//                       <Typography variant="h6">{student.name}</Typography>
//                       <Typography variant="body2" color="#cbd5e1">
//                         Age: {student.age}
//                         <br />
//                         Class: {getClassName(student.student_class)}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>

//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: 8,
//                       right: 8,
//                       display: "flex",
//                       gap: 1,
//                     }}
//                   >
//                     <IconButton
//                       onClick={() => handleEdit(student)}
//                       color="primary"
//                       size="small"
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       onClick={() => handleDelete(student._id)}
//                       color="error"
//                       size="small"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </Box>
//                 </Card>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         )}
//       </Box>
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
//   CircularProgress,
//   useMediaQuery,
// } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { motion, AnimatePresence } from "framer-motion";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import { studentSchema } from "../../../yupSchema/studentSchema";
// import { baseApi } from "../../../environment";

// export default function Students() {
//   const [classes, setClasses] = React.useState([]);
//   const [students, setStudents] = React.useState([]);
//   const [file, setFile] = React.useState(null);
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [editId, setEditId] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(null); // null or student object
//   const fileInputRef = React.useRef(null);
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [loading, setLoading] = React.useState(false);
//   const [submitting, setSubmitting] = React.useState(false);
//   const token = localStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const handleMessageClose = () => setMessage("");

//   const getClassName = (studentClass) =>
//     studentClass
//       ? `${studentClass.class_text} (${studentClass.class_num})`
//       : "N/A";

//   const addImage = (e) => {
//     const f = e.target.files[0];
//     if (f) {
//       setFile(f);
//       setImageUrl(URL.createObjectURL(f));
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
//     student_class: "",
//     guardian: "",
//     guardian_phone: "",
//     password: "",
//     confirm_password: "",
//   };

//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(
//         (resp.data.students || []).sort((a, b) =>
//           (a.name || "").localeCompare(b.name || "")
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//   }, []);

//   const handleEdit = (student) => {
//     formik.setValues({
//       name: student.name || "",
//       email: student.email || "",
//       age: student.age || "",
//       gender: student.gender || "",
//       student_class: student.student_class?._id || "",
//       guardian: student.guardian || "",
//       guardian_phone: student.guardian_phone || "",
//       password: "",
//       confirm_password: "",
//     });
//     setEditId(student._id);
//     setImageUrl(student.student_image || null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       setSubmitting(true);
//       await axios.delete(`${baseApi}/student/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Student deleted successfully");
//       setMessageType("success");
//       fetchStudents();
//     } catch (e) {
//       setMessage("Delete failed");
//       setMessageType("error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: studentSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (!file && !editId) {
//         setMessage("Please add a student image");
//         setMessageType("error");
//         return;
//       }
//       const fd = new FormData();
//       if (file) fd.append("student_image", file);
//       Object.entries(values).forEach(
//         ([k, v]) => k !== "confirm_password" && fd.append(k, v)
//       );

//       try {
//         setSubmitting(true);
//         if (editId) {
//           await axios.put(`${baseApi}/student/update/${editId}`, fd, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setMessage("Student updated successfully");
//         } else {
//           await axios.post(`${baseApi}/student/register`, fd, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setMessage("Student registered successfully");
//         }
//         setMessageType("success");
//         handleClearFile();
//         resetForm();
//         setEditId(null);
//         fetchStudents();
//       } catch (e) {
//         console.error(e);
//         setMessage(e.response?.data?.message || "Operation failed");
//         setMessageType("error");
//       } finally {
//         setSubmitting(false);
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
//     <Box
//       sx={{
//         minHeight: "100vh",
//         py: 5,
//         background: "linear-gradient(135deg, #111827, #1f2937)",
//         color: "#fff",
//       }}
//     >
//       {message && (
//         <MessageSnackbar
//           message={message}
//           type={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}

//       {/* Title */}
//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Typography
//           variant="h3"
//           align="center"
//           sx={{
//             fontWeight: "bold",
//             mb: 1,
//             color: "#38bdf8",
//             textShadow: "0 2px 10px rgba(56,189,248,0.4)",
//           }}
//         >
//           Students
//         </Typography>
//         <Typography align="center" sx={{ mb: 3, color: "#f1f5f9" }}>
//           Total Students: <strong>{students.length}</strong>
//         </Typography>
//       </motion.div>

//       {/* Form */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Box
//           component="form"
//           onSubmit={formik.handleSubmit}
//           sx={{
//             background: "#1f2937",
//             borderRadius: 3,
//             p: 3,
//             width: "90%",
//             maxWidth: 600,
//             mx: "auto",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//           }}
//         >
//           <Typography variant="h6" mb={2} color="#38bdf8">
//             {editId ? "Edit Student" : "Add New Student"}
//           </Typography>

//           <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
//             <TextField
//               type="file"
//               inputRef={fileInputRef}
//               onChange={addImage}
//               fullWidth
//               inputProps={{ accept: "image/*" }}
//               sx={{ bgcolor: "#f9fafb", borderRadius: 1 }}
//             />
//             {imageUrl && (
//               <IconButton onClick={handleClearFile}>
//                 <CancelIcon sx={{ color: "#f87171" }} />
//               </IconButton>
//             )}
//           </Box>

//           {imageUrl && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={imageUrl}
//                 sx={{ borderRadius: 2, mb: 2 }}
//               />
//             </motion.div>
//           )}

//           {/* Form Fields */}
//           {[
//             { name: "name", label: "Name" },
//             { name: "email", label: "Email" },
//             { name: "age", label: "Age" },
//             { name: "guardian", label: "Guardian Name" },
//             { name: "guardian_phone", label: "Guardian Phone" },
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
//                 sx={{
//                   input: { color: "#fff" },
//                   "& .MuiInputLabel-root": { color: "#cbd5e1" },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#334155" },
//                     "&:hover fieldset": { borderColor: "#38bdf8" },
//                   },
//                 }}
//               />
//               {getError(name)}
//             </React.Fragment>
//           ))}

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Class</InputLabel>
//             <Select
//               name="student_class"
//               value={formik.values.student_class}
//               onChange={formik.handleChange}
//               sx={{ color: "#fff" }}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((x) => (
//                 <MenuItem key={x._id} value={x._id}>
//                   {x.class_text} ({x.class_num})
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           {getError("student_class")}

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Gender</InputLabel>
//             <Select
//               name="gender"
//               value={formik.values.gender}
//               onChange={formik.handleChange}
//               sx={{ color: "#fff" }}
//             >
//               <MenuItem value="male">Male</MenuItem>
//               <MenuItem value="female">Female</MenuItem>
//               <MenuItem value="other">Other</MenuItem>
//             </Select>
//           </FormControl>
//           {getError("gender")}

//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={submitting}
//               startIcon={submitting ? <CircularProgress size={18} /> : null}
//               sx={{
//                 bgcolor: "#38bdf8",
//                 "&:hover": { bgcolor: "#0ea5e9" },
//                 borderRadius: 2,
//               }}
//             >
//               {editId ? "Update" : "Submit"}
//             </Button>
//             {editId && (
//               <Button
//                 variant="outlined"
//                 color="inherit"
//                 onClick={() => {
//                   formik.resetForm();
//                   setEditId(null);
//                   handleClearFile();
//                 }}
//               >
//                 Cancel
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </motion.div>

//       {/* Student Cards */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 3,
//           mt: 4,
//           px: 2,
//         }}
//       >
//         {loading ? (
//           <CircularProgress color="info" />
//         ) : (
//           <AnimatePresence>
//             {students.map((student) => (
//               <motion.div
//                 key={student._id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//               >
//                 <Card sx={{ maxWidth: 200, bgcolor: "#111827", color: "#fff" }}>
//                   <CardActionArea onClick={() => setModalOpen(student)}>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={student.student_image || "/placeholder.jpg"}
//                     />
//                     <CardContent>
//                       <Typography gutterBottom variant="h6">
//                         {student.name}
//                       </Typography>
//                       <Typography fontSize="small">
//                         Class: {getClassName(student.student_class)}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-around",
//                       mb: 1,
//                     }}
//                   >
//                     <IconButton onClick={() => handleEdit(student)}>
//                       <EditIcon sx={{ color: "#38bdf8" }} />
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(student._id)}>
//                       <DeleteIcon sx={{ color: "#f87171" }} />
//                     </IconButton>
//                   </Box>
//                 </Card>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         )}
//       </Box>

//       {/* Modal */}
//       <Modal
//         open={!!modalOpen}
//         onClose={() => setModalOpen(null)}
//         sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
//       >
//         <Box
//           sx={{
//             bgcolor: "#1f2937",
//             p: 3,
//             borderRadius: 3,
//             maxWidth: 400,
//             width: "90%",
//             color: "#fff",
//             position: "relative",
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           {modalOpen ? (
//             <>
//               <IconButton
//                 onClick={() => setModalOpen(null)}
//                 sx={{
//                   position: "absolute",
//                   top: 8,
//                   right: 8,
//                   color: "#f87171",
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>

//               <Box
//                 sx={{
//                   width: "100%",
//                   mb: 2,
//                   overflow: "hidden",
//                   borderRadius: 2,
//                 }}
//               >
//                 <img
//                   src={modalOpen.student_image || "/placeholder.jpg"}
//                   alt={modalOpen.name}
//                   style={{ width: "100%", cursor: "zoom-in" }}
//                   onClick={(e) => {
//                     const src = e.target.src;
//                     const w = window.open("");
//                     w.document.write(`<img src="${src}" style="width:100%">`);
//                   }}
//                 />
//               </Box>

//               <Typography variant="h6">{modalOpen.name}</Typography>
//               <Typography>Age: {modalOpen.age}</Typography>
//               <Typography>
//                 Class: {getClassName(modalOpen.student_class)}
//               </Typography>
//               <Typography>Gender: {modalOpen.gender}</Typography>
//               <Typography>Guardian: {modalOpen.guardian}</Typography>
//               <Typography>
//                 Guardian Phone: {modalOpen.guardian_phone}
//               </Typography>
//               <Typography>Email: {modalOpen.email}</Typography>
//             </>
//           ) : null}
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
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion, AnimatePresence } from "framer-motion";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { studentSchema } from "../../../yupSchema/studentSchema";
import { baseApi } from "../../../environment";

export default function Students() {
  const [classes, setClasses] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [editId, setEditId] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false); // toggle form
  const fileInputRef = React.useRef(null);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const token = localStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleMessageClose = () => setMessage("");

  const getClassName = (studentClass) =>
    studentClass
      ? `${studentClass.class_text} (${studentClass.class_num})`
      : "N/A";

  const addImage = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setImageUrl(URL.createObjectURL(f));
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
    student_class: "",
    guardian: "",
    guardian_phone: "",
    password: "",
    confirm_password: "",
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(
        (resp.data.students || []).sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        )
      );
    } catch (err) {
      console.error(err);
      setMessage("Failed to load students");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const resp = await axios.get(`${baseApi}/class/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(resp.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const handleEdit = (student) => {
    formik.setValues({
      name: student.name || "",
      email: student.email || "",
      age: student.age || "",
      gender: student.gender || "",
      student_class: student.student_class?._id || "",
      guardian: student.guardian || "",
      guardian_phone: student.guardian_phone || "",
      password: "",
      confirm_password: "",
    });
    setEditId(student._id);
    setImageUrl(student.student_image || null);
    setShowForm(true); // open form for edit
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    try {
      setSubmitting(true);
      await axios.delete(`${baseApi}/student/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Student deleted successfully");
      setMessageType("success");
      fetchStudents();
    } catch (e) {
      setMessage("Delete failed");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: studentSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!file && !editId) {
        setMessage("Please add a student image");
        setMessageType("error");
        return;
      }
      const fd = new FormData();
      if (file) fd.append("student_image", file);
      Object.entries(values).forEach(
        ([k, v]) => k !== "confirm_password" && fd.append(k, v)
      );

      try {
        setSubmitting(true);
        if (editId) {
          await axios.put(`${baseApi}/student/update/${editId}`, fd, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMessage("Student updated successfully");
        } else {
          await axios.post(`${baseApi}/student/register`, fd, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMessage("Student registered successfully");
          setShowForm(false); // close form after adding new
        }
        setMessageType("success");
        handleClearFile();
        resetForm();
        setEditId(null);
        fetchStudents();
      } catch (e) {
        console.error(e);
        setMessage(e.response?.data?.message || "Operation failed");
        setMessageType("error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const getError = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <Typography color="error" fontSize="small" mt={-1}>
        {formik.errors[field]}
      </Typography>
    ) : null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        background: "linear-gradient(135deg, #111827, #1f2937)",
        color: "#fff",
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          type={messageType}
          handleClose={handleMessageClose}
        />
      )}

      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: "#38bdf8",
            textShadow: "0 2px 10px rgba(56,189,248,0.4)",
          }}
        >
          Students
        </Typography>
        <Typography align="center" sx={{ mb: 3, color: "#f1f5f9" }}>
          Total Students: <strong>{students.length}</strong>
        </Typography>
      </motion.div>

      {/* Toggle Button for Form */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setShowForm(!showForm)}
          sx={{ bgcolor: "#38bdf8", "&:hover": { bgcolor: "#0ea5e9" } }}
        >
          {showForm ? "Close Form" : "Add New Student"}
        </Button>
      </Box>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                background: "#1f2937",
                borderRadius: 3,
                p: 3,
                width: "90%",
                maxWidth: 600,
                mx: "auto",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <Typography variant="h6" mb={2} color="#38bdf8">
                {editId ? "Edit Student" : "Add New Student"}
              </Typography>

              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
              >
                <TextField
                  type="file"
                  inputRef={fileInputRef}
                  onChange={addImage}
                  fullWidth
                  inputProps={{ accept: "image/*" }}
                  sx={{ bgcolor: "#f9fafb", borderRadius: 1 }}
                />
                {imageUrl && (
                  <IconButton onClick={handleClearFile}>
                    <CancelIcon sx={{ color: "#f87171" }} />
                  </IconButton>
                )}
              </Box>

              {imageUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    sx={{ borderRadius: 2, mb: 2 }}
                  />
                </motion.div>
              )}

              {/* Form Fields */}
              {[
                { name: "name", label: "Name" },
                { name: "email", label: "Email" },
                { name: "age", label: "Age" },
                { name: "guardian", label: "Guardian Name" },
                { name: "guardian_phone", label: "Guardian Phone" },
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
                    sx={{
                      input: { color: "#fff" },
                      "& .MuiInputLabel-root": { color: "#cbd5e1" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#334155" },
                        "&:hover fieldset": { borderColor: "#38bdf8" },
                      },
                    }}
                  />
                  {getError(name)}
                </React.Fragment>
              ))}

              <FormControl fullWidth margin="normal">
                <InputLabel>Class</InputLabel>
                <Select
                  name="student_class"
                  value={formik.values.student_class}
                  onChange={formik.handleChange}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="">Select Class</MenuItem>
                  {classes.map((x) => (
                    <MenuItem key={x._id} value={x._id}>
                      {x.class_text} ({x.class_num})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {getError("student_class")}

              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              {getError("gender")}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={submitting}
                  startIcon={submitting ? <CircularProgress size={18} /> : null}
                  sx={{
                    bgcolor: "#38bdf8",
                    "&:hover": { bgcolor: "#0ea5e9" },
                    borderRadius: 2,
                  }}
                >
                  {editId ? "Update" : "Submit"}
                </Button>
                {editId && (
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      formik.resetForm();
                      setEditId(null);
                      handleClearFile();
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mt: 4,
          px: 2,
        }}
      >
        {loading ? (
          <CircularProgress color="info" />
        ) : (
          <AnimatePresence>
            {students.map((student) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card sx={{ maxWidth: 200, bgcolor: "#111827", color: "#fff" }}>
                  <CardActionArea onClick={() => setModalOpen(student)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={student.student_image || "/placeholder.jpg"}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {student.name}
                      </Typography>
                      <Typography fontSize="small">
                        Class: {getClassName(student.student_class)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mb: 1,
                    }}
                  >
                    <IconButton onClick={() => handleEdit(student)}>
                      <EditIcon sx={{ color: "#38bdf8" }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(student._id)}>
                      <DeleteIcon sx={{ color: "#f87171" }} />
                    </IconButton>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </Box>

      {/* Modal */}
      <Modal
        open={!!modalOpen}
        onClose={() => setModalOpen(null)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "#1f2937",
            p: 3,
            borderRadius: 3,
            maxWidth: 400,
            width: "90%",
            color: "#fff",
            position: "relative",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {modalOpen && (
            <>
              <IconButton
                onClick={() => setModalOpen(null)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "#f87171",
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                sx={{
                  width: "100%",
                  mb: 2,
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <img
                  src={modalOpen.student_image || "/placeholder.jpg"}
                  alt={modalOpen.name}
                  style={{ width: "100%", cursor: "zoom-in" }}
                  onClick={(e) => {
                    const src = e.target.src;
                    const w = window.open("");
                    w.document.write(`<img src="${src}" style="width:100%">`);
                  }}
                />
              </Box>

              <Typography variant="h6">{modalOpen.name}</Typography>
              <Typography>Age: {modalOpen.age}</Typography>
              <Typography>
                Class: {getClassName(modalOpen.student_class)}
              </Typography>
              <Typography>Gender: {modalOpen.gender}</Typography>
              <Typography>Guardian: {modalOpen.guardian}</Typography>
              <Typography>
                Guardian Phone: {modalOpen.guardian_phone}
              </Typography>
              <Typography>Email: {modalOpen.email}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
















