// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
// } from "@mui/material";
// import { useFormik } from "formik";
// import * as React from "react";
// import { subjectSchema } from "../../../yupSchema/subjectSchema";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

// // Function to generate random pastel background color
// const getRandomColor = () => {
//   const hue = Math.floor(Math.random() * 360);
//   return `hsl(${hue}, 80%, 90%)`;
// };

// export default function Subjects() {
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const [subjects, setSubjects] = React.useState([]);
//   const [edit, setEdit] = React.useState(false);
//   const [editId, setEditId] = React.useState(null);

//   const Formik = useFormik({
//     initialValues: { subject_name: "", subject_codename: "" },
//     validationSchema: subjectSchema,
//     onSubmit: (values) => {
//       if (edit) {
//         axios
//           .patch(`${baseApi}/subject/update/${editId}`, values)
//           .then((resp) => {
//             setMessage(resp.data.message);
//             setMessageType("success");
//             setEdit(false);
//             setEditId(null);
//             Formik.resetForm();
//           })
//           .catch(() => {
//             setMessage("Error updating subject");
//             setMessageType("error");
//           });
//       } else {
//         axios
//           .post(`${baseApi}/subject/create`, values)
//           .then((resp) => {
//             setMessage(resp.data.message);
//             setMessageType("success");
//             Formik.resetForm();
//           })
//           .catch(() => {
//             setMessage("Error creating subject");
//             setMessageType("error");
//           });
//       }
//     },
//   });

//   const fetchAllSubjects = () => {
//     axios
//       .get(`${baseApi}/subject/all`)
//       .then((resp) => {
//         const subjectsWithColors = resp.data.data.map((subject) => ({
//           ...subject,
//           color: getRandomColor(),
//         }));
//         setSubjects(subjectsWithColors);
//       })
//       .catch((e) => console.error("Error fetching subjects:", e));
//   };

//   React.useEffect(() => {
//     fetchAllSubjects();
//   }, [message]);

//   const handleEdit = (id, subject_name, subject_codename) => {
//     setEdit(true);
//     setEditId(id);
//     Formik.setFieldValue("subject_name", subject_name);
//     Formik.setFieldValue("subject_codename", subject_codename);
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`${baseApi}/subject/delete/${id}`)
//       .then((resp) => {
//         setMessage(resp.data.message);
//         setMessageType("success");
//       })
//       .catch(() => {
//         setMessage("Error deleting subject");
//         setMessageType("error");
//       });
//   };

//   const cancelEdit = () => {
//     setEdit(false);
//     setEditId(null);
//     Formik.resetForm();
//   };

//   return (
//     <>
//       {message && (
//         <MessageSnackbar
//           message={message}
//           messageType={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}

//       {/* Page Layout */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           px: 2,
//           py: 4,
//         }}
//       >
//         {/* Form Section */}
//         <Box
//           component="form"
//           sx={{
//             width: "100%",
//             maxWidth: 700,
//             p: 4,
//             backgroundColor: "white",
//             borderRadius: 2,
//             boxShadow: 3,
//           }}
//           onSubmit={Formik.handleSubmit}
//         >
//           <Typography
//             variant="h5"
//             sx={{ textAlign: "center", mb: 3, fontSize: "2rem" }}
//           >
//             {edit ? "Edit Subject" : "Add New Subject"}
//           </Typography>

//           <TextField
//             name="subject_name"
//             label="Subject Name"
//             fullWidth
//             value={Formik.values.subject_name}
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleBlur}
//           />
//           {Formik.touched.subject_name && Formik.errors.subject_name && (
//             <p style={{ color: "red" }}>{Formik.errors.subject_name}</p>
//           )}

//           <TextField
//             name="subject_codename"
//             label="Subject Code"
//             fullWidth
//             sx={{ mt: 2 }}
//             value={Formik.values.subject_codename}
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleBlur}
//           />
//           {Formik.touched.subject_codename &&
//             Formik.errors.subject_codename && (
//               <p style={{ color: "red" }}>{Formik.errors.subject_codename}</p>
//             )}

//           <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
//             {edit ? "Update Subject" : "Submit"}
//           </Button>

//           {edit && (
//             <Button
//               onClick={cancelEdit}
//               type="button"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 2 }}
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>

//         {/* Table Section */}
//         <Box sx={{ width: "100%", maxWidth: 1000, mt: 5 ,color:"#fff",textAlign:"center",text:"bold",background:"green"}}>
//           <Typography variant="h4" sx={{ mb: 2 }}>
//             Subject List
//           </Typography>

//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead sx={{ backgroundColor: "#eee" }}>
//                 <TableRow>
//                   <TableCell>#</TableCell>
//                   <TableCell>Subject Name</TableCell>
//                   <TableCell>Subject Code</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {subjects.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={4} align="center">
//                       No subjects available.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   subjects.map((subj, index) => (
//                     <TableRow
//                       key={subj._id}
//                       sx={{
//                         backgroundColor: subj.color,
//                         transition: "0.3s",
//                         "&:hover": {
//                           backgroundColor: "#f0f0f0",
//                         },
//                       }}
//                     >
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{subj.subject_name}</TableCell>
//                       <TableCell>{subj.subject_codename}</TableCell>
//                       <TableCell>
//                         <Button
//                           onClick={() =>
//                             handleEdit(
//                               subj._id,
//                               subj.subject_name,
//                               subj.subject_codename
//                             )
//                           }
//                           variant="contained"
//                           size="small"
//                           startIcon={<EditIcon />}
//                           sx={{ mr: 1 }}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           onClick={() => handleDelete(subj._id)}
//                           variant="outlined"
//                           color="error"
//                           size="small"
//                           startIcon={<DeleteIcon />}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>
//     </>
//   );
// }










import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import { subjectSchema } from "../../../yupSchema/subjectSchema";
import axios from "axios";
import { baseApi } from "../../../environment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

// Random color for subject rows
const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 90%)`;
};

export default function Subjects() {
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => setMessage("");

  const [subjects, setSubjects] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);

  const token = localStorage.getItem("token");

  // Formik setup
  const Formik = useFormik({
    initialValues: { subject_name: "", subject_codename: "" },
    validationSchema: subjectSchema,
    onSubmit: (values) => {
      if (edit) {
        axios
          .patch(`${baseApi}/subject/update/${editId}`, values, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            setMessage(resp.data.message);
            setMessageType("success");
            setEdit(false);
            setEditId(null);
            Formik.resetForm();
          })
          .catch(() => {
            setMessage("❌ Error updating subject");
            setMessageType("error");
          });
      } else {
        axios
          .post(`${baseApi}/subject/create`, values, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            setMessage(resp.data.message);
            setMessageType("success");
            Formik.resetForm();
          })
          .catch(() => {
            setMessage("❌ Error creating subject");
            setMessageType("error");
          });
      }
    },
  });

  // Fetch subjects
  const fetchAllSubjects = () => {
    axios
      .get(`${baseApi}/subject/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        const subjectsWithColors = resp.data.data.map((subject) => ({
          ...subject,
          color: getRandomColor(),
        }));
        setSubjects(subjectsWithColors);
      })
      .catch((e) => console.error("Error fetching subjects:", e));
  };

  React.useEffect(() => {
    fetchAllSubjects();
  }, [message]);

  // Edit subject
  const handleEdit = (id, subject_name, subject_codename) => {
    setEdit(true);
    setEditId(id);
    Formik.setFieldValue("subject_name", subject_name);
    Formik.setFieldValue("subject_codename", subject_codename);
  };

  // Delete subject (with force delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?"))
      return;

    try {
      await axios.delete(`${baseApi}/subject/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Subject deleted successfully");
      setMessageType("success");
      fetchAllSubjects();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const confirmForce = window.confirm(
          "⚠️ This subject is already used in exams or schedules.\nDo you want to delete it anyway?"
        );

        if (confirmForce) {
          try {
            await axios.delete(`${baseApi}/subject/delete/${id}?force=true`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("⚠️ Subject forcibly deleted (was in use).");
            setMessageType("warning");
            fetchAllSubjects();
          } catch (forceError) {
            console.error("Force Delete Error:", forceError);
            setMessage("❌ Error during force delete");
            setMessageType("error");
          }
        } else {
          setMessage("❌ Subject not deleted");
          setMessageType("error");
        }
      } else {
        console.error("Delete Error:", error);
        setMessage("❌ Error deleting subject");
        setMessageType("error");
      }
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    Formik.resetForm();
  };

  return (
    <>
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          py: 4,
        }}
      >
        {/* Form Section */}
        <Box
          component="form"
          sx={{
            width: "100%",
            maxWidth: 700,
            p: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
          }}
          onSubmit={Formik.handleSubmit}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 3, fontSize: "2rem" }}
          >
            {edit ? "Edit Subject" : "Add New Subject"}
          </Typography>

          <TextField
            name="subject_name"
            label="Subject Name"
            fullWidth
            value={Formik.values.subject_name}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
          />
          {Formik.touched.subject_name && Formik.errors.subject_name && (
            <p style={{ color: "red" }}>{Formik.errors.subject_name}</p>
          )}

          <TextField
            name="subject_codename"
            label="Subject Code"
            fullWidth
            sx={{ mt: 2 }}
            value={Formik.values.subject_codename}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
          />
          {Formik.touched.subject_codename &&
            Formik.errors.subject_codename && (
              <p style={{ color: "red" }}>{Formik.errors.subject_codename}</p>
            )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            {edit ? "Update Subject" : "Submit"}
          </Button>

          {edit && (
            <Button
              onClick={cancelEdit}
              type="button"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          )}
        </Box>

        {/* Table Section */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            mt: 5,
            textAlign: "center",
            background: "#e0f7e0",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Subject List
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#eee" }}>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Subject Code</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No subjects available.
                    </TableCell>
                  </TableRow>
                ) : (
                  subjects.map((subj, index) => (
                    <TableRow
                      key={subj._id}
                      sx={{
                        backgroundColor: subj.color,
                        transition: "0.3s",
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{subj.subject_name}</TableCell>
                      <TableCell>{subj.subject_codename}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleEdit(
                              subj._id,
                              subj.subject_name,
                              subj.subject_codename
                            )
                          }
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(subj._id)}
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}







