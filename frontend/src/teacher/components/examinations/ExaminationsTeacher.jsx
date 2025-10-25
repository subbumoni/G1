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

// export default function ExaminationsTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [examinations, setExaminations] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
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
//           🧾 Examination Schedule (Teacher)
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










// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   Table,
// //   TableHead,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   CircularProgress,
// //   FormControl,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// // } from "@mui/material";
// // import { baseApi } from "../../../environment";

// // export default function ExaminationsTeacher() {
// //   const [classes, setClasses] = useState([]);
// //   const [examinations, setExaminations] = useState([]);
// //   const [selectedClass, setSelectedClass] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const getAuthHeader = () => {
// //     const token = localStorage.getItem("token");
// //     return { headers: { Authorization: `Bearer ${token}` } };
// //   };

// //   // Fetch only classes assigned to this teacher
// //   const fetchClasses = async () => {
// //     try {
// //       const resp = await axios.get(
// //         `${baseApi}/teacher/classes`,
// //         getAuthHeader()
// //       );
// //       setClasses(resp.data.data || []);
// //       if (resp.data.data?.length > 0) {
// //         setSelectedClass(resp.data.data[0]._id);
// //       }
// //     } catch (error) {
// //       console.error("❌ Error fetching classes", error);
// //     }
// //   };

// //   // Fetch examinations for the selected class
// //   const fetchExaminations = async (classId) => {
// //     if (!classId) return;
// //     try {
// //       setLoading(true);
// //       const resp = await axios.get(
// //         `${baseApi}/examination/class/${classId}`,
// //         getAuthHeader()
// //       );
// //       setExaminations(resp.data.examinations || []);
// //       setLoading(false);
// //     } catch (error) {
// //       setLoading(false);
// //       console.error("❌ Error fetching examinations", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchClasses();
// //   }, []);

// //   useEffect(() => {
// //     if (selectedClass) {
// //       fetchExaminations(selectedClass);
// //     } else {
// //       setExaminations([]);
// //     }
// //   }, [selectedClass]);

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     const date = new Date(dateString);
// //     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
// //   };

// //   return (
// //     <Box
// //       sx={{ padding: "2rem", backgroundColor: "#f9fafc", minHeight: "100vh" }}
// //     >
// //       <Paper
// //         elevation={4}
// //         sx={{
// //           maxWidth: "900px",
// //           mx: "auto",
// //           p: 4,
// //           borderRadius: "16px",
// //           background: "linear-gradient(145deg, #ffffff, #f0f3f8)",
// //           boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
// //         }}
// //       >
// //         <Typography
// //           variant="h5"
// //           sx={{
// //             textAlign: "center",
// //             mb: 3,
// //             fontWeight: "bold",
// //             color: "#1976d2",
// //             letterSpacing: "0.5px",
// //           }}
// //         >
// //           🧾 Examination Schedule (Teacher)
// //         </Typography>

// //         {/* Class Dropdown */}
// //         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
// //           <FormControl sx={{ minWidth: 280 }}>
// //             <InputLabel>Select Class</InputLabel>
// //             <Select
// //               value={selectedClass}
// //               onChange={(e) => setSelectedClass(e.target.value)}
// //               sx={{
// //                 backgroundColor: "#fff",
// //                 borderRadius: "10px",
// //                 "&:hover": { backgroundColor: "#f1f4f9" },
// //               }}
// //             >
// //               {classes.length > 0 ? (
// //                 classes.map((cls) => (
// //                   <MenuItem key={cls._id} value={cls._id}>
// //                     {cls.class_num} - {cls.class_text || "N/A"}
// //                   </MenuItem>
// //                 ))
// //               ) : (
// //                 <MenuItem disabled>No classes assigned</MenuItem>
// //               )}
// //             </Select>
// //           </FormControl>
// //         </Box>

// //         {/* Examination Table */}
// //         {loading ? (
// //           <Box sx={{ textAlign: "center", my: 4 }}>
// //             <CircularProgress />
// //           </Box>
// //         ) : examinations.length > 0 ? (
// //           <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell
// //                   sx={{
// //                     backgroundColor: "#1976d2",
// //                     color: "white",
// //                     fontWeight: "bold",
// //                     borderTopLeftRadius: "8px",
// //                   }}
// //                 >
// //                   Exam Type
// //                 </TableCell>
// //                 <TableCell
// //                   sx={{
// //                     backgroundColor: "#1976d2",
// //                     color: "white",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Exam Date
// //                 </TableCell>
// //                 <TableCell
// //                   sx={{
// //                     backgroundColor: "#1976d2",
// //                     color: "white",
// //                     fontWeight: "bold",
// //                     borderTopRightRadius: "8px",
// //                   }}
// //                 >
// //                   Subject
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {examinations.map((exam) => (
// //                 <TableRow
// //                   key={exam._id}
// //                   sx={{
// //                     backgroundColor: "#ffffff",
// //                     "&:hover": {
// //                       backgroundColor: "#e8f0fe",
// //                       transform: "scale(1.01)",
// //                       transition: "0.3s ease",
// //                     },
// //                     boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
// //                   }}
// //                 >
// //                   <TableCell sx={{ fontWeight: 600, color: "#333" }}>
// //                     {exam.examType || "N/A"}
// //                   </TableCell>
// //                   <TableCell sx={{ color: "#555" }}>
// //                     {formatDate(exam.examDate)}
// //                   </TableCell>
// //                   <TableCell sx={{ color: "#555" }}>
// //                     {exam.subject?.subject_name || "N/A"}
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         ) : (
// //           <Typography
// //             sx={{
// //               textAlign: "center",
// //               my: 3,
// //               color: "#888",
// //               fontStyle: "italic",
// //             }}
// //           >
// //             No examinations found for this class.
// //           </Typography>
// //         )}
// //       </Paper>
// //     </Box>
// //   );
// // }




































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

// export default function ExaminationsTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [examinations, setExaminations] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   // Fetch only classes assigned to this teacher
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(
//         `${baseApi}/class/all`,
//         getAuthHeader()
//       );
//       setClasses(resp.data.data || []);
//       if (resp.data.data?.length > 0) {
//         setSelectedClass(resp.data.data[0]._id);
//       }
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
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchExaminations(selectedClass);
//     } else {
//       setExaminations([]);
//     }
//   }, [selectedClass]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
//   };

//   return (
//     <Box
//       sx={{ padding: "2rem", backgroundColor: "#f9fafc", minHeight: "100vh" }}
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
//           🧾 Examination Schedule (Teacher)
//         </Typography>

//         {/* Class Dropdown */}
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
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
//                 <MenuItem disabled>No classes assigned</MenuItem>
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
//           <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
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
//   CircularProgress,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
// import { baseApi } from "../../../environment";

// export default function ExaminationsTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [examinations, setExaminations] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, getAuthHeader());
//       setClasses(resp.data.data || []);
//       if (resp.data.data?.length > 0) {
//         setSelectedClass(resp.data.data[0]._id);
//       }
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
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) fetchExaminations(selectedClass);
//     else setExaminations([]);
//   }, [selectedClass]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
//   };

//   return (
//     <Box sx={{ p: 3, backgroundColor: "#f4f6fc", minHeight: "100vh" }}>
//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: "center",
//           mb: 4,
//           fontWeight: "bold",
//           color: "#1976d2",
//         }}
//       >
//         🧾 Examination Schedule
//       </Typography>

//       {/* Class Selector */}
//       <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//         <FormControl sx={{ minWidth: 280 }}>
//           <InputLabel>Select Class</InputLabel>
//           <Select
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//             sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
//           >
//             {classes.length > 0 ? (
//               classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id}>
//                   {cls.class_num} - {cls.class_text || "N/A"}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem disabled>No classes assigned</MenuItem>
//             )}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Loading */}
//       {loading && (
//         <Box sx={{ textAlign: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       )}

//       {/* Exams List */}
//       {!loading && examinations.length > 0 && (
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
//             gap: 3,
//             px: 2,
//           }}
//         >
//           {examinations.map((exam) => (
//             <Paper
//               key={exam._id}
//               sx={{
//                 p: 3,
//                 borderRadius: "16px",
//                 boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
//                 position: "relative",
//                 overflow: "hidden",
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                   boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
//                 },
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: 0,
//                   top: 0,
//                   height: "100%",
//                   width: "6px",
//                   background:
//                     exam.examType === "Midterm"
//                       ? "linear-gradient(180deg, #ff9800, #ffc107)"
//                       : "linear-gradient(180deg, #2196f3, #21cbf3)",
//                 }}
//               />
//               <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
//                 {exam.examType || "N/A"}
//               </Typography>
//               <Typography sx={{ color: "#555", mb: 0.5 }}>
//                 📅 {formatDate(exam.examDate)}
//               </Typography>
//               <Typography sx={{ color: "#555" }}>
//                 📝 {exam.subject?.subject_name || "N/A"}
//               </Typography>
//             </Paper>
//           ))}
//         </Box>
//       )}

//       {!loading && examinations.length === 0 && (
//         <Typography
//           sx={{
//             textAlign: "center",
//             mt: 5,
//             color: "#888",
//             fontStyle: "italic",
//           }}
//         >
//           No examinations found for this class.
//         </Typography>
//       )}
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
} from "@mui/material";
import { keyframes } from "@mui/system";
import { baseApi } from "../../../environment";

// Floating animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

export default function ExaminationsTeacher() {
  const [classes, setClasses] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.error("❌ Error fetching classes", error);
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
      console.error("❌ Error fetching examinations", error);
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
        p: 3,
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
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
        🧾 Examination Schedule
      </Typography>

      {/* Class Selector */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <FormControl sx={{ minWidth: 280 }}>
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
              <MenuItem disabled>No classes assigned</MenuItem>
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
                  background: "linear-gradient(145deg, #111, #222)",
                  boxShadow:
                    "0 0 20px rgba(0,255,255,0.3), 0 0 30px rgba(0,255,255,0.2)",
                  animation: `${floatAnimation} 4s ease-in-out infinite`,
                  transition:
                    "transform 0.3s, box-shadow 0.3s, background 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow:
                      "0 0 40px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.4)",
                    background: "linear-gradient(145deg, #f5eaeaff, #111)",
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
