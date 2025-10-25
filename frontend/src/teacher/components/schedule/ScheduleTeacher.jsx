




// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import {
//   Button,
//   FormControl,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";

// import axios from "axios";

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { baseApi } from "../../../environment";
// import ScheduleEventTeacher from "./ScheduleEventTeacher";

// const localizer = momentLocalizer(moment);

// export default function ScheduleTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [newPeriod, setNewPeriod] = useState(false);
//   const [events, setEvents] = useState([]);

//   // Formik setup
//   const formik = useFormik({
//     initialValues: { class_text: "", class_num: "" },
//     validationSchema: Yup.object({
//       class_text: Yup.string().required("Class Text is required"),
//       class_num: Yup.string().required("Class Number is required"),
//     }),
//     onSubmit: (values) => console.log("Form submitted:", values),
//   });

//   // Fetch classes
//   useEffect(() => {
//     axios
//       .get(`${baseApi}/class/all`)
//       .then((resp) => {
//         setClasses(resp.data.data);
//         setSelectedClass(resp.data.data[0]?._id || null);
//       })
//       .catch((e) => console.log("Fetch class Err", e));
//   }, []);

//   // Fetch schedules for selected class
//   const fetchSchedules = (classId) => {
//     if (!classId) return;
//     axios
//       .get(`${baseApi}/schedule/fetch-with-query/${classId}`)
//       .then((resp) => {
//         const respData = resp.data.data.map((x) => ({
//           id: x._id,
//           title: `Subject: ${x.subject?.subject_name || x.subject}, Teacher: ${
//             x.teacher?.name || x.teacher
//           }`,
//           start: new Date(x.startTime),
//           end: new Date(x.endTime),
//         }));
//         setEvents(respData);
//       })
//       .catch((e) => console.log("Error fetching schedule:", e));
//   };

//   useEffect(() => {
//     fetchSchedules(selectedClass);
//   }, [selectedClass, newPeriod]); // ✅ Refresh when newPeriod changes

//   return (
//     <div style={{ height: "90vh", padding: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Schedule</h2>

//       <FormControl>
//         <Typography variant="h5">Class</Typography>
//         <Select
//           value={selectedClass || ""} // ✅ Prevent uncontrolled warning
//           onChange={(e) => setSelectedClass(e.target.value)}
//         >
//           {classes.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.class_text}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* <Button onClick={() => setNewPeriod(true)} sx={{ mt: 2 }}>
//         Add Period
//       </Button> */}

//       {newPeriod && (
//         <ScheduleEventTeacher
//           selectedClass={selectedClass}
//           refreshEvents={() => {
//             fetchSchedules(selectedClass);
//             setNewPeriod(false);
//           }}
//         />
//       )}

//       <Calendar
//         localizer={localizer}
//         events={events}
//         defaultView={Views.WEEK}
//         views={[Views.WEEK, Views.DAY, Views.AGENDA]}
//         step={30}
//         timeslots={1}
//         startAccessor="start"
//         endAccessor="end"
//         min={new Date(1970, 1, 1, 9, 0, 0)}
//         max={new Date(1970, 1, 1, 17, 0, 0)}
//         style={{ height: "100%", marginTop: 20 }}
//       />
//     </div>
//   );
// }











// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import {
//   Button,
//   FormControl,
//   MenuItem,
//   Select,
//   Typography,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { baseApi } from "../../../environment";
// import ScheduleEventTeacher from "./ScheduleEventTeacher";

// const localizer = momentLocalizer(moment);

// export default function ScheduleTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [newPeriod, setNewPeriod] = useState(false);
//   const [events, setEvents] = useState([]);

//   const formik = useFormik({
//     initialValues: { class_text: "", class_num: "" },
//     validationSchema: Yup.object({
//       class_text: Yup.string().required("Class Text is required"),
//       class_num: Yup.string().required("Class Number is required"),
//     }),
//     onSubmit: (values) => console.log("Form submitted:", values),
//   });

//   useEffect(() => {
//     axios
//       .get(`${baseApi}/class/all`)
//       .then((resp) => {
//         setClasses(resp.data.data);
//         setSelectedClass(resp.data.data[0]?._id || null);
//       })
//       .catch((e) => console.log("Fetch class Err", e));
//   }, []);

//   const fetchSchedules = (classId) => {
//     if (!classId) return;
//     axios
//       .get(`${baseApi}/schedule/fetch-with-query/${classId}`)
//       .then((resp) => {
//         const respData = resp.data.data.map((x) => ({
//           id: x._id,
//           title: `📘 ${x.subject?.subject_name || x.subject} — 👩‍🏫 ${
//             x.teacher?.name || x.teacher
//           }`,
//           start: new Date(x.startTime),
//           end: new Date(x.endTime),
//         }));
//         setEvents(respData);
//       })
//       .catch((e) => console.log("Error fetching schedule:", e));
//   };

//   useEffect(() => {
//     fetchSchedules(selectedClass);
//   }, [selectedClass, newPeriod]);

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         backgroundColor: "#000",
//         color: "#fff",
//         p: 3,
//         overflowY: "auto",
//       }}
//     >
//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: "center",
//           mb: 3,
//           fontWeight: "bold",
//           color: "#fff",
//         }}
//       >
//         🗓 Teacher Schedule
//       </Typography>

//       <FormControl sx={{ minWidth: 200, mb: 3 }}>
//         <Typography variant="h6" sx={{ mb: 1 }}>
//           Select Class
//         </Typography>
//         <Select
//           value={selectedClass || ""}
//           onChange={(e) => setSelectedClass(e.target.value)}
//           sx={{
//             backgroundColor: "#1c1c1c",
//             color: "#fff",
//             "& .MuiSvgIcon-root": { color: "#fff" },
//           }}
//         >
//           {classes.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.class_text}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* <Button
//         onClick={() => setNewPeriod(!newPeriod)}
//         variant="contained"
//         sx={{
//           mb: 2,
//           backgroundColor: "#1976d2",
//           "&:hover": { backgroundColor: "#1565c0" },
//           color: "#fff",
//           fontWeight: "bold",
//         }}
//       >
//         {newPeriod ? "Close Form" : "➕ Add New Period"}
//       </Button> */}

//       {newPeriod && (
//         <ScheduleEventTeacher
//           selectedClass={selectedClass}
//           refreshEvents={() => {
//             fetchSchedules(selectedClass);
//             setNewPeriod(false);
//           }}
//         />
//       )}

//       <Box
//         sx={{
//           mt: 4,
//           borderRadius: 2,
//           backgroundColor: "#121212",
//           p: 2,
//         }}
//       >
//         <Calendar
//           localizer={localizer}
//           events={events}
//           defaultView={Views.WEEK}
//           views={[Views.WEEK, Views.DAY, Views.AGENDA]}
//           step={30}
//           timeslots={1}
//           startAccessor="start"
//           endAccessor="end"
//           min={new Date(1970, 1, 1, 9, 0, 0)}
//           max={new Date(1970, 1, 1, 17, 0, 0)}
//           style={{
//             height: "70vh",
//             color: "#fff",
//           }}
//         />
//       </Box>
//     </Box>
//   );
// }

























import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { baseApi } from "../../../environment";
import ScheduleEventTeacher from "./ScheduleEventTeacher";

const localizer = momentLocalizer(moment);

export default function ScheduleTeacher() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newPeriod, setNewPeriod] = useState(false);
  const [events, setEvents] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    axios
      .get(`${baseApi}/class/all`)
      .then((resp) => {
        setClasses(resp.data.data);
        setSelectedClass(resp.data.data[0]?._id || null);
      })
      .catch((e) => console.log("Fetch class Err", e));
  }, []);

  const fetchSchedules = (classId) => {
    if (!classId) return;
    axios
      .get(`${baseApi}/schedule/fetch-with-query/${classId}`)
      .then((resp) => {
        const respData = resp.data.data.map((x) => ({
          id: x._id,
          title: `📘 ${x.subject?.subject_name || x.subject} — 👩‍🏫 ${
            x.teacher?.name || x.teacher
          }`,
          start: new Date(x.startTime),
          end: new Date(x.endTime),
        }));
        setEvents(respData);
      })
      .catch((e) => console.log("Error fetching schedule:", e));
  };

  useEffect(() => {
    fetchSchedules(selectedClass);
  }, [selectedClass, newPeriod]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        p: isMobile ? 2 : 4,
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        🗓 Teacher Schedule
      </Typography>

      <FormControl
        sx={{
          minWidth: isMobile ? "100%" : 250,
          mb: 3,
          backgroundColor: "#1c1c1c",
          borderRadius: 2,
        }}
      >
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          sx={{ mb: 1, pl: 1 }}
        >
          Select Class
        </Typography>
        <Select
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)}
          sx={{
            backgroundColor: "#1c1c1c",
            color: "#fff",
            "& .MuiSvgIcon-root": { color: "#fff" },
          }}
        >
          {classes.map((x) => (
            <MenuItem key={x._id} value={x._id}>
              {x.class_text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {newPeriod && (
        <ScheduleEventTeacher
          selectedClass={selectedClass}
          refreshEvents={() => {
            fetchSchedules(selectedClass);
            setNewPeriod(false);
          }}
        />
      )}

      <Box
        sx={{
          mt: 4,
          borderRadius: 3,
          backgroundColor: "#121212",
          p: 2,
          boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={Views.WEEK}
          views={[Views.WEEK, Views.DAY, Views.AGENDA]}
          step={30}
          timeslots={1}
          startAccessor="start"
          endAccessor="end"
          min={new Date(1970, 1, 1, 9, 0, 0)}
          max={new Date(1970, 1, 1, 17, 0, 0)}
          style={{
            height: isMobile ? "65vh" : "75vh",
            fontSize: isMobile ? 12 : 14,
            color: "#fff",
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: 6,
              padding: "4px 6px",
              fontSize: isMobile ? 10 : 13,
              fontWeight: "bold",
            },
          })}
          dayPropGetter={() => ({
            style: {
              borderRight: "1px solid #333",
            },
          })}
        />
      </Box>
    </Box>
  );
}
