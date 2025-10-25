







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
// import ScheduleEvent from "./ScheduleEvent";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const localizer = momentLocalizer(moment);

// export default function Schedule() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);

//   const [newPeriod, setNewPeriod] = useState(false);

//   const today = new Date();

//   // Move myEventsList **before useState**
//   const myEventsList = [
//     {
//       id: 1,
//       title: "Subject: History, Teacher: Hamid",
//       start: new Date(today.setHours(9, 0)),
//       end: new Date(today.setHours(10, 0)),
//     },
//   ];

//   const [events, setEvents] = useState(myEventsList); // ✅ now no error

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       class_text: "",
//       class_num: "",
//     },
//     validationSchema: Yup.object({
//       class_text: Yup.string().required("Class Text is required"),
//       class_num: Yup.string().required("Class Number is required"),
//     }),
//     onSubmit: (values) => {
//       console.log("Form submitted:", values);
//     },
//   });


  
//   // Fetch classes
//   useEffect(() => {
//     axios
//       .get(`${baseApi}/class/all`)
//       .then((resp) => {
//         setClasses(resp.data.data);
//         setSelectedClass(resp.data.data[0]?._id || null);
//         console.log("RESP", resp);
//       })
//       .catch((e) => {
//         console.log("Fetch class Err", e);
//       });
//   }, []);

//   // Fetch schedules for selected class
//   useEffect(() => {
//     if (selectedClass) {
//       axios
//         .get(`${baseApi}/schedule/fetch-with-query/${selectedClass}`)
//         .then((resp) => {
//           const respData = resp.data.data.map((x) => ({
//             id: x._id,
//             title: `Sub:${x.subject},Teacher:${x.teacher}`,
//             start: new Date(x.startTime),
//             end: new Date(x.endTime),
//           }));
//           setEvents(respData);
//         })
//         .catch((e) => {
//           console.log("Error in fetching Schedule.", e);
//         });
//     }
//   }, [selectedClass]); // ✅ run only when selectedClass changes

//   return (
//     <div style={{ height: "90vh", padding: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Schedule</h2>

//       <FormControl>
//         <Typography variant="h5">Class</Typography>
//         <Select
//           value={selectedClass}
//           onChange={(e) => setSelectedClass(e.target.value)}
//         >
//           {classes &&
//             classes.map((x) => (
//               <MenuItem key={x._id} value={x._id}>
//                 {x.class_text}
//               </MenuItem>
//             ))}
//         </Select>
//       </FormControl>

//       <Button onClick={() => setNewPeriod(true)} sx={{ mt: 2 }}>
//         Add Period
//       </Button>

//       {newPeriod && (
//         <ScheduleEvent
//           selectedClass={selectedClass}
//         />
//       )}

//       <Calendar
//         localizer={localizer}
//         events={events} // ✅ use state
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
// } from "@mui/material";
// import ScheduleEvent from "./ScheduleEvent";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const localizer = momentLocalizer(moment);

// export default function Schedule() {
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

//   const [edit, setEdit] = useState(false)
//   const [selectedEventId,setSelectedEventId]=useState(null)

//   const handleSelectEvent = (event) => {
//     setEdit(true)
//      setSelectedEventId(event.id)
//     console.log(event)
//   }

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

//       <Button onClick={() => setNewPeriod(true)} sx={{ mt: 2 }}>
//         Add New Period
//       </Button>

//       {(newPeriod || edit) && (
//         <ScheduleEvent
//           selectedClass={selectedClass}
//           refreshEvents={() => {
//             fetchSchedules(selectedClass);
//             setNewPeriod(false);
//           }}
//           edit={edit}
//           selectedEventId={selectedEventId}
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
//         onSelectEvent={handleSelectEvent}
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
// } from "@mui/material";
// import ScheduleEvent from "./ScheduleEvent";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// const localizer = momentLocalizer(moment);

// export default function Schedule() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [newPeriod, setNewPeriod] = useState(false);
//   const [events, setEvents] = useState([]);

//   const [edit, setEdit] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   // Select event to edit
//   const handleSelectEvent = (event) => {
//     setEdit(true);
//     setSelectedEventId(event.id);
//   };

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
//   }, [selectedClass, newPeriod]);

//   return (
//     <div style={{ height: "90vh", padding: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Schedule</h2>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Typography variant="h5">Class</Typography>
//         <Select
//           value={selectedClass || ""}
//           onChange={(e) => setSelectedClass(e.target.value)}
//         >
//           {classes.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.class_text}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button onClick={() => setNewPeriod(true)} sx={{ mb: 2 }}>
//         Add New Period
//       </Button>

//       {(newPeriod || edit) && (
//         <ScheduleEvent
//           selectedClass={selectedClass}
//           refreshEvents={() => {
//             fetchSchedules(selectedClass);
//             setNewPeriod(false);
//             setEdit(false);
//             setSelectedEventId(null);
//           }}
//           edit={edit}
//           selectedEventId={selectedEventId}
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
//         onSelectEvent={handleSelectEvent}
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
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// import {
//   Button,
//   FormControl,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import ScheduleEvent from "./ScheduleEvent";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// const localizer = momentLocalizer(moment);
// const DragAndDropCalendar = withDragAndDrop(Calendar);

// export default function Schedule() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [newPeriod, setNewPeriod] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [edit, setEdit] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   const handleSelectEvent = (event) => {
//     setEdit(true);
//     setSelectedEventId(event.id);
//   };

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

//   // Fetch schedules
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
//   }, [selectedClass, newPeriod]);

//   // Drag & Drop Event Update
//   const moveEvent = async ({ event, start, end }) => {
//     try {
//       await axios.put(`${baseApi}/schedule/update/${event.id}`, {
//         startTime: start,
//         endTime: end,
//       });
//       fetchSchedules(selectedClass);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to move event.");
//     }
//   };

//   // Event style for dark mode & current day/ongoing highlight
//   const eventStyleGetter = (event) => {
//     const now = new Date();
//     const isCurrent = now >= event.start && now <= event.end;
//     return {
//       style: {
//         backgroundColor: isCurrent ? "#ff4081" : "#2196f3",
//         color: "#fff",
//         borderRadius: "4px",
//         border: "none",
//         padding: "2px",
//       },
//     };
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         padding: "10px",
//         background: "#121212",
//         color: "#fff",
//       }}
//     >
//       <Typography variant="h3" align="center" gutterBottom>
//         Schedule
//       </Typography>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Typography variant="h6" color="#fff">
//           Class
//         </Typography>
//         <Select
//           value={selectedClass || ""}
//           onChange={(e) => setSelectedClass(e.target.value)}
//           sx={{ color: "#fff", background: "#1e1e1e" }}
//         >
//           {classes.map((x) => (
//             <MenuItem key={x._id} value={x._id}>
//               {x.class_text}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button
//         variant="contained"
//         onClick={() => setNewPeriod(true)}
//         sx={{ mb: 2 }}
//       >
//         Add New Period
//       </Button>

//       {(newPeriod || edit) && (
//         <ScheduleEvent
//           selectedClass={selectedClass}
//           refreshEvents={() => {
//             fetchSchedules(selectedClass);
//             setNewPeriod(false);
//             setEdit(false);
//             setSelectedEventId(null);
//           }}
//           edit={edit}
//           selectedEventId={selectedEventId}
//         />
//       )}

//       <DragAndDropCalendar
//         localizer={localizer}
//         events={events}
//         defaultView={Views.WEEK}
//         views={[Views.WEEK, Views.DAY, Views.AGENDA]}
//         step={30}
//         timeslots={1}
//         startAccessor="start"
//         endAccessor="end"
//         onSelectEvent={handleSelectEvent}
//         onEventDrop={moveEvent}
//         style={{ height: "70vh", marginTop: 20 }}
//         min={new Date(1970, 1, 1, 8, 0, 0)}
//         max={new Date(1970, 1, 1, 18, 0, 0)}
//         eventPropGetter={eventStyleGetter}
//       />
//     </div>
//   );
// }


















import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";

import ScheduleEvent from "./ScheduleEvent";
import axios from "axios";
import { baseApi } from "../../../environment";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default function Schedule() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newPeriod, setNewPeriod] = useState(false);
  const [events, setEvents] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const isMobile = useMediaQuery("(max-width:768px)");

  const handleSelectEvent = (event) => {
    setEdit(true);
    setSelectedEventId(event.id);
  };

  // Fetch classes
  useEffect(() => {
    axios
      .get(`${baseApi}/class/all`)
      .then((resp) => {
        setClasses(resp.data.data);
        setSelectedClass(resp.data.data[0]?._id || null);
      })
      .catch((e) => console.log("Fetch class Err", e));
  }, []);

  // Fetch schedules
  const fetchSchedules = (classId) => {
    if (!classId) return;
    axios
      .get(`${baseApi}/schedule/fetch-with-query/${classId}`)
      .then((resp) => {
        const respData = resp.data.data.map((x) => ({
          id: x._id,
          title: `Subject: ${x.subject?.subject_name || x.subject}, Teacher: ${
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

  // Drag & Drop Event Update
  const moveEvent = async ({ event, start, end }) => {
    try {
      await axios.put(`${baseApi}/schedule/update/${event.id}`, {
        startTime: start,
        endTime: end,
      });
      fetchSchedules(selectedClass);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to move event.");
    }
  };

  // Event style for dark mode & current day/ongoing highlight
  const eventStyleGetter = (event) => {
    const now = new Date();
    const isCurrent = now >= event.start && now <= event.end;
    return {
      style: {
        backgroundColor: isCurrent ? "#ff4081" : "#2196f3",
        color: "#fff",
        borderRadius: "8px",
        border: "1px solid #333",
        boxShadow: isCurrent
          ? "0 0 10px 2px rgba(255,64,129,0.7)"
          : "0 2px 4px rgba(0,0,0,0.2)",
        fontSize: isMobile ? "0.7rem" : "0.9rem",
        fontWeight: isCurrent ? "bold" : "500",
        padding: "3px 5px",
        transition: "all 0.3s ease",
      },
    };
  };

  return (
    <Box
      sx={{
        height: "100vh",
        p: 2,
        background: "#121212",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      <Typography variant={isMobile ? "h5" : "h3"} align="center" gutterBottom>
        Schedule
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="h6" color="#fff" sx={{ mb: 1 }}>
          Select Class
        </Typography>
        <Select
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)}
          sx={{
            color: "#fff",
            background: "#1e1e1e",
            borderRadius: 1,
            "& .MuiSelect-icon": { color: "#fff" },
          }}
        >
          {classes.map((x) => (
            <MenuItem key={x._id} value={x._id}>
              {x.class_text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={() => setNewPeriod(true)}
        sx={{
          mb: 2,
          backgroundColor: "#2196f3",
          "&:hover": { backgroundColor: "#1976d2" },
        }}
      >
        Add New Period
      </Button>

      {(newPeriod || edit) && (
        <ScheduleEvent
          selectedClass={selectedClass}
          refreshEvents={() => {
            fetchSchedules(selectedClass);
            setNewPeriod(false);
            setEdit(false);
            setSelectedEventId(null);
          }}
          edit={edit}
          selectedEventId={selectedEventId}
        />
      )}

      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        defaultView={isMobile ? Views.DAY : Views.WEEK}
        views={[Views.WEEK, Views.DAY, Views.AGENDA]}
        step={30}
        timeslots={1}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onEventDrop={moveEvent}
        style={{
          height: isMobile ? "65vh" : "70vh",
          marginTop: 20,
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          backgroundColor: "#1e1e1e",
        }}
        min={new Date(1970, 1, 1, 8, 0, 0)}
        max={new Date(1970, 1, 1, 18, 0, 0)}
        eventPropGetter={eventStyleGetter}
      />
    </Box>
  );
}
