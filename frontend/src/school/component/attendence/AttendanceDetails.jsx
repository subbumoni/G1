








// import * as React from "react";
// import { useEffect, useState } from "react";
// import { Navigate, useParams } from "react-router-dom";
// import { baseApi } from "../../../environment";
// import axios from "axios";


// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { styled } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: (theme.vars ?? theme).palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

// export default function AttendanceDetails() {
//   const [present, setPresent] = useState(0);
//   const [absent, setAbsent] = useState(0);
//   const { id: studentId } = useParams().id; //  call hook at top-level
//   const [attendanceData, setAttendanceData] = useState([]);


//   const convertDate = (dateData) => {
//     const date = new Date();

//     return date.getDate() + "-" + (+date.getMonth()+1) + "-" + date.getFullYear();
//   };
//   const fetchAttendanceData = async (studentId) => {
//     try {
//       const response = await axios.get(`${baseApi}/attendance/${studentId}`);
//       setAttendanceData(response.data);


//       const respData = response.data;
//       console.log("RESPONSE ATTENDANCE", respData);
//       if (respData) {
//         respData.forEach((attendance) => {
//           if (attendance.status === "Present") {
//             setPresent(present + 1);
//           } else if (attendance.status === "Absent") {
//             setAbsent(absent + 1);
//           }
//         });
//       }
      
      
//     } catch (error) {
//       console.log("Error in fetching student attendance:", error);
//        Navigate('/school/attendance')
//     }
//   };

//   useEffect(() => {
//     if (studentId) {
//       fetchAttendanceData(studentId); // ✅ pass correct argument
//     }
//   }, [studentId]);

//   return (
//     <>
//       <h1>Attendance Details</h1>

//       <Grid container spacing={2}>
//         <Grid size={4}>
//           <Item>
//             <PieChart
//               series={[
//                 {
//                   data: [
//                     { id: 0, value: present, label: "Present" },
//                     { id: 1, value: absent, label: "Absent" },
                    
//                   ],
//                 },
//               ]}
//               width={200}
//               height={200}
//             />
//           </Item>
//         </Grid>
//         <Grid size={8}>
//           <Item>
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell align="right">Status</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {attendanceData.map((attendance) => (
//                     <TableRow
//                       key={attendance._id}
//                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                     >
//                       <TableCell align="right">
//                         {convertDate(attendance.date)}
//                       </TableCell>
//                       <TableCell align="right">{attendance.status}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Item>
//         </Grid>
//       </Grid>
//     </>
//   );
// }















// import * as React from "react";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { baseApi } from "../../../environment";
// import axios from "axios";

// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { styled } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: (theme.vars ?? theme).palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

// export default function AttendanceDetails() {
//   const [present, setPresent] = useState(0);
//   const [absent, setAbsent] = useState(0);
//   const [attendanceData, setAttendanceData] = useState([]);
//   const { id: studentId } = useParams(); // ✅ Correct extraction
//   const navigate = useNavigate();

//   const convertDate = (dateData) => {
//     const date = new Date(dateData);
//     return (
//       date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear()
//     );
//   };

//   const fetchAttendanceData = async (studentId) => {
//     try {
//       const response = await axios.get(`${baseApi}/attendance/${studentId}`);
//       const respData = response.data.attendance || [];
//       setAttendanceData(respData);

//       // ✅ Calculate Present/Absent counts correctly
//       let presentCount = 0;
//       let absentCount = 0;
//       respData.forEach((attendance) => {
//         if (attendance.status.toLowerCase() === "present") presentCount++;
//         else if (attendance.status.toLowerCase() === "absent") absentCount++;
//       });
//       setPresent(presentCount);
//       setAbsent(absentCount);
//     } catch (error) {
//       console.log("Error in fetching student attendance:", error);
//       navigate("/school/attendance");
//     }
//   };

//   useEffect(() => {
//     if (studentId) {
//       fetchAttendanceData(studentId);
//     }
//   }, [studentId]);

//   return (
//     <>
//       <h1 style={{ color: "#fff", textAlign: "center" }}>Attendance Details</h1>

//       <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto", mt: 2 }}>
//         <Grid item xs={12} md={4}>
//           <Item>
//             <PieChart
//               series={[
//                 {
//                   data: [
//                     { id: 0, value: present, label: "Present" },
//                     { id: 1, value: absent, label: "Absent" },
//                   ],
//                 },
//               ]}
//               width={200}
//               height={200}
//             />
//             <p style={{ color: "#fff", marginTop: "10px" }}>
//               Present: {present} | Absent: {absent}
//             </p>
//           </Item>
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Item>
//             <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//               <Table stickyHeader aria-label="attendance table">
//                 <TableHead>
//                   <TableRow sx={{ backgroundColor: "#1976d2" }}>
//                     <TableCell sx={{ color: "#fff" }}>Date</TableCell>
//                     <TableCell align="right" sx={{ color: "#fff" }}>
//                       Status
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {attendanceData.map((attendance) => (
//                     <TableRow key={attendance._id}>
//                       <TableCell>{convertDate(attendance.date)}</TableCell>
//                       <TableCell align="right">{attendance.status}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Item>
//         </Grid>
//       </Grid>
//     </>
//   );
// }
















// import * as React from "react";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { baseApi } from "../../../environment";
// import axios from "axios";

// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { styled } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: (theme.vars ?? theme).palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

// export default function AttendanceDetails() {
//   const [present, setPresent] = useState(0);
//   const [absent, setAbsent] = useState(0);
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [studentName, setStudentName] = useState("");
//   const { id: studentId } = useParams(); // ✅ Correct extraction
//   const navigate = useNavigate();

//   const convertDate = (dateData) => {
//     const date = new Date(dateData);
//     return (
//       date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear()
//     );
//   };

//   const fetchAttendanceData = async (studentId) => {
//     try {
//       const response = await axios.get(`${baseApi}/attendance/${studentId}`);
//       const respData = response.data.attendance || [];
//       setAttendanceData(respData);
//       setStudentName(response.data.studentName || "Student"); // set student name if backend provides it

//       // ✅ Calculate Present/Absent counts correctly
//       let presentCount = 0;
//       let absentCount = 0;
//       respData.forEach((attendance) => {
//         if (attendance.status.toLowerCase() === "present") presentCount++;
//         else if (attendance.status.toLowerCase() === "absent") absentCount++;
//       });
//       setPresent(presentCount);
//       setAbsent(absentCount);
//     } catch (error) {
//       console.log("Error in fetching student attendance:", error);
//       navigate("/school/attendance");
//     }
//   };

//   useEffect(() => {
//     if (studentId) {
//       fetchAttendanceData(studentId);
//     }
//   }, [studentId]);

//   return (
//     <>
//       <h1 style={{ color: "#fff", textAlign: "center" }}>Attendance Details</h1>
//       {studentName && (
//         <h2
//           style={{ color: "#ccc", textAlign: "center", marginBottom: "20px" }}
//         >
//           {studentName} - Total Records: {attendanceData.length}
//         </h2>
//       )}

//       <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto", mt: 2 }}>
//         <Grid item xs={12} md={4}>
//           <Item>
//             <PieChart
//               series={[
//                 {
//                   data: [
//                     { id: 0, value: present, label: "Present" },
//                     { id: 1, value: absent, label: "Absent" },
//                   ],
//                 },
//               ]}
//               width={200}
//               height={200}
//             />
//             <p style={{ color: "#fff", marginTop: "10px" }}>
//               Present: {present} | Absent: {absent}
//             </p>
//           </Item>
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Item>
//             <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//               <Table stickyHeader aria-label="attendance table">
//                 <TableHead>
//                   <TableRow sx={{ backgroundColor: "#1976d2" }}>
//                     <TableCell sx={{ color: "#fff" }}>Date</TableCell>
//                     <TableCell align="right" sx={{ color: "#fff" }}>
//                       Status
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {attendanceData.map((attendance) => (
//                     <TableRow key={attendance._id}>
//                       <TableCell>{convertDate(attendance.date)}</TableCell>
//                       <TableCell align="right">{attendance.status}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Item>
//         </Grid>
//       </Grid>
//     </>
//   );
// }
















import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseApi } from "../../../environment";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#fff",
}));

export default function AttendanceDetails() {
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentName, setStudentName] = useState("");
  const { id: studentId } = useParams();
  const navigate = useNavigate();

  const convertDate = (dateData) => {
    const date = new Date(dateData);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const fetchAttendanceData = async (studentId) => {
    try {
      const response = await axios.get(`${baseApi}/attendance/${studentId}`);
      const respData = response.data.attendance || [];
      setAttendanceData(respData);

      setStudentName(response.data.studentName || "Student");

      // Calculate Present/Absent counts
      let presentCount = 0;
      let absentCount = 0;
      respData.forEach((attendance) => {
        if (attendance.status.toLowerCase() === "present") presentCount++;
        else if (attendance.status.toLowerCase() === "absent") absentCount++;
      });
      setPresent(presentCount);
      setAbsent(absentCount);
    } catch (error) {
      console.log("Error in fetching student attendance:", error);
      navigate("/school/attendance");
    }
  };

  useEffect(() => {
    if (studentId) fetchAttendanceData(studentId);
  }, [studentId]);

  return (
    <>
      <h1 style={{ color: "#fff", textAlign: "center" }}>Attendance Details</h1>
      <h2 style={{ color: "#ccc", textAlign: "center" }}>{studentName}</h2>
      <p style={{ color: "#aaa", textAlign: "center" }}>
        Total Records: {attendanceData.length}
      </p>

      <Grid container spacing={2} sx={{ maxWidth: "95%", mx: "auto", mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Item>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: present, label: "Present" },
                    { id: 1, value: absent, label: "Absent" },
                  ],
                },
              ]}
              width={250}
              height={250}
            />
            <p style={{ color: "#fff", marginTop: "10px" }}>
              Present: {present} | Absent: {absent}
            </p>
          </Item>
        </Grid>

        <Grid item xs={12} md={8}>
          <Item>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 450,
                backgroundColor: "#1A2027",
                color: "#fff",
              }}
            >
              <Table stickyHeader aria-label="attendance table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                    <TableCell sx={{ color: "#fff" }} align="right">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.map((attendance) => (
                    <TableRow
                      key={attendance._id}
                      sx={{
                        "&:hover": { backgroundColor: "#2A2F3A" },
                        color: "#fff",
                      }}
                    >
                      <TableCell sx={{ color: "#fff" }}>
                        {convertDate(attendance.date)}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="right">
                        {attendance.status}
                      </TableCell>
                    </TableRow>
                  ))}
                  {attendanceData.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        align="center"
                        sx={{ color: "#fff" }}
                      >
                        No attendance records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}




















