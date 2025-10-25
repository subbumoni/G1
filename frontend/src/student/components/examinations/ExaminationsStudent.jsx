// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   IconButton,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { baseApi } from "../../../environment";

// export default function ExaminationsStudent() {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [examinations, setExaminations] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return {
//       headers: { Authorization: `Bearer ${token}` },
//     };
//   };

//   const fetchSubjects = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/subject/all`, getAuthHeader());
//         setSubjects(resp.data.data || []);
//         console.log("RESP",resp)
      
//     } catch (error) {
//       console.error("❌ Error fetching subjects", error);
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, getAuthHeader());
//       setClasses(resp.data.data || []);
      
//     } catch (error) {
//       console.error("❌ Error fetching classes", error);
//     }
//   };

//   const fetchExaminations = async (classId) => {
//     if (!classId) return;
//     try {
//       setLoading(true);
//       const resp = await axios.get(
//         `${baseApi}/examination/class/${classId}`,
//         getAuthHeader()
//       );
      
//       setExaminations(resp.data.examinations || []);
      
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("❌ Error fetching examinations", error);
//     }
//   };

//   // const handleDelete = async (examId) => {
//   //   if (!window.confirm("Are you sure you want to delete this exam?")) return;
//   //   try {
//   //     await axios.delete(`${baseApi}/examination/${examId}`, getAuthHeader());
//   //     alert("Exam deleted successfully");
//   //     fetchExaminations(selectedClass);
//   //   } catch (error) {
//   //     console.error("❌ Error deleting exam", error);
//   //   }
//   // };

//   useEffect(() => {
//     fetchSubjects();
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (classes.length > 0) {
//       setSelectedClass(classes[0]._id);
//     }
//   }, [classes]);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchExaminations(selectedClass);
//     }
//   }, [selectedClass]);

//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <Typography
//         variant="h5"
//         sx={{
//           textAlign: "center",
//           mb: 3,
//           fontWeight: "bold",
//           color: "#1976d2",
//         }}
//       >
//         🧾 Examination Details
//       </Typography>

//       {/* Class Dropdown */}
//       <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//         <FormControl sx={{ minWidth: 250 }}>
//           <InputLabel>Select Class</InputLabel>
//           <Select
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//             sx={{ color: "black", backgroundColor: "white" }}
//           >
//             {classes.length > 0 ? (
//               classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id} sx={{ color: "black" }}>
//                   {cls.class_num} - {cls.class_text || "N/A"}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem disabled>No classes available</MenuItem>
//             )}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Exam Table */}
//       <Paper elevation={3} sx={{ p: 3, borderRadius: "12px" }}>
//         {loading ? (
//           <Box sx={{ textAlign: "center", my: 3 }}>
//             <CircularProgress />
//           </Box>
//         ) : examinations.length > 0 ? (
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableCell>
//                   <b>Exam Name</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Subject</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Date</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Start Time</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>End Time</b>
//                 </TableCell>
                
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {examinations.map((exam) => (
//                 <TableRow key={exam._id}>
//                   <TableCell>{exam.exam_name}</TableCell>
//                   <TableCell>{exam.subject?.subject_name || "N/A"}</TableCell>
//                   <TableCell>
//                     {new Date(exam.exam_date).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>{exam.start_time}</TableCell>
//                   <TableCell>{exam.end_time}</TableCell>
//                   <TableCell align="center">
//                     {/* <IconButton
//                       color="error"
//                       onClick={() => handleDelete(exam._id)}
//                     >
//                       <DeleteIcon />
//                     </IconButton> */}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         ) : (
//           <Typography sx={{ textAlign: "center", my: 3 }}>
//             No examinations found for this class.
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
// import { baseApi } from "../../../environment";

// export default function ExaminationsStudent() {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [examinations, setExaminations] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   const fetchSubjects = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/subject/all`, getAuthHeader());
//       setSubjects(resp.data.data || []);
//     } catch (error) {
//       console.error("❌ Error fetching subjects", error);
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, getAuthHeader());
//       setClasses(resp.data.data || []);
//     } catch (error) {
//       console.error("❌ Error fetching classes", error);
//     }
//   };

//   const fetchExaminations = async (classId) => {
//     if (!classId) return;
//     try {
//       setLoading(true);
//       const resp = await axios.get(
//         `${baseApi}/examination/class/${classId}`,
//         getAuthHeader()
//       );
//       setExaminations(resp.data.examinations || []);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("❌ Error fetching examinations", error);
//     }
//   };

//   useEffect(() => {
//     fetchSubjects();
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (classes.length > 0) {
//       setSelectedClass(classes[0]._id);
//     }
//   }, [classes]);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchExaminations(selectedClass);
//     }
//   }, [selectedClass]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
//   };

//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <Typography
//         variant="h5"
//         sx={{
//           textAlign: "center",
//           mb: 3,
//           fontWeight: "bold",
//           color: "#1976d2",
//         }}
//       >
//         🧾 Examination Details
//       </Typography>

//       {/* Class Dropdown */}
//       <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//         <FormControl sx={{ minWidth: 250 }}>
//           <InputLabel>Select Class</InputLabel>
//           <Select
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//             sx={{ color: "black", backgroundColor: "white" }}
//           >
//             {classes.length > 0 ? (
//               classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id} sx={{ color: "black" }}>
//                   {cls.class_num} - {cls.class_text || "N/A"}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem disabled>No classes available</MenuItem>
//             )}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Exam Table */}
//       <Paper elevation={3} sx={{ p: 3, borderRadius: "12px" }}>
//         {loading ? (
//           <Box sx={{ textAlign: "center", my: 3 }}>
//             <CircularProgress />
//           </Box>
//         ) : examinations.length > 0 ? (
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableCell>
//                   <b>Exam Type</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Exam Date</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Subject</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {examinations.map((exam) => (
//                 <TableRow key={exam._id}>
//                   <TableCell>{exam.examType || "N/A"}</TableCell>
//                   <TableCell>{formatDate(exam.examDate)}</TableCell>
//                   <TableCell>{exam.subject?.subject_name || "N/A"}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         ) : (
//           <Typography sx={{ textAlign: "center", my: 3 }}>
//             No examinations found for this class.
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
// import { baseApi } from "../../../environment";

// export default function ExaminationsStudent() {
//   const [classes, setClasses] = useState([]);
//   const [examinations, setExaminations] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   // const fetchClasses = async () => {
//   //   try {
//   //     const resp = await axios.get(`${baseApi}/class/all`, getAuthHeader());
//   //     setClasses(resp.data.data || []);
//   //   } catch (error) {
//   //     console.error("❌ Error fetching classes", error);
//   //   }
//   // };
//   // Fetch classes for dropdown
//    const token = localStorage.getItem("token");
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Expect resp.data.data = [{ _id, class_text, class_num }]
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error("Error Fetching Classes.", e);
//     }
//   };

//   const fetchExaminations = async (classId) => {
//     if (!classId) return;
//     try {
//       setLoading(true);
//       const resp = await axios.get(
//         `${baseApi}/examination/class/${classId}`,
//         getAuthHeader()
//       );
//       setExaminations(resp.data.examinations || []);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("❌ Error fetching examinations", error);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (classes.length > 0) {
//       setSelectedClass(classes[0]._id);
//     }
//   }, [classes]);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchExaminations(selectedClass);
//     }
//   }, [selectedClass]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
//   };

//   return (
//     <Box
//       sx={{
//         padding: "2rem",
//         backgroundColor: "#f9fafc",
//         minHeight: "100vh",
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           maxWidth: "900px",
//           mx: "auto",
//           p: 4,
//           borderRadius: "16px",
//           background: "linear-gradient(145deg, #ffffff, #f0f3f8)",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             textAlign: "center",
//             mb: 3,
//             fontWeight: "bold",
//             color: "#1976d2",
//             letterSpacing: "0.5px",
//           }}
//         >
//           🧾 Examination Details
//         </Typography>

//         {/* Class Dropdown */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             mb: 3,
//           }}
//         >
//           <FormControl sx={{ minWidth: 280 }}>
//             <InputLabel>Select Class</InputLabel>
//             <Select
//               value={selectedClass}
//               onChange={(e) => setSelectedClass(e.target.value)}
//               sx={{
//                 backgroundColor: "#fff",
//                 borderRadius: "10px",
//                 "&:hover": { backgroundColor: "#f1f4f9" },
//               }}
//             >
//               {classes.length > 0 ? (
//                 classes.map((cls) => (
//                   <MenuItem key={cls._id} value={cls._id}>
//                     {cls.class_num} - {cls.class_text || "N/A"}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No classes available</MenuItem>
//               )}
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Exam Table */}
//         {loading ? (
//           <Box sx={{ textAlign: "center", my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : examinations.length > 0 ? (
//           <Table
//             sx={{
//               borderCollapse: "separate",
//               borderSpacing: "0 10px",
//             }}
//           >
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "#1976d2",
//                     color: "white",
//                     fontWeight: "bold",
//                     borderTopLeftRadius: "8px",
//                   }}
//                 >
//                   Exam Type
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "#1976d2",
//                     color: "white",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Exam Date
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "#1976d2",
//                     color: "white",
//                     fontWeight: "bold",
//                     borderTopRightRadius: "8px",
//                   }}
//                 >
//                   Subject
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {examinations.map((exam) => (
//                 <TableRow
//                   key={exam._id}
//                   sx={{
//                     backgroundColor: "#ffffff",
//                     "&:hover": {
//                       backgroundColor: "#e8f0fe",
//                       transform: "scale(1.01)",
//                       transition: "0.3s ease",
//                     },
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//                   }}
//                 >
//                   <TableCell sx={{ fontWeight: 600, color: "#333" }}>
//                     {exam.examType || "N/A"}
//                   </TableCell>
//                   <TableCell sx={{ color: "#555" }}>
//                     {formatDate(exam.examDate)}
//                   </TableCell>
//                   <TableCell sx={{ color: "#555" }}>
//                     {exam.subject?.subject_name || "N/A"}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         ) : (
//           <Typography
//             sx={{
//               textAlign: "center",
//               my: 3,
//               color: "#888",
//               fontStyle: "italic",
//             }}
//           >
//             No examinations found for this class.
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }



















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   useMediaQuery,
// } from "@mui/material";
// import { baseApi } from "../../../environment";

// export default function ExaminationsStudent() {
//   const [classes, setClasses] = useState([]);
//   const [examinations, setExaminations] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isMobile = useMediaQuery("(max-width:600px)");

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   const fetchClasses = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching classes:", e);
//     }
//   };

//   const fetchExaminations = async (classId) => {
//     if (!classId) return;
//     try {
//       setLoading(true);
//       const resp = await axios.get(
//         `${baseApi}/examination/class/${classId}`,
//         getAuthHeader()
//       );
//       setExaminations(resp.data.examinations || []);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("Error fetching examinations:", error);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (classes.length > 0) {
//       setSelectedClass(classes[0]._id);
//     }
//   }, [classes]);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchExaminations(selectedClass);
//     }
//   }, [selectedClass]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
//   };

//   return (
//     <Box
//       sx={{
//         padding: isMobile ? "1rem" : "2rem",
//         backgroundColor: "#f9fafc",
//         minHeight: "100vh",
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           maxWidth: "1000px",
//           mx: "auto",
//           p: isMobile ? 2 : 4,
//           borderRadius: "16px",
//           background: "linear-gradient(145deg, #ffffff, #f0f3f8)",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Typography
//           variant={isMobile ? "h6" : "h5"}
//           sx={{
//             textAlign: "center",
//             mb: 3,
//             fontWeight: "bold",
//             color: "#1976d2",
//             letterSpacing: "0.5px",
//           }}
//         >
//           🧾 Examination Details
//         </Typography>

//         {/* Class Dropdown */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             mb: 3,
//           }}
//         >
//           <FormControl sx={{ minWidth: isMobile ? "100%" : 280 }}>
//             <InputLabel>Select Class</InputLabel>
//             <Select
//               value={selectedClass}
//               onChange={(e) => setSelectedClass(e.target.value)}
//               sx={{
//                 backgroundColor: "#fff",
//                 borderRadius: "10px",
//                 "&:hover": { backgroundColor: "#f1f4f9" },
//               }}
//             >
//               {classes.length > 0 ? (
//                 classes.map((cls) => (
//                   <MenuItem key={cls._id} value={cls._id}>
//                     {cls.class_num} - {cls.class_text || "N/A"}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No classes available</MenuItem>
//               )}
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Exam Table */}
//         {loading ? (
//           <Box sx={{ textAlign: "center", my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : examinations.length > 0 ? (
//           <Box sx={{ overflowX: "auto" }}>
//             <Table
//               sx={{
//                 borderCollapse: "separate",
//                 borderSpacing: "0 10px",
//                 minWidth: "600px",
//               }}
//             >
//               <TableHead>
//                 <TableRow>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "white",
//                       fontWeight: "bold",
//                       borderTopLeftRadius: "8px",
//                     }}
//                   >
//                     Exam Type
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "white",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Exam Date
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "white",
//                       fontWeight: "bold",
//                       borderTopRightRadius: "8px",
//                     }}
//                   >
//                     Subject
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {examinations.map((exam) => (
//                   <TableRow
//                     key={exam._id}
//                     sx={{
//                       backgroundColor: "#ffffff",
//                       "&:hover": {
//                         backgroundColor: "#e8f0fe",
//                         transform: "scale(1.01)",
//                         transition: "0.3s ease",
//                       },
//                       boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//                     }}
//                   >
//                     <TableCell sx={{ fontWeight: 600, color: "#333" }}>
//                       {exam.examType || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ color: "#555" }}>
//                       {formatDate(exam.examDate)}
//                     </TableCell>
//                     <TableCell sx={{ color: "#555" }}>
//                       {exam.subject?.subject_name || "N/A"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         ) : (
//           <Typography
//             sx={{
//               textAlign: "center",
//               my: 3,
//               color: "#888",
//               fontStyle: "italic",
//             }}
//           >
//             No examinations found for this class.
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }























// // ExaminationsStudent.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   useMediaQuery,
// } from "@mui/material";
// import { baseApi } from "../../../environment";

// export default function ExaminationsStudent() {
//   const [classes, setClasses] = useState([]);
//   const [examinations, setExaminations] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:900px)");

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   const fetchClasses = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching classes:", e);
//     }
//   };

//   const fetchExaminations = async (classId) => {
//     if (!classId) return;
//     try {
//       setLoading(true);
//       const resp = await axios.get(
//         `${baseApi}/examination/class/${classId}`,
//         getAuthHeader()
//       );
//       setExaminations(resp.data.examinations || []);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("Error fetching examinations:", error);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (classes.length > 0) setSelectedClass(classes[0]._id);
//   }, [classes]);

//   useEffect(() => {
//     if (selectedClass) fetchExaminations(selectedClass);
//   }, [selectedClass]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
//   };

//   return (
//     <Box
//       sx={{
//         p: isMobile ? 2 : isTablet ? 3 : 4,
//         minHeight: "100vh",
//         backgroundColor: "#f9fafc",
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           maxWidth: "1000px",
//           mx: "auto",
//           p: isMobile ? 2 : 4,
//           borderRadius: "16px",
//           background: "linear-gradient(145deg, #ffffff, #f0f3f8)",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Typography
//           variant={isMobile ? "h6" : "h5"}
//           sx={{
//             textAlign: "center",
//             mb: 3,
//             fontWeight: "bold",
//             color: "#1976d2",
//           }}
//         >
//           🧾 Examination Details
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//           <FormControl sx={{ minWidth: isMobile ? "100%" : 280 }}>
//             <InputLabel>Select Class</InputLabel>
//             <Select
//               value={selectedClass}
//               onChange={(e) => setSelectedClass(e.target.value)}
//               sx={{
//                 backgroundColor: "#fff",
//                 borderRadius: "10px",
//                 "&:hover": { backgroundColor: "#f1f4f9" },
//               }}
//             >
//               {classes.length > 0 ? (
//                 classes.map((cls) => (
//                   <MenuItem key={cls._id} value={cls._id}>
//                     {cls.class_num} - {cls.class_text || "N/A"}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No classes available</MenuItem>
//               )}
//             </Select>
//           </FormControl>
//         </Box>

//         {loading ? (
//           <Box sx={{ textAlign: "center", my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : examinations.length > 0 ? (
//           <Box sx={{ overflowX: "auto" }}>
//             <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px", minWidth: "600px" }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "white",
//                       fontWeight: "bold",
//                       borderTopLeftRadius: "8px",
//                     }}
//                   >
//                     Exam Type
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "white",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Exam Date
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "white",
//                       fontWeight: "bold",
//                       borderTopRightRadius: "8px",
//                     }}
//                   >
//                     Subject
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {examinations.map((exam) => (
//                   <TableRow
//                     key={exam._id}
//                     sx={{
//                       backgroundColor: "#ffffff",
//                       "&:hover": {
//                         backgroundColor: "#e8f0fe",
//                         transform: "scale(1.01)",
//                         transition: "0.3s ease",
//                       },
//                       boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//                     }}
//                   >
//                     <TableCell sx={{ fontWeight: 600, color: "#333" }}>{exam.examType || "N/A"}</TableCell>
//                     <TableCell sx={{ color: "#555" }}>{formatDate(exam.examDate)}</TableCell>
//                     <TableCell sx={{ color: "#555" }}>{exam.subject?.subject_name || "N/A"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         ) : (
//           <Typography sx={{ textAlign: "center", my: 3, color: "#888", fontStyle: "italic" }}>
//             No examinations found for this class.
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }

























import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Fade,
  useMediaQuery,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { baseApi } from "../../../environment";

// Floating animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

export default function ExaminationsStudent() {
  const [classes, setClasses] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchClasses = async () => {
    try {
      const resp = await axios.get(`${baseApi}/class/all`, getAuthHeader());
      setClasses(resp.data.data || []);
      if (resp.data.data?.length > 0) setSelectedClass(resp.data.data[0]._id);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchExaminations = async (classId) => {
    if (!classId) return;
    try {
      setLoading(true);
      const resp = await axios.get(
        `${baseApi}/examination/class/${classId}`,
        getAuthHeader()
      );
      setExaminations(resp.data.examinations || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching examinations:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) fetchExaminations(selectedClass);
    else setExaminations([]);
  }, [selectedClass]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : isTablet ? 3 : 4,
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
          letterSpacing: "1px",
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          background: "linear-gradient(90deg, #00f, #0ff, #0f0, #ff0, #f00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🧾 Annual Examination Details
      </Typography>

      {/* Class Selector */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <FormControl sx={{ minWidth: isMobile ? "100%" : 280 }}>
          <InputLabel sx={{ color: "#0ff" }}>Select Class</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            sx={{
              backgroundColor: "#1c1c1c",
              borderRadius: "12px",
              color: "#fff",
              "& .MuiSvgIcon-root": { color: "#0ff" },
              "&:hover": { backgroundColor: "#2a2a2a" },
              boxShadow: "0 4px 20px rgba(0,255,255,0.2)",
            }}
          >
            {classes.length > 0 ? (
              classes.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.class_num} - {cls.class_text || "N/A"}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No classes available</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress sx={{ color: "#0ff" }} />
        </Box>
      )}

      {/* Examinations Grid */}
      {!loading && examinations.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
            px: 2,
          }}
        >
          {examinations.map((exam, index) => (
            <Fade
              in
              style={{ transitionDelay: `${index * 200}ms` }}
              key={exam._id}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(145deg, #111, #fcf9f9ff)",
                  boxShadow:
                    "0 0 20px rgba(0,255,255,0.3), 0 0 30px rgba(0,255,255,0.2)",
                  animation: `${floatAnimation} 4s ease-in-out infinite`,
                  transition:
                    "transform 0.3s, box-shadow 0.3s, background 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow:
                      "0 0 40px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.4)",
                    background: "linear-gradient(145deg, #222, #111)",
                  },
                }}
              >
                {/* Accent Bar */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "8px",
                    borderRadius: "8px 0 0 8px",
                    background:
                      exam.examType === "Midterm"
                        ? "linear-gradient(180deg, #ff0080, #ff8c00)"
                        : "linear-gradient(180deg, #00f, #0ff)",
                  }}
                />

                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {exam.examType || "N/A"}
                </Typography>
                <Typography sx={{ color: "#0ff", mb: 0.5 }}>
                  📅 {formatDate(exam.examDate)}
                </Typography>
                <Typography sx={{ color: "#0ff" }}>
                  📝 {exam.subject?.subject_name || "N/A"}
                </Typography>
              </Paper>
            </Fade>
          ))}
        </Box>
      )}

      {/* No Examinations */}
      {!loading && examinations.length === 0 && (
        <Typography
          sx={{
            textAlign: "center",
            mt: 5,
            color: "#888",
            fontStyle: "italic",
          }}
        >
          No examinations found for this class.
        </Typography>
      )}
    </Box>
  );
}
