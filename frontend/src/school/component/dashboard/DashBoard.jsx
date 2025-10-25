// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { baseApi } from "../../../environment";
// import { Typography, Box, Button, TextField, CardMedia } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";

// export default function DashBoard() {
//   const [school, setSchool] = useState(null);
//   const [schoolName, setSchoolName] = useState("");
//   const [edit, setEdit] = useState(false);
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const fileInputRef = useRef(null);

//   // 🖼️ Image file handler
//   const addImage = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setImageUrl(URL.createObjectURL(selectedFile));
//       setFile(selectedFile);
//     }
//   };

//   //  Clear image selection
//   const handleClearFile = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     setFile(null);
//     setImageUrl(null);
//   };

//   //  Fetch school data
//   const fetchSchool = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("⚠️ No token found in localStorage.");
//       return;
//     }

//     axios
//       .get(`${baseApi}/school/fetch-single`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((resp) => {
//         if (resp.data.success) {
//           setSchool(resp.data.school);
//           setSchoolName(resp.data.school.school_name);
//         } else {
//           console.warn("Fetch failed:", resp.data.message);
//         }
//       })
//       .catch((e) => {
//         console.error(
//           "❌ Error fetching school:",
//           e.response?.data || e.message
//         );
//       });
//   };
  

//   // ✅ Submit updated school info
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("school_name", schoolName);
//     if (file) {
//       formData.append("school_image", file, file.name);
//     }

//     try {
//       const response = await axios.patch(`${baseApi}/school/update`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true, // 🔐 Include cookies if JWT is in cookies
//       });

//       console.log("Update success:", response.data);
//       setEdit(false);
//       fetchSchool();
//       handleClearFile();
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Update failed: " + (error.message || "Unknown error"));
//     }
//   };

//   const cancelEdit = () => {
//     setEdit(false);
//     setSchoolName(school?.school_name || "");
//     handleClearFile();
//   };

//   useEffect(() => {
//     fetchSchool();
//   }, []);

//   return (
//     <>
//       <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
//         Dashboard
//       </Typography>

//       {/* ✅ Edit Form */}
//       {edit && (
//         <Box
//           component="form"
//           onSubmit={handleEditSubmit}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             width: "90%",
//             maxWidth: "600px",
//             mx: "auto",
//             backgroundColor: "#fff",
//             padding: 3,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h6">Edit School Details</Typography>

//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//           />

//           {imageUrl && (
//             <CardMedia
//               component="img"
//               height="240"
//               image={imageUrl}
//               alt="Preview"
//               sx={{ borderRadius: 2 }}
//             />
//           )}

//           <TextField
//             name="school_name"
//             label="School Name"
//             value={schoolName}
//             onChange={(e) => setSchoolName(e.target.value)}
//             required
//             fullWidth
//           />

//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Button type="submit" variant="contained" color="primary">
//               Save Changes
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={cancelEdit}
//               sx={{
//                 color: "red",
//                 borderColor: "red",
//                 "&:hover": {
//                   backgroundColor: "#ffdada",
//                   borderColor: "red",
//                 },
//               }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {/* ✅ School Card */}
//       {school && (
//         <Box
//           sx={{
//             position: "relative",
//             height: "400px",
//             width: "100%",
//             mt: 4,
//             backgroundImage: `url(/images/uploaded/school/${school.school_image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             borderRadius: 2,
//             overflow: "hidden",
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               height: "100%",
//               backgroundColor: "rgba(0,0,0,0.4)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: 2,
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{ color: "white", textAlign: "center" }}
//             >
//               {school.school_name}
//             </Typography>
//           </Box>

//           {/* 🖊️ Edit Button */}
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 16,
//               right: 16,
//               backgroundColor: "red",
//               borderRadius: "50%",
//               width: 50,
//               height: 50,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               boxShadow: 4,
//             }}
//           >
//             <Button
//               onClick={() => setEdit(true)}
//               sx={{
//                 minWidth: 0,
//                 padding: 0,
//                 color: "white",
//               }}
//             >
//               <EditIcon />
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// }




// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { baseApi } from "../../../environment";
// import { Typography, Box, Button, TextField, CardMedia } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";

// export default function DashBoard() {
//   const [school, setSchool] = useState(null);
//   const [schoolName, setSchoolName] = useState("");
//   const [edit, setEdit] = useState(false);
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const fileInputRef = useRef(null);

//   // 🖼️ Image file handler
//   const addImage = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setImageUrl(URL.createObjectURL(selectedFile));
//       setFile(selectedFile);
//     }
//   };

//   // Clear image selection
//   const handleClearFile = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     setFile(null);
//     setImageUrl(null);
//   };

//   // Fetch school data
//   const fetchSchool = () => {
//     const token = localStorage.getItem("token");

//     if (!token) return;

//     axios
//       .get(`${baseApi}/school/fetch-single`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((resp) => {
//         if (resp.data.success) {
//           setSchool(resp.data.school);
//           setSchoolName(resp.data.school.school_name);
//         }
//       })
//       .catch((e) =>
//         console.error("Error fetching school:", e.response?.data || e.message)
//       );
//   };

//   // Submit updated school info
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("school_name", schoolName);
//     if (file) formData.append("school_image", file, file.name);

//     try {
//       const response = await axios.patch(`${baseApi}/school/update`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setEdit(false);
//       fetchSchool();
//       handleClearFile();
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Update failed: " + (error.message || "Unknown error"));
//     }
//   };

//   const cancelEdit = () => {
//     setEdit(false);
//     setSchoolName(school?.school_name || "");
//     handleClearFile();
//   };

//   useEffect(() => {
//     fetchSchool();
//   }, []);

//   return (
//     <>
//       <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
//         Dashboard
//       </Typography>

//       {/* Edit Form */}
//       {edit && (
//         <Box
//           component="form"
//           onSubmit={handleEditSubmit}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             width: "90%",
//             maxWidth: "600px",
//             mx: "auto",
//             backgroundColor: "#fff",
//             padding: 3,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h6">Edit School Details</Typography>

//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//           />

//           {imageUrl && (
//             <CardMedia
//               component="img"
//               height="240"
//               image={imageUrl}
//               alt="Preview"
//               sx={{ borderRadius: 2 }}
//             />
//           )}

//           <TextField
//             name="school_name"
//             label="School Name"
//             value={schoolName}
//             onChange={(e) => setSchoolName(e.target.value)}
//             required
//             fullWidth
//           />

//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Button type="submit" variant="contained" color="primary">
//               Save Changes
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={cancelEdit}
//               sx={{
//                 color: "red",
//                 borderColor: "red",
//                 "&:hover": { backgroundColor: "#ffdada", borderColor: "red" },
//               }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {/* School Card */}
//       {school && (
//         <Box
//           sx={{
//             position: "relative",
//             height: "400px",
//             width: "100%",
//             mt: 4,
//             backgroundImage: `url(${imageUrl || school.school_image})`, // ✅ Cloudinary support
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             borderRadius: 2,
//             overflow: "hidden",
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               height: "100%",
//               backgroundColor: "rgba(0,0,0,0.4)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: 2,
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{ color: "white", textAlign: "center" }}
//             >
//               {school.school_name}
//             </Typography>
//           </Box>

//           {/* Edit Button */}
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 16,
//               right: 16,
//               backgroundColor: "red",
//               borderRadius: "50%",
//               width: 50,
//               height: 50,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               boxShadow: 4,
//             }}
//           >
//             <Button
//               onClick={() => setEdit(true)}
//               sx={{ minWidth: 0, padding: 0, color: "white" }}
//             >
//               <EditIcon />
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// }






























// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { baseApi } from "../../../environment";
// import { Typography, Box, Button, TextField, CardMedia } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";

// export default function DashBoard() {
//   const [school, setSchool] = useState(null);
//   const [schoolName, setSchoolName] = useState("");
//   const [edit, setEdit] = useState(false);
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const fileInputRef = useRef(null);

//   const token = localStorage.getItem("token");

//   // 🖼️ Handle image selection
//   const addImage = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setImageUrl(URL.createObjectURL(selectedFile));
//       setFile(selectedFile);
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(null);
//   };

//   // Fetch school info
//   const fetchSchool = async () => {
//     if (!token) return;
//     try {
//       const resp = await axios.get(`${baseApi}/school/fetch-single`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (resp.data.success) {
//         setSchool(resp.data.school);
//         setSchoolName(resp.data.school.school_name);
//         setImageUrl(resp.data.school.school_image);
//       }
//     } catch (e) {
//       console.error("Error fetching school:", e.response?.data || e.message);
//     }
//   };

//   // Submit updates
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return;

//     try {
//       const formData = new FormData();
//       formData.append("school_name", schoolName);
//       if (file) formData.append("school_image", file);

//       await axios.patch(`${baseApi}/school/update`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setEdit(false);
//       handleClearFile();
//       fetchSchool(); // ✅ Refresh Cloudinary image
//     } catch (error) {
//       console.error("Update failed:", error.response?.data || error.message);
//       alert(
//         "Update failed: " + (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   const cancelEdit = () => {
//     setEdit(false);
//     setSchoolName(school?.school_name || "");
//     handleClearFile();
//   };

//   useEffect(() => {
//     fetchSchool();
//   }, []);

//   return (
//     <>
//       <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
//         Dashboard
//       </Typography>

//       {/* Edit Form */}
//       {edit && (
//         <Box
//           component="form"
//           onSubmit={handleEditSubmit}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             width: "90%",
//             maxWidth: "600px",
//             mx: "auto",
//             backgroundColor: "#fff",
//             p: 3,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h6">Edit School Details</Typography>

//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//           />

//           {imageUrl && (
//             <CardMedia
//               component="img"
//               height="240"
//               image={imageUrl}
//               alt="Preview"
//               sx={{ borderRadius: 2 }}
//             />
//           )}

//           <TextField
//             label="School Name"
//             value={schoolName}
//             onChange={(e) => setSchoolName(e.target.value)}
//             required
//             fullWidth
//           />

//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Button type="submit" variant="contained" color="primary">
//               Save Changes
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={cancelEdit}
//               sx={{
//                 color: "red",
//                 borderColor: "red",
//                 "&:hover": { backgroundColor: "#ffdada", borderColor: "red" },
//               }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {/* School Card */}
//       {school && (
//         <Box
//           sx={{
//             position: "relative",
//             height: "400px",
//             width: "100%",
//             mt: 4,
//             backgroundImage: `url(${imageUrl || school.school_image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             borderRadius: 2,
//             overflow: "hidden",
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               height: "100%",
//               backgroundColor: "rgba(0,0,0,0.4)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               p: 2,
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{ color: "#fff", textAlign: "center" }}
//             >
//               {school.school_name}
//             </Typography>
//           </Box>

//           {/* Edit Button */}
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 16,
//               right: 16,
//               backgroundColor: "red",
//               borderRadius: "50%",
//               width: 50,
//               height: 50,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               boxShadow: 4,
//             }}
//           >
//             <Button
//               onClick={() => setEdit(true)}
//               sx={{ minWidth: 0, p: 0, color: "white" }}
//             >
//               <EditIcon />
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// }























// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { baseApi } from "../../../environment";
// import { Typography, Box, Button, TextField, CardMedia } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";

// export default function DashBoard() {
//   const [school, setSchool] = useState(null);
//   const [schoolName, setSchoolName] = useState("");
//   const [edit, setEdit] = useState(false);
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const fileInputRef = useRef(null);

//   const token = localStorage.getItem("token");

//   const addImage = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setImageUrl(URL.createObjectURL(selectedFile));
//       setFile(selectedFile);
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(school?.school_image || null);
//   };

//   const fetchSchool = async () => {
//     if (!token) return;
//     try {
//       const resp = await axios.get(`${baseApi}/school/fetch-single`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (resp.data.success) {
//         setSchool(resp.data.school);
//         setSchoolName(resp.data.school.school_name);
//         setImageUrl(resp.data.school.school_image);
//       }
//     } catch (e) {
//       console.error("Error fetching school:", e.response?.data || e.message);
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return;

//     try {
//       const formData = new FormData();
//       formData.append("school_name", schoolName);
//       if (file) formData.append("school_image", file);

//       const resp = await axios.patch(`${baseApi}/school/update`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (resp.data.success) {
//         setEdit(false);
//         handleClearFile();
//         fetchSchool(); // refresh image and data
//       } else {
//         alert("Update failed: " + resp.data.message);
//       }
//     } catch (error) {
//       console.error("Update failed:", error.response?.data || error.message);
//       alert(
//         "Update failed: " + (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   const cancelEdit = () => {
//     setEdit(false);
//     setSchoolName(school?.school_name || "");
//     handleClearFile();
//   };

//   useEffect(() => {
//     fetchSchool();
//   }, []);

//   return (
//     <>
//       <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
//         Dashboard
//       </Typography>

//       {edit && (
//         <Box
//           component="form"
//           onSubmit={handleEditSubmit}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             width: "90%",
//             maxWidth: "600px",
//             mx: "auto",
//             backgroundColor: "#fff",
//             p: 3,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}
//         >
//           <Typography variant="h6">Edit School Details</Typography>

//           <TextField
//             type="file"
//             inputRef={fileInputRef}
//             onChange={addImage}
//             fullWidth
//           />

//           {imageUrl && (
//             <CardMedia
//               component="img"
//               height="240"
//               image={imageUrl}
//               alt="Preview"
//               sx={{ borderRadius: 2 }}
//             />
//           )}

//           <TextField
//             label="School Name"
//             value={schoolName}
//             onChange={(e) => setSchoolName(e.target.value)}
//             required
//             fullWidth
//           />

//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Button type="submit" variant="contained" color="primary">
//               Save Changes
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={cancelEdit}
//               sx={{
//                 color: "red",
//                 borderColor: "red",
//                 "&:hover": { backgroundColor: "#ffdada", borderColor: "red" },
//               }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {school && (
//         <Box
//           sx={{
//             position: "relative",
//             height: "400px",
//             width: "100%",
//             mt: 4,
//             backgroundImage: `url(${imageUrl || school.school_image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             borderRadius: 2,
//             overflow: "hidden",
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               height: "100%",
//               backgroundColor: "rgba(0,0,0,0.4)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               p: 2,
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{ color: "#fff", textAlign: "center" }}
//             >
//               {school.school_name}
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 16,
//               right: 16,
//               backgroundColor: "red",
//               borderRadius: "50%",
//               width: 50,
//               height: 50,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               boxShadow: 4,
//             }}
//           >
//             <Button
//               onClick={() => setEdit(true)}
//               sx={{ minWidth: 0, p: 0, color: "white" }}
//             >
//               <EditIcon />
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// }















// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   CardMedia,
//   CircularProgress,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { baseApi } from "../../../environment";

// export default function SchoolProfile() {
//   const [schoolName, setSchoolName] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem("token");

//   // Fetch school data
//   const fetchSchool = async () => {
//     try {
//       setLoading(true);
//       const resp = await axios.get(`${baseApi}/school/own`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const school = resp.data.school;
//       setSchoolName(school.school_name);
//       setImageUrl(school.school_image);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSchool();
//   }, []);

//   const handleFileChange = (e) => {
//     const f = e.target.files[0];
//     if (f) {
//       setFile(f);
//       setImageUrl(URL.createObjectURL(f));
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     setImageUrl(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!schoolName) return alert("School name required");

//     const fd = new FormData();
//     fd.append("school_name", schoolName);
//     if (file) fd.append("image", file);

//     try {
//       setSubmitting(true);
//       const resp = await axios.patch(`${baseApi}/school/update`, fd, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const updatedSchool = resp.data.school;
//       setSchoolName(updatedSchool.school_name);
//       setImageUrl(`${updatedSchool.school_image}?t=${Date.now()}`); // prevent cache
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Update failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading)
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         maxWidth: 400,
//         mx: "auto",
//         mt: 5,
//         p: 3,
//         bgcolor: "#1f2937",
//         borderRadius: 3,
//         color: "#fff",
//         textAlign: "center",
//       }}
//     >
//       <Typography variant="h5" mb={2} color="#38bdf8">
//         Update School Profile
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="School Name"
//           value={schoolName}
//           onChange={(e) => setSchoolName(e.target.value)}
//           sx={{
//             mb: 2,
//             input: { color: "#fff" },
//             "& .MuiInputLabel-root": { color: "#cbd5e1" },
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": { borderColor: "#334155" },
//               "&:hover fieldset": { borderColor: "#38bdf8" },
//             },
//           }}
//         />

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept="image/*"
//           />
//           {file && (
//             <IconButton onClick={handleClearFile}>
//               <CancelIcon sx={{ color: "#f87171" }} />
//             </IconButton>
//           )}
//         </Box>

//         {imageUrl && (
//           <CardMedia
//             component="img"
//             image={imageUrl}
//             sx={{
//               borderRadius: 2,
//               mb: 2,
//               width: "100%",
//               height: 200,
//               objectFit: "cover",
//             }}
//           />
//         )}

//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           disabled={submitting}
//           sx={{
//             bgcolor: "#38bdf8",
//             "&:hover": { bgcolor: "#0ea5e9" },
//           }}
//         >
//           {submitting ? "Updating..." : "Update Profile"}
//         </Button>
//       </Box>
//     </Box>
//   );
// }

















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Avatar,
//   CircularProgress,
// } from "@mui/material";

// export default function Dashboard() {
//   const [school, setSchool] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [schoolName, setSchoolName] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const fetchSchool = async () => {
//     try {
//       const { data } = await axios.get(`${baseApi}/schooll/fetch-single`);
//       setSchool(data);
//       setSchoolName(data.school_name);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSchool();
//   }, []);

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     formData.append("school_name", schoolName);
//     if (imageFile) formData.append("school_image", imageFile);

//     try {
//       const { data } = await axios.patch(`${baseApi}/schooll/update`, formData);
//       setSchool(data.school);
//       setEditMode(false);
//       setImageFile(null);
//     } catch (err) {
//       console.error("Update error:", err);
//     }
//   };

//   if (loading)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         maxWidth: 400,
//         margin: "50px auto",
//         textAlign: "center",
//         background: "#121212",
//         p: 4,
//         borderRadius: 4,
//         color: "white",
//         boxShadow: "0 4px 15px rgba(255,255,255,0.1)",
//       }}
//     >
//       <Avatar
//         src={imageFile ? URL.createObjectURL(imageFile) : school.school_image}
//         alt="School Logo"
//         sx={{
//           width: 120,
//           height: 120,
//           margin: "auto",
//           border: "2px solid white",
//         }}
//       />
//       {editMode ? (
//         <>
//           <Button
//             variant="contained"
//             component="label"
//             sx={{ mt: 2, bgcolor: "#4caf50" }}
//           >
//             Upload Image
//             <input
//               hidden
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImageFile(e.target.files[0])}
//             />
//           </Button>
//           <TextField
//             variant="outlined"
//             fullWidth
//             value={schoolName}
//             onChange={(e) => setSchoolName(e.target.value)}
//             sx={{ mt: 2, bgcolor: "white", borderRadius: 1 }}
//           />
//           <Button
//             onClick={handleUpdate}
//             variant="contained"
//             color="primary"
//             sx={{ mt: 2 }}
//           >
//             Save
//           </Button>
//         </>
//       ) : (
//         <>
//           <Typography variant="h5" sx={{ mt: 2 }}>
//             {school.school_name}
//           </Typography>
//           <Button
//             onClick={() => setEditMode(true)}
//             variant="outlined"
//             sx={{ mt: 2, color: "white", borderColor: "white" }}
//           >
//             Edit
//           </Button>
//         </>
//       )}
//     </Box>
//   );
// }

















// import * as React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   CardMedia,
//   CircularProgress,
//   IconButton,
//   Typography,
//   Fade,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import CancelIcon from "@mui/icons-material/Cancel";
// import SaveIcon from "@mui/icons-material/Save";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function DashBoard() {
//   const [schoolName, setSchoolName] = React.useState("");
//   const [imageUrl, setImageUrl] = React.useState(null);
//   const [file, setFile] = React.useState(null);
//   const [loading, setLoading] = React.useState(false);
//   const [submitting, setSubmitting] = React.useState(false);
//   const [editMode, setEditMode] = React.useState(false);
//   const fileInputRef = React.useRef(null);
//   const token = localStorage.getItem("token");

//   // ✅ Fetch school data
//   const fetchSchool = async () => {
//     try {
//       setLoading(true);
//       const resp = await axios.get(`${baseApi}/school/own`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const school = resp.data.school;
//       setSchoolName(school.school_name);
//       setImageUrl(school.school_image);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchSchool();
//   }, []);

//   // ✅ Handle file select
//   const handleFileChange = (e) => {
//     const f = e.target.files[0];
//     if (f) {
//       setFile(f);
//       setImageUrl(URL.createObjectURL(f));
//     }
//   };

//   // ✅ Clear file
//   const handleClearFile = () => {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setFile(null);
//     fetchSchool();
//   };

//   // ✅ Submit update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!schoolName) return alert("School name required");

//     const fd = new FormData();
//     fd.append("school_name", schoolName);
//     if (file) fd.append("image", file);

//     try {
//       setSubmitting(true);
//       const resp = await axios.patch(`${baseApi}/school/update`, fd, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const updatedSchool = resp.data.school;
//       setSchoolName(updatedSchool.school_name);
//       setImageUrl(`${updatedSchool.school_image}?t=${Date.now()}`);
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       alert("Profile updated successfully!");
//       setEditMode(false);
//     } catch (err) {
//       console.error("Update error:", err);
//       alert(err.response?.data?.message || "Update failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading)
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );

//   return (
//     <Box sx={{ height: "100vh", width: "100%", bgcolor: "#0f172a" }}>
//       {!editMode ? (
//         // ✅ FULL-SCREEN VIEW
//         <Box
//           sx={{
//             position: "relative",
//             height: "100%",
//             width: "100%",
//             overflow: "hidden",
//           }}
//         >
//           <CardMedia
//             component="img"
//             image={imageUrl || "/placeholder.jpg"}
//             alt="School"
//             sx={{
//               height: "100%",
//               width: "100%",
//               objectFit: "cover",
//               filter: "brightness(0.6)",
//             }}
//           />

//           {/* School Name Overlay */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               color: "#fff",
//               textAlign: "center",
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 700,
//                 textShadow: "0 4px 20px rgba(0,0,0,0.5)",
//               }}
//             >
//               {schoolName || "No School Name"}
//             </Typography>
//           </Box>

//           {/* Edit Button */}
//           <IconButton
//             onClick={() => setEditMode(true)}
//             sx={{
//               position: "absolute",
//               top: 20,
//               right: 20,
//               bgcolor: "rgba(56,189,248,0.9)",
//               "&:hover": { bgcolor: "#0ea5e9" },
//               color: "#fff",
//               width: 60,
//               height: 60,
//               borderRadius: "50%",
//               boxShadow: "0 0 15px rgba(56,189,248,0.6)",
//             }}
//           >
//             <EditIcon fontSize="large" />
//           </IconButton>
//         </Box>
//       ) : (
//         // ✅ EDIT MODE
//         <Fade in={editMode} timeout={400}>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//               height: "100%",
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               bgcolor: "#0f172a",
//             }}
//           >
//             <Box
//               sx={{
//                 width: "90%",
//                 maxWidth: 400,
//                 bgcolor: "#1e293b",
//                 p: 3,
//                 borderRadius: 3,
//                 boxShadow: "0 0 25px rgba(56,189,248,0.3)",
//               }}
//             >
//               <Typography variant="h5" mb={2} color="#38bdf8">
//                 Edit School Profile
//               </Typography>

//               <TextField
//                 fullWidth
//                 label="School Name"
//                 value={schoolName}
//                 onChange={(e) => setSchoolName(e.target.value)}
//                 sx={{
//                   mb: 2,
//                   input: { color: "#fff" },
//                   "& .MuiInputLabel-root": { color: "#cbd5e1" },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#334155" },
//                     "&:hover fieldset": { borderColor: "#38bdf8" },
//                   },
//                 }}
//               />

//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 style={{ marginBottom: "1rem", color: "#fff" }}
//               />

//               {imageUrl && (
//                 <CardMedia
//                   component="img"
//                   image={imageUrl}
//                   sx={{
//                     borderRadius: 2,
//                     mb: 2,
//                     width: "100%",
//                     height: 200,
//                     objectFit: "cover",
//                   }}
//                 />
//               )}

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   gap: 2,
//                 }}
//               >
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   fullWidth
//                   disabled={submitting}
//                   startIcon={<SaveIcon />}
//                   sx={{
//                     bgcolor: "#38bdf8",
//                     "&:hover": { bgcolor: "#0ea5e9" },
//                   }}
//                 >
//                   {submitting ? "Updating..." : "Save"}
//                 </Button>

//                 <Button
//                   onClick={() => {
//                     setEditMode(false);
//                     handleClearFile();
//                   }}
//                   variant="outlined"
//                   fullWidth
//                   startIcon={<CancelIcon />}
//                   sx={{
//                     color: "#f87171",
//                     borderColor: "#f87171",
//                     "&:hover": { borderColor: "#ef4444", color: "#ef4444" },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </Fade>
//       )}
//     </Box>
//   );
// }














































/* eslint-disable no-unused-vars */
import * as React from "react";
import {
  Box,
  TextField,
  Button,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  Fade,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { baseApi } from "../../../environment";

export default function DashBoard() {
  const [schoolName, setSchoolName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const token = localStorage.getItem("token");

  // ✅ Fetch School
  const fetchSchool = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${baseApi}/school/fetch-single`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const school = resp.data.school;
      setSchoolName(school.school_name);
      setImageUrl(`${school.school_image}?t=${Date.now()}`);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSchool();
  }, []);

  // ✅ Handle file change
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setImageUrl(URL.createObjectURL(f));
    }
  };

  // ✅ Save changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!schoolName) return alert("School name required");

    const fd = new FormData();
    fd.append("school_name", schoolName);
    if (file) fd.append("school_image", file);

    try {
      setSubmitting(true);

      const resp = await axios.patch(`${baseApi}/school/update`, fd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = resp.data.school;
      setSchoolName(updated.school_name);
      setImageUrl(`${updated.school_image}?t=${Date.now()}`);
      setFile(null);
      fileInputRef.current.value = "";
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || "Failed to update");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ height: "100vh", width: "100%", bgcolor: "#0f172a" }}>
      {!editMode ? (
        // ✅ Full Screen Dashboard View
        <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
          <CardMedia
            component="img"
            image={imageUrl || "/placeholder.jpg"}
            alt="School"
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              filter: "brightness(0.5)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", textShadow: "0px 3px 10px #000" }}
            >
              {schoolName || "No School Name"}
            </Typography>
          </Box>

          <IconButton
            onClick={() => setEditMode(true)}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              bgcolor: "#38bdf8",
              color: "#fff",
              "&:hover": { bgcolor: "#0ea5e9" },
              width: 60,
              height: 60,
            }}
          >
            <EditIcon fontSize="large" />
          </IconButton>
        </Box>
      ) : (
        // ✅ Edit mode
        <Fade in={editMode}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#0f172a",
            }}
          >
            <Box
              sx={{
                width: "90%",
                maxWidth: 450,
                bgcolor: "#1e293b",
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" color="#38bdf8" mb={2}>
                Edit Profile
              </Typography>

              <TextField
                fullWidth
                label="School Name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                sx={{ mb: 2, input: { color: "#fff" } }}
              />

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: "1rem", color: "#fff" }}
              />

              {imageUrl && (
                <CardMedia
                  component="img"
                  image={imageUrl}
                  sx={{
                    mb: 2,
                    height: 180,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
              )}

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  {submitting ? "Saving..." : "Save"}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => setEditMode(false)}
                  sx={{ color: "#f87171", borderColor: "#f87171" }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      )}
    </Box>
  );
}
