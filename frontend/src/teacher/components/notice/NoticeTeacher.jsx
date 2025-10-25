// import { Box, Paper, Typography } from "@mui/material";
// import * as React from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment"; // Ensure this path is correct


// export default function NoticeTeacher() {
//   const [notices, setNotices] = React.useState([]);

//   // Fetch all notices
//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/teacher`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotices(resp.data.data || []);
//       console.log("RESP",resp)
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();
//   }, []);

//   return (
//     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
//       {notices.map((x) => (
//         <Paper
//           key={x._id}
//           sx={{
//             p: 3,
//             borderRadius: 3,
//             boxShadow: 4,
//             backgroundColor: "#f9f9f9",
//             width: 450,
//           }}
//         >
//           <Typography variant="h6">Notice: {x.title}</Typography>
//           <Typography variant="body2">Message: {x.message}</Typography>
//           <Typography variant="body2">Audience: {x.audience}</Typography>
//         </Paper>
//       ))}
//     </Box>
//   );
// }







// import { Box, Paper, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function NoticeTeacher() {
//   const [notices, setNotices] = useState([]);

//   const fetchTeacherNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const resp = await axios.get(`${baseApi}/notice/teacher`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("RESP data:", resp.data); // Debug
//       setNotices(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching teacher notices:", e);
//     }
//   };

//   useEffect(() => {
//     fetchTeacherNotices();
//   }, []);

//   return (
//     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
//       {notices.map((x) => (
//         <Paper
//           key={x._id}
//           sx={{
//             p: 3,
//             borderRadius: 3,
//             boxShadow: 4,
//             backgroundColor: "#f9f9f9",
//             width: 450,
//           }}
//         >
//           <Typography variant="h6">Notice: {x.title}</Typography>
//           <Typography variant="body2">Message: {x.message}</Typography>
//           <Typography variant="body2">Audience: {x.audience}</Typography>
//         </Paper>
//       ))}
//     </Box>
//   );
// }












// import React, { useEffect, useState } from "react";
// import { Box, Paper, Typography } from "@mui/material";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function NoticeTeacher() {
//   const [notices, setNotices] = useState([]);

//   const fetchTeacherNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/teacher`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotices(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching teacher notices:", e);
//     }
//   };

//   useEffect(() => {
//     fetchTeacherNotices();
//   }, []);

//   return (
//     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
//       {notices.map((x) => (
//         <Paper
//           key={x._id}
//           sx={{
//             p: 3,
//             borderRadius: 3,
//             boxShadow: 4,
//             backgroundColor: "#f9f9f9",
//             width: 450,
//           }}
//         >
//           <Typography variant="h6">Notice: {x.title}</Typography>
//           <Typography variant="body2">Message: {x.message}</Typography>
//           <Typography variant="body2">Audience: {x.audience}</Typography>
//         </Paper>
//       ))}
//     </Box>
//   );
// }






// import { Box, Paper, Typography } from "@mui/material";
// import * as React from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function NoticeTeacher() {
//   const [notices, setNotices] = React.useState([]);

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Teacher Notices:", resp.data);
//       setNotices(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();
//   }, []);

//   return (
//     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
//       {notices.map((x) => (
//         <Paper
//           key={x._id}
//           sx={{
//             p: 3,
//             borderRadius: 3,
//             boxShadow: 4,
//             backgroundColor: "#f9f9f9",
//             width: 450,
//           }}
//         >
//           <Typography variant="h6">Notice: {x.title}</Typography>
//           <Typography variant="body2">Message: {x.message}</Typography>
//           <Typography variant="body2">Audience: {x.audience}</Typography>
//         </Paper>
//       ))}
//     </Box>
//   );
// }










// import { Box, Paper, Typography } from "@mui/material";
// import * as React from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import { motion } from "framer-motion";

// export default function NoticeTeacher() {
//   const [notices, setNotices] = React.useState([]);

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotices(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: 3,
//         mt: 4,
//         justifyContent: "center",
//         px: 2,
//       }}
//     >
//       {notices.map((x, index) => (
//         <motion.div
//           key={x._id}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
//         >
//           <Paper
//             sx={{
//               p: 3,
//               borderRadius: 3,
//               width: 450,
//               maxWidth: "90vw",
//               boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//               background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // warm gradient
//               color: "#fff",
//               cursor: "pointer",
//               transition: "transform 0.3s ease, box-shadow 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-5px) scale(1.02)",
//                 boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
//               },
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: "bold", mb: 1, letterSpacing: "0.5px" }}
//             >
//               {x.title}
//             </Typography>
//             <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
//               {x.message}
//             </Typography>
//             <Typography
//               variant="caption"
//               sx={{
//                 display: "block",
//                 mt: 1,
//                 color: "rgba(255,255,255,0.8)",
//                 fontStyle: "italic",
//               }}
//             >
//               Audience: {x.audience} | Sent at:{" "}
//               {new Date(x.createdAt).toLocaleString()}
//             </Typography>
//           </Paper>
//         </motion.div>
//       ))}
//     </Box>
//   );
// }












// import { Box, Paper, Typography } from "@mui/material";
// import * as React from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import { motion } from "framer-motion";

// export default function NoticeTeacher() {
//   const [notices, setNotices] = React.useState([]);

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotices(resp.data.data || []);
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();
//   }, []);

//   // Default colors if none is provided
//   const defaultColors = [
//     "linear-gradient(135deg, #ff7e5f, #feb47b)",
//     "linear-gradient(135deg, #6a11cb, #2575fc)",
//     "linear-gradient(135deg, #11998e, #38ef7d)",
//     "linear-gradient(135deg, #fc5c7d, #6a82fb)",
//     "linear-gradient(135deg, #ff9966, #ff5e62)",
//   ];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: 3,
//         mt: 4,
//         justifyContent: "center",
//         px: 2,
//       }}
//     >
//       {notices.map((x, index) => {
//         // Random or pre-defined background color for each notice
//         const bgColor =
//           x.bgColor || defaultColors[index % defaultColors.length]; // You can store bgColor in notice if required

//         return (
//           <motion.div
//             key={x._id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
//           >
//             <Paper
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 width: 450,
//                 maxWidth: "90vw",
//                 boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//                 background: bgColor,
//                 color: "#fff",
//                 cursor: "pointer",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-5px) scale(1.02)",
//                   boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
//                 },
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "bold", mb: 1, letterSpacing: "0.5px" }}
//               >
//                 {x.title}
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
//                 {x.message}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   display: "block",
//                   mt: 1,
//                   color: "rgba(255,255,255,0.8)",
//                   fontStyle: "italic",
//                 }}
//               >
//                 Audience: {x.audience} | Sent at:{" "}
//                 {new Date(x.createdAt).toLocaleString()}
//               </Typography>
//             </Paper>
//           </motion.div>
//         );
//       })}
//     </Box>
//   );
// }












// import { Box, Paper, Typography, Badge, Snackbar, Alert } from "@mui/material";
// import * as React from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import { motion } from "framer-motion";

// export default function NoticeTeacher() {
//   const [notices, setNotices] = React.useState([]);
//   const [newNotice, setNewNotice] = React.useState(null); // for alert
//   const [openSnackbar, setOpenSnackbar] = React.useState(false);

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fetchedNotices = resp.data.data || [];

//       // Check if a new notice has arrived
//       if (fetchedNotices.length > notices.length) {
//         const latestNotice = fetchedNotices[fetchedNotices.length - 1];
//         setNewNotice(latestNotice);
//         setOpenSnackbar(true);
//       }

//       setNotices(fetchedNotices);
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();

//     // Optional: poll every 30 seconds for new notices
//     const interval = setInterval(fetchAllNotices, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleCloseSnackbar = () => setOpenSnackbar(false);

//   // Default colors if none is provided
//   const defaultColors = [
//     "linear-gradient(135deg, #ff7e5f, #feb47b)",
//     "linear-gradient(135deg, #6a11cb, #2575fc)",
//     "linear-gradient(135deg, #11998e, #38ef7d)",
//     "linear-gradient(135deg, #fc5c7d, #6a82fb)",
//     "linear-gradient(135deg, #ff9966, #ff5e62)",
//   ];

//   return (
//     <Box sx={{ mt: 4, px: 2 }}>
//       {/* Notice Count */}
//       <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
//         Total Notices:{" "}
//         <Badge
//           badgeContent={notices.length}
//           color="secondary"
//           sx={{ "& .MuiBadge-badge": { fontSize: 18 } }}
//         />
//       </Typography>

//       {/* Snackbar Alert */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity="info"
//           sx={{ width: "100%" }}
//         >
//           New Notice: {newNotice?.title}
//         </Alert>
//       </Snackbar>

//       {/* Notices List */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 3,
//           justifyContent: "center",
//         }}
//       >
//         {notices.map((x, index) => {
//           const bgColor =
//             x.bgColor || defaultColors[index % defaultColors.length];

//           return (
//             <motion.div
//               key={x._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: index * 0.15,
//                 duration: 0.6,
//                 ease: "easeOut",
//               }}
//             >
//               <Paper
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   width: 450,
//                   maxWidth: "90vw",
//                   boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//                   background: bgColor,
//                   color: "#fff",
//                   cursor: "pointer",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-5px) scale(1.02)",
//                     boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: "bold", mb: 1, letterSpacing: "0.5px" }}
//                 >
//                   {x.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
//                   {x.message}
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     display: "block",
//                     mt: 1,
//                     color: "rgba(255,255,255,0.8)",
//                     fontStyle: "italic",
//                   }}
//                 >
//                   Audience: {x.audience} | Sent at:{" "}
//                   {new Date(x.createdAt).toLocaleString()}
//                 </Typography>
//               </Paper>
//             </motion.div>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }


















// import {
//   Box,
//   Paper,
//   Typography,
//   Badge,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
// } from "@mui/material";
// import * as React from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import { motion } from "framer-motion";

// export default function NoticeTeacher() {
//   const [notices, setNotices] = React.useState([]);
//   const [unreadCount, setUnreadCount] = React.useState(0);
//   const [newNotice, setNewNotice] = React.useState(null);
//   const [openSnackbar, setOpenSnackbar] = React.useState(false);
//   const [zoomedNotice, setZoomedNotice] = React.useState(null); // For zooming dialog

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fetchedNotices = resp.data.data || [];

//       // Count new/unread notices
//       const newCount = fetchedNotices.filter((n) => !n.read).length;
//       setUnreadCount(newCount);

//       // Show alert if new notice arrives
//       if (fetchedNotices.length > notices.length) {
//         const latestNotice = fetchedNotices[fetchedNotices.length - 1];
//         setNewNotice(latestNotice);
//         setOpenSnackbar(true);
//       }

//       setNotices(fetchedNotices);
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();
//     const interval = setInterval(fetchAllNotices, 30000); // Poll every 30 sec
//     return () => clearInterval(interval);
//   }, []);

//   const handleCloseSnackbar = () => setOpenSnackbar(false);

//   const handleNoticeClick = async (notice) => {
//     setZoomedNotice(notice);

//     // Mark as read (optional: update backend)
//     if (!notice.read) {
//       setNotices((prev) =>
//         prev.map((n) => (n._id === notice._id ? { ...n, read: true } : n))
//       );
//       setUnreadCount((prev) => prev - 1);

//       try {
//         const token = localStorage.getItem("token");
//         await axios.patch(
//           `${baseApi}/notice/mark-read/${notice._id}`,
//           {},
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       } catch (e) {
//         console.error("Error marking notice read:", e);
//       }
//     }
//   };

//   // Default colors
//   const defaultColors = [
//     "linear-gradient(135deg, #ff7e5f, #feb47b)",
//     "linear-gradient(135deg, #6a11cb, #2575fc)",
//     "linear-gradient(135deg, #11998e, #38ef7d)",
//     "linear-gradient(135deg, #fc5c7d, #6a82fb)",
//     "linear-gradient(135deg, #ff9966, #ff5e62)",
//   ];

//   return (
//     <Box sx={{ mt: 4, px: 2 }}>
//       {/* Notice Count */}
//       <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
//         Total Notices:{" "}
//         <Badge
//           badgeContent={unreadCount}
//           color="secondary"
//           sx={{ "& .MuiBadge-badge": { fontSize: 18 } }}
//         />
//       </Typography>

//       {/* Snackbar Alert */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity="info"
//           sx={{ width: "100%" }}
//         >
//           New Notice: {newNotice?.title}
//         </Alert>
//       </Snackbar>

//       {/* Notices List */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 3,
//           justifyContent: "center",
//         }}
//       >
//         {notices.map((x, index) => {
//           const bgColor =
//             x.bgColor || defaultColors[index % defaultColors.length];

//           return (
//             <motion.div
//               key={x._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: index * 0.15,
//                 duration: 0.6,
//                 ease: "easeOut",
//               }}
//             >
//               <Paper
//                 onClick={() => handleNoticeClick(x)}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   width: 450,
//                   maxWidth: "90vw",
//                   boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//                   background: bgColor,
//                   color: "#fff",
//                   cursor: "pointer",
//                   opacity: x.read ? 0.7 : 1,
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-5px) scale(1.02)",
//                     boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: "bold", mb: 1, letterSpacing: "0.5px" }}
//                 >
//                   {x.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
//                   {x.message.length > 80
//                     ? x.message.slice(0, 80) + "..."
//                     : x.message}
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     display: "block",
//                     mt: 1,
//                     color: "rgba(255,255,255,0.8)",
//                     fontStyle: "italic",
//                   }}
//                 >
//                   Audience: {x.audience} | Sent at:{" "}
//                   {new Date(x.createdAt).toLocaleString()}
//                 </Typography>
//               </Paper>
//             </motion.div>
//           );
//         })}
//       </Box>

//       {/* Zoom Dialog */}
//       <Dialog
//         open={Boolean(zoomedNotice)}
//         onClose={() => setZoomedNotice(null)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogContent>
//           <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//             {zoomedNotice?.title}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             {zoomedNotice?.message}
//           </Typography>
//           <Typography variant="caption" sx={{ color: "gray" }}>
//             Audience: {zoomedNotice?.audience} | Sent at:{" "}
//             {zoomedNotice && new Date(zoomedNotice.createdAt).toLocaleString()}
//           </Typography>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }




















// import {
//   Box,
//   Paper,
//   Typography,
//   Badge,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
// } from "@mui/material";
// import * as React from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import { motion } from "framer-motion";

// export default function NoticeTeacher() {
//   const [notices, setNotices] = React.useState([]);
//   const [unreadCount, setUnreadCount] = React.useState(0);
//   const [newNotice, setNewNotice] = React.useState(null);
//   const [openSnackbar, setOpenSnackbar] = React.useState(false);
//   const [zoomedNotice, setZoomedNotice] = React.useState(null); // For zooming dialog

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fetchedNotices = resp.data.data || [];

//       // Count new/unread notices
//       const newCount = fetchedNotices.filter((n) => !n.read).length;
//       setUnreadCount(newCount);

//       // Show alert if new notice arrives
//       if (fetchedNotices.length > notices.length) {
//         const latestNotice = fetchedNotices[fetchedNotices.length - 1];
//         setNewNotice(latestNotice);
//         setOpenSnackbar(true);
//       }

//       setNotices(fetchedNotices);
//     } catch (e) {
//       console.error("Error fetching notices:", e);
//     }
//   };

//   React.useEffect(() => {
//     fetchAllNotices();
//     const interval = setInterval(fetchAllNotices, 30000); // Poll every 30 sec
//     return () => clearInterval(interval);
//   }, []);

//   const handleCloseSnackbar = () => setOpenSnackbar(false);

//   const handleNoticeClick = async (notice) => {
//     setZoomedNotice(notice);

//     // Mark as read (optional: update backend)
//     if (!notice.read) {
//       setNotices((prev) =>
//         prev.map((n) => (n._id === notice._id ? { ...n, read: true } : n))
//       );
//       setUnreadCount((prev) => prev - 1);

//       try {
//         const token = localStorage.getItem("token");
//         await axios.patch(
//           `${baseApi}/notice/mark-read/${notice._id}`,
//           {},
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       } catch (e) {
//         console.error("Error marking notice read:", e);
//       }
//     }
//   };

//   // Default colors
//   const defaultColors = [
//     "linear-gradient(135deg, #ff7e5f, #feb47b)",
//     "linear-gradient(135deg, #6a11cb, #2575fc)",
//     "linear-gradient(135deg, #11998e, #38ef7d)",
//     "linear-gradient(135deg, #fc5c7d, #6a82fb)",
//     "linear-gradient(135deg, #ff9966, #ff5e62)",
//   ];

//   return (
//     <Box sx={{ mt: 4, px: 2 }}>
//       {/* Notice Count */}
//       <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
//         Total Notices:{" "}
//         <Badge
//           badgeContent={unreadCount}
//           color="secondary"
//           sx={{ "& .MuiBadge-badge": { fontSize: 18 } }}
//         />
//       </Typography>

//       {/* Snackbar Alert */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity="info"
//           sx={{ width: "100%" }}
//         >
//           New Notice: {newNotice?.title}
//         </Alert>
//       </Snackbar>

//       {/* Notices List */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 3,
//           justifyContent: "center",
//         }}
//       >
//         {notices.map((x, index) => {
//           const bgColor =
//             x.bgColor || defaultColors[index % defaultColors.length];

//           return (
//             <motion.div
//               key={x._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: index * 0.15,
//                 duration: 0.6,
//                 ease: "easeOut",
//               }}
//             >
//               <Paper
//                 onClick={() => handleNoticeClick(x)}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   width: 450,
//                   maxWidth: "90vw",
//                   boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//                   background: bgColor,
//                   color: "#fff",
//                   cursor: "pointer",
//                   opacity: x.read ? 0.7 : 1,
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-5px) scale(1.02)",
//                     boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: "bold", mb: 1, letterSpacing: "0.5px" }}
//                 >
//                   {x.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
//                   {x.message.length > 80
//                     ? x.message.slice(0, 80) + "..."
//                     : x.message}
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     display: "block",
//                     mt: 1,
//                     color: "rgba(255,255,255,0.8)",
//                     fontStyle: "italic",
//                   }}
//                 >
//                   Audience: {x.audience} | Sent at:{" "}
//                   {new Date(x.createdAt).toLocaleString()}
//                 </Typography>
//               </Paper>
//             </motion.div>
//           );
//         })}
//       </Box>

//       {/* Zoom Dialog */}
//       <Dialog
//         open={Boolean(zoomedNotice)}
//         onClose={() => setZoomedNotice(null)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogContent>
//           <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//             {zoomedNotice?.title}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             {zoomedNotice?.message}
//           </Typography>
//           <Typography variant="caption" sx={{ color: "gray" }}>
//             Audience: {zoomedNotice?.audience} | Sent at:{" "}
//             {zoomedNotice && new Date(zoomedNotice.createdAt).toLocaleString()}
//           </Typography>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }


























import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Badge,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  Fade,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { motion } from "framer-motion";
import axios from "axios";
import { baseApi } from "../../../environment";

// Floating animation keyframes (same as examinations)
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

export default function NoticeTeacher() {
  const [notices, setNotices] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [newNotice, setNewNotice] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [zoomedNotice, setZoomedNotice] = useState(null);

  const fetchAllNotices = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(`${baseApi}/notice/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedNotices = resp.data.data || [];

      // Count unread
      const newCount = fetchedNotices.filter((n) => !n.read).length;
      setUnreadCount(newCount);

      // Show snackbar if new notice
      if (fetchedNotices.length > notices.length) {
        const latestNotice = fetchedNotices[fetchedNotices.length - 1];
        setNewNotice(latestNotice);
        setOpenSnackbar(true);
      }

      setNotices(fetchedNotices);
    } catch (e) {
      console.error("Error fetching notices:", e);
    }
  };

  useEffect(() => {
    fetchAllNotices();
    const interval = setInterval(fetchAllNotices, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleNoticeClick = async (notice) => {
    setZoomedNotice(notice);

    if (!notice.read) {
      setNotices((prev) =>
        prev.map((n) => (n._id === notice._id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);

      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `${baseApi}/notice/mark-read/${notice._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (e) {
        console.error("Error marking notice read:", e);
      }
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
          letterSpacing: "1px",
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          background: "linear-gradient(90deg, #00f, #0ff, #0f0, #ff0, #f00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        📝 Notices
      </Typography>

      {/* Badge */}
      <Typography variant="h6" sx={{ textAlign: "center", mb: 3 }}>
        Total Unread Notices:{" "}
        <Badge
          badgeContent={unreadCount}
          color="secondary"
          sx={{ "& .MuiBadge-badge": { fontSize: 18 } }}
        />
      </Typography>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          New Notice: {newNotice?.title}
        </Alert>
      </Snackbar>

      {/* Notices Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 4,
          px: 2,
        }}
      >
        {notices.map((notice, index) => (
          <Fade
            in
            style={{ transitionDelay: `${index * 200}ms` }}
            key={notice._id}
          >
            <Paper
              onClick={() => handleNoticeClick(notice)}
              sx={{
                p: 3,
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
                background: notice.read
                  ? "linear-gradient(145deg, #111, #222)"
                  : "linear-gradient(145deg, #222, #333)",
                boxShadow:
                  "0 0 20px rgba(0,255,255,0.3), 0 0 30px rgba(0,255,255,0.2)",
                animation: `${floatAnimation} 4s ease-in-out infinite`,
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow:
                    "0 0 40px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.4)",
                  background: "linear-gradient(145deg, #0ff, #111)",
                },
              }}
            >
              {/* Accent Bar */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "8px",
                  borderRadius: "8px 0 0 8px",
                  background: notice.read
                    ? "linear-gradient(180deg, #888, #555)"
                    : "linear-gradient(180deg, #00f, #0ff)",
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {notice.title}
              </Typography>
              <Typography sx={{ color: "#0ff", mb: 0.5, lineHeight: 1.5 }}>
                {notice.message.length > 100
                  ? notice.message.slice(0, 100) + "..."
                  : notice.message}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, color: "rgba(255,255,255,0.7)" }}
              >
                Audience: {notice.audience} | Sent at:{" "}
                {new Date(notice.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          </Fade>
        ))}
      </Box>

      {/* Zoom Dialog */}
      <Dialog
        open={Boolean(zoomedNotice)}
        onClose={() => setZoomedNotice(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {zoomedNotice?.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {zoomedNotice?.message}
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Audience: {zoomedNotice?.audience} | Sent at:{" "}
            {zoomedNotice && new Date(zoomedNotice.createdAt).toLocaleString()}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
