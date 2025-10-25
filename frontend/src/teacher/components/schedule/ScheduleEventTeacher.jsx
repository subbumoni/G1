
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

// export default function ScheduleEventTeacher({ selectedClass, refreshEvents }) {
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

//       axios
//         .post(`${baseApi}/schedule/create`, {
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



















import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
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

export default function ScheduleEventTeacher({ selectedClass, refreshEvents }) {
  const periods = [
    {
      id: 1,
      label: "Period 1 (10:00 AM - 11:00 AM)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 2,
      label: "Period 2 (11:00 AM - 12:00 PM)",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: 3,
      label: "Period 3 (12:00 PM - 01:00 PM)",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 4,
      label: "Lunch Break (1:00 PM - 2:00 PM)",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: 5,
      label: "Period 5 (2:00 PM - 3:00 PM)",
      startTime: "14:00",
      endTime: "15:00",
    },
    {
      id: 6,
      label: "Period 6 (3:00 PM - 4:00 PM)",
      startTime: "15:00",
      endTime: "16:00",
    },
  ];

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const formik = useFormik({
    initialValues: { teacher: "", subject: "", period: "", date: dayjs() },
    validationSchema: periodSchema,
    onSubmit: (values) => {
      const [startTime, endTime] = values.period.split("-");
      const startDateTime = new Date(values.date);
      startDateTime.setHours(
        startTime.split(":")[0],
        startTime.split(":")[1],
        0,
        0
      );
      const endDateTime = new Date(values.date);
      endDateTime.setHours(endTime.split(":")[0], endTime.split(":")[1], 0, 0);

      axios
        .post(`${baseApi}/schedule/create`, {
          teacher: values.teacher,
          subject: values.subject,
          startTime: startDateTime,
          endTime: endDateTime,
          date: values.date.toISOString(),
          class: selectedClass,
        })
        .then(() => {
          alert("✅ Schedule created successfully!");
          if (typeof refreshEvents === "function") refreshEvents();
        })
        .catch(() => alert("❌ Failed to create schedule."));
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get(
          `${baseApi}/teacher/fetch-with-query`
        );
        const subjectResponse = await axios.get(`${baseApi}/subject/all`);
        setTeachers(teacherResponse.data.teachers || []);
        setSubjects(subjectResponse.data.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#121212",
        color: "white",
        borderRadius: 3,
        p: 3,
        boxShadow: "0 0 20px rgba(255,255,255,0.1)",
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center", mb: 2, color: "#fff" }}
      >
        🗓 Add Schedule Event
      </Typography>

      <FormControl fullWidth>
        <InputLabel sx={{ color: "#fff" }}>Teachers</InputLabel>
        <Select
          value={formik.values.teacher}
          name="teacher"
          onChange={formik.handleChange}
          sx={{ color: "#fff" }}
        >
          {teachers.map((x) => (
            <MenuItem key={x._id} value={x._id}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel sx={{ color: "#fff" }}>Subjects</InputLabel>
        <Select
          value={formik.values.subject}
          name="subject"
          onChange={formik.handleChange}
          sx={{ color: "#fff" }}
        >
          {subjects.map((x) => (
            <MenuItem key={x._id} value={x._id}>
              {x.subject_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel sx={{ color: "#fff" }}>Periods</InputLabel>
        <Select
          value={formik.values.period}
          name="period"
          onChange={formik.handleChange}
          sx={{ color: "#fff" }}
        >
          {periods.map((x) => (
            <MenuItem key={x.id} value={`${x.startTime}-${x.endTime}`}>
              {x.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Select Date"
            value={formik.values.date}
            onChange={(newValue) => formik.setFieldValue("date", newValue)}
            sx={{
              width: "100%",
              input: { color: "#fff" },
              svg: { color: "#fff" },
              label: { color: "#aaa" },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#1565c0" },
          color: "#fff",
          fontWeight: "bold",
          py: 1.2,
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
