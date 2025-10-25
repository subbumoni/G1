// import { Box, Button, Paper, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import * as React from "react";
// import { classSchema } from "../../../yupSchema/classSchema";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

// export default function Class() {
//   const [message, setMessage] = React.useState("");
//   const [messageType, setMessageType] = React.useState("success");
//   const handleMessageClose = () => setMessage("");

//   const [classes, setClasses] = React.useState([]);
//   const [edit, setEdit] = React.useState(false);
//   const [editId, setEditId] = React.useState(null);

//   const Formik = useFormik({
//     initialValues: { class_text: "", class_num: "" },
//     validationSchema: classSchema,
//     onSubmit: (values) => {
//       if (edit) {
//         axios
//           .patch(`${baseApi}/class/update/${editId}`, values)
//           .then((resp) => {
//             setMessage(resp.data.message);
//             setMessageType("success");
//             setEdit(false);
//             setEditId(null);
//             Formik.resetForm();
//           })
//           .catch((e) => {
//             console.error("Error updating class:", e);
//             setMessage("Error updating class");
//             setMessageType("error");
//           });
//       } else {
//         axios
//           .post(`${baseApi}/class/create`, values)
//           .then((resp) => {
//             setMessage(resp.data.message);
//             setMessageType("success");
//             Formik.resetForm();
//           })
//           .catch((e) => {
//             console.error("Error creating class:", e);
//             setMessage("Error creating class");
//             setMessageType("error");
//           });
//       }
//     },
//   });

//   const fetchAllClasses = () => {
//     axios
//       .get(`${baseApi}/class/all`)
//       .then((resp) => setClasses(resp.data.data))
//       .catch((e) => console.error("Error fetching classes:", e));
//   };

//   React.useEffect(() => {
//     fetchAllClasses();
//   }, [message]);

//   const handleEdit = (id, class_text, class_num) => {
//     setEdit(true);
//     setEditId(id);
//     Formik.setFieldValue("class_text", class_text);
//     Formik.setFieldValue("class_num", class_num);
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`${baseApi}/class/delete/${id}`)
//       .then((resp) => {
//         setMessage(resp.data.message);
//         setMessageType("success");
//       })
//       .catch((e) => {
//         console.error("Error deleting class:", e);
//         setMessage("Error deleting class");
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

//       <Box
//         component="form"
//         sx={{
//           maxWidth: 700,
//           p: 4,
//           backgroundColor: "white",
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//         onSubmit={Formik.handleSubmit}
//       >
//         <Typography
//           variant="h5"
//           sx={{ textAlign: "center", mb: 3, fontSize: "2rem" }}
//         >
//           {edit ? "Edit Class" : "Add New Class"}
//         </Typography>

//         <TextField
//           name="class_text"
//           label="Class Text"
//           fullWidth
//           value={Formik.values.class_text}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//         />
//         {Formik.touched.class_text && Formik.errors.class_text && (
//           <p style={{ color: "red" }}>{Formik.errors.class_text}</p>
//         )}

//         <TextField
//           name="class_num"
//           label="Class Number"
//           fullWidth
//           sx={{ mt: 2 }}
//           value={Formik.values.class_num}
//           onChange={Formik.handleChange}
//           onBlur={Formik.handleBlur}
//         />
//         {Formik.touched.class_num && Formik.errors.class_num && (
//           <p style={{ color: "red" }}>{Formik.errors.class_num}</p>
//         )}

//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
//           {edit ? "Update Class" : "Submit"}
//         </Button>

//         {edit && (
//           <Button
//             onClick={cancelEdit}
//             type="button"
//             variant="outlined"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Cancel
//           </Button>
//         )}
//       </Box>

//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
//         {classes.map((x) => (
//           <Paper
//             key={x._id}
//             sx={{
//               p: 3,
//               borderRadius: 3,
//               boxShadow: 4,
//               backgroundColor: "#f9f9f9",
//               width: 250,
//             }}
//           >
//             <Typography variant="h6">
//               Class: {x.class_text} [{x.class_num}]
//             </Typography>
//             <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
//               <Button
//                 onClick={() => handleEdit(x._id, x.class_text, x.class_num)}
//                 variant="contained"
//                 size="small"
//                 startIcon={<EditIcon />}
//               >
//                 Edit
//               </Button>
//               <Button
//                 onClick={() => handleDelete(x._id)}
//                 variant="outlined"
//                 color="error"
//                 size="small"
//                 startIcon={<DeleteIcon />}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     </>
//   );
// }














import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import { classSchema } from "../../../yupSchema/classSchema";
import axios from "axios";
import { baseApi } from "../../../environment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

export default function Class() {
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => setMessage("");

  const [classes, setClasses] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);



// Class.jsx
const token = localStorage.getItem("token");

const fetchAllClasses = () => {
  axios.get(`${baseApi}/class/all`, {
    headers: { Authorization: `Bearer ${token}` },

  })
    .then((resp) => setClasses(resp.data.data))
    
  .catch((e) => {
    console.error("Error fetching classes:", e);
    setMessage(e.response?.data?.message || "Error fetching classes");
    setMessageType("error");
  });
};

React.useEffect(() => {
  fetchAllClasses();
}, [message]);
//  refresh when message changes

  const Formik = useFormik({
    initialValues: { class_text: "", class_num: "" },
    validationSchema: classSchema,
    onSubmit: (values) => {
      if (!token) {
        setMessage("User not authenticated");
        setMessageType("error");
        return;
      }

      if (edit) {
        axios
          .patch(`${baseApi}/class/update/${editId}`, values, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            setMessage(resp.data.message);
            setMessageType("success");
            setEdit(false);
            setEditId(null);
            Formik.resetForm();
          })
          .catch((e) => {
            console.error("Error updating class:", e);
            setMessage(e.response?.data?.message || "Error updating class");
            setMessageType("error");
          });
      } else {
        axios
          .post(`${baseApi}/class/create`, values, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            setMessage(resp.data.message);
            setMessageType("success");
            Formik.resetForm();
          })
          .catch((e) => {
            console.error("Error creating class:", e);
            setMessage(e.response?.data?.message || "Error creating class");
            setMessageType("error");
          });
      }
    },
  });

  const handleEdit = (id, class_text, class_num) => {
    setEdit(true);
    setEditId(id);
    Formik.setFieldValue("class_text", class_text);
    Formik.setFieldValue("class_num", class_num);
  };

  const handleDelete = (id) => {
    if (!token) {
      setMessage("User not authenticated");
      setMessageType("error");
      return;
    }

    axios
      .delete(`${baseApi}/class/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setMessage(resp.data.message);
        setMessageType("success");
      })
      .catch((e) => {
        console.error("Error deleting class:", e);
        setMessage(e.response?.data?.message || "Error deleting class");
        setMessageType("error");
      });
  };

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
        component="form"
        sx={{
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
          {edit ? "Edit Class" : "Add New Class"}
        </Typography>

        <TextField
          name="class_text"
          label="Class Text"
          fullWidth
          value={Formik.values.class_text}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.class_text && Formik.errors.class_text && (
          <p style={{ color: "red" }}>{Formik.errors.class_text}</p>
        )}

        <TextField
          name="class_num"
          label="Class Number"
          fullWidth
          sx={{ mt: 2 }}
          value={Formik.values.class_num}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.class_num && Formik.errors.class_num && (
          <p style={{ color: "red" }}>{Formik.errors.class_num}</p>
        )}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          {edit ? "Update Class" : "Submit"}
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

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
        {classes.map((x) => (
          <Paper
            key={x._id}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 4,
              backgroundColor: "#f9f9f9",
              width: 250,
            }}
          >
            <Typography variant="h6">
              Class: {x.class_text} [{x.class_num}]
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <Button
                onClick={() => handleEdit(x._id, x.class_text, x.class_num)}
                variant="contained"
                size="small"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(x._id)}
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
}
