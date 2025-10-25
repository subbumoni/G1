// import {  useFormik } from 'formik';
// import React, { useEffect, useState } from 'react'
// import { periodSchema } from '../../../yupSchema/periodSchema';
// import axios from 'axios';


// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";


// import { baseApi } from '../../../environment';
// import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// export default function ScheduleEvent(selectedClass) {
//   const periods = [
//      {id:1, label:'Period 1 (10:00 AM - 11:00 AM)',startTime:"10:00",endTime:"11:00"},
//      {id:2, label:'Period 2 (11:00 AM - 12:00 AM)',startTime:"11:00",endTime:"12:00"},
//      {id:3, label:'Period 3 (12:00 AM - 13:00 AM)',startTime:"12:00",endTime:"13:00"},
//      {id:4, label:'Lunch Break (1:00 PM-2:00 PM)',startTime:"13:00",endTime:"14:00"},
//      {id:5, label:'Period 5 (14:00 AM - 15:00 AM)',startTime:"14:00",endTime:"15:00"},
//      {id:6, label:'Period 6 (15:00 AM - 16:00 AM)',startTime:"15:00",endTime:"16:00"},
//    ]

//   const [teachers, setTeachers] = useState([])
//   const [subjects,setSubjects]=useState([])
//   const initialValues = {
//     teacher: "",
//     subject: "",
//     period: "",
//     date: dayjs(),
//   };
//   const Formik = useFormik({
//     initialValues,
//     validationSchema:periodSchema,
//     onSubmit: (values) => {
//       console.log("Schedule", values)
//       axios.post(`${baseApi}/schedule/create`, {
//         ...values,
//         selectedClass,
//         date: values.date.toISOString(),
//       });
//     },
//   })

//   const fetchData = async () => {
//     const teacherResponse = await axios.get(`${baseApi}/teacher/fetch-with-query`, { params: {} });
//     const subjectResponse = await axios.get(`${baseApi}/subject/all`)
//     setTeachers(teacherResponse.data.teachers)
//     setSubjects(subjectResponse.data.data)
// }
//   useEffect(() => {
//     fetchData()
//   })
//   return (
//     <>
//       <div>ScheduleEvent</div>
//       <Box
//         component="form"
//         sx={{
//           "& > :not(style": { m: 1 },
//           display: "flex",
//           flexDirection: "column",
//           width: "50vw",
//           minWidth: "230px",
//           margin: "auto",
//           background: "#fff",
//         }}
//         noValidate
//         autoComplete="off"
//         onSubmit={Formik.handleSubmit}
//       >
//         {/* <TextField
//           name="email"
//           label="Email"
//           value={Formik.values.email}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//         />
//         {Formik.touched.email && Formik.errors.email && (
//           <p style={{ color: "red", textTransform: "capitalize" }}>
//             {Formik.errors.email}
//           </p>
//         )} */}

//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Teachers</InputLabel>
//           <Select
//             value={Formik.values.teacher}
//             label="Teacher"
//             name="teacher"
//             onChange={Formik.handleChange}
//           >
//             {teachers &&
//               teachers.map((x) => {
//                 return (
//                   <MenuItem key={x._id} value={x._id}>
//                     {x.name}
//                   </MenuItem>
//                 );
//               })}
//           </Select>
//         </FormControl>
//         {Formik.touched.teacher && Formik.errors.teacher && (
//           <p style={{ color: "red", textTransform: "capitalize" }}>
//             {Formik.errors.teacher}
//           </p>
//         )}

//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Subjects</InputLabel>
//           <Select
//             value={Formik.values.subject}
//             label="Subject"
//             name="subject"
//             onChange={Formik.handleChange}
//           >
//             {subjects &&
//               subjects.map((x) => {
//                 return (
//                   <MenuItem key={x._id} value={x._id}>
//                     {x.subject_name}
//                   </MenuItem>
//                 );
//               })}
//           </Select>
//         </FormControl>
//         {Formik.touched.subject && Formik.errors.subject && (
//           <p style={{ color: "red", textTransform: "capitalize" }}>
//             {Formik.errors.subject}
//           </p>
//         )}

//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Periods</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={Formik.values.period}
//             label="Periods"
//             name="period"
//             onChange={Formik.handleChange}
//           >
//             {periods &&
//               periods.map((x) => {
//                 return (
//                   <MenuItem key={x._id} value={`${x.startTime}.${x.endTime}`}>
//                     {x.label}
//                   </MenuItem>
//                 );
//               })}
//           </Select>
//         </FormControl>
//         {Formik.touched.period && Formik.errors.period && (
//           <p style={{ color: "red", textTransform: "capitalize" }}>
//             {Formik.errors.period}
//           </p>
//         )}

//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DemoContainer components={["DatePicker"]}>
//             <DatePicker label="Basic date picker" value={Formik.values.date} onChange={Formik.handleChange}/>
//           </DemoContainer>
//         </LocalizationProvider>

//         <Button type="submit"></Button>
//       </Box>
//     </>
//   );
// }




// import { Formik, useFormik } from "formik";
// import React, { useEffect, useState } from "react";
// import { periodSchema } from "../../../yupSchema/periodSchema";
// import axios from "axios";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";

// export default function ScheduleEvent(selectedClass) {
//   const periods = [
//     {
//       id: 1,
//       label: "Period 1 (10:00 AM - 11:00 AM)",
//       startTime: "10:00",
//       endTime: "11:00",
//     },
//     {
//       id: 2,
//       label: "Period 2 (11:00 AM - 12:00 PM)",
//       startTime: "11:00",
//       endTime: "12:00",
//     },
//     {
//       id: 3,
//       label: "Period 3 (12:00 PM - 01:00 PM)",
//       startTime: "12:00",
//       endTime: "13:00",
//     },
//     {
//       id: 4,
//       label: "Lunch Break (1:00 PM - 2:00 PM)",
//       startTime: "13:00",
//       endTime: "14:00",
//     },
//     {
//       id: 5,
//       label: "Period 5 (2:00 PM - 3:00 PM)",
//       startTime: "14:00",
//       endTime: "15:00",
//     },
//     {
//       id: 6,
//       label: "Period 6 (3:00 PM - 4:00 PM)",
//       startTime: "15:00",
//       endTime: "16:00",
//     },
//   ];

//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const initialValues = {
//     teacher: "",
//     subject: "",
//     period: "",
//     date: dayjs(), // ✅ start with a dayjs object
//   };

//  const formik = useFormik({
//    initialValues,
//    validationSchema: periodSchema,
//    onSubmit: (values) => {
//      let date = new Date(values.date);
//      let startTime = values.period.split("-")[0];
//      let endTime = values.period.split("-")[1];


   
//      console.log("Schedule", { ...values, date, startTime, endTime });

//      axios
//        .post(`${baseApi}/schedule/create`, {
//          ...values,
//          date: values.date.toISOString(),
//          startTime: new Date(
//            date.setHours(startTime.split(":")[0], startTime.split(":")[1], 0, 0)
//          ),
//          endTime: new Date(
//            new Date(values.date).setHours(
//              endTime.split(":")[0],
//              endTime.split(":")[1],
//              0,
//              0
//            )
//          ),
//          selectedClass,
//        })
//        .then((res) => {
//          console.log(" Schedule created successfully:", res.data);
//          alert("Schedule created successfully!");
         
//        })
//        .catch((err) => {
//          console.error(" Error creating schedule:", err);
//          alert("Failed to create schedule. Please try again.");
//        });
//    },
//  });

//   const fetchData = async () => {
//     const teacherResponse = await axios.get(
//       `${baseApi}/teacher/fetch-with-query`
//     );
//     const subjectResponse = await axios.get(`${baseApi}/subject/all`);
//     setTeachers(teacherResponse.data.teachers);
//     setSubjects(subjectResponse.data.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& > :not(style)": { m: 1 },
//         display: "flex",
//         flexDirection: "column",
//         width: "50vw",
//         minWidth: "230px",
//         margin: "auto",
//         background: "#fff",
//         p: 3,
//       }}
//       noValidate
//       autoComplete="off"
//       onSubmit={formik.handleSubmit}
//     >
//       <FormControl fullWidth>
//         <InputLabel>Teachers</InputLabel>
//         <Select
//           value={formik.values.teacher}
//           name="teacher"
//           onChange={formik.handleChange}
//         >
//           {teachers.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Subjects</InputLabel>
//         <Select
//           value={formik.values.subject}
//           name="subject"
//           onChange={formik.handleChange}
//         >
//           {subjects.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.subject_name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Periods</InputLabel>
//         <Select
//           value={formik.values.period}
//           name="period"
//           onChange={formik.handleChange}
//         >
//           {periods.map((x) => (
//             <MenuItem key={x.id} value={`${x.startTime}-${x.endTime}`}>
//               {x.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker"]}>
//           <DatePicker
//             label="Select Date"
//             value={formik.values.date}
//             onChange={(newValue) => formik.setFieldValue("date", newValue)} // ✅ use setFieldValue
//           />
//         </DemoContainer>
//       </LocalizationProvider>

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// }














// import { useFormik } from "formik";
// import React, { useEffect, useState } from "react";
// import { periodSchema } from "../../../yupSchema/periodSchema";
// import axios from "axios";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";

// export default function ScheduleEvent(selectedClass) {
//   const periods = [
//     {
//       id: 1,
//       label: "Period 1 (10:00 AM - 11:00 AM)",
//       startTime: "10:00",
//       endTime: "11:00",
//     },
//     {
//       id: 2,
//       label: "Period 2 (11:00 AM - 12:00 PM)",
//       startTime: "11:00",
//       endTime: "12:00",
//     },
//     {
//       id: 3,
//       label: "Period 3 (12:00 PM - 01:00 PM)",
//       startTime: "12:00",
//       endTime: "13:00",
//     },
//     {
//       id: 4,
//       label: "Lunch Break (1:00 PM - 2:00 PM)",
//       startTime: "13:00",
//       endTime: "14:00",
//     },
//     {
//       id: 5,
//       label: "Period 5 (2:00 PM - 3:00 PM)",
//       startTime: "14:00",
//       endTime: "15:00",
//     },
//     {
//       id: 6,
//       label: "Period 6 (3:00 PM - 4:00 PM)",
//       startTime: "15:00",
//       endTime: "16:00",
//     },
//   ];

//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const initialValues = {
//     teacher: "",
//     subject: "",
//     period: "",
//     date: dayjs(),
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: periodSchema,
//     onSubmit: (values) => {
//       const startTime = values.period.split("-")[0];
//       const endTime = values.period.split("-")[1];

//       // ✅ create separate date objects to avoid mutation issues
//       const startDateTime = new Date(values.date);
//       startDateTime.setHours(
//         startTime.split(":")[0],
//         startTime.split(":")[1],
//         0,
//         0
//       );

//       const endDateTime = new Date(values.date);
//       endDateTime.setHours(endTime.split(":")[0], endTime.split(":")[1], 0, 0);

//       console.log("Schedule", { ...values, startDateTime, endDateTime });

//       axios
//         .post(`${baseApi}/schedule/create`, {
//           teacher: values.teacher,
//           subject: values.subject,
//           startTime: startDateTime,
//           endTime: endDateTime,
//           date: values.date.toISOString(),
//           class: selectedClass.selectedClass, // ✅ send only ID
//         })
//         .then((res) => {
//           console.log("Schedule created successfully:", res.data);
//           alert("Schedule created successfully!");

//         })
//         .catch((err) => {
//           console.error("Error creating schedule:", err);
//           alert("Failed to create schedule. Please try again.");
//         });
//     },
//   });

//   const fetchData = async () => {
//     const teacherResponse = await axios.get(
//       `${baseApi}/teacher/fetch-with-query`
//     );
//     const subjectResponse = await axios.get(`${baseApi}/subject/all`);
//     setTeachers(teacherResponse.data.teachers);
//     setSubjects(subjectResponse.data.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& > :not(style)": { m: 1 },
//         display: "flex",
//         flexDirection: "column",
//         width: "50vw",
//         minWidth: "230px",
//         margin: "auto",
//         background: "#fff",
//         p: 3,
//       }}
//       noValidate
//       autoComplete="off"
//       onSubmit={formik.handleSubmit}
//     >
//       <FormControl fullWidth>
//         <InputLabel>Teachers</InputLabel>
//         <Select
//           value={formik.values.teacher}
//           name="teacher"
//           onChange={formik.handleChange}
//         >
//           {teachers.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Subjects</InputLabel>
//         <Select
//           value={formik.values.subject}
//           name="subject"
//           onChange={formik.handleChange}
//         >
//           {subjects.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.subject_name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Periods</InputLabel>
//         <Select
//           value={formik.values.period}
//           name="period"
//           onChange={formik.handleChange}
//         >
//           {periods.map((x) => (
//             <MenuItem key={x.id} value={`${x.startTime}-${x.endTime}`}>
//               {x.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker"]}>
//           <DatePicker
//             label="Select Date"
//             value={formik.values.date}
//             onChange={(newValue) => formik.setFieldValue("date", newValue)}
//           />
//         </DemoContainer>
//       </LocalizationProvider>

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// }












// import { Formik, useFormik } from "formik";
// import React, { useEffect, useState } from "react";
// import { periodSchema } from "../../../yupSchema/periodSchema";
// import axios from "axios";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";

// export default function ScheduleEvent({
//   selectedClass,
//   refreshEvents,
//   edit,
//   selectedEventId,
// }) {
//   const periods = [
    
//     {
//       id: 1,
//       label: "Period 1 (10:00 AM - 11:00 AM)",
//       startTime: "10:00",
//       endTime: "11:00",
//     },
//     {
//       id: 2,
//       label: "Period 2 (11:00 AM - 12:00 PM)",
//       startTime: "11:00",
//       endTime: "12:00",
//     },
//     {
//       id: 3,
//       label: "Period 3 (12:00 PM - 01:00 PM)",
//       startTime: "12:00",
//       endTime: "13:00",
//     },
//     {
//       id: 4,
//       label: "Lunch Break (1:00 PM - 2:00 PM)",
//       startTime: "13:00",
//       endTime: "14:00",
//     },
//     {
//       id: 5,
//       label: "Period 5 (2:00 PM - 3:00 PM)",
//       startTime: "14:00",
//       endTime: "15:00",
//     },
//     {
//       id: 6,
//       label: "Period 6 (3:00 PM - 4:00 PM)",
//       startTime: "15:00",
//       endTime: "16:00",
//     },
//   ];

//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const formik = useFormik({
//     initialValues: { teacher: "", subject: "", period: "", date: dayjs() },
//     validationSchema: periodSchema,
//     onSubmit: (values) => {
//       const [startTime, endTime] = values.period.split("-");
//       const startDateTime = new Date(values.date);
//       startDateTime.setHours(
//         startTime.split(":")[0],
//         startTime.split(":")[1],
//         0,
//         0
//       );
//       const endDateTime = new Date(values.date);
//       endDateTime.setHours(endTime.split(":")[0], endTime.split(":")[1], 0, 0);

//       let BACKEND_URL=`${baseApi}/schedule/create`
//       if (edit) {
//            BACKEND_URL=`${baseApi}/schedule/update/${selectedEventId}`
//       }
//       axios
//         .post(BACKEND_URL, {
//           teacher: values.teacher,
//           subject: values.subject,
//           startTime: startDateTime,
//           endTime: endDateTime,
//           date: values.date.toISOString(),
//           class: selectedClass,
//         })
//         .then(() => {
//           alert("✅ Schedule created successfully!");
//           if (typeof refreshEvents === "function") refreshEvents();
//         })
//         .catch(() => alert("❌ Failed to create schedule."));
//     },
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const teacherResponse = await axios.get(
//           `${baseApi}/teacher/fetch-with-query`
//         );
//         const subjectResponse = await axios.get(`${baseApi}/subject/all`);
//         setTeachers(teacherResponse.data.teachers || []);
//         setSubjects(subjectResponse.data.data || []);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };
//     fetchData();
//   }, []);

//    const dateFormat = (date) => {
//      const dateHours = date.getHours();
//      const dateMinutes = date.getMinutes();
//      return `${dateHours}:${dateMinutes < 10 ? "0" : ""}${dateMinutes}`;
//    };

//   useEffect(() => {
//     if (selectedEventId) {
//       axios.get(`${baseApi}/schedule/fetch/${selectedEventId}`).then(resp => {
//         let start = new Date(resp.data.data.startTime);
//         let end = new Date(resp.data.data.endTime);
//         formik.setFieldValue("teacher",resp.data.data.teacher)
//         formik.setFieldValue("subject", resp.data.data.subject)
//         formik.setFieldValue("date", start)
//         const finalFormattedTime=dateFormat(start)+','+dateFormat(end)
//         formik.setFieldValue(
//           "period",`${finalFormattedTime}`)
          
//         console.log("RESP",resp)
//       }).catch(e => {
//         console.log("ERROR",e)
//       })
//     }
//   },[selectedEventId])

 

  

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& > :not(style)": { m: 1 },
//         display: "flex",
//         flexDirection: "column",
//         width: "50vw",
//         minWidth: "230px",
//         margin: "auto",
//         background: "#fff",
//         p: 3,
//       }}
//       noValidate
//       autoComplete="off"
//       onSubmit={formik.handleSubmit}
//     >
//       {edit ? (
//         <Typography variant="h4" sx={{ textAlign: "center" }}>
//           Edit Period
//         </Typography>
//       ) : (
//         <Typography variant="h4" sx={{ textAlign: "center" }}>
//           Add New Period
//         </Typography>
//       )}

//       <FormControl fullWidth>
//         <InputLabel>Teachers</InputLabel>
//         <Select
//           value={formik.values.teacher}
//           name="teacher"
//           onChange={formik.handleChange}
//         >
//           {teachers.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Subjects</InputLabel>
//         <Select
//           value={formik.values.subject}
//           name="subject"
//           onChange={formik.handleChange}
//         >
//           {subjects.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.subject_name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Periods</InputLabel>
//         <Select
//           value={formik.values.period}
//           name="period"
//           onChange={formik.handleChange}
//         >
//           {periods.map((x) => (
//             <MenuItem key={x.id} value={`${x.startTime}-${x.endTime}`}>
//               {x.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker"]}>
//           <DatePicker
//             label="Select Date"
//             value={formik.values.date ? dayjs(formik.values.date) : dayjs()}
//             onChange={(newValue) =>
//               formik.setFieldValue("date", dayjs(newValue))
//             }
//             slotProps={{ textField: { fullWidth: true } }}
//           />
//         </DemoContainer>
//       </LocalizationProvider>

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// }








// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import { periodSchema } from "../../../yupSchema/periodSchema";
// import axios from "axios";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";

// export default function ScheduleEvent({
//   selectedClass,
//   refreshEvents,
//   edit,
//   selectedEventId,
// }) {
//   const periods = [
//     {
//       id: 1,
//       label: "Period 1 (09:00-10:00)",
//       startTime: "09:00",
//       endTime: "10:00",
//     },
//     {
//       id: 2,
//       label: "Period 2 (10:00-11:00)",
//       startTime: "10:00",
//       endTime: "11:00",
//     },
//     {
//       id: 3,
//       label: "Period 3 (11:00-12:00)",
//       startTime: "11:00",
//       endTime: "12:00",
//     },
//     {
//       id: 4,
//       label: "Period 4 (12:00-13:00)",
//       startTime: "12:00",
//       endTime: "13:00",
//     },
//     {
//       id: 5,
//       label: "Lunch Break (13:00-14:00)",
//       startTime: "13:00",
//       endTime: "14:00",
//     },
//     {
//       id: 6,
//       label: "Period 5 (14:00-15:00)",
//       startTime: "14:00",
//       endTime: "15:00",
//     },
//     {
//       id: 7,
//       label: "Period 6 (15:00-16:00)",
//       startTime: "15:00",
//       endTime: "16:00",
//     },
//   ];

//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const formik = useFormik({
//     initialValues: { teacher: "", subject: "", period: "", date: dayjs() },
//     validationSchema: periodSchema,
//     onSubmit: async (values) => {
//       try {
//         if (!values.period) {
//           alert("Please select a period!");
//           return;
//         }

//         const [startTime, endTime] = values.period.split("-");
//         const startDateTime = new Date(values.date);
//         startDateTime.setHours(...startTime.split(":"), 0, 0);
//         const endDateTime = new Date(values.date);
//         endDateTime.setHours(...endTime.split(":"), 0, 0);

//         const payload = {
//           teacher: values.teacher,
//           subject: values.subject,
//           startTime: startDateTime,
//           endTime: endDateTime,
//           date: values.date.toISOString(),
//           class: selectedClass,
//         };

//         if (edit && selectedEventId) {
//           await axios.put(
//             `${baseApi}/schedule/update/${selectedEventId}`,
//             payload
//           );
//           alert("✅ Schedule updated successfully!");
//         } else {
//           await axios.post(`${baseApi}/schedule/create`, payload);
//           alert("✅ Schedule created successfully!");
//         }

//         refreshEvents();
//       } catch (err) {
//         console.error("Submit error:", err);
//         alert("❌ Failed to submit schedule.");
//       }
//     },
//   });

//   // Fetch teachers and subjects
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [teacherRes, subjectRes] = await Promise.all([
//           axios.get(`${baseApi}/teacher/fetch-with-query`),
//           axios.get(`${baseApi}/subject/all`),
//         ]);
//         setTeachers(teacherRes.data.teachers || []);
//         setSubjects(subjectRes.data.data || []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // Prefill form for edit
//   useEffect(() => {
//     if (edit && selectedEventId) {
//       axios
//         .get(`${baseApi}/schedule/fetch/${selectedEventId}`)
//         .then((resp) => {
//           const start = new Date(resp.data.data.startTime);
//           const end = new Date(resp.data.data.endTime);

//           formik.setValues({
//             teacher: resp.data.data.teacher,
//             subject: resp.data.data.subject,
//             date: dayjs(start),
//             period: `${String(start.getHours()).padStart(2, "0")}:${String(
//               start.getMinutes()
//             ).padStart(2, "0")}-${String(end.getHours()).padStart(
//               2,
//               "0"
//             )}:${String(end.getMinutes()).padStart(2, "0")}`,
//           });
//         })
//         .catch((err) => console.log("Prefill error:", err));
//     }
//   }, [edit, selectedEventId]);

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& > :not(style)": { m: 1 },
//         display: "flex",
//         flexDirection: "column",
//         width: "50vw",
//         minWidth: "230px",
//         margin: "auto",
//         background: "#fff",
//         p: 3,
//       }}
//       onSubmit={formik.handleSubmit}
//     >
//       <Typography variant="h4" sx={{ textAlign: "center" }}>
//         {edit ? "Edit Period" : "Add New Period"}
//       </Typography>

//       <FormControl fullWidth>
//         <InputLabel>Teachers</InputLabel>
//         <Select
//           value={formik.values.teacher}
//           name="teacher"
//           onChange={formik.handleChange}
//         >
//           {teachers.map((t) => (
//             <MenuItem key={t._id} value={t._id}>
//               {t.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Subjects</InputLabel>
//         <Select
//           value={formik.values.subject}
//           name="subject"
//           onChange={formik.handleChange}
//         >
//           {subjects.map((s) => (
//             <MenuItem key={s._id} value={s._id}>
//               {s.subject_name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Periods</InputLabel>
//         <Select
//           value={formik.values.period}
//           name="period"
//           onChange={formik.handleChange}
//         >
//           {periods.map((p) => (
//             <MenuItem key={p.id} value={`${p.startTime}-${p.endTime}`}>
//               {p.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker"]}>
//           <DatePicker
//             label="Select Date"
//             value={formik.values.date || dayjs()}
//             onChange={(newValue) =>
//               formik.setFieldValue("date", dayjs(newValue))
//             }
//             slotProps={{ textField: { fullWidth: true } }}
//           />
//         </DemoContainer>
//       </LocalizationProvider>

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// }










// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import { periodSchema } from "../../../yupSchema/periodSchema";
// import axios from "axios";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";

// export default function ScheduleEvent({
//   selectedClass,
//   refreshEvents,
//   edit,
//   selectedEventId,
// }) {
//   const periods = [
//     {
//       id: 1,
//       label: "Period 1 (09:00-10:00)",
//       startTime: "09:00",
//       endTime: "10:00",
//     },
//     {
//       id: 2,
//       label: "Period 2 (10:00-11:00)",
//       startTime: "10:00",
//       endTime: "11:00",
//     },
//     {
//       id: 3,
//       label: "Period 3 (11:00-12:00)",
//       startTime: "11:00",
//       endTime: "12:00",
//     },
//     {
//       id: 4,
//       label: "Period 4 (12:00-13:00)",
//       startTime: "12:00",
//       endTime: "13:00",
//     },
//     {
//       id: 5,
//       label: "Lunch Break (13:00-14:00)",
//       startTime: "13:00",
//       endTime: "14:00",
//     },
//     {
//       id: 6,
//       label: "Period 5 (14:00-15:00)",
//       startTime: "14:00",
//       endTime: "15:00",
//     },
//     {
//       id: 7,
//       label: "Period 6 (15:00-16:00)",
//       startTime: "15:00",
//       endTime: "16:00",
//     },
//   ];

//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const formik = useFormik({
//     initialValues: { teacher: "", subject: "", period: "", date: dayjs() },
//     validationSchema: periodSchema,
//     onSubmit: async (values) => {
//       try {
//         if (!values.period) return alert("Please select a period!");
//         const [startTime, endTime] = values.period.split("-");
//         const startDateTime = new Date(values.date);
//         startDateTime.setHours(...startTime.split(":"), 0, 0);
//         const endDateTime = new Date(values.date);
//         endDateTime.setHours(...endTime.split(":"), 0, 0);

//         const payload = {
//           teacher: values.teacher,
//           subject: values.subject,
//           startTime: startDateTime,
//           endTime: endDateTime,
//           date: values.date.toISOString(),
//           class: selectedClass,
//         };

//         if (edit && selectedEventId) {
//           await axios.put(
//             `${baseApi}/schedule/update/${selectedEventId}`,
//             payload
//           );
//           alert("✅ Schedule updated successfully!");
//         } else {
//           await axios.post(`${baseApi}/schedule/create`, payload);
//           alert("✅ Schedule created successfully!");
//         }

//         refreshEvents();
//       } catch (err) {
//         console.error("Submit error:", err);
//         alert("❌ Failed to submit schedule.");
//       }
//     },
//   });

//   // Fetch teachers and subjects
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [teacherRes, subjectRes] = await Promise.all([
//           axios.get(`${baseApi}/teacher/fetch-with-query`),
//           axios.get(`${baseApi}/subject/all`),
//         ]);
//         setTeachers(teacherRes.data.teachers || []);
//         setSubjects(subjectRes.data.data || []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // Prefill form for edit
//   useEffect(() => {
//     if (edit && selectedEventId) {
//       axios.get(`${baseApi}/schedule/fetch/${selectedEventId}`).then((resp) => {
//         const start = new Date(resp.data.data.startTime);
//         const end = new Date(resp.data.data.endTime);
//         formik.setValues({
//           teacher: resp.data.data.teacher,
//           subject: resp.data.data.subject,
//           date: dayjs(start),
//           period: `${String(start.getHours()).padStart(2, "0")}:${String(
//             start.getMinutes()
//           ).padStart(2, "0")}-${String(end.getHours()).padStart(
//             2,
//             "0"
//           )}:${String(end.getMinutes()).padStart(2, "0")}`,
//         });
//       });
//     }
//   }, [edit, selectedEventId]);

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& > :not(style)": { m: 1 },
//         display: "flex",
//         flexDirection: "column",
//         width: "50vw",
//         minWidth: "230px",
//         margin: "auto",
//         background: "#fff",
//         p: 3,
//       }}
//       onSubmit={formik.handleSubmit}
//     >
//       <Typography variant="h4" sx={{ textAlign: "center" }}>
//         {edit ? "Edit Period" : "Add New Period"}
//       </Typography>

//       <FormControl fullWidth>
//         <InputLabel>Teachers</InputLabel>
//         <Select
//           value={formik.values.teacher}
//           name="teacher"
//           onChange={formik.handleChange}
//         >
//           {teachers.map((t) => (
//             <MenuItem key={t._id} value={t._id}>
//               {t.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Subjects</InputLabel>
//         <Select
//           value={formik.values.subject}
//           name="subject"
//           onChange={formik.handleChange}
//         >
//           {subjects.map((s) => (
//             <MenuItem key={s._id} value={s._id}>
//               {s.subject_name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Periods</InputLabel>
//         <Select
//           value={formik.values.period}
//           name="period"
//           onChange={formik.handleChange}
//         >
//           {periods.map((p) => (
//             <MenuItem key={p.id} value={`${p.startTime}-${p.endTime}`}>
//               {p.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker"]}>
//           <DatePicker
//             label="Select Date"
//             value={formik.values.date || dayjs()}
//             onChange={(newValue) =>
//               formik.setFieldValue("date", dayjs(newValue))
//             }
//             slotProps={{ textField: { fullWidth: true } }}
//           />
//         </DemoContainer>
//       </LocalizationProvider>

//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// }




















import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { periodSchema } from "../../../yupSchema/periodSchema";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { baseApi } from "../../../environment";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export default function ScheduleEvent({
  selectedClass,
  refreshEvents,
  edit,
  selectedEventId,
}) {
  const periods = [
    {
      id: 1,
      label: "Period 1 (09:00-10:00)",
      startTime: "09:00",
      endTime: "10:00",
    },
    {
      id: 2,
      label: "Period 2 (10:00-11:00)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 3,
      label: "Period 3 (11:00-12:00)",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: 4,
      label: "Period 4 (12:00-13:00)",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 5,
      label: "Lunch Break (13:00-14:00)",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: 6,
      label: "Period 5 (14:00-15:00)",
      startTime: "14:00",
      endTime: "15:00",
    },
    {
      id: 7,
      label: "Period 6 (15:00-16:00)",
      startTime: "15:00",
      endTime: "16:00",
    },
  ];

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const formik = useFormik({
    initialValues: { teacher: "", subject: "", period: "", date: dayjs() },
    validationSchema: periodSchema,
    onSubmit: async (values) => {
      if (!values.period) return alert("Please select a period!");
      const [startTime, endTime] = values.period.split("-");
      const startDateTime = new Date(values.date);
      startDateTime.setHours(...startTime.split(":"), 0, 0);
      const endDateTime = new Date(values.date);
      endDateTime.setHours(...endTime.split(":"), 0, 0);

      const payload = {
        teacher: values.teacher,
        subject: values.subject,
        startTime: startDateTime,
        endTime: endDateTime,
        date: values.date.toISOString(),
        class: selectedClass,
      };

      try {
        if (edit && selectedEventId) {
          await axios.put(
            `${baseApi}/schedule/update/${selectedEventId}`,
            payload
          );
          alert("✅ Schedule updated successfully!");
        } else {
          await axios.post(`${baseApi}/schedule/create`, payload);
          alert("✅ Schedule created successfully!");
        }
        refreshEvents();
      } catch (err) {
        console.error(err);
        alert("❌ Failed to submit schedule.");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teacherRes, subjectRes] = await Promise.all([
          axios.get(`${baseApi}/teacher/fetch-with-query`),
          axios.get(`${baseApi}/subject/all`),
        ]);
        setTeachers(teacherRes.data.teachers || []);
        setSubjects(subjectRes.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (edit && selectedEventId) {
      axios.get(`${baseApi}/schedule/fetch/${selectedEventId}`).then((resp) => {
        const start = new Date(resp.data.data.startTime);
        const end = new Date(resp.data.data.endTime);
        formik.setValues({
          teacher: resp.data.data.teacher,
          subject: resp.data.data.subject,
          date: dayjs(start),
          period: `${String(start.getHours()).padStart(2, "0")}:${String(
            start.getMinutes()
          ).padStart(2, "0")}-${String(end.getHours()).padStart(
            2,
            "0"
          )}:${String(end.getMinutes()).padStart(2, "0")}`,
        });
      });
    }
  }, [edit, selectedEventId]);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: "400px",
        margin: "20px auto",
        background: "#1e1e1e",
        p: 3,
        borderRadius: "8px",
        color: "#fff",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        {edit ? "Edit Period" : "Add New Period"}
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#fff" }}>Teachers</InputLabel>
        <Select
          value={formik.values.teacher}
          name="teacher"
          onChange={formik.handleChange}
          sx={{ color: "#fff" }}
        >
          {teachers.map((t) => (
            <MenuItem key={t._id} value={t._id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#fff" }}>Subjects</InputLabel>
        <Select
          value={formik.values.subject}
          name="subject"
          onChange={formik.handleChange}
          sx={{ color: "#fff" }}
        >
          {subjects.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.subject_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#fff" }}>Periods</InputLabel>
        <Select
          value={formik.values.period}
          name="period"
          onChange={formik.handleChange}
          sx={{ color: "#fff" }}
        >
          {periods.map((p) => (
            <MenuItem key={p.id} value={`${p.startTime}-${p.endTime}`}>
              {p.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Select Date"
            value={formik.values.date || dayjs()}
            onChange={(newValue) =>
              formik.setFieldValue("date", dayjs(newValue))
            }
            slotProps={{
              textField: { fullWidth: true, sx: { input: { color: "#fff" } } },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
