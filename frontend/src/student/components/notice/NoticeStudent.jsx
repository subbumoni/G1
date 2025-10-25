// import { Box, Paper, Typography } from "@mui/material";
// import * as React from "react";
// import axios from "axios";
// import { baseApi } from "../../../environment";

// export default function NoticeStudent() {
//   const [notices, setNotices] = React.useState([]);

//   // Fetch all notices
//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/student`, {
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

// export default function NoticeStudent() {
//   const [notices, setNotices] = React.useState([]);

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/student`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Student Notices:", resp.data);
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

// export default function NoticeStudent() {
//   const [notices, setNotices] = React.useState([]);

//   const fetchAllNotices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const resp = await axios.get(`${baseApi}/notice/student`, {
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
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
//         >
//           <Paper
//             sx={{
//               p: 3,
//               borderRadius: 3,
//               width: 400,
//               maxWidth: "90vw",
//               boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//               background: "linear-gradient(135deg, #6a11cb, #2575fc)",
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


















import { Box, Paper, Typography, Dialog, DialogContent } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { baseApi } from "../../../environment";
import { Fade } from "@mui/material";
import { keyframes } from "@mui/system";

// Floating animation
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

export default function NoticeStudent() {
  const [notices, setNotices] = React.useState([]);
  const [zoomedNotice, setZoomedNotice] = React.useState(null);

  const fetchAllNotices = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(`${baseApi}/notice/student`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotices(resp.data.data || []);
    } catch (e) {
      console.error("Error fetching notices:", e);
    }
  };

  React.useEffect(() => {
    fetchAllNotices();
  }, []);

  const defaultAccent = "linear-gradient(180deg, #ff0080, #ff8c00)"; // Accent bar color

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
        📢 Student Notices
      </Typography>

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
              onClick={() => setZoomedNotice(notice)}
              sx={{
                p: 2,
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(145deg, #111, #222)",
                boxShadow:
                  "0 0 20px rgba(0,255,255,0.3), 0 0 30px rgba(0,255,255,0.2)",
                animation: `${floatAnimation} 4s ease-in-out infinite`,
                transition: "transform 0.3s, box-shadow 0.3s, background 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow:
                    "0 0 40px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.4)",
                  background: "linear-gradient(145deg, #333, #111)",
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
                  background: notice.bgColor || defaultAccent,
                }}
              />

              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {notice.title}
              </Typography>

              <Typography
                sx={{
                  color: "#0ff",
                  mb: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 4, // Limit to 4 lines
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {notice.message}
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}
              >
                Audience: {notice.audience} | Sent at:{" "}
                {new Date(notice.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          </Fade>
        ))}
      </Box>

      {notices.length === 0 && (
        <Typography
          sx={{
            textAlign: "center",
            mt: 5,
            color: "#888",
            fontStyle: "italic",
          }}
        >
          No notices available.
        </Typography>
      )}

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
