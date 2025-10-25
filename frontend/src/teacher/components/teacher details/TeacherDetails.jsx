







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
import axios from "axios";
import { baseApi } from "../../../environment";

export default function TeacherDetails() {
  const [teacherDetails, setTeacherDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const token = localStorage.getItem("token");

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(`${baseApi}/teacher/own-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacherDetails(response.data.teacher);
    } catch (error) {
      console.log("Error fetching teacher details", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTeacherDetails();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {teacherDetails && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 6,
            mb: 6,
            background: "linear-gradient(135deg, #e3f2fd, #fffde7)",
            minHeight: "100vh",
            py: 5,
          }}
        >
          {/* Profile Image */}
          <CardMedia
            component="img"
            image={teacherDetails.image || "/placeholder.jpg"}
            alt={teacherDetails.name}
            sx={{
              width: 280,
              height: 280,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow:
                "0px 10px 25px rgba(0,0,0,0.2), 0px 0px 15px rgba(33,150,243,0.4)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow:
                  "0px 10px 30px rgba(0,0,0,0.3), 0px 0px 20px rgba(33,150,243,0.5)",
              },
              mb: 3,
            }}
          />

          {/* Name */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "#0d47a1",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {teacherDetails.name}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Teacher Profile
          </Typography>

          {/* Stylish Table Card */}
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 700,
              borderRadius: 4,
              boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,245,0.95))",
              p: 2,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Table>
              <TableBody>
                {[
                  ["Email", teacherDetails.email],
                  ["Age", teacherDetails.age],
                  ["Gender", teacherDetails.gender],
                  ["Qualification", teacherDetails.qualification],
                  [
                    "Created At",
                    new Date(teacherDetails.createdAt).toLocaleString(),
                  ],
                ].map(([label, value]) => (
                  <TableRow
                    key={label}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(33,150,243,0.05)",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold", color: "#0d47a1" }}>
                      {label}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#424242" }}>
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}













