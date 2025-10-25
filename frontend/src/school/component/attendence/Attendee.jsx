






















import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function Attendee({ classId, setMessage, setMessageType }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [attendee, setAttendee] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch class details and attendee teacher
  const fetchClassDetails = async () => {
    if (!classId) return;
    try {
      const response = await axios.get(`${baseApi}/class/single/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const classData = response.data.data;
      if (classData?.attendee) {
        setAttendee(classData.attendee);
        setSelectedTeacher(classData.attendee._id);
      } else {
        setAttendee(null);
        setSelectedTeacher("");
      }
    } catch (error) {
      console.error("Error fetching class attendee:", error);
    }
  };

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const resp = await axios.get(`${baseApi}/teacher/fetch-with-query`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(resp.data.teachers || []);
    } catch (err) {
      console.error("Error fetching teachers", err);
    }
  };

  // Update attendee teacher
  const handleSubmit = async () => {
    if (!selectedTeacher) {
      setMessage("Please select a teacher first.");
      setMessageType("error");
      return;
    }
    try {
      await axios.patch(
        `${baseApi}/class/update/${classId}`,
        { attendee: selectedTeacher },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Attendee teacher updated successfully!");
      setMessageType("success");
        fetchClassDetails(); // Refresh attendee info
        
    } catch (error) {
      console.error("Error updating attendee:", error);
      setMessage("Failed to update attendee teacher.");
      setMessageType("error");
    }
  };

  useEffect(() => {
    fetchClassDetails();
    fetchTeachers();
  }, [classId]);

  return (
    <Box sx={{ background: "#1a1a1a", p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
        Attendee
      </Typography>

      {attendee && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: "#ccc" }}>Current Attendee:</Typography>
          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            {attendee.name}
          </Typography>
        </Box>
      )}

      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#ccc" }}>Select Teacher</InputLabel>
        <Select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          sx={{ color: "#fff", "& .MuiSvgIcon-root": { color: "#fff" } }}
        >
          <MenuItem value="">Select Teacher</MenuItem>
          {teachers.map((t) => (
            <MenuItem key={t._id} value={t._id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        {attendee ? "Change Attendee" : "Assign Attendee"}
      </Button>
    </Box>
  );
}
