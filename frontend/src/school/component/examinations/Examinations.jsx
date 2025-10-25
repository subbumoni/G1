// import * as React from "react";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useFormik } from "formik";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { examinationSchema } from "../../../yupSchema/examinationSchema";
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function Examinations() {
//   const [subjects, setSubjects] = React.useState([]);
//   const [selectedClass, setSelectedClass] = React.useState("");

//   const dateFormat = (dateDate) => {
//     const date = new Date(dateDate);
//     return (
//       date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear()
//     );
//   };

//   const [editId, setEditId] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");

//   const handleEdit = (id) => {
//     setEditId(id);
//     const selectedExamination = examinations.filter((x) => x._id === id);
//     Formik.setFieldValue("date", selectedExamination[0].examDate);
//     Formik.setFieldValue("subject", selectedExamination[0].subject._id);
//     Formik.setFieldValue("examType", selectedExamination[0].examType);
    
//   };

//   const handleEditCancel = () => {
//     setEditId(null);
//     Formik.resetForm();
//   };

//   const handleDelete = async (id) => {
//     if (confirm("Are you sure you want to Delete?")) {
//       try {
//         const response = await axios.delete(
//           `${baseApi}/examination/delete/${id}`
//         );
//         console.log("DELETE", response);
//         setSnackbarMsg("🗑️ Examination deleted successfully!");
//         setSnackbarOpen(true);
//         fetchExaminations();
//       } catch (error) {
//         console.log(
//           "ERROR=> (saving New Examination- Examination Component)",
//           error
//         );
//       }
//     }
//   };

//   const initialValues = {
//     date: "",
//     subject: "",
//     examType: "",
//   };

//   const Formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: examinationSchema,
//     onSubmit: async (value) => {
//       try {
//         let URL = `${baseApi}/examination/create`;
//         let msg = "✅ Examination added successfully!";
//         if (editId) {
//           URL = `${baseApi}/examination/update/${editId}`;
//           msg = "✏️ Examination updated successfully!";
//           fetchExaminations();
//         }
//         const response = await axios.post(URL, {
//           date: value.date,
//           subjectId: value.subject,
//           classId: selectedClass,
//           examType: value.examType,
//         });
//         console.log("Response New Examination", response);
//         setSnackbarMsg(msg);
//         setSnackbarOpen(true);
//       } catch (error) {
//         console.log(
//           "ERROR=> (saving New Examination- Examination Component)",
//           error
//         );
//       }
//     },
//   });

//   const fetchSubjects = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/subject/all`);
//       setSubjects(response.data.data);
//     } catch (error) {
//       console.log("Fetching Error subjects", error);
//     }
//   };

//   const [classes, setClasses] = React.useState([]);
//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/all`);
//       setClasses(response.data.data);
//       // console.log("RESPONSE",response)
//       setSelectedClass(response.data.data[0]._id);
//     } catch (error) {
//       console.log("Fetching Error subjects", error);
//     }
//   };

//   const [examinations, setExaminations] = React.useState([]);
//   const fetchExaminations = async () => {
//     try {
//       if (selectedClass) {
//         const response = await axios.get(
//           `${baseApi}/examination/class/${selectedClass}`
//         );
//         setExaminations(response.data.examinations);
//         console.log("RESPONSE",response)
//       }
//     } catch (error) {
//       console.log("Error IN FETCHING EXAMINATION", error);
//     }
//   };

//   React.useEffect(() => {
//     fetchClasses();
//   }, []);

//   React.useEffect(() => {
//     fetchExaminations();
//     fetchSubjects();
//   }, [selectedClass]);

//   return (
//     <>
//       <Paper sx={{ marginTop: "20px" }}>
//         <Box>
//           <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
//             <InputLabel id="demo-simple-select-label">class</InputLabel>
//             <Select
//               label="Class"
//               onChange={(e) => {
//                 setSelectedClass(e.target.value);
//               }}
//               value={selectedClass}
//             >
//               <MenuItem value={""}>Select Class</MenuItem>
//               {classes.map((x) => {
//                 return (
//                   <MenuItem key={x._id} value={x._id}>
//                     {x.class_text}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//         </Box>
//       </Paper>

//       <Paper>
//         <Box
//           component="form"
//           noValidate
//           autoComplete="off"
//           onSubmit={Formik.handleSubmit}
//           sx={{ width: "24vw", minWidth: "310px", margin: "auto" }}
//         >
//           {editId ? (
//             <Typography variant="h4">Edit Exam</Typography>
//           ) : (
//             <Typography variant="h4">Add New Exam</Typography>
//           )}

//           <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
//             <DemoContainer components={["DatePicker"]} fullWidth>
//               <DatePicker
//                 fullWidth
//                 label="Basic date picker"
//                 value={Formik.values.date ? dayjs(Formik.values.date) : null}
//                 onChange={(newValue) => {
//                   Formik.setFieldValue("date", newValue);
//                 }}
//               />
//               {Formik.touched.date && Formik.errors.date && (
//                 <p style={{ color: "red", textTransform: "capitalize" }}>
//                   {Formik.errors.date}
//                 </p>
//               )}
//             </DemoContainer>
//           </LocalizationProvider>

//           <FormControl fullWidth sx={{ marginTop: "10px" }}>
//             <InputLabel id="demo-simple-select-label">Subject</InputLabel>
//             <Select
//               name="subject"
//               label="Subject"
//               onChange={Formik.handleChange}
//               onBlur={Formik.handleChange}
//               value={Formik.values.subject}
//             >
//               <MenuItem value={""}>Select Subject</MenuItem>
//               {subjects.map((subject) => {
//                 return (
//                   <MenuItem key={subject._id} value={subject._id}>
//                     {subject.subject_name}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>

//           <TextField
//             fullWidth
//             name="examType"
//             value={Formik.values.examType}
//             sx={{ marginTop: "10px" }}
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleChange}
//             label="Exam Type"
//             variant="filled"
//           />

//           <Button sx={{ marginTop: "10px" }} type="submit" variant="contained">
//             Submit
//           </Button>
//           {editId && (
//             <Button
//               sx={{ marginTop: "10px" }}
//               type="button"
//               onClick={handleEditCancel}
//               variant="outlined"
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Paper>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="right">Exam Date</TableCell>
//               <TableCell align="right">Subject</TableCell>
//               <TableCell align="right">Exam Type</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {examinations.map((examination) => (
//               <TableRow
//                 key={examination._id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="right" component="th" scope="row">
//                   {dateFormat(examination.examDate)}
//                 </TableCell>
//                 <TableCell align="right">
//                   {examination.subject ? examination.subject.subject_name : ""}
//                 </TableCell>
//                 <TableCell align="right">{examination.examType}</TableCell>
//                 <TableCell align="right">
//                   <Button
//                     variant="contained"
//                     sx={{ background: "skyblue" }}
//                     onClick={() => {
//                       handleEdit(examination._id);
//                     }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ background: "red", ml: 1 }}
//                     onClick={() => {
//                       handleDelete(examination._id);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* 🌟 World's Most Attractive Snackbar 🌟 */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity="success"
//           variant="filled"
//           sx={{
//             width: "100%",
//             fontWeight: "bold",
//             background: "linear-gradient(90deg, #00C9FF, #92FE9D)",
//             color: "#000",
//             fontSize: "1rem",
//           }}
//         >
//           🌍 {snackbarMsg}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }
//--------------------------------------------------------------







import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { examinationSchema } from "../../../yupSchema/examinationSchema";
import axios from "axios";
import { baseApi } from "../../../environment";

export default function Examinations() {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [examinations, setExaminations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const isMobile = useMediaQuery("(max-width:768px)");

  const dateFormat = (dateData) => {
    const date = new Date(dateData);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  // Fetch classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${baseApi}/class/all`);
      setClasses(response.data.data || []);
      if (response.data.data.length > 0)
        setSelectedClass(response.data.data[0]._id);
    } catch (error) {
      console.error("Error fetching classes", error);
    }
  };

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${baseApi}/subject/all`);
      setSubjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching subjects", error);
    }
  };

  // Fetch examinations
  const fetchExaminations = async () => {
    try {
      if (!selectedClass) return;
      const response = await axios.get(
        `${baseApi}/examination/class/${selectedClass}`
      );
      setExaminations(response.data.examinations || []);
    } catch (error) {
      console.error("Error fetching examinations", error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchExaminations();
  }, [selectedClass]);

  // Formik form
  const formik = useFormik({
    initialValues: { date: "", subject: "", examType: "" },
    validationSchema: examinationSchema,
    onSubmit: async (values) => {
      try {
        let URL = `${baseApi}/examination/create`;
        let msg = "✅ Examination added successfully!";
        if (editId) {
          URL = `${baseApi}/examination/update/${editId}`;
          msg = "✏️ Examination updated successfully!";
        }

        await axios.post(URL, {
          date: values.date,
          subjectId: values.subject,
          classId: selectedClass,
          examType: values.examType,
        });

        setSnackbarMsg(msg);
        setSnackbarOpen(true);
        formik.resetForm();
        setEditId(null);

        fetchExaminations();
      } catch (error) {
        console.error("Error saving exam:", error);
      }
    },
  });

  const handleEdit = (id) => {
    const selectedExam = examinations.find((x) => x._id === id);
    if (!selectedExam) return;
    setEditId(id);
    formik.setFieldValue("date", dayjs(selectedExam.examDate));
    formik.setFieldValue("subject", selectedExam.subject._id);
    formik.setFieldValue("examType", selectedExam.examType);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      await axios.delete(`${baseApi}/examination/delete/${id}`);
      setSnackbarMsg("🗑️ Examination deleted successfully!");
      setSnackbarOpen(true);
      fetchExaminations();
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#121212", minHeight: "100vh" }}>
      {/* Class Selection */}
      <Paper sx={{ p: 2, mb: 3, background: "#1e1e1e" }}>
        <FormControl fullWidth sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: "#fff" }}>Class</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            sx={{
              color: "#fff",
              background: "#2c2c2c",
              "& .MuiSelect-icon": { color: "#fff" },
            }}
          >
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.class_text} ({cls.class_num})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Add/Edit Form */}
      <Zoom in={true}>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            maxWidth: isMobile ? "95%" : 450,
            mx: "auto",
            background: "linear-gradient(135deg, #1f1f1f, #2a2a2a)",
            borderRadius: 3,
            boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
          }}
        >
          <Typography variant="h5" mb={2} color="#fff">
            {editId ? "Edit Examination" : "Add New Examination"}
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Exam Date"
              value={formik.values.date ? dayjs(formik.values.date) : null}
              onChange={(newValue) => formik.setFieldValue("date", newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#aaa" },
                    svg: { color: "#fff" },
                    background: "#2c2c2c",
                    borderRadius: 1,
                  }}
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: "#aaa" }}>Subject</InputLabel>
            <Select
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              sx={{
                color: "#fff",
                background: "#2c2c2c",
              }}
            >
              {subjects.map((subj) => (
                <MenuItem key={subj._id} value={subj._id}>
                  {subj.subject_name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.subject && formik.errors.subject && (
              <Typography color="error" fontSize="small">
                {formik.errors.subject}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Exam Type"
            name="examType"
            value={formik.values.examType}
            onChange={formik.handleChange}
            sx={{
              input: { color: "#fff" },
              label: { color: "#aaa" },
              background: "#2c2c2c",
              borderRadius: 1,
            }}
            error={formik.touched.examType && Boolean(formik.errors.examType)}
            helperText={formik.touched.examType && formik.errors.examType}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg,#00C9FF,#92FE9D)",
                color: "#000",
                flex: 1,
                "&:hover": { opacity: 0.9 },
              }}
              onClick={formik.handleSubmit}
            >
              {editId ? "Update" : "Submit"}
            </Button>
            {editId && (
              <Button
                variant="outlined"
                sx={{
                  flex: 1,
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": { borderColor: "#00C9FF", color: "#00C9FF" },
                }}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Paper>
      </Zoom>

      {/* Examination Table */}
      <TableContainer
        component={Paper}
        sx={{
          background: "#1e1e1e",
          borderRadius: 2,
          maxWidth: isMobile ? "95%" : "100%",
          mx: "auto",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Exam Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Subject</TableCell>
              <TableCell sx={{ color: "#fff" }}>Exam Type</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((exam) => (
              <TableRow
                key={exam._id}
                sx={{
                  "&:hover": { backgroundColor: "#2a2a2a" },
                  transition: "all 0.3s ease",
                }}
              >
                <TableCell sx={{ color: "#fff" }}>
                  {dateFormat(exam.examDate)}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {exam.subject?.subject_name}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{exam.examType}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      background: "skyblue",
                      color: "#000",
                      "&:hover": { opacity: 0.8 },
                    }}
                    onClick={() => handleEdit(exam._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: "red",
                      ml: 1,
                      "&:hover": { opacity: 0.8 },
                    }}
                    onClick={() => handleDelete(exam._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Zoom}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #00C9FF, #92FE9D)",
            color: "#000",
          }}
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}





















// import * as React from "react";
// import { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useFormik } from "formik";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { examinationSchema } from "../../../yupSchema/examinationSchema";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function Examinations() {
//   const [subjects, setSubjects] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [examinations, setExaminations] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");

//   const dateFormat = (dateDate) => {
//     const date = new Date(dateDate);
//     return (
//       date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear()
//     );
//   };

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/all`);
//       setClasses(response.data.data || []);
//       if (response.data.data.length > 0)
//         setSelectedClass(response.data.data[0]._id);
//     } catch (error) {
//       console.error("Error fetching classes", error);
//     }
//   };

//   const fetchSubjects = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/subject/all`);
//       setSubjects(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching subjects", error);
//     }
//   };

//   const fetchExaminations = async () => {
//     try {
//       if (!selectedClass) return;
//       const response = await axios.get(
//         `${baseApi}/examination/class/${selectedClass}`
//       );
//       setExaminations(response.data.examinations || []);
//     } catch (error) {
//       console.error("Error fetching examinations", error);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//     fetchSubjects();
//   }, []);

//   useEffect(() => {
//     fetchExaminations();
//   }, [selectedClass]);

//   const formik = useFormik({
//     initialValues: { date: "", subject: "", examType: "" },
//     validationSchema: examinationSchema,
//     onSubmit: async (values) => {
//       try {
//         let URL = `${baseApi}/examination/create`;
//         let msg = "✅ Examination added successfully!";
//         if (editId) {
//           URL = `${baseApi}/examination/update/${editId}`;
//           msg = "✏️ Examination updated successfully!";
//         }

//         await axios.post(URL, {
//           date: values.date,
//           subjectId: values.subject,
//           classId: selectedClass,
//           examType: values.examType,
//         });

//         setSnackbarMsg(msg);
//         setSnackbarOpen(true);
//         formik.resetForm();
//         setEditId(null);

//         // Refresh exams after create/update
//         fetchExaminations();
//       } catch (error) {
//         console.error("Error saving exam:", error);
//       }
//     },
//   });

//   const handleEdit = (id) => {
//     const selectedExam = examinations.find((x) => x._id === id);
//     if (!selectedExam) return;
//     setEditId(id);
//     formik.setFieldValue("date", selectedExam.examDate);
//     formik.setFieldValue("subject", selectedExam.subject._id);
//     formik.setFieldValue("examType", selectedExam.examType);
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//     formik.resetForm();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this exam?")) return;
//     try {
//       await axios.delete(`${baseApi}/examination/delete/${id}`);
//       setSnackbarMsg("🗑️ Examination deleted successfully!");
//       setSnackbarOpen(true);
//       fetchExaminations();
//     } catch (error) {
//       console.error("Error deleting exam:", error);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Class Selection */}
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>Class</InputLabel>
//           <Select
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//           >
//             {classes.map((cls) => (
//               <MenuItem key={cls._id} value={cls._id}>
//                 {cls.class_text} ({cls.class_num})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Paper>

//       {/* Add/Edit Form */}
//       <Paper sx={{ p: 3, mb: 3, maxWidth: 400, mx: "auto" }}>
//         <Typography variant="h5" mb={2}>
//           {editId ? "Edit Examination" : "Add New Examination"}
//         </Typography>

//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             label="Exam Date"
//             value={formik.values.date ? dayjs(formik.values.date) : null}
//             onChange={(newValue) => formik.setFieldValue("date", newValue)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 fullWidth
//                 margin="normal"
//                 error={formik.touched.date && Boolean(formik.errors.date)}
//                 helperText={formik.touched.date && formik.errors.date}
//               />
//             )}
//           />
//         </LocalizationProvider>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Subject</InputLabel>
//           <Select
//             name="subject"
//             value={formik.values.subject}
//             onChange={formik.handleChange}
//           >
//             {subjects.map((subj) => (
//               <MenuItem key={subj._id} value={subj._id}>
//                 {subj.subject_name}
//               </MenuItem>
//             ))}
//           </Select>
//           {formik.touched.subject && formik.errors.subject && (
//             <Typography color="error" fontSize="small">
//               {formik.errors.subject}
//             </Typography>
//           )}
//         </FormControl>

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Exam Type"
//           name="examType"
//           value={formik.values.examType}
//           onChange={formik.handleChange}
//           error={formik.touched.examType && Boolean(formik.errors.examType)}
//           helperText={formik.touched.examType && formik.errors.examType}
//         />

//         <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//           <Button variant="contained" onClick={formik.handleSubmit}>
//             {editId ? "Update" : "Submit"}
//           </Button>
//           {editId && (
//             <Button variant="outlined" onClick={handleCancelEdit}>
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Paper>

//       {/* Examination Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Exam Date</TableCell>
//               <TableCell>Subject</TableCell>
//               <TableCell>Exam Type</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {examinations.map((exam) => (
//               <TableRow key={exam._id}>
//                 <TableCell>{dateFormat(exam.examDate)}</TableCell>
//                 <TableCell>{exam.subject?.subject_name}</TableCell>
//                 <TableCell>{exam.examType}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     sx={{ background: "skyblue" }}
//                     onClick={() => handleEdit(exam._id)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ background: "red", ml: 1 }}
//                     onClick={() => handleDelete(exam._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity="success"
//           variant="filled"
//           sx={{
//             width: "100%",
//             fontWeight: "bold",
//             background: "linear-gradient(90deg, #00C9FF, #92FE9D)",
//             color: "#000",
//           }}
//           onClose={() => setSnackbarOpen(false)}
//         >
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }















//----------------------------------------
// import * as React from "react";
// import {useState} from 'react'
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useFormik } from "formik";

// // Date
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { examinationSchema } from "../../../yupSchema/examinationSchema";
// import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function Examinations() {

//   const [subjects,setSubjects]=React.useState([])
//   const [selectedClass,setSelectedClass]=React.useState("")

//   const dateFormat = (dateDate) => {
//   const date=new Date(dateDate)
//   const dateHours = date.getHours();
//   const dateMinutes = date.getMinutes();
//     return date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear();
// }

//        const [editId,setEditId]=useState(null)
//   //Handle Edit;
//   const handleEdit = (id) => {
//     setEditId(id);
//     const selectedExamination = examinations.filter(x => x._id === id)
//     Formik.setFieldValue("date", selectedExamination[0].examDate);
//     Formik.setFieldValue("subject", selectedExamination[0].subject._id)
//     Formik.setFieldValue("examType",selectedExamination[0].examType)
//   }

//   const handleEditCancel = () => {
//     setEditId(null);
//     Formik.resetForm()
// }
//   const handleDelete = async(id) => {
//     if (confirm("Are you sure you want to Delete?")) {
//        try {
//          const response = await axios.delete(`${baseApi}/examination/delete/${id}`);
//          console.log('DELETE',response)
//        } catch (error) {
//         console.log("ERROR=> (saving New Examination- Examination Component)",error)
//        }
//      }
//   };

//   const initialValues = {
//     date: "",
//     subject: "",
//     examType:""
//   }

//   const Formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: examinationSchema,
//     onSubmit:async(value) => {

//       try {
//         let URL = `${baseApi}/examination/create`;
//         if (editId) {
//            URL = `${baseApi}/examination/update/${editId}`;
//          }
//          const response=await axios.post(URL, {
//            date: value.date,
//            subjectId: value.subject,
//            classId: selectedClass,
//            examType:value.examType
//          });
//         console.log("Response New Examination", response);
//       } catch (error) {
//         console.log("ERROR=> (saving New Examination- Examination Component)",error)
//       }
//     }
//   })

//   const fetchSubjects = async () => {

//     try {
//       const response = await axios.get(`${baseApi}/subject/all`);
//       setSubjects(response.data.data)
//     } catch (error) {
//       console.log("Fetching Error subjects",error)
//     }

//   };

//   const [classes,setClasses]=React.useState([])
// const fetchClasses = async () => {
//   try {
//     const response = await axios.get(`${baseApi}/class/all`);
//     setClasses(response.data.data);
//      setSelectedClass(response.data.data[0]._id)
//   } catch (error) {
//     console.log("Fetching Error subjects", error);
//   }
// };

//  const [examinations, setExaminations] = React.useState([]);
//   const fetchExaminations = async () => {
//     try {
//       if (selectedClass) {
//         const response = await axios.get(`${baseApi}/examination/class/${selectedClass}`);
//         setExaminations(response.data.examinations);
//       }

//     } catch (error) {
//       console.log("Error IN FETCHING EXAMINATION",error)
//     }
//   }

//   React.useEffect(() => {

//     fetchClasses();
//   },[])

//   React.useEffect(() => {
//     fetchExaminations();
//     fetchSubjects();
//   },[selectedClass])

//   return (
//     <>
//       <Paper sx={{ marginTop: "20px" }}>
//         <Box>
//           <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
//             <InputLabel id="demo-simple-select-label">class</InputLabel>
//             <Select
//               label="Class"
//               onChange={(e) => {
//                 setSelectedClass(e.target.value);
//               }}
//               value={selectedClass}
//             >
//               <MenuItem value={""}>Select Class</MenuItem>
//               {classes.map((x) => {
//                 return (
//                   <MenuItem key={x._id} value={x._id}>
//                     {x.class_text}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//         </Box>
//       </Paper>
//       <Paper>
//         <Box
//           component="form"
//           noValidate
//           autoComplete="off"
//           onSubmit={Formik.handleSubmit}
//           sx={{ width: "24vw", minWidth: "310px", margin: "auto" }}
//         >
//           {editId ? (
//             <Typography variant="h4">Edit Exam</Typography>
//           ) : (
//             <Typography variant="h4">Add New Exam</Typography>
//           )}

//           <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
//             <DemoContainer components={["DatePicker"]} fullWidth>
//               <DatePicker
//                 fullWidth
//                 label="Basic date picker"
//                 value={Formik.values.date ? dayjs(Formik.values.date) : null}
//                 onChange={(newValue) => {
//                   Formik.setFieldValue("date", newValue);
//                 }}
//               />
//               {Formik.touched.date && Formik.errors.date && (
//                 <p style={{ color: "red", textTransform: "capitalize" }}>
//                   {Formik.errors.date}
//                 </p>
//               )}
//             </DemoContainer>
//           </LocalizationProvider>
//           {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
//           <FormControl fullWidth sx={{ marginTop: "10px" }}>
//             <InputLabel id="demo-simple-select-label">Subject</InputLabel>
//             <Select
//               name="subject"
//               label="Subject"
//               onChange={Formik.handleChange}
//               onBlur={Formik.handleChange}
//               value={Formik.values.subject}
//             >
//               <MenuItem value={""}>Select Subject</MenuItem>
//               {subjects.map((subject) => {
//                 return (
//                   <MenuItem key={subject._id} value={subject._id}>
//                     {subject.subject_name}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>

//           {Formik.touched.subject && Formik.errors.subject && (
//             <p style={{ color: "red", textTransform: "capitalize" }}>
//               {Formik.errors.examType}
//             </p>
//           )}
//           <TextField
//             fullWidth
//             name="examType"
//             value={Formik.values.examType}
//             sx={{ marginTop: "10px" }}
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleChange}
//             label="Exam Type"
//             variant="filled"
//           />
//           {Formik.touched.examType && Formik.errors.examType && (
//             <p style={{ color: "red", textTransform: "capitalize" }}>
//               {Formik.errors.examType}
//             </p>
//           )}

//           <Button sx={{ marginTop: "10px" }} type="submit" variant="contained">
//             Submit
//           </Button>
//           {editId && (
//             <Button
//               sx={{ marginTop: "10px" }}
//               type="button"
//               onClick={handleEditCancel}
//               variant="outlined"
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Paper>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="right">Exam Date</TableCell>
//               <TableCell align="right">Subject</TableCell>
//               <TableCell align="right">Exam Type</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {examinations.map((examination) => (
//               <TableRow
//                 key={examination._id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="right" component="th" scope="row">
//                   {dateFormat(examination.examDate)}
//                 </TableCell>
//                 <TableCell align="right">
//                   {examination.subject ? examination.subject.subject_name : ""}
//                 </TableCell>
//                 <TableCell align="right">{examination.examType}</TableCell>
//                 <TableCell align="right">
//                   <Button
//                     variant="contained"
//                     sx={{ background: "skyblue" }}
//                     onClick={() => {
//                       handleEdit(examination._id);
//                     }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ background: "red" }}
//                     onClick={() => {
//                       handleDelete(examination._id);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

// import * as React from "react";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useFormik } from "formik";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";

// // Date
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { examinationSchema } from "../../../yupSchema/examinationSchema";
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function Examinations() {
//   const [subjects, setSubjects] = React.useState([]);
//   const [selectedClass, setSelectedClass] = React.useState("");

//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   const initialValues = {
//     date: "",
//     subject: "",
//     examType: "",
//   };

//   const Formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: examinationSchema,
//     onSubmit: async (value) => {
//       try {
//         const response = await axios.post(`${baseApi}/examination/create`, {
//           date: value.date,
//           subjectId: value.subject,
//           classId: selectedClass,
//           examType: value.examType,
//         });
//         console.log("Response New Examination", response);
//         setOpenSnackbar(true); // ✅ success message trigger
//       } catch (error) {
//         console.log(
//           "ERROR=> (saving New Examination- Examination Component)",
//           error
//         );
//       }
//     },
//   });

//   const fetchSubjects = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/subject/all`);
//       console.log("Examination subjects", response);
//       setSubjects(response.data.data);
//     } catch (error) {
//       console.log("Fetching Error subjects", error);
//     }
//   };

//   const [classes, setClasses] = React.useState([]);
//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/all`);
//       console.log("Examination subjects", response);
//       setClasses(response.data.data);
//     } catch (error) {
//       console.log("Fetching Error subjects", error);
//     }
//   };

//   const [examinations, setExaminations] = React.useState([]);
//   const fetchExaminations = async () => {
//     try {
//       if (selectedClass) {
//         const response = await axios.get(
//           `${baseApi}/examination/class/${selectedClass}`
//         );
//         setExaminations(response.data.examinations);
//       }
//     } catch (error) {
//       console.log("Error IN FETCHING EXAMINATION", error);
//     }
//   };

//   React.useEffect(() => {
//     fetchExaminations();
//     fetchSubjects();
//     fetchClasses();
//   }, [selectedClass]);

//   return (
//     <>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           Examination saved successfully!
//         </Alert>
//       </Snackbar>

//       <Paper sx={{ marginTop: "20px" }}>
//         <Box>
//           <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
//             <InputLabel id="demo-simple-select-label">class</InputLabel>
//             <Select
//               label="Class"
//               onChange={(e) => {
//                 setSelectedClass(e.target.value);
//               }}
//               value={selectedClass}
//             >
//               <MenuItem value={""}>Select Class</MenuItem>
//               {classes.map((x) => {
//                 return (
//                   <MenuItem key={x._id} value={x._id}>
//                     {x.class_text}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//         </Box>
//       </Paper>

//       <Paper>
//         <Box
//           component="form"
//           noValidate
//           autoComplete="off"
//           onSubmit={Formik.handleSubmit}
//           sx={{ width: "24vw", minWidth: "310px", margin: "auto" }}
//         >
//           <Typography variant></Typography>
//           <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
//             <DemoContainer components={["DatePicker"]} fullWidth>
//               <DatePicker
//                 fullWidth
//                 label="Basic date picker"
//                 value={Formik.values.date ? dayjs(Formik.values.date) : null}
//                 onChange={(newValue) => {
//                   Formik.setFieldValue("date", newValue);
//                 }}
//               />
//               {Formik.touched.date && Formik.errors.date && (
//                 <p style={{ color: "red", textTransform: "capitalize" }}>
//                   {Formik.errors.date}
//                 </p>
//               )}
//             </DemoContainer>
//           </LocalizationProvider>

//           <FormControl fullWidth sx={{ marginTop: "10px" }}>
//             <InputLabel id="demo-simple-select-label">Subject</InputLabel>
//             <Select
//               name="subject"
//               label="Subject"
//               onChange={Formik.handleChange}
//               onBlur={Formik.handleChange}
//               value={Formik.values.subject}
//             >
//               <MenuItem value={""}>Select Subject</MenuItem>
//               {subjects.map((subject) => {
//                 return (
//                   <MenuItem key={subject._id} value={subject._id}>
//                     {subject.subject_name}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>

//           {Formik.touched.subject && Formik.errors.subject && (
//             <p style={{ color: "red", textTransform: "capitalize" }}>
//               {Formik.errors.examType}
//             </p>
//           )}
//           <TextField
//             fullWidth
//             name="examType"
//             value={Formik.values.examType}
//             sx={{ marginTop: "10px" }}
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleChange}
//             label="Exam Type"
//             variant="filled"
//           />
//           {Formik.touched.examType && Formik.errors.examType && (
//             <p style={{ color: "red", textTransform: "capitalize" }}>
//               {Formik.errors.examType}
//             </p>
//           )}

//           <Button sx={{ marginTop: "10px" }} type="submit" variant="contained">
//             Submit
//           </Button>
//         </Box>
//       </Paper>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="right">Exam Date</TableCell>
//               <TableCell align="right">Subject</TableCell>
//               <TableCell align="right">Exam Type</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {examinations.map((examination) => (
//               <TableRow
//                 key={examination._id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="right" component="th" scope="row">
//                   {examination.date}
//                 </TableCell>
//                 <TableCell align="right">{examination.subject}</TableCell>
//                 <TableCell align="right">{examination.examType}</TableCell>
//                 <TableCell align="right">"ACTION"</TableCell>

//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }
