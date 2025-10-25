// import * as React from "react";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import axios from "axios";

// export default function Gallery() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedSchool, setSelectedSchool] = React.useState(null);
//   const [schools, setSchools] = React.useState([]);

//   const handleOpen = (school) => {
//     setOpen(true);
//     setSelectedSchool(school);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedSchool(null);
//   };

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   React.useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/school/all")
//       .then((resp) => {
//         console.log("School", resp.data.schools);
//         setSchools(resp.data.schools);
//       })
//       .catch((e) => {
//         console.error("Error:", e);
//       });
//   }, []);

//   return (
//     <Box>
// <Typography variant="h4" sx={{textAlign:"center",marginTop:"40px",marginBottom:"20px"}}>Register Schools</Typography>

//       <ImageList
//         sx={{
//           width: "100%",
//           height: "auto",
//           gridTemplateColumns: "repeat(2, 1fr) !important",
//         }}
//         cols={2}
//         gap={10}
//       >
//         {schools.map((school, index) => (
//           <ImageListItem key={school._id || index}>
//             <img
//               src={`/images/uploaded/school/${school.school_image}`}
//               alt={school.school_name}
//               loading="lazy"
//               style={{ width: "100%", cursor: "pointer" }}
//               onClick={() => handleOpen(school)}
//             />
//             <ImageListItemBar
//               title={school.school_name}
//               position="below"
//               sx={{ textAlign: "center" }}
//             />
//           </ImageListItem>
//         ))}
//       </ImageList>

//       {/* Modal for selected school */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           {selectedSchool && (
//             <>
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 {selectedSchool.school_name}
//               </Typography>
//               <img
//                 src={`/images/uploaded/school/${selectedSchool.school_image}`}
//                 alt={selectedSchool.school_name}
//                 style={{ width: "100%", marginTop: "10px" }}
//               />
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }





import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

export default function Gallery() {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState(null);
  const [schools, setSchools] = React.useState([]);

  const handleOpen = (school) => {
    setOpen(true);
    setSelectedSchool(school);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSchool(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/api/school/all")
      .then((resp) => {
        setSchools(resp.data.schools);
      })
      .catch((e) => console.error("Error:", e));
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}
      >
        Register Schools
      </Typography>

      <ImageList
        sx={{
          width: "100%",
          height: "auto",
          gridTemplateColumns: "repeat(2, 1fr) !important",
        }}
        cols={2}
        gap={10}
      >
        {schools.map((school, index) => (
          <ImageListItem key={school._id || index}>
            <img
              src={school.school_image} // ✅ Cloudinary URL
              alt={school.school_name}
              loading="lazy"
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => handleOpen(school)}
            />
            <ImageListItemBar
              title={school.school_name}
              position="below"
              sx={{ textAlign: "center" }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Modal for selected school */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedSchool && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedSchool.school_name}
              </Typography>
              <img
                src={selectedSchool.school_image} // ✅ Cloudinary URL
                alt={selectedSchool.school_name}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
