



// import * as React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   CardMedia,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function StudentDetails() {
//   const [studentDetails, setStudentDetails] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   const token = localStorage.getItem("token");

//   // Fetch single class details by ID
//   const fetchClassById = async (classId) => {
//     if (!classId) return null;

//     try {
//       const resp = await axios.get(`${baseApi}/class/single/${classId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // The class object is inside resp.data.data
//       return resp.data.data || null;
//     } catch (error) {
//       console.error(
//         "Error fetching class details:",
//         error.response?.data || error
//       );
//       return null;
//     }
//   };

//   const fetchStudentDetails = async () => {
//     try {
//       // Fetch student data
//       const response = await axios.get(`${baseApi}/student/own-data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const student = response.data.student;

//       // Fetch full class details if student_class exists
//       let classDetails = null;
//       if (student.student_class) {
//         classDetails = await fetchClassById(student.student_class);
//       }

//       // Merge class details into studentDetails
//       setStudentDetails({ ...student, class: classDetails });
//     } catch (error) {
//       console.error(
//         "Error fetching student details:",
//         error.response?.data || error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudentDetails();
//   }, []);

//   if (loading)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );

//   if (!studentDetails)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Typography variant="h6" color="text.secondary">
//           No student details found.
//         </Typography>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: 6,
//         mb: 6,
//         background: "linear-gradient(145deg, #f9fafc, #f0f3f8)",
//         minHeight: "100vh",
//         py: 5,
//       }}
//     >
//       {/* Profile Image */}
//       <CardMedia
//         component="img"
//         image={studentDetails.student_image || "/placeholder.jpg"}
//         alt={studentDetails.name}
//         sx={{
//           width: 240,
//           height: 240,
//           borderRadius: "50%",
//           objectFit: "cover",
//           mb: 3,
//           boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
//           transition: "transform 0.3s ease, box-shadow 0.3s ease",
//           "&:hover": {
//             transform: "scale(1.05)",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//           },
//         }}
//       />

//       {/* Name */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           mb: 0.5,
//           color: "#1976d2",
//           letterSpacing: "0.5px",
//           textAlign: "center",
//         }}
//       >
//         {studentDetails.name}
//       </Typography>

//       <Typography variant="subtitle1" color="text.secondary" mb={3}>
//         Student Profile Overview
//       </Typography>

//       {/* Info Table */}
//       <TableContainer
//         component={Paper}
//         sx={{
//           maxWidth: 700,
//           p: 3,
//           borderRadius: 3,
//           boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//           background: "linear-gradient(145deg, #ffffff, #f0f3f8)",
//         }}
//       >
//         <Table>
//           <TableBody>
//             {[
//               ["Email", studentDetails.email],
//               ["Age", studentDetails.age],
//               ["Gender", studentDetails.gender],
//               ["Class", studentDetails.class?.class_text || "N/A"],
//               ["Section", studentDetails.class?.section || "N/A"],
//               ["Guardian Name", studentDetails.guardian],
//               ["Guardian Phone", studentDetails.guardian_phone],
//               [
//                 "Created At",
//                 new Date(studentDetails.createdAt).toLocaleString(),
//               ],
//             ].map(([label, value]) => (
//               <TableRow
//                 key={label}
//                 sx={{
//                   "&:hover": { backgroundColor: "#e8f0fe" },
//                   transition: "background-color 0.2s ease",
//                 }}
//               >
//                 <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
//                   {label}
//                 </TableCell>
//                 <TableCell align="right" sx={{ color: "#555" }}>
//                   {value}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }










// import * as React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   CardMedia,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function StudentDetails() {
//   const [studentDetails, setStudentDetails] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   const token = localStorage.getItem("token");

//   // Fetch student own data (with class populated)
//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/student/own-data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setStudentDetails(response.data.student);
//     } catch (error) {
//       console.error(
//         "Error fetching student details:",
//         error.response?.data || error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudentDetails();
//   }, []);

//   if (loading)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );

//   if (!studentDetails)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Typography variant="h6" color="text.secondary">
//           No student details found.
//         </Typography>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: 6,
//         mb: 6,
//         background: "linear-gradient(145deg, #f9fafc, #f0f3f8)",
//         minHeight: "100vh",
//         py: 5,
//       }}
//     >
//       {/* Profile Image */}
//       <CardMedia
//         component="img"
//         image={studentDetails.student_image || "/placeholder.jpg"}
//         alt={studentDetails.name}
//         sx={{
//           width: 240,
//           height: 240,
//           borderRadius: "50%",
//           objectFit: "cover",
//           mb: 3,
//           boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
//           transition: "transform 0.3s ease, box-shadow 0.3s ease",
//           "&:hover": {
//             transform: "scale(1.05)",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//           },
//         }}
//       />

//       {/* Name */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           mb: 0.5,
//           color: "#1976d2",
//           letterSpacing: "0.5px",
//           textAlign: "center",
//         }}
//       >
//         {studentDetails.name}
//       </Typography>

//       <Typography variant="subtitle1" color="text.secondary" mb={3}>
//         Student Profile Overview
//       </Typography>

//       {/* Info Table */}
//       <TableContainer
//         component={Paper}
//         sx={{
//           maxWidth: 700,
//           p: 3,
//           borderRadius: 3,
//           boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//           background: "linear-gradient(145deg, #ffffff, #f0f3f8)",
//         }}
//       >
//         <Table>
//           <TableBody>
//             {[
//               ["Email", studentDetails.email],
//               ["Age", studentDetails.age],
//               ["Gender", studentDetails.gender],
//               ["Class", studentDetails.student_class?.class_text || "N/A"],
//               ["Section", studentDetails.student_class?.section || "N/A"],
//               ["Guardian Name", studentDetails.guardian],
//               ["Guardian Phone", studentDetails.guardian_phone],
//               [
//                 "Created At",
//                 new Date(studentDetails.createdAt).toLocaleString(),
//               ],
//             ].map(([label, value]) => (
//               <TableRow
//                 key={label}
//                 sx={{
//                   "&:hover": { backgroundColor: "#e8f0fe" },
//                   transition: "background-color 0.2s ease",
//                 }}
//               >
//                 <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
//                   {label}
//                 </TableCell>
//                 <TableCell align="right" sx={{ color: "#555" }}>
//                   {value}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }












// import * as React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   CardMedia,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function StudentDetails() {
//   const [studentDetails, setStudentDetails] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   const token = localStorage.getItem("token");

//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/student/own-data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudentDetails(response.data.student);
//     } catch (error) {
//       console.error(
//         "Error fetching student details:",
//         error.response?.data || error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudentDetails();
//   }, []);

//   if (loading)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );

//   if (!studentDetails)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Typography variant="h6" color="text.secondary">
//           No student details found.
//         </Typography>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: 6,
//         mb: 6,
//         background: "linear-gradient(145deg, #f9fafc, #f0f3f8)",
//         minHeight: "100vh",
//         py: 5,
//       }}
//     >
//       <CardMedia
//         component="img"
//         image={studentDetails.student_image || "/placeholder.jpg"}
//         alt={studentDetails.name}
//         sx={{
//           width: 240,
//           height: 240,
//           borderRadius: "50%",
//           objectFit: "cover",
//           mb: 3,
//           boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
//           transition: "transform 0.3s ease, box-shadow 0.3s ease",
//           "&:hover": {
//             transform: "scale(1.05)",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//           },
//         }}
//       />

//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           mb: 0.5,
//           color: "#1976d2",
//           letterSpacing: "0.5px",
//           textAlign: "center",
//         }}
//       >
//         {studentDetails.name}
//       </Typography>

//       <Typography variant="subtitle1" color="text.secondary" mb={3}>
//         Student Profile Overview
//       </Typography>

//       <TableContainer
//         component={Paper}
//         sx={{
//           maxWidth: 700,
//           p: 3,
//           borderRadius: 3,
//           boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//           background: "linear-gradient(145deg, #ffffff, #f0f3f8)",
//         }}
//       >
//         <Table>
//           <TableBody>
//             {[
//               ["Email", studentDetails.email],
//               ["Age", studentDetails.age],
//               ["Gender", studentDetails.gender],
//               ["Class", studentDetails.student_class?.class_text || "N/A"],
//               ["Section", studentDetails.student_class?.section || "N/A"],
//               ["Guardian Name", studentDetails.guardian],
//               ["Guardian Phone", studentDetails.guardian_phone],
//               [
//                 "Created At",
//                 new Date(studentDetails.createdAt).toLocaleString(),
//               ],
//             ].map(([label, value]) => (
//               <TableRow
//                 key={label}
//                 sx={{ "&:hover": { backgroundColor: "#e8f0fe" } }}
//               >
//                 <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
//                   {label}
//                 </TableCell>
//                 <TableCell align="right" sx={{ color: "#555" }}>
//                   {value}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }













// import * as React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   CardMedia,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function StudentDetails() {
//   const [studentDetails, setStudentDetails] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   const token = localStorage.getItem("token");

//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/student/own-data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudentDetails(response.data.student);
//     } catch (error) {
//       console.error(
//         "Error fetching student details:",
//         error.response?.data || error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudentDetails();
//   }, []);

//   if (loading)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );

//   if (!studentDetails)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Typography variant="h6" color="text.secondary">
//           No student details found.
//         </Typography>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: 6,
//         mb: 6,
//         background: "linear-gradient(145deg, #f9fafc, #f0f3f8)",
//         minHeight: "100vh",
//         py: 5,
//       }}
//     >
//       <CardMedia
//         component="img"
//         image={studentDetails.student_image || "/placeholder.jpg"}
//         alt={studentDetails.name}
//         sx={{
//           width: 240,
//           height: 240,
//           borderRadius: "50%",
//           objectFit: "cover",
//           mb: 3,
//           boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
//           transition: "transform 0.3s ease, box-shadow 0.3s ease",
//           "&:hover": {
//             transform: "scale(1.05)",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//           },
//         }}
//       />

//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           mb: 0.5,
//           color: "#1976d2",
//           letterSpacing: "0.5px",
//           textAlign: "center",
//         }}
//       >
//         {studentDetails.name}
//       </Typography>

//       <Typography variant="subtitle1" color="text.secondary" mb={3}>
//         Student Profile Overview
//       </Typography>

//       <TableContainer
//         component={Paper}
//         sx={{
//           maxWidth: 700,
//           p: 3,
//           borderRadius: 3,
//           boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//           background: "linear-gradient(145deg, #ffffff, #f0f3f8)",
//         }}
//       >
//         <Table>
//           <TableBody>
//             {[
//               ["Email", studentDetails.email],
//               ["Age", studentDetails.age],
//               ["Gender", studentDetails.gender],
//               [
//                 "Class",
//                 studentDetails.student_class
//                   ? `${studentDetails.student_class.class_text} - ${studentDetails.student_class.class_num}`
//                   : "N/A",
//               ],
//               ["Guardian Name", studentDetails.guardian],
//               ["Guardian Phone", studentDetails.guardian_phone],
//               [
//                 "Created At",
//                 new Date(studentDetails.createdAt).toLocaleString(),
//               ],
//             ].map(([label, value]) => (
//               <TableRow
//                 key={label}
//                 sx={{ "&:hover": { backgroundColor: "#e8f0fe" } }}
//               >
//                 <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
//                   {label}
//                 </TableCell>
//                 <TableCell align="right" sx={{ color: "#555" }}>
//                   {value}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }





// import * as React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   CardMedia,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function StudentDetails() {
//   const [studentDetails, setStudentDetails] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   const token = localStorage.getItem("token");

//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/student/own-data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudentDetails(response.data.student);
//     } catch (error) {
//       console.error(
//         "Error fetching student details:",
//         error.response?.data || error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchStudentDetails();
//   }, []);

//   if (loading)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         sx={{
//           background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//         }}
//       >
//         <CircularProgress size={60} sx={{ color: "#fff" }} />
//       </Box>
//     );

//   if (!studentDetails)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         sx={{
//           background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//         }}
//       >
//         <Typography variant="h6" color="white">
//           No student details found.
//         </Typography>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: 6,
//         mb: 6,
//         px: { xs: 2, sm: 3 },
//         py: 5,
//         background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Vibrant gradient
//         minHeight: "100vh",
//       }}
//     >
//       {/* Profile Image */}
//       <CardMedia
//         component="img"
//         image={studentDetails.student_image || "/placeholder.jpg"}
//         alt={studentDetails.name}
//         sx={{
//           width: { xs: 180, sm: 240 },
//           height: { xs: 180, sm: 240 },
//           borderRadius: "50%",
//           objectFit: "cover",
//           mb: 3,
//           border: "4px solid rgba(255,255,255,0.5)",
//           boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
//           transition: "transform 0.3s ease, box-shadow 0.3s ease",
//           "&:hover": {
//             transform: "scale(1.05)",
//             boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
//           },
//         }}
//       />

//       {/* Name */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           mb: 0.5,
//           color: "#fff",
//           letterSpacing: "0.5px",
//           textAlign: "center",
//           textShadow: "1px 1px 5px rgba(0,0,0,0.4)",
//         }}
//       >
//         {studentDetails.name}
//       </Typography>

//       <Typography
//         variant="subtitle1"
//         sx={{ mb: 3, color: "#e0e0e0", textAlign: "center" }}
//       >
//         Student Profile Overview
//       </Typography>

//       {/* Table Container */}
//       <TableContainer
//         component={Paper}
//         sx={{
//           maxWidth: 700,
//           p: 3,
//           borderRadius: 3,
//           boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
//           background: "rgba(255,255,255,0.9)",
//           backdropFilter: "blur(8px)",
//         }}
//       >
//         <Table>
//           <TableBody>
//             {[
//               ["Email", studentDetails.email],
//               ["Age", studentDetails.age],
//               ["Gender", studentDetails.gender],
//               [
//                 "Class",
//                 studentDetails.student_class
//                   ? `${studentDetails.student_class.class_text} - ${studentDetails.student_class.class_num}`
//                   : "N/A",
//               ],
//               ["Guardian Name", studentDetails.guardian],
//               ["Guardian Phone", studentDetails.guardian_phone],
//               [
//                 "Created At",
//                 new Date(studentDetails.createdAt).toLocaleString(),
//               ],
//             ].map(([label, value]) => (
//               <TableRow
//                 key={label}
//                 sx={{
//                   "&:hover": { backgroundColor: "rgba(33,150,243,0.1)" },
//                   transition: "background-color 0.3s ease",
//                 }}
//               >
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#1976d2",
//                     fontSize: { xs: 14, sm: 16 },
//                   }}
//                 >
//                   {label}
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{
//                     color: "#333",
//                     fontSize: { xs: 14, sm: 16 },
//                   }}
//                 >
//                   {value}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }



















import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { baseApi } from "../../../environment";

export default function StudentDetails() {
  const [studentDetails, setStudentDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const token = localStorage.getItem("token");

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`${baseApi}/student/own-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentDetails(response.data.student);
    } catch (error) {
      console.error(
        "Error fetching student details:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStudentDetails();
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}
      >
        <CircularProgress size={60} sx={{ color: "#fff" }} />
      </Box>
    );

  if (!studentDetails)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}
      >
        <Typography variant="h6" color="white">
          No student details found.
        </Typography>
      </Box>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
          mb: 6,
          px: { xs: 2, sm: 3 },
          py: 5,
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        {/* Profile Image with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <CardMedia
            component="img"
            image={studentDetails.student_image || "/placeholder.jpg"}
            alt={studentDetails.name}
            sx={{
              width: { xs: 180, sm: 240 },
              height: { xs: 180, sm: 240 },
              borderRadius: "50%",
              objectFit: "cover",
              mb: 3,
              border: "5px solid rgba(255,255,255,0.6)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              "&:hover": {
                transform: "scale(1.07)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
              },
            }}
          />
        </motion.div>

        {/* Name and Subtitle */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 0.5,
            letterSpacing: "0.8px",
            textAlign: "center",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {studentDetails.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ mb: 3, color: "#d0d0d0", textAlign: "center" }}
        >
          Student Profile Overview
        </Typography>

        {/* Animated Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 700,
              p: 3,
              borderRadius: 3,
              boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              animation: "floatCard 3s ease-in-out infinite",
              "@keyframes floatCard": {
                "0%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-8px)" },
                "100%": { transform: "translateY(0px)" },
              },
            }}
          >
            <Table>
              <TableBody>
                {[
                  ["Email", studentDetails.email],
                  ["Age", studentDetails.age],
                  ["Gender", studentDetails.gender],
                  [
                    "Class",
                    studentDetails.student_class
                      ? `${studentDetails.student_class.class_text} - ${studentDetails.student_class.class_num}`
                      : "N/A",
                  ],
                  ["Guardian Name", studentDetails.guardian],
                  ["Guardian Phone", studentDetails.guardian_phone],
                  [
                    "Created At",
                    new Date(studentDetails.createdAt).toLocaleString(),
                  ],
                ].map(([label, value]) => (
                  <TableRow
                    key={label}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(33,150,243,0.15)" },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#1976d2",
                        fontSize: { xs: 14, sm: 16 },
                      }}
                    >
                      {label}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "#333",
                        fontSize: { xs: 14, sm: 16 },
                      }}
                    >
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      </Box>
    </motion.div>
  );
}
