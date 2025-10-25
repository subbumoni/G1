
















// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CardMedia,
//   Modal,
//   IconButton,
//   CircularProgress,
//   Grid,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import Attendee from "./Attendee";

// export default function AttendanceStudentList() {
//   const [edit, setEdit] = React.useState(false);
//   const [editId, setEditId] = React.useState(null);
//   const [classes, setClasses] = React.useState([]);
//   const [students, setStudents] = React.useState([]);
//   const [selectedStudent, setSelectedStudent] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [loading, setLoading] = React.useState(false);

//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [selectedClassFilter, setSelectedClassFilter] = React.useState("");
//   const [selectedClass, setSelectedClass] = React.useState(null);

//   const token = localStorage.getItem("token");

//   const handleMessageClose = () => setMessage("");
//   const handleOpenModal = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };
//   const handleCloseModal = () => {
//     setSelectedStudent(null);
//     setModalOpen(false);
//   };

//   const getClassName = (studentClass) =>
//     studentClass ? studentClass.class_text : "N/A";

//   // Fetch all students
//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const sorted = (resp.data.students || []).sort((a, b) =>
//         (a.name || "").localeCompare(b.name || "")
//       );
//       setStudents(sorted);
//     } catch (err) {
//       console.error("Error fetching students", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch classes
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching classes.", e);
//     }
//   };

//   // Fetch attendance data
//   const [attendanceData, setAttendanceData] = React.useState({});
//   const fetchAttendanceForStudents = async (studentsList) => {
//     const attendancePromises = studentsList.map((student) =>
//       fetchAttendanceForStudent(student._id)
//     );
//     const results = await Promise.all(attendancePromises);
//     const updatedAttendanceData = {};
//     results.forEach(({ studentId, attendancePercentage }) => {
//       updatedAttendanceData[studentId] = attendancePercentage;
//     });
//     setAttendanceData(updatedAttendanceData);
//   };

//   const fetchAttendanceForStudent = async (studentId) => {
//     try {
//       const response = await axios.get(`${baseApi}/attendance/${studentId}`);
//       const attendanceRecords = response.data;
//       const totalClasses = attendanceRecords.length;
//       const presentCount = attendanceRecords.filter(
//         (record) => record.status === "Present"
//       ).length;
//       const attendancePercentage =
//         totalClasses > 0 ? (presentCount / totalClasses) * 100 : 0;
//       return { studentId, attendancePercentage };
//     } catch (error) {
//       console.error(
//         `Error fetching attendance for student ${studentId}:`,
//         error
//       );
//       return { studentId, attendancePercentage: 0 };
//     }
//   };


//   const fetchClassDetails =async() => {
//     if (selectedClass) {
      
//       try {
//         const response = axios.get(`${baseApi}/class/single/${selectedClass}`)
//         console.log("SINGLE CLASS",response)
//       } catch (error) {
//         console.log("ERROR",error)
//       }
//     }
//   }

//   React.useEffect(() => {
//     fetchClassDetails();
//     fetchStudents();
//     fetchClasses();
//   }, [selectedClass]);

//   React.useEffect(() => {
//     if (students.length > 0) {
//       fetchAttendanceForStudents(students);
//     }
//   }, [students]);

//   // Filter students based on search and class
//   const filteredStudents = students.filter((s) => {
//     const matchesSearch =
//       s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       s.guardian?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesClass =
//       !selectedClassFilter || s.student_class?._id === selectedClassFilter;
//     return matchesSearch && matchesClass;
//   });

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 4, pb: 6, background: "#0e0e0e" }}>
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
//         sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
//       >
//         Students
//       </Typography>
//       <Typography align="center" sx={{ mb: 3, color: "#ccc" }}>
//         Total Students: <strong>{students.length}</strong>
//       </Typography>

//       {/* Grid Layout */}
//       <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto" }}>
//         {/* LEFT SIDE */}
//         <Grid item xs={12} md={3}>
//           <Box
//             sx={{
//               background: "#1a1a1a",
//               p: 3,
//               borderRadius: 2,
//               boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//             }}
//           >
//             <TextField
//               label="Search Student"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//               fullWidth
//               InputLabelProps={{ style: { color: "#ccc" } }}
//               InputProps={{ style: { color: "#fff" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" },
//                 "&:hover fieldset": { borderColor: "#1976d2" },
//               }}
//             />

//             <FormControl size="small" fullWidth>
//               <InputLabel sx={{ color: "#ccc" }}>Class</InputLabel>
//               <Select
//                 value={selectedClassFilter}
//                 onChange={(e) => {
//                   setSelectedClassFilter(e.target.value);
//                   setSelectedClass(e.target.value); // ✅ Now Attendee gets correct classId
//                 }}
//                 label="Class"
//                 sx={{
//                   color: "#fff",
//                   "& .MuiSvgIcon-root": { color: "#fff" },
//                 }}
//               >
//                 <MenuItem value="">All Classes</MenuItem>
//                 {classes.map((c) => (
//                   <MenuItem key={c._id} value={c._id}>
//                     {c.class_text} ({c.class_num})
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Attendee component now receives correct classId */}
//           <Box sx={{ mt: 3 }}>
//             {selectedClass && <Attendee classId={selectedClass} />}
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE */}
//         <Grid item xs={12} md={9}>
//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
//           ) : filteredStudents.length === 0 ? (
//             <Typography mt={4} align="center" sx={{ color: "#fff" }}>
//               No students found.
//             </Typography>
//           ) : (
//             <TableContainer
//               component={Paper}
//               sx={{
//                 background: "#121212",
//                 borderRadius: 2,
//                 overflowX: "auto",
//               }}
//             >
//               <Table>
//                 <TableHead sx={{ background: "#1976d2" }}>
//                   <TableRow>
//                     <TableCell sx={{ color: "#fff" }}>Photo</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Gender</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Guardian Phone</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Class</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Percentage</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>View</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredStudents.map((student) => (
//                     <TableRow
//                       key={student._id}
//                       hover
//                       sx={{ "&:hover": { background: "#1e1e1e" } }}
//                     >
//                       <TableCell>
//                         <CardMedia
//                           component="img"
//                           image={student.student_image || `/placeholder.jpg`}
//                           alt={student.name}
//                           sx={{
//                             width: 60,
//                             height: 60,
//                             borderRadius: 1,
//                             objectFit: "cover",
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.name}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.gender}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.guardian_phone}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.student_class?.class_text || "N/A"}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {attendanceData[student._id] !== undefined
//                           ? `${attendanceData[student._id].toFixed(2)}%`
//                           : "No Data"}
//                       </TableCell>
//                       <TableCell>
//                         <Typography
//                           sx={{
//                             color: "#1976d2",
//                             cursor: "pointer",
//                             fontWeight: "bold",
//                           }}
//                           onClick={() => handleOpenModal(student)}
//                         >
//                           View
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Grid>
//       </Grid>

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
//                 <br />
//                 Percentage: {selectedStudent.percentage ?? "-"}
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
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CardMedia,
//   Modal,
//   IconButton,
//   CircularProgress,
//   Grid,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import Attendee from "./Attendee";

// export default function AttendanceStudentList() {
//   const [classes, setClasses] = React.useState([]);
//   const [students, setStudents] = React.useState([]);
//   const [selectedStudent, setSelectedStudent] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [loading, setLoading] = React.useState(false);

//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [selectedClassFilter, setSelectedClassFilter] = React.useState("");
//   const [selectedClass, setSelectedClass] = React.useState(null);

//   const [attendanceData, setAttendanceData] = React.useState({});
//   const token = localStorage.getItem("token");

//   const handleMessageClose = () => setMessage("");
//   const handleOpenModal = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };
//   const handleCloseModal = () => {
//     setSelectedStudent(null);
//     setModalOpen(false);
//   };

//   const getClassName = (studentClass) =>
//     studentClass ? studentClass.class_text : "N/A";

//   // Fetch students
//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(resp.data.students || []);
//     } catch (err) {
//       console.error("Error fetching students", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all classes
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching classes", e);
//     }
//   };



//   // Fetch students & classes on mount
//   React.useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//   }, []);

//   // Filter students based on search and class
//   const filteredStudents = students.filter((s) => {
//     const matchesSearch =
//       s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       s.guardian?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesClass =
//       !selectedClassFilter || s.student_class?._id === selectedClassFilter;
//     return matchesSearch && matchesClass;
//   });

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 4, pb: 6, background: "#0e0e0e" }}>
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
//         sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
//       >
//         Students
//       </Typography>
//       <Typography align="center" sx={{ mb: 3, color: "#ccc" }}>
//         Total Students: <strong>{students.length}</strong>
//       </Typography>

//       <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto" }}>
//         {/* LEFT SIDE */}
//         <Grid item xs={12} md={3}>
//           <Box
//             sx={{
//               background: "#1a1a1a",
//               p: 3,
//               borderRadius: 2,
//               boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//             }}
//           >
//             <TextField
//               label="Search Student"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//               fullWidth
//               InputLabelProps={{ style: { color: "#ccc" } }}
//               InputProps={{ style: { color: "#fff" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" },
//                 "&:hover fieldset": { borderColor: "#1976d2" },
//               }}
//             />

//             <FormControl size="small" fullWidth>
//               <InputLabel sx={{ color: "#ccc" }}>Class</InputLabel>
//               <Select
//                 value={selectedClassFilter}
//                 onChange={(e) => {
//                   setSelectedClassFilter(e.target.value);
//                   setSelectedClass(e.target.value); // ✅ Pass selected class to Attendee
//                 }}
//                 label="Class"
//                 sx={{
//                   color: "#fff",
//                   "& .MuiSvgIcon-root": { color: "#fff" },
//                 }}
//               >
//                 <MenuItem value="">All Classes</MenuItem>
//                 {classes.map((c) => (
//                   <MenuItem key={c._id} value={c._id}>
//                     {c.class_text} ({c.class_num})
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Attendee component */}
//           <Box sx={{ mt: 3 }}>
//             {selectedClass && <Attendee classId={selectedClass} />}
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE: Student Table */}
//         <Grid item xs={12} md={9}>
//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
//           ) : filteredStudents.length === 0 ? (
//             <Typography mt={4} align="center" sx={{ color: "#fff" }}>
//               No students found.
//             </Typography>
//           ) : (
//             <TableContainer
//               component={Paper}
//               sx={{
//                 background: "#121212",
//                 borderRadius: 2,
//                 overflowX: "auto",
//               }}
//             >
//               <Table>
//                 <TableHead sx={{ background: "#1976d2" }}>
//                   <TableRow>
//                     <TableCell sx={{ color: "#fff" }}>Photo</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Gender</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Guardian Phone</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Class</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Percentage</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>View</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredStudents.map((student) => (
//                     <TableRow
//                       key={student._id}
//                       hover
//                       sx={{ "&:hover": { background: "#1e1e1e" } }}
//                     >
//                       <TableCell>
//                         <CardMedia
//                           component="img"
//                           image={student.student_image || `/placeholder.jpg`}
//                           alt={student.name}
//                           sx={{
//                             width: 60,
//                             height: 60,
//                             borderRadius: 1,
//                             objectFit: "cover",
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.name}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.gender}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.guardian_phone}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.student_class?.class_text || "N/A"}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {attendanceData[student._id] !== undefined
//                           ? `${attendanceData[student._id].toFixed(2)}%`
//                           : "No Data"}
//                       </TableCell>
//                       <TableCell>
//                         <Typography
//                           sx={{
//                             color: "#1976d2",
//                             cursor: "pointer",
//                             fontWeight: "bold",
//                           }}
//                           onClick={() => handleOpenModal(student)}
//                         >
//                           View
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Grid>
//       </Grid>

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
//                 <br />
//                 Percentage: {selectedStudent.percentage ?? "-"}
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
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CardMedia,
//   Modal,
//   IconButton,
//   CircularProgress,
//   Grid,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import Attendee from "./Attendee";

// export default function AttendanceStudentList() {
//   const [classes, setClasses] = React.useState([]);
//   const [students, setStudents] = React.useState([]);
//   const [selectedStudent, setSelectedStudent] = React.useState(null);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const [loading, setLoading] = React.useState(false);

//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [selectedClassFilter, setSelectedClassFilter] = React.useState("");
//   const [selectedClass, setSelectedClass] = React.useState(null);

//   const [attendanceData, setAttendanceData] = React.useState({});
//   const token = localStorage.getItem("token");

//   const handleMessageClose = () => setMessage("");
//   const handleOpenModal = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };
//   const handleCloseModal = () => {
//     setSelectedStudent(null);
//     setModalOpen(false);
//   };

//   const getClassName = (studentClass) =>
//     studentClass ? studentClass.class_text : "N/A";

//   // Fetch students
//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(resp.data.students || []);
//     } catch (err) {
//       console.error("Error fetching students", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all classes
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching classes", e);
//     }
//   };

//   // Fetch students & classes on mount
//   React.useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//   }, []);

//   // Filter students based on search and class
//   const filteredStudents = students.filter((s) => {
//     const matchesSearch =
//       s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       s.guardian?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesClass =
//       !selectedClassFilter || s.student_class?._id === selectedClassFilter;
//     return matchesSearch && matchesClass;
//   });

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 4, pb: 6, background: "#0e0e0e" }}>
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
//         sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
//       >
//         Students
//       </Typography>
//       <Typography align="center" sx={{ mb: 3, color: "#ccc" }}>
//         Total Students: <strong>{students.length}</strong>
//       </Typography>

//       <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto" }}>
//         {/* LEFT SIDE */}
//         <Grid item xs={12} md={3}>
//           <Box
//             sx={{
//               background: "#1a1a1a",
//               p: 3,
//               borderRadius: 2,
//               boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//             }}
//           >
//             <TextField
//               label="Search Student"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//               fullWidth
//               InputLabelProps={{ style: { color: "#ccc" } }}
//               InputProps={{ style: { color: "#fff" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" },
//                 "&:hover fieldset": { borderColor: "#1976d2" },
//               }}
//             />

//             <FormControl size="small" fullWidth>
//               <InputLabel sx={{ color: "#ccc" }}>Class</InputLabel>
//               <Select
//                 value={selectedClassFilter}
//                 onChange={(e) => {
//                   setSelectedClassFilter(e.target.value);
//                   setSelectedClass(e.target.value); // Pass to Attendee
//                 }}
//                 label="Class"
//                 sx={{
//                   color: "#fff",
//                   "& .MuiSvgIcon-root": { color: "#fff" },
//                 }}
//               >
//                 <MenuItem value="">All Classes</MenuItem>
//                 {classes.map((c) => (
//                   <MenuItem key={c._id} value={c._id}>
//                     {c.class_text} ({c.class_num})
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Attendee component */}
//           <Box sx={{ mt: 3 }}>
//             {selectedClass && (
//               <Attendee
//                 classId={selectedClass}
//                 setMessage={setMessage}
//                 setMessageType={setMessageType}
//               />
//             )}
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE: Student Table */}
//         <Grid item xs={12} md={9}>
//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
//           ) : filteredStudents.length === 0 ? (
//             <Typography mt={4} align="center" sx={{ color: "#fff" }}>
//               No students found.
//             </Typography>
//           ) : (
//             <TableContainer
//               component={Paper}
//               sx={{
//                 background: "#121212",
//                 borderRadius: 2,
//                 overflowX: "auto",
//               }}
//             >
//               <Table>
//                 <TableHead sx={{ background: "#1976d2" }}>
//                   <TableRow>
//                     <TableCell sx={{ color: "#fff" }}>Photo</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Gender</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Guardian Phone</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Class</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Percentage</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>View</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredStudents.map((student) => (
//                     <TableRow
//                       key={student._id}
//                       hover
//                       sx={{ "&:hover": { background: "#1e1e1e" } }}
//                     >
//                       <TableCell>
//                         <CardMedia
//                           component="img"
//                           image={student.student_image || `/placeholder.jpg`}
//                           alt={student.name}
//                           sx={{
//                             width: 60,
//                             height: 60,
//                             borderRadius: 1,
//                             objectFit: "cover",
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.name}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.gender}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.guardian_phone}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.student_class?.class_text || "N/A"}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {attendanceData[student._id] !== undefined
//                           ? `${attendanceData[student._id].toFixed(2)}%`
//                           : "No Data"}
//                       </TableCell>
//                       <TableCell>
//                         <Typography
//                           sx={{
//                             color: "#1976d2",
//                             cursor: "pointer",
//                             fontWeight: "bold",
//                           }}
//                           onClick={() => handleOpenModal(student)}
//                         >
//                           View
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Grid>
//       </Grid>

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
//                 <br />
//                 Percentage: {selectedStudent.percentage ?? "-"}
//               </Typography>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }




























// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CardMedia,
//   CircularProgress,
//   Grid,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { baseApi } from "../../../environment";
// import Attendee from "./Attendee";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

// export default function AttendanceStudentList() {
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("success");
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedClassFilter, setSelectedClassFilter] = useState("");
//   const [selectedClass, setSelectedClass] = useState(null);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const handleMessageClose = () => setMessage("");

//   const getClassName = (studentClass) =>
//     studentClass ? studentClass.class_text : "N/A";

//   // Fetch students
//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(resp.data.students || []);
//     } catch (err) {
//       console.error("Error fetching students", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch classes
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (err) {
//       console.error("Error fetching classes", err);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//   }, []);

//   const filteredStudents = students.filter((s) => {
//     const matchesSearch =
//       s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       s.guardian?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesClass =
//       !selectedClassFilter || s.student_class?._id === selectedClassFilter;
//     return matchesSearch && matchesClass;
//   });

//   const handleViewStudent = (studentId) => {
//     navigate(`/attendance/${studentId}`);
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 4, pb: 6, background: "#0e0e0e" }}>
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
//         sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
//       >
//         Students
//       </Typography>
//       <Typography align="center" sx={{ mb: 3, color: "#ccc" }}>
//         Total Students: <strong>{students.length}</strong>
//       </Typography>

//       <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto" }}>
//         {/* LEFT SIDE */}
//         <Grid item xs={12} md={3}>
//           <Box
//             sx={{
//               background: "#1a1a1a",
//               p: 3,
//               borderRadius: 2,
//               boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//             }}
//           >
//             <TextField
//               label="Search Student"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//               fullWidth
//               InputLabelProps={{ style: { color: "#ccc" } }}
//               InputProps={{ style: { color: "#fff" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" },
//                 "&:hover fieldset": { borderColor: "#1976d2" },
//               }}
//             />

//             <FormControl size="small" fullWidth>
//               <InputLabel sx={{ color: "#ccc" }}>Class</InputLabel>
//               <Select
//                 value={selectedClassFilter}
//                 onChange={(e) => {
//                   setSelectedClassFilter(e.target.value);
//                   setSelectedClass(e.target.value);
//                 }}
//                 label="Class"
//                 sx={{
//                   color: "#fff",
//                   "& .MuiSvgIcon-root": { color: "#fff" },
//                 }}
//               >
//                 <MenuItem value="">All Classes</MenuItem>
//                 {classes.map((c) => (
//                   <MenuItem key={c._id} value={c._id}>
//                     {c.class_text} ({c.class_num})
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Attendee component */}
//           <Box sx={{ mt: 3 }}>
//             {selectedClass && (
//               <Attendee
//                 classId={selectedClass}
//                 setMessage={setMessage}
//                 setMessageType={setMessageType}
//               />
//             )}
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE: Student Table */}
//         <Grid item xs={12} md={9}>
//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
//           ) : filteredStudents.length === 0 ? (
//             <Typography mt={4} align="center" sx={{ color: "#fff" }}>
//               No students found.
//             </Typography>
//           ) : (
//             <TableContainer
//               component={Paper}
//               sx={{
//                 background: "#121212",
//                 borderRadius: 2,
//                 overflowX: "auto",
//               }}
//             >
//               <Table>
//                 <TableHead sx={{ background: "#1976d2" }}>
//                   <TableRow>
//                     <TableCell sx={{ color: "#fff" }}>Photo</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Gender</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Guardian Phone</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Class</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Percentage</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>View</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredStudents.map((student) => (
//                     <TableRow
//                       key={student._id}
//                       hover
//                       sx={{ "&:hover": { background: "#1e1e1e" } }}
//                     >
//                       <TableCell>
//                         <CardMedia
//                           component="img"
//                           image={student.student_image || `/placeholder.jpg`}
//                           alt={student.name}
//                           sx={{
//                             width: 60,
//                             height: 60,
//                             borderRadius: 1,
//                             objectFit: "cover",
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.name}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.gender}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.guardian_phone}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.student_class?.class_text || "N/A"}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.percentage ?? "-"}
//                       </TableCell>
//                       <TableCell>
//                         <Typography
//                           sx={{
//                             color: "#1976d2",
//                             cursor: "pointer",
//                             fontWeight: "bold",
//                           }}
//                           onClick={() => navigate(`/attendance/${student._id}`)}
//                         >
//                           View
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }






























// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CardMedia,
//   CircularProgress,
//   Grid,
//   Button,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { baseApi } from "../../../environment";
// import Attendee from "./Attendee";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

// export default function AttendanceStudentList() {
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [studentPercentages, setStudentPercentages] = useState({});
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("success");
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedClassFilter, setSelectedClassFilter] = useState("");
//   const [selectedClass, setSelectedClass] = useState(null);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const handleMessageClose = () => setMessage("");

//   const getClassName = (studentClass) =>
//     studentClass ? studentClass.class_text : "N/A";

//   // Fetch all students
//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(resp.data.students || []);
//     } catch (err) {
//       console.error("Error fetching students", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all classes
//   const fetchClasses = async () => {
//     try {
//       const resp = await axios.get(`${baseApi}/class/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(resp.data.data || []);
//     } catch (err) {
//       console.error("Error fetching classes", err);
//     }
//   };

//   // Fetch attendance percentages for each student
//   const fetchPercentages = async () => {
//     const newPercentages = {};
//     for (let student of students) {
//       try {
//         const resp = await axios.get(`${baseApi}/attendance/${student._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = resp.data || [];
//         const presentCount = data.filter(
//           (a) => a.status.toLowerCase() === "present"
//         ).length;
//         const totalCount = data.length;
//         const percentage = totalCount
//           ? ((presentCount / totalCount) * 100).toFixed(2)
//           : 0;
//         newPercentages[student._id] = percentage;
//       } catch (err) {
//         newPercentages[student._id] = 0;
//       }
//     }
//     setStudentPercentages(newPercentages);
//   };

//   useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (students.length > 0) fetchPercentages();
//   }, [students]);

//   // Filter students by search + class
//   const filteredStudents = students.filter((s) => {
//     const matchesSearch =
//       s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       s.guardian?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesClass =
//       !selectedClassFilter || s.student_class?._id === selectedClassFilter;
//     return matchesSearch && matchesClass;
//   });

//   const handleViewStudent = (studentId) => {
//     navigate(`/school/attendance/${studentId}`);
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", pt: 4, pb: 6, background: "#0e0e0e" }}>
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
//         sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
//       >
//         Students
//       </Typography>
//       <Typography align="center" sx={{ mb: 3, color: "#ccc" }}>
//         Total Students: <strong>{students.length}</strong>
//       </Typography>

//       <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto" }}>
//         {/* LEFT SIDE - Search + Filter + Attendee */}
//         <Grid item xs={12} md={3}>
//           <Box
//             sx={{
//               background: "#1a1a1a",
//               p: 3,
//               borderRadius: 2,
//               boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//             }}
//           >
//             <TextField
//               label="Search Student"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//               fullWidth
//               InputLabelProps={{ style: { color: "#ccc" } }}
//               InputProps={{ style: { color: "#fff" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" },
//                 "&:hover fieldset": { borderColor: "#1976d2" },
//               }}
//             />

//             <FormControl size="small" fullWidth>
//               <InputLabel sx={{ color: "#ccc" }}>Class</InputLabel>
//               <Select
//                 value={selectedClassFilter}
//                 onChange={(e) => {
//                   setSelectedClassFilter(e.target.value);
//                   setSelectedClass(e.target.value);
//                 }}
//                 label="Class"
//                 sx={{
//                   color: "#fff",
//                   "& .MuiSvgIcon-root": { color: "#fff" },
//                 }}
//               >
//                 <MenuItem value="">All Classes</MenuItem>
//                 {classes.map((c) => (
//                   <MenuItem key={c._id} value={c._id}>
//                     {c.class_text} ({c.class_num})
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Attendee Section */}
//           <Box sx={{ mt: 3 }}>
//             {selectedClass && (
//               <Attendee
//                 classId={selectedClass}
//                 setMessage={setMessage}
//                 setMessageType={setMessageType}
//               />
//             )}
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE - Student Table */}
//         <Grid item xs={12} md={9}>
//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
//           ) : filteredStudents.length === 0 ? (
//             <Typography mt={4} align="center" sx={{ color: "#fff" }}>
//               No students found.
//             </Typography>
//           ) : (
//             <TableContainer
//               component={Paper}
//               sx={{
//                 background: "#121212",
//                 borderRadius: 2,
//                 overflowX: "auto",
//               }}
//             >
//               <Table>
//                 <TableHead sx={{ background: "#1976d2" }}>
//                   <TableRow>
//                     <TableCell sx={{ color: "#fff" }}>Photo</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Gender</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Guardian Phone</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Class</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Percentage</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>View</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {filteredStudents.map((student) => (
//                     <TableRow
//                       key={student._id}
//                       hover
//                       sx={{ "&:hover": { background: "#1e1e1e" } }}
//                     >
//                       <TableCell>
//                         <CardMedia
//                           component="img"
//                           image={student.student_image || `/placeholder.jpg`}
//                           alt={student.name}
//                           sx={{
//                             width: 60,
//                             height: 60,
//                             borderRadius: 1,
//                             objectFit: "cover",
//                           }}
//                         />
//                       </TableCell>

//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.name}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.gender}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {student.guardian_phone}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {getClassName(student.student_class)}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {studentPercentages[student._id] ?? "-"}%
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="text"
//                           sx={{
//                             color: "#1976d2",
//                             textTransform: "none",
//                             fontWeight: "bold",
//                           }}
//                           onClick={() => handleViewStudent(student._id)}
//                         >
//                           Details
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }





















import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../../environment";
import Attendee from "./Attendee";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

export default function AttendanceStudentList() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentPercentages, setStudentPercentages] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleMessageClose = () => setMessage("");

  const getClassName = (studentClass) =>
    studentClass ? studentClass.class_text : "N/A";

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${baseApi}/student/fetch-with-query`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(resp.data.students || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load students");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch classes
  const fetchClasses = async () => {
    try {
      const resp = await axios.get(`${baseApi}/class/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(resp.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch attendance percentages for each student
  const fetchPercentages = async () => {
    const newPercentages = {};
    for (let student of students) {
      try {
        const resp = await axios.get(`${baseApi}/attendance/${student._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newPercentages[student._id] = resp.data.percentage || 0;
      } catch (err) {
        newPercentages[student._id] = 0;
      }
    }
    setStudentPercentages(newPercentages);
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  useEffect(() => {
    if (students.length > 0) fetchPercentages();
  }, [students]);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.guardian?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      !selectedClassFilter || s.student_class?._id === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  const handleViewStudent = (studentId) =>
    navigate(`/school/attendance/${studentId}`);

  return (
    <Box sx={{ minHeight: "100vh", pt: 4, pb: 6, background: "#0e0e0e" }}>
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
        sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
      >
        Students
      </Typography>
      <Typography align="center" sx={{ mb: 3, color: "#ccc" }}>
        Total Students: <strong>{students.length}</strong>
      </Typography>

      <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto" }}>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              background: "#1a1a1a",
              p: 3,
              borderRadius: 2,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Search Student"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              fullWidth
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#1976d2" },
              }}
            />
            <FormControl size="small" fullWidth>
              <InputLabel sx={{ color: "#ccc" }}>Class</InputLabel>
              <Select
                value={selectedClassFilter}
                onChange={(e) => {
                  setSelectedClassFilter(e.target.value);
                  setSelectedClass(e.target.value);
                }}
                label="Class"
                sx={{ color: "#fff", "& .MuiSvgIcon-root": { color: "#fff" } }}
              >
                <MenuItem value="">All Classes</MenuItem>
                {classes.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.class_text} ({c.class_num})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 3 }}>
            {selectedClass && (
              <Attendee
                classId={selectedClass}
                setMessage={setMessage}
                setMessageType={setMessageType}
              />
            )}
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
          ) : filteredStudents.length === 0 ? (
            <Typography mt={4} align="center" sx={{ color: "#fff" }}>
              No students found.
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{ background: "#121212", borderRadius: 2, overflowX: "auto" }}
            >
              <Table>
                <TableHead sx={{ background: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Photo</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Gender</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Guardian Phone</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Class</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Percentage</TableCell>
                    <TableCell sx={{ color: "#fff" }}>View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow
                      key={student._id}
                      hover
                      sx={{ "&:hover": { background: "#1e1e1e" } }}
                    >
                      <TableCell>
                        <CardMedia
                          component="img"
                          image={student.student_image || `/placeholder.jpg`}
                          alt={student.name}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1,
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {student.name}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {student.gender}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {student.guardian_phone}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {getClassName(student.student_class)}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {studentPercentages[student._id] ?? "-"}%
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          sx={{
                            color: "#1976d2",
                            textTransform: "none",
                            fontWeight: "bold",
                          }}
                          onClick={() => handleViewStudent(student._id)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
