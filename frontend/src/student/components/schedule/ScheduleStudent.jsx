import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { baseApi } from "../../../environment";

const localizer = momentLocalizer(moment);

export default function ScheduleStudent() {
  const [events, setEvents] = useState([]);
  const [studentClass, setStudentClass] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student info from backend
  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseApi}/student/own-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const student = res.data.student;
      if (student && student.student_class?._id) {
        setStudentClass(student.student_class._id);
      } else {
        console.warn("No class info found for this student");
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };

  // Fetch schedule for a specific class
  const fetchSchedule = async (classId) => {
    if (!classId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${baseApi}/schedule/fetch-with-query/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const eventsData = res.data.data.map((x) => ({
        id: x._id,
        title: `📘 ${x.subject?.subject_name || x.subject} — 👩‍🏫 ${
          x.teacher?.name || x.teacher
        }`,
        start: new Date(x.startTime),
        end: new Date(x.endTime),
      }));

      setEvents(eventsData);
    } catch (err) {
      console.error("Error fetching student schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (studentClass) {
      fetchSchedule(studentClass);
    }
  }, [studentClass]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        p: 3,
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontWeight: "bold", color: "#fff" }}
      >
        🗓 Student Schedule
      </Typography>

      <Box sx={{ mt: 4, borderRadius: 2, backgroundColor: "#121212", p: 2 }}>
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
          style={{ height: "70vh", color: "#fff" }}
        />
      </Box>
    </Box>
  );
}
