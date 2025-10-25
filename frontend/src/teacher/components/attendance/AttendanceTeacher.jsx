// import * as React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";

// export default function AttendeeTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [students, setStudents] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");

//   const token = localStorage.getItem("token");

//   const fetchAttendeeClass = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/attendee`);
//       console.log("attendee class ", response);
//       setClasses(response.data.data);
//       if (response.data.data.length > 0) {
//         setSelectedClass(response.data.data[0]._id);
//       }
//     } catch (error) {
//       console.log("ERROR=> fetching Attendance", error);
//     }
//   };

//   useEffect(() => {
//     fetchAttendeeClass();
   
//   }, []);

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
//         setStudents(sorted);
//         console.log("RESPONSE",resp)
//     } catch (err) {
//       console.error("Error fetching students", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//     };
//      useEffect(() => {
//        fetchStudents();
//      }, [selectedClass]);
//   return (
//     <>
//       <h1>Attendee Teacher</h1>
//       {classes.length > 0 ? (
//         <Paper sx={{ marginBottom: "20px" }}>
//           <Box>
//             <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//               You are attendee of {classes.length} classes.
//             </Alert>
//             <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
//               <InputLabel id="demo-simple-select-label">Class</InputLabel>
//               <Select
//                 label="Subject"
//                 onChange={(e) => {
//                   setSelectedClass(e.target.value);
//                 }}
//                 value={selectedClass}
//               >
//                 <MenuItem value={""}>Select Class</MenuItem>
//                 {classes.map((x) => {
//                   return (
//                     <MenuItem key={x._id} value={x._id}>
//                       {x.class_text}
//                     </MenuItem>
//                   );
//                 })}
//               </Select>
//             </FormControl>
//           </Box>
//         </Paper>
//       ) : (
//         <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
//           You are not attendee of any classes.
//         </Alert>
//       )}
//     </>
//   );
// }








// ---------------------------------------------------------------








// import * as React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Typography,
//   CircularProgress,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Table,
//   Button,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";
// import { createDateFormatter } from "@mui/x-charts/internals";
// import { examinationSchema } from "../../../yupSchema/examinationSchema";

// export default function AttendeeTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//     const [messageType, setMessageType] = useState("success");

// const [attendanceStatus,setAttendanceStatus]=useState({})
//     const handleAttandance = (studentId,status) => {
//         setAttendanceStatus((prevStatus) => ({
//             ...prevStatus,
//             [studentId]:status
//         }))
//     }



//     const singleStudentAttendance =async(studentId, status) => {
//         try {
//             const response = await axios.post(`${baseApi}/attendance/mark`, { studentId, date: new Date(), classId: selectedClass, status })
//             console.log("response",response)
//         } catch (error) {
//             console.log("Error=>marking Attendee",error)
//         }
//     }

//     const submitAttendance =async() => {
//              try {
//                  await Promise.all(students.map((student) =>
//                      singleStudentAttendance(student._id, attendanceStatus[student._id])
//                  ))
//              } catch (error) {
//                 console.log("Error =>All submit error[marking Attendee].",error)
//              }
// }

//   const token = localStorage.getItem("token");

//   // Fetch classes assigned to the teacher
//   const fetchAttendeeClass = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/attendee`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Attendee classes:", response.data.data);
//       setClasses(response.data.data || []);
//       if (response.data.data.length > 0) {
//         setSelectedClass(response.data.data[0]._id);
//       }
//     } catch (error) {
//       console.error("Error fetching attendee classes:", error);
//       setMessage("Failed to load classes");
//       setMessageType("error");
//     }
//   };

//   // Fetch students of selected class
//   const fetchStudents = async (classId) => {
//     if (!classId) return;

//     setLoading(true);
//     try {
//       const resp = await axios.get(
//         `${baseApi}/student/fetch-with-query?classId=${classId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const sorted = (resp.data.students || [])
//         .slice()
//         .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

//       setStudents(sorted);
//         console.log("Fetched students:", sorted);
//         resp.data.students.forEach(student => {
//             handleAttandance(student._id, "present");
//         })
//     } catch (err) {
//       console.error("Error fetching students:", err);
//       setMessage("Failed to load students");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAttendeeClass();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchStudents(selectedClass);
//     }
//   }, [selectedClass]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Attendee Teacher
//       </Typography>

//       {classes.length > 0 ? (
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//             You are attendee of {classes.length} classes.
//           </Alert>

//           <FormControl sx={{ mt: 2, minWidth: "210px" }}>
//             <InputLabel>Class</InputLabel>
//             <Select
//               value={selectedClass}
//               label="Class"
//               onChange={(e) => setSelectedClass(e.target.value)}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id}>
//                   {cls.class_text}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Paper>
//       ) : (
//         <Alert severity="error">You are not attendee of any class.</Alert>
//       )}

//       {students.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="right">
//                   <b>Student</b>
//                 </TableCell>
//                 <TableCell align="right">
//                   <b>Action</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.map((student) => (
//                 <TableRow
//                   key={student._id}
//                   sx={{ "&:last-child td,&:last-child th": { border: 0 } }}
//                 >
//                   <TableCell align="right" component="th" scope="row">
//                     {student.name}
//                   </TableCell>
//                   <TableCell align="right">
//                     <FormControl sx={{ marginTop: "10px", minWidth: "210" }}>
//                       <InputLabel>Attendance</InputLabel>
//                       <Select
//                         label="Attendee"
//                            onChange={(e) => { handleAttandance(student._id, e.target.value); }}
//                         value={attendanceStatus[student._id]}
//                       >
//                         <MenuItem value={"present"}>Present</MenuItem>
//                         <MenuItem value={"absent"}>Absent</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//                   </Table>
//                   <Button variant="contained" onClick={submitAttendance}>Take Attendance</Button>
//         </TableContainer>
//       ) : (
//         <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
//           There is no student in this class.
//         </Alert>
//       )}
//     </Box>
//   );
// }






















// import * as React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Typography,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Table,
//   Button,
//   Snackbar,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";

// export default function AttendeeTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [attendanceStatus, setAttendanceStatus] = useState({});

//   // Snackbar state
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handleAttandance = (studentId, status) => {
//     setAttendanceStatus((prevStatus) => ({
//       ...prevStatus,
//       [studentId]: status,
//     }));
//   };

//   const token = localStorage.getItem("token");

//   const singleStudentAttendance = async (studentId, status) => {
//     try {
//       await axios.post(
//         `${baseApi}/attendance/mark`,
//         {
//           studentId,
//           date: new Date(),
//           classId: selectedClass,
//           status,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (error) {
//       console.log("Error=>marking Attendee", error);
//     }
//   };

//   const submitAttendance = async () => {
//     try {
//       await Promise.all(
//         students.map((student) =>
//           singleStudentAttendance(student._id, attendanceStatus[student._id])
//         )
//         );
        
//       // Show success Snackbar
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.log("Error =>All submit error[marking Attendee].", error);
//     }
//   };

//   const fetchAttendeeClass = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/attendee`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(response.data.data || []);
//       if (response.data.data.length > 0) {
//         setSelectedClass(response.data.data[0]._id);
//       }
//     } catch (error) {
//       console.error("Error fetching attendee classes:", error);
//     }
//   };

    
//     const [attendanceChecked,setAttendanceChecked]=useState(false)
//     const checkAttendanceAndFetchStudents = async()=> {
       
//         try {
//             if (selectedClass) {
//                  const responseStudent=await axios.get(`${baseApi}/student/fetch-with-query`,{params:{student_class:selectedClass}})
//                  const response = await axios.get(`${baseApi}/attendance/check/${selectedClass}`);
//                  console.log("CHECK",response)
//              }
//         } catch (error) {
//             console.log("ERROR in Check Attendance",error)
//         }
//     }
// //   const fetchStudents = async (classId) => {
// //     if (!classId) return;
// //     try {
// //       const resp = await axios.get(
// //         `${baseApi}/student/fetch-with-query?classId=${classId}`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       const sorted = (resp.data.students || [])
// //         .slice()
// //         .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
// //       setStudents(sorted);
// //       resp.data.students.forEach((student) => {
// //         handleAttandance(student._id, "present");
// //       });
// //     } catch (err) {
// //       console.error("Error fetching students:", err);
// //     }
// //   };

//     useEffect(() => {
//       checkAttendanceAndFetchStudents();
//     // fetchAttendeeClass();
//   }, [selectedClass]);
// //   useEffect(() => {
// //     if (selectedClass) fetchStudents(selectedClass);
// //   }, [selectedClass]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Attendee Teacher
//       </Typography>

//       {classes.length > 0 ? (
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//             You are attendee of {classes.length} classes.
//           </Alert>

//           <FormControl sx={{ mt: 2, minWidth: "210px" }}>
//             <InputLabel>Class</InputLabel>
//             <Select
//               value={selectedClass}
//               label="Class"
//               onChange={(e) => setSelectedClass(e.target.value)}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id}>
//                   {cls.class_text}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Paper>
//       ) : (
//         <Alert severity="error">You are not attendee of any class.</Alert>
//       )}

//       {students.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="right">
//                   <b>Student</b>
//                 </TableCell>
//                 <TableCell align="right">
//                   <b>Action</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.map((student) => (
//                 <TableRow key={student._id}>
//                   <TableCell align="right">{student.name}</TableCell>
//                   <TableCell align="right">
//                     <FormControl sx={{ mt: 1, minWidth: 210 }}>
//                       <InputLabel>Attendance</InputLabel>
//                       <Select
//                         value={attendanceStatus[student._id]}
//                         onChange={(e) =>
//                           handleAttandance(student._id, e.target.value)
//                         }
//                       >
//                         <MenuItem value={"present"}>Present</MenuItem>
//                         <MenuItem value={"absent"}>Absent</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Button variant="contained" sx={{ m: 2 }} onClick={submitAttendance}>
//             Take Attendance
//           </Button>
//         </TableContainer>
//       ) : (
//         <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
//           There is no student in this class.
//         </Alert>
//       )}

//       {/* Success Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           Attendance submitted successfully!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


















// import * as React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Typography,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Table,
//   Button,
//   Snackbar,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";

// export default function AttendeeTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [attendanceStatus, setAttendanceStatus] = useState({});
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [warningSnackbarOpen, setWarningSnackbarOpen] = useState(false);
//   const [attendanceExists, setAttendanceExists] = useState(false);
//   const [timeWarningOpen, setTimeWarningOpen] = useState(false);

//   const token = localStorage.getItem("token");

//   const handleAttandance = (studentId, status) => {
//     setAttendanceStatus((prev) => ({ ...prev, [studentId]: status }));
//   };

//   // ✅ Helper: check if current time is between 9 AM and 4 PM
//   const isWithinAllowedTime = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     return hours >= 9 && hours < 16; // 9 AM ≤ time < 4 PM
//   };

//   // ✅ Mark single student
//   const singleStudentAttendance = async (studentId, status) => {
//     try {
//       await axios.post(
//         `${baseApi}/attendance/mark`,
//         {
//           studentId,
//           date: new Date(),
//           classId: selectedClass,
//           status,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//     }
//   };

//   // ✅ Submit attendance (with time restriction & single mark/day)
//   const submitAttendance = async () => {
//     // Time restriction check
//     if (!isWithinAllowedTime()) {
//       setTimeWarningOpen(true);
//       return;
//     }

//     // Already marked check
//     if (attendanceExists) {
//       setWarningSnackbarOpen(true);
//       return;
//     }

//     try {
//       await Promise.all(
//         students.map((student) =>
//           singleStudentAttendance(student._id, attendanceStatus[student._id])
//         )
//       );
//       setSnackbarOpen(true);
//       setAttendanceExists(true);
//     } catch (error) {
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   // ✅ Fetch classes where teacher is attendee
//   const fetchAttendeeClass = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/attendee`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = response.data.data || [];
//       setClasses(data);
//       if (data.length > 0 && !selectedClass) {
//         setSelectedClass(data[0]._id);
//       }
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   };

//   // ✅ Fetch students + check attendance
//   const fetchStudents = async (classId) => {
//     if (!classId) return;
//     try {
//       const responseStudent = await axios.get(
//         `${baseApi}/student/fetch-with-query`,
//         {
//           params: { classId },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const sortedStudents = (responseStudent.data.students || []).sort(
//         (a, b) => (a.name || "").localeCompare(b.name || "")
//       );

//       setStudents(sortedStudents);

//       // Default all students as present
//       const initialAttendance = {};
//       sortedStudents.forEach((student) => {
//         initialAttendance[student._id] = "present";
//       });
//       setAttendanceStatus(initialAttendance);

//       // ✅ Check if attendance already exists for today
//       const checkResp = await axios.get(
//         `${baseApi}/attendance/check/${classId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setAttendanceExists(checkResp.data.attendanceExists || false);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       setStudents([]);
//     }
//   };

//   useEffect(() => {
//     fetchAttendeeClass();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) fetchStudents(selectedClass);
//   }, [selectedClass]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Attendee Teacher
//       </Typography>

//       {/* ---- Class Selection ---- */}
//       {classes.length > 0 ? (
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//             You are attendee of {classes.length} classes.
//           </Alert>

//           <FormControl sx={{ mt: 2, minWidth: "210px" }}>
//             <InputLabel>Class</InputLabel>
//             <Select
//               value={selectedClass}
//               label="Class"
//               onChange={(e) => setSelectedClass(e.target.value)}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id}>
//                   {cls.class_text}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Paper>
//       ) : (
//         <Alert severity="error">You are not attendee of any class.</Alert>
//       )}

//       {/* ---- Student List ---- */}
//       {students.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="right">
//                   <b>Student</b>
//                 </TableCell>
//                 <TableCell align="right">
//                   <b>Action</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.map((student) => (
//                 <TableRow key={student._id}>
//                   <TableCell align="right">{student.name}</TableCell>
//                   <TableCell align="right">
//                     <FormControl sx={{ mt: 1, minWidth: 210 }}>
//                       <InputLabel>Attendance</InputLabel>
//                       <Select
//                         value={attendanceStatus[student._id]}
//                         onChange={(e) =>
//                           handleAttandance(student._id, e.target.value)
//                         }
//                         disabled={attendanceExists} // disable if already marked
//                       >
//                         <MenuItem value={"present"}>Present</MenuItem>
//                         <MenuItem value={"absent"}>Absent</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <Button
//             variant="contained"
//             sx={{ m: 2 }}
//             onClick={submitAttendance}
//             disabled={attendanceExists} // disable button after marked
//           >
//             Take Attendance
//           </Button>
//         </TableContainer>
//       ) : (
//         <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
//           There is no student in this class.
//         </Alert>
//       )}

//       {/* ✅ Success Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           Attendance submitted successfully!
//         </Alert>
//       </Snackbar>

//       {/* ⚠️ Already marked warning */}
//       <Snackbar
//         open={warningSnackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setWarningSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="warning" sx={{ width: "100%" }}>
//           Attendance for this class is already marked today!
//         </Alert>
//       </Snackbar>

//       {/* ⚠️ Time restriction warning */}
//       <Snackbar
//         open={timeWarningOpen}
//         autoHideDuration={3000}
//         onClose={() => setTimeWarningOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="error" sx={{ width: "100%" }}>
//           Attendance allowed only between 9 AM – 4 PM!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


























// import * as React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Typography,
//   Button,
//   Snackbar,
//   useMediaQuery,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";

// export default function AttendeeTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [attendanceStatus, setAttendanceStatus] = useState({});
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [warningSnackbarOpen, setWarningSnackbarOpen] = useState(false);
//   const [attendanceExists, setAttendanceExists] = useState(false);
//   const [timeWarningOpen, setTimeWarningOpen] = useState(false);

//   const token = localStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:768px)");

//   const handleAttandance = (studentId, status) => {
//     setAttendanceStatus((prev) => ({ ...prev, [studentId]: status }));
//   };

//   const isWithinAllowedTime = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     return hours >= 9 && hours < 16;
//   };

//   const singleStudentAttendance = async (studentId, status) => {
//     try {
//       await axios.post(
//         `${baseApi}/attendance/mark`,
//         {
//           studentId,
//           date: new Date(),
//           classId: selectedClass,
//           status,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//     }
//   };

//   const submitAttendance = async () => {
//     if (!isWithinAllowedTime()) {
//       setTimeWarningOpen(true);
//       return;
//     }

//     if (attendanceExists) {
//       setWarningSnackbarOpen(true);
//       return;
//     }

//     try {
//       await Promise.all(
//         students.map((student) =>
//           singleStudentAttendance(student._id, attendanceStatus[student._id])
//         )
//       );
//       setSnackbarOpen(true);
//       setAttendanceExists(true);
//     } catch (error) {
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   const fetchAttendeeClass = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/attendee`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = response.data.data || [];
//       setClasses(data);
//       if (data.length > 0 && !selectedClass) setSelectedClass(data[0]._id);
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   };

//   const fetchStudents = async (classId) => {
//     if (!classId) return;
//     try {
//       const responseStudent = await axios.get(
//         `${baseApi}/student/fetch-with-query`,
//         {
//           params: { classId },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const sortedStudents = (responseStudent.data.students || []).sort(
//         (a, b) => (a.name || "").localeCompare(b.name || "")
//       );

//       setStudents(sortedStudents);

//       const initialAttendance = {};
//       sortedStudents.forEach((student) => {
//         initialAttendance[student._id] = "present";
//       });
//       setAttendanceStatus(initialAttendance);

//       const checkResp = await axios.get(
//         `${baseApi}/attendance/check/${classId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAttendanceExists(checkResp.data.attendanceExists || false);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       setStudents([]);
//     }
//   };

//   useEffect(() => {
//     fetchAttendeeClass();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) fetchStudents(selectedClass);
//   }, [selectedClass]);

//   return (
//     <Box sx={{ p: isMobile ? 2 : 3 }}>
//       <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 2 }}>
//         Attendee Teacher
//       </Typography>

//       {classes.length > 0 ? (
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//             You are attendee of {classes.length} classes.
//           </Alert>

//           <FormControl sx={{ mt: 2, minWidth: isMobile ? "100%" : 210 }}>
//             <InputLabel>Class</InputLabel>
//             <Select
//               value={selectedClass}
//               label="Class"
//               onChange={(e) => setSelectedClass(e.target.value)}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id}>
//                   {cls.class_text}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Paper>
//       ) : (
//         <Alert severity="error">You are not attendee of any class.</Alert>
//       )}

//       {/* --- Mobile-friendly student list --- */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {students.map((student) => (
//           <Paper
//             key={student._id}
//             sx={{
//               p: 2,
//               display: "flex",
//               flexDirection: isMobile ? "column" : "row",
//               justifyContent: "space-between",
//               alignItems: isMobile ? "flex-start" : "center",
//             }}
//           >
//             <Typography variant="body1" sx={{ mb: isMobile ? 1 : 0 }}>
//               {student.name}
//             </Typography>
//             <FormControl sx={{ minWidth: isMobile ? "100%" : 180 }}>
//               <InputLabel>Attendance</InputLabel>
//               <Select
//                 value={attendanceStatus[student._id]}
//                 onChange={(e) => handleAttandance(student._id, e.target.value)}
//                 disabled={attendanceExists}
//               >
//                 <MenuItem value={"present"}>Present</MenuItem>
//                 <MenuItem value={"absent"}>Absent</MenuItem>
//               </Select>
//             </FormControl>
//           </Paper>
//         ))}
//       </Box>

//       {students.length > 0 && (
//         <Button
//           variant="contained"
//           sx={{ mt: 2, width: isMobile ? "100%" : "auto" }}
//           onClick={submitAttendance}
//           disabled={attendanceExists}
//         >
//           Take Attendance
//         </Button>
//       )}

//       {/* Snackbars */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           Attendance submitted successfully!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={warningSnackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setWarningSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="warning" sx={{ width: "100%" }}>
//           Attendance for this class is already marked today!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={timeWarningOpen}
//         autoHideDuration={3000}
//         onClose={() => setTimeWarningOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="error" sx={{ width: "100%" }}>
//           Attendance allowed only between 9 AM – 4 PM!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }























// import * as React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Typography,
//   Button,
//   Snackbar,
//   useMediaQuery,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";
// import { motion } from "framer-motion";

// export default function AttendeeTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [attendanceStatus, setAttendanceStatus] = useState({});
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [warningSnackbarOpen, setWarningSnackbarOpen] = useState(false);
//   const [attendanceExists, setAttendanceExists] = useState(false);
//   const [timeWarningOpen, setTimeWarningOpen] = useState(false);

//   const token = localStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:768px)");

//   const handleAttandance = (studentId, status) => {
//     setAttendanceStatus((prev) => ({ ...prev, [studentId]: status }));
//   };

//   const isWithinAllowedTime = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     return hours >= 9 && hours < 16;
//   };

//   const singleStudentAttendance = async (studentId, status) => {
//     try {
//       await axios.post(
//         `${baseApi}/attendance/mark`,
//         {
//           studentId,
//           date: new Date(),
//           classId: selectedClass,
//           status,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//     }
//   };

//   const submitAttendance = async () => {
//     if (!isWithinAllowedTime()) {
//       setTimeWarningOpen(true);
//       return;
//     }
//     if (attendanceExists) {
//       setWarningSnackbarOpen(true);
//       return;
//     }
//     try {
//       await Promise.all(
//         students.map((student) =>
//           singleStudentAttendance(student._id, attendanceStatus[student._id])
//         )
//       );
//       setSnackbarOpen(true);
//       setAttendanceExists(true);
//     } catch (error) {
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   const fetchAttendeeClass = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/attendee`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = response.data.data || [];
//       setClasses(data);
//       if (data.length > 0 && !selectedClass) setSelectedClass(data[0]._id);
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   };

//   const fetchStudents = async (classId) => {
//     if (!classId) return;
//     try {
//       const responseStudent = await axios.get(
//         `${baseApi}/student/fetch-with-query`,
//         {
//           params: { classId },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const sortedStudents = (responseStudent.data.students || []).sort(
//         (a, b) => (a.name || "").localeCompare(b.name || "")
//       );

//       setStudents(sortedStudents);

//       const initialAttendance = {};
//       sortedStudents.forEach((student) => {
//         initialAttendance[student._id] = "present";
//       });
//       setAttendanceStatus(initialAttendance);

//       const checkResp = await axios.get(
//         `${baseApi}/attendance/check/${classId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAttendanceExists(checkResp.data.attendanceExists || false);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       setStudents([]);
//     }
//   };

//   useEffect(() => {
//     fetchAttendeeClass();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) fetchStudents(selectedClass);
//   }, [selectedClass]);

//   // ✅ Compute stats
//   const totalStudents = students.length;
//   const presentCount = Object.values(attendanceStatus).filter(
//     (s) => s === "present"
//   ).length;
//   const absentCount = Object.values(attendanceStatus).filter(
//     (s) => s === "absent"
//   ).length;

//   return (
//     <Box sx={{ p: isMobile ? 2 : 3 }}>
//       <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 3 }}>
//         Attendee Teacher
//       </Typography>

//       {/* --- Class Selection --- */}
//       {classes.length > 0 ? (
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//             You are attendee of {classes.length} classes.
//           </Alert>
//           <FormControl sx={{ mt: 2, minWidth: isMobile ? "100%" : 210 }}>
//             <InputLabel>Class</InputLabel>
//             <Select
//               value={selectedClass}
//               label="Class"
//               onChange={(e) => setSelectedClass(e.target.value)}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id}>
//                   {cls.class_text}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Paper>
//       ) : (
//         <Alert severity="error">You are not attendee of any class.</Alert>
//       )}

//       {/* --- Attendance Stats --- */}
//       {students.length > 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             justifyContent: "space-between",
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           {[
//             { label: "Total Students", value: totalStudents, color: "#3f51b5" },
//             { label: "Present", value: presentCount, color: "#4caf50" },
//             { label: "Absent", value: absentCount, color: "#f44336" },
//           ].map((stat, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.2, duration: 0.5 }}
//             >
//               <Paper
//                 sx={{
//                   p: 2,
//                   textAlign: "center",
//                   flex: 1,
//                   backgroundColor: stat.color,
//                   color: "#fff",
//                   borderRadius: 2,
//                   boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//                 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                   {stat.value}
//                 </Typography>
//                 <Typography variant="body2">{stat.label}</Typography>
//               </Paper>
//             </motion.div>
//           ))}
//         </Box>
//       )}

//       {/* --- Mobile-friendly student list --- */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {students.map((student) => (
//           <motion.div
//             key={student._id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Paper
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: isMobile ? "column" : "row",
//                 justifyContent: "space-between",
//                 alignItems: isMobile ? "flex-start" : "center",
//                 borderLeft: `5px solid ${
//                   attendanceStatus[student._id] === "present"
//                     ? "#4caf50"
//                     : "#f44336"
//                 }`,
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <Typography variant="body1" sx={{ mb: isMobile ? 1 : 0 }}>
//                 {student.name}
//               </Typography>
//               <FormControl sx={{ minWidth: isMobile ? "100%" : 180 }}>
//                 <InputLabel>Attendance</InputLabel>
//                 <Select
//                   value={attendanceStatus[student._id]}
//                   onChange={(e) =>
//                     handleAttandance(student._id, e.target.value)
//                   }
//                   disabled={attendanceExists}
//                 >
//                   <MenuItem value={"present"}>Present</MenuItem>
//                   <MenuItem value={"absent"}>Absent</MenuItem>
//                 </Select>
//               </FormControl>
//             </Paper>
//           </motion.div>
//         ))}
//       </Box>

//       {students.length > 0 && (
//         <Button
//           variant="contained"
//           sx={{ mt: 2, width: isMobile ? "100%" : "auto" }}
//           onClick={submitAttendance}
//           disabled={attendanceExists}
//         >
//           Take Attendance
//         </Button>
//       )}

//       {/* Snackbars */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           Attendance submitted successfully!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={warningSnackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setWarningSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="warning" sx={{ width: "100%" }}>
//           Attendance for this class is already marked today!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={timeWarningOpen}
//         autoHideDuration={3000}
//         onClose={() => setTimeWarningOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="error" sx={{ width: "100%" }}>
//           Attendance allowed only between 9 AM – 4 PM!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }




























// import * as React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Typography,
//   Button,
//   Snackbar,
//   useMediaQuery,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";
// import { motion } from "framer-motion";

// export default function AttendeeTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [attendanceStatus, setAttendanceStatus] = useState({});
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [warningSnackbarOpen, setWarningSnackbarOpen] = useState(false);
//   const [attendanceExists, setAttendanceExists] = useState(false);
//   const [timeWarningOpen, setTimeWarningOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const token = localStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:768px)");

//   const handleAttandance = (studentId, status) => {
//     setAttendanceStatus((prev) => ({ ...prev, [studentId]: status }));
//   };

//   // Update current time every second
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const isWithinAllowedTime = () => {
//     const hours = currentTime.getHours();
//     return hours >= 9 && hours < 16;
//   };

//   const singleStudentAttendance = async (studentId, status) => {
//     try {
//       await axios.post(
//         `${baseApi}/attendance/mark`,
//         {
//           studentId,
//           date: new Date(),
//           classId: selectedClass,
//           status,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//     }
//   };

//   const submitAttendance = async () => {
//     if (!isWithinAllowedTime()) {
//       setTimeWarningOpen(true);
//       return;
//     }
//     if (attendanceExists) {
//       setWarningSnackbarOpen(true);
//       return;
//     }
//     try {
//       await Promise.all(
//         students.map((student) =>
//           singleStudentAttendance(student._id, attendanceStatus[student._id])
//         )
//       );
//       setSnackbarOpen(true);
//       setAttendanceExists(true);
//     } catch (error) {
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   const fetchAttendeeClass = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/attendee`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = response.data.data || [];
//       setClasses(data);
//       if (data.length > 0 && !selectedClass) setSelectedClass(data[0]._id);
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   };

//   const fetchStudents = async (classId) => {
//     if (!classId) return;
//     try {
//       const responseStudent = await axios.get(
//         `${baseApi}/student/fetch-with-query`,
//         {
//           params: { classId },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const sortedStudents = (responseStudent.data.students || []).sort(
//         (a, b) => (a.name || "").localeCompare(b.name || "")
//       );

//       setStudents(sortedStudents);

//       const initialAttendance = {};
//       sortedStudents.forEach((student) => {
//         initialAttendance[student._id] = "present";
//       });
//       setAttendanceStatus(initialAttendance);

//       const checkResp = await axios.get(
//         `${baseApi}/attendance/check/${classId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAttendanceExists(checkResp.data.attendanceExists || false);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       setStudents([]);
//     }
//   };

//   useEffect(() => {
//     fetchAttendeeClass();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) fetchStudents(selectedClass);
//   }, [selectedClass]);

//   // Compute stats
//   const totalStudents = students.length;
//   const presentCount = Object.values(attendanceStatus).filter(
//     (s) => s === "present"
//   ).length;
//   const absentCount = Object.values(attendanceStatus).filter(
//     (s) => s === "absent"
//   ).length;

//   return (
//     <Box sx={{ p: isMobile ? 2 : 3 }}>
//       <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 1 }}>
//         Attendee Teacher
//       </Typography>

//       {/* --- Current Time Display --- */}
//       <Typography variant="body2" sx={{ mb: 2, color: "gray" }}>
//         Current Time: {currentTime.toLocaleTimeString()}{" "}
//         {isWithinAllowedTime()
//           ? "(Attendance allowed)"
//           : "(Attendance not allowed)"}
//       </Typography>

//       {/* --- Class Selection --- */}
//       {classes.length > 0 ? (
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//             You are attendee of {classes.length} classes.
//           </Alert>
//           <FormControl sx={{ mt: 2, minWidth: isMobile ? "100%" : 210 }}>
//             <InputLabel>Class</InputLabel>
//             <Select
//               value={selectedClass}
//               label="Class"
//               onChange={(e) => setSelectedClass(e.target.value)}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id}>
//                   {cls.class_text}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Paper>
//       ) : (
//         <Alert severity="error">You are not attendee of any class.</Alert>
//       )}

//       {/* --- Attendance Stats --- */}
//       {students.length > 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             justifyContent: "space-between",
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           {[
//             { label: "Total Students", value: totalStudents, color: "#3f51b5" },
//             { label: "Present", value: presentCount, color: "#4caf50" },
//             { label: "Absent", value: absentCount, color: "#f44336" },
//           ].map((stat, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.2, duration: 0.5 }}
//             >
//               <Paper
//                 sx={{
//                   p: 2,
//                   textAlign: "center",
//                   flex: 1,
//                   backgroundColor: stat.color,
//                   color: "#fff",
//                   borderRadius: 2,
//                   boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//                 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                   {stat.value}
//                 </Typography>
//                 <Typography variant="body2">{stat.label}</Typography>
//               </Paper>
//             </motion.div>
//           ))}
//         </Box>
//       )}

//       {/* --- Student List --- */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {students.map((student) => (
//           <motion.div
//             key={student._id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Paper
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: isMobile ? "column" : "row",
//                 justifyContent: "space-between",
//                 alignItems: isMobile ? "flex-start" : "center",
//                 borderLeft: `5px solid ${
//                   attendanceStatus[student._id] === "present"
//                     ? "#4caf50"
//                     : "#f44336"
//                 }`,
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <Typography variant="body1" sx={{ mb: isMobile ? 1 : 0 }}>
//                 {student.name}
//               </Typography>
//               <FormControl sx={{ minWidth: isMobile ? "100%" : 180 }}>
//                 <InputLabel>Attendance</InputLabel>
//                 <Select
//                   value={attendanceStatus[student._id]}
//                   onChange={(e) =>
//                     handleAttandance(student._id, e.target.value)
//                   }
//                   disabled={attendanceExists || !isWithinAllowedTime()}
//                 >
//                   <MenuItem value={"present"}>Present</MenuItem>
//                   <MenuItem value={"absent"}>Absent</MenuItem>
//                 </Select>
//               </FormControl>
//             </Paper>
//           </motion.div>
//         ))}
//       </Box>

//       {students.length > 0 && (
//         <Button
//           variant="contained"
//           sx={{ mt: 2, width: isMobile ? "100%" : "auto" }}
//           onClick={submitAttendance}
//           disabled={attendanceExists || !isWithinAllowedTime()}
//         >
//           Take Attendance
//         </Button>
//       )}

//       {/* --- Snackbars --- */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           Attendance submitted successfully at{" "}
//           {currentTime.toLocaleTimeString()}!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={warningSnackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setWarningSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="warning" sx={{ width: "100%" }}>
//           Attendance for this class is already marked today!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={timeWarningOpen}
//         autoHideDuration={3000}
//         onClose={() => setTimeWarningOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="error" sx={{ width: "100%" }}>
//           Attendance allowed only between 9 AM – 4 PM!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }





































// import * as React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Typography,
//   Button,
//   Snackbar,
//   useMediaQuery,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";
// import { motion } from "framer-motion";

// export default function AttendeeTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [attendanceStatus, setAttendanceStatus] = useState({});
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [warningSnackbarOpen, setWarningSnackbarOpen] = useState(false);
//   const [attendanceExists, setAttendanceExists] = useState(false);
//   const [timeWarningOpen, setTimeWarningOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const token = localStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:768px)");

//   const handleAttandance = (studentId, status) => {
//     setAttendanceStatus((prev) => ({ ...prev, [studentId]: status }));
//   };

//   // Update current time every second
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const isWithinAllowedTime = () => {
//     const hours = currentTime.getHours();
//     return hours >= 9 && hours < 16;
//   };

//   const singleStudentAttendance = async (studentId, status) => {
//     try {
//       await axios.post(
//         `${baseApi}/attendance/mark`,
//         {
//           studentId,
//           date: new Date(),
//           classId: selectedClass,
//           status,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//     }
//   };

//   const submitAttendance = async () => {
//     if (!isWithinAllowedTime()) {
//       setTimeWarningOpen(true);
//       return;
//     }
//     if (attendanceExists) {
//       setWarningSnackbarOpen(true);
//       return;
//     }
//     try {
//       await Promise.all(
//         students.map((student) =>
//           singleStudentAttendance(student._id, attendanceStatus[student._id])
//         )
//       );
//       setSnackbarOpen(true);
//       setAttendanceExists(true);
//     } catch (error) {
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   const fetchAttendeeClass = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/attendee`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = response.data.data || [];
//       setClasses(data);
//       if (data.length > 0 && !selectedClass) setSelectedClass(data[0]._id);
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   };

//   const fetchStudents = async (classId) => {
//     if (!classId) return;
//     try {
//       const responseStudent = await axios.get(
//         `${baseApi}/student/fetch-with-query`,
//         {
//           params: { classId },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const sortedStudents = (responseStudent.data.students || []).sort(
//         (a, b) => (a.name || "").localeCompare(b.name || "")
//       );

//       setStudents(sortedStudents);

//       const initialAttendance = {};
//       sortedStudents.forEach((student) => {
//         initialAttendance[student._id] = "present";
//       });
//       setAttendanceStatus(initialAttendance);

//       const checkResp = await axios.get(
//         `${baseApi}/attendance/check/${classId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAttendanceExists(checkResp.data.attendanceExists || false);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       setStudents([]);
//     }
//   };

//   useEffect(() => {
//     fetchAttendeeClass();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) fetchStudents(selectedClass);
//   }, [selectedClass]);

//   // Compute stats
//   const totalStudents = students.length;
//   const presentCount = Object.values(attendanceStatus).filter(
//     (s) => s === "present"
//   ).length;
//   const absentCount = Object.values(attendanceStatus).filter(
//     (s) => s === "absent"
//   ).length;

//   // Animated gradient colors
//   const gradientColors = [
//     "#ff7e5f",
//     "#feb47b",
//     "#6a11cb",
//     "#2575fc",
//     "#11998e",
//     "#38ef7d",
//   ];

//   return (
//     <Box sx={{ p: isMobile ? 2 : 3, fontFamily: "Poppins, sans-serif" }}>
//       <Typography
//         variant={isMobile ? "h5" : "h4"}
//         sx={{ mb: 1, fontWeight: "bold" }}
//       >
//         Attendee Teacher
//       </Typography>

//       {/* --- Current Time --- */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <Typography
//           variant="body2"
//           sx={{ mb: 2, color: "gray", fontStyle: "italic" }}
//         >
//           Current Time: {currentTime.toLocaleTimeString()}{" "}
//           {isWithinAllowedTime()
//             ? "(Attendance allowed)"
//             : "(Attendance not allowed)"}
//         </Typography>
//       </motion.div>

//       {/* --- Class Selection --- */}
//       {classes.length > 0 ? (
//         <Paper
//           sx={{
//             p: 2,
//             mb: 3,
//             borderRadius: 3,
//             boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//           }}
//         >
//           <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//             You are attendee of {classes.length} classes.
//           </Alert>
//           <FormControl sx={{ mt: 2, minWidth: isMobile ? "100%" : 250 }}>
//             <InputLabel>Class</InputLabel>
//             <Select
//               value={selectedClass}
//               label="Class"
//               onChange={(e) => setSelectedClass(e.target.value)}
//             >
//               <MenuItem value="">Select Class</MenuItem>
//               {classes.map((cls) => (
//                 <MenuItem key={cls._id} value={cls._id}>
//                   {cls.class_text}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Paper>
//       ) : (
//         <Alert severity="error">You are not attendee of any class.</Alert>
//       )}

//       {/* --- Animated Attendance Stats --- */}
//       {students.length > 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             gap: 2,
//             mb: 3,
//           }}
//         >
//           {[
//             { label: "Total", value: totalStudents, color: gradientColors[0] },
//             { label: "Present", value: presentCount, color: gradientColors[2] },
//             { label: "Absent", value: absentCount, color: gradientColors[4] },
//           ].map((stat, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.2, duration: 0.5 }}
//             >
//               <Paper
//                 sx={{
//                   p: 3,
//                   flex: 1,
//                   textAlign: "center",
//                   borderRadius: 3,
//                   color: "#fff",
//                   background: `linear-gradient(135deg, ${stat.color}, #000000)`,
//                   boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//                   fontWeight: "bold",
//                   fontSize: isMobile ? "1rem" : "1.2rem",
//                   cursor: "pointer",
//                   "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
//                 }}
//               >
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   {stat.value}
//                 </motion.div>
//                 <Typography variant="body2">{stat.label}</Typography>
//               </Paper>
//             </motion.div>
//           ))}
//         </Box>
//       )}

//       {/* --- Student List --- */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {students.map((student) => (
//           <motion.div
//             key={student._id}
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Paper
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: isMobile ? "column" : "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 borderLeft: `6px solid ${
//                   attendanceStatus[student._id] === "present"
//                     ? "#4caf50"
//                     : "#f44336"
//                 }`,
//                 borderRadius: 2,
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                 transition: "all 0.3s ease",
//                 background: "#fefefe",
//               }}
//             >
//               <Typography
//                 variant="body1"
//                 sx={{ fontWeight: 500, mb: isMobile ? 1 : 0 }}
//               >
//                 {student.name}
//               </Typography>
//               <FormControl sx={{ minWidth: isMobile ? "100%" : 180 }}>
//                 <InputLabel>Attendance</InputLabel>
//                 <Select
//                   value={attendanceStatus[student._id]}
//                   onChange={(e) =>
//                     handleAttandance(student._id, e.target.value)
//                   }
//                   disabled={attendanceExists || !isWithinAllowedTime()}
//                 >
//                   <MenuItem value={"present"}>Present</MenuItem>
//                   <MenuItem value={"absent"}>Absent</MenuItem>
//                 </Select>
//               </FormControl>
//             </Paper>
//           </motion.div>
//         ))}
//       </Box>

//       {students.length > 0 && (
//         <Button
//           variant="contained"
//           sx={{ mt: 3, width: isMobile ? "100%" : "auto", fontWeight: "bold" }}
//           onClick={submitAttendance}
//           disabled={attendanceExists || !isWithinAllowedTime()}
//         >
//           Take Attendance
//         </Button>
//       )}

//       {/* --- Snackbars --- */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           Attendance submitted successfully at{" "}
//           {currentTime.toLocaleTimeString()}!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={warningSnackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setWarningSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="warning" sx={{ width: "100%" }}>
//           Attendance for this class is already marked today!
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={timeWarningOpen}
//         autoHideDuration={3000}
//         onClose={() => setTimeWarningOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="error" sx={{ width: "100%" }}>
//           Attendance allowed only between 9 AM – 4 PM!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }
























import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../../../environment";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Button,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { motion } from "framer-motion";

export default function AttendeeTeacher() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [warningSnackbarOpen, setWarningSnackbarOpen] = useState(false);
  const [attendanceExists, setAttendanceExists] = useState(false);
  const [timeWarningOpen, setTimeWarningOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const token = localStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width:768px)");

  // --- Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAttandance = (studentId, status) => {
    setAttendanceStatus((prev) => ({ ...prev, [studentId]: status }));
  };

  const isWithinAllowedTime = () => {
    const hours = currentTime.getHours();
    return hours >= 9 && hours < 16;
  };

  const singleStudentAttendance = async (studentId, status) => {
    try {
      await axios.post(
        `${baseApi}/attendance/mark`,
        {
          studentId,
          date: new Date(),
          classId: selectedClass,
          status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const submitAttendance = async () => {
    if (!isWithinAllowedTime()) {
      setTimeWarningOpen(true);
      return;
    }

    if (attendanceExists) {
      setWarningSnackbarOpen(true);
      return;
    }

    try {
      await Promise.all(
        students.map((student) =>
          singleStudentAttendance(student._id, attendanceStatus[student._id])
        )
      );
      setSnackbarOpen(true);
      setAttendanceExists(true);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  const fetchAttendeeClass = async () => {
    try {
      const response = await axios.get(`${baseApi}/class/attendee`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.data || [];
      setClasses(data);
      if (data.length > 0 && !selectedClass) setSelectedClass(data[0]._id);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStudents = async (classId) => {
    if (!classId) return;
    try {
      const responseStudent = await axios.get(
        `${baseApi}/student/fetch-with-query`,
        {
          params: { classId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedStudents = (responseStudent.data.students || []).sort(
        (a, b) => (a.name || "").localeCompare(b.name || "")
      );

      setStudents(sortedStudents);

      const initialAttendance = {};
      sortedStudents.forEach((student) => {
        initialAttendance[student._id] = "present";
      });
      setAttendanceStatus(initialAttendance);

      const checkResp = await axios.get(
        `${baseApi}/attendance/check/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttendanceExists(checkResp.data.attendanceExists || false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchAttendeeClass();
  }, []);

  useEffect(() => {
    if (selectedClass) fetchStudents(selectedClass);
  }, [selectedClass]);

  // --- Count present & absent
  const presentCount = Object.values(attendanceStatus).filter(
    (s) => s === "present"
  ).length;
  const absentCount = Object.values(attendanceStatus).filter(
    (s) => s === "absent"
  ).length;

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* --- Header --- */}
      <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 2 }}>
        Attendee Teacher
      </Typography>

      {/* --- Current Time */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Paper
          sx={{
            p: 2,
            mb: 3,
            textAlign: "center",
            borderRadius: 3,
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "#fff",
            fontWeight: "bold",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            fontSize: isMobile ? "1rem" : "1.2rem",
          }}
        >
          <Typography variant="h6" sx={{ mb: 0 }}>
            Current Time
          </Typography>
          <motion.span
            key={currentTime.toLocaleTimeString()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            {currentTime.toLocaleTimeString()}{" "}
            {isWithinAllowedTime() ? "(Allowed)" : "(Not Allowed)"}
          </motion.span>
        </Paper>
      </motion.div>

      {/* --- Class Selection --- */}
      {classes.length > 0 ? (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            You are attendee of {classes.length} classes.
          </Alert>

          <FormControl sx={{ mt: 2, minWidth: isMobile ? "100%" : 210 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={selectedClass}
              label="Class"
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <MenuItem value="">Select Class</MenuItem>
              {classes.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.class_text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      ) : (
        <Alert severity="error">You are not attendee of any class.</Alert>
      )}

      {/* --- Attendance Stats --- */}
      {students.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-around",
              borderRadius: 3,
              background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
              color: "#fff",
              fontWeight: "bold",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography>Total Students: {students.length}</Typography>
            <Typography>Present: {presentCount}</Typography>
            <Typography>Absent: {absentCount}</Typography>
          </Paper>
        </motion.div>
      )}

      {/* --- Student List --- */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {students.map((student) => (
          <Paper
            key={student._id}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
            }}
          >
            <Typography variant="body1" sx={{ mb: isMobile ? 1 : 0 }}>
              {student.name}
            </Typography>
            <FormControl sx={{ minWidth: isMobile ? "100%" : 180 }}>
              <InputLabel>Attendance</InputLabel>
              <Select
                value={attendanceStatus[student._id]}
                onChange={(e) => handleAttandance(student._id, e.target.value)}
                disabled={attendanceExists}
              >
                <MenuItem value={"present"}>Present</MenuItem>
                <MenuItem value={"absent"}>Absent</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        ))}
      </Box>

      {students.length > 0 && (
        <Button
          variant="contained"
          sx={{ mt: 2, width: isMobile ? "100%" : "auto" }}
          onClick={submitAttendance}
          disabled={attendanceExists}
        >
          Take Attendance
        </Button>
      )}

      {/* Snackbars */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Attendance submitted successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={warningSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setWarningSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          Attendance for this class is already marked today!
        </Alert>
      </Snackbar>

      <Snackbar
        open={timeWarningOpen}
        autoHideDuration={3000}
        onClose={() => setTimeWarningOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Attendance allowed only between 9 AM – 4 PM!
        </Alert>
      </Snackbar>
    </Box>
  );
}
