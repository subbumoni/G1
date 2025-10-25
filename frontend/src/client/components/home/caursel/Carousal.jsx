// import React, { useState } from "react";
// // import SwipeableViews from "react-swipeable-views";
// import { Typography, Box, Button } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// const carouselItems = [
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2020/12/10/20/40/color-5821297_1280.jpg",
//     title: "Explore Our Classroom",
//     description: "Engaging and inspiring environments for every student.",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2017/10/10/00/03/child-2835430_1280.jpg",
//     title: "Modern Learning Spaces",
//     description: "Designed for interaction and creativity.",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2019/09/03/01/51/child-4448370_1280.jpg",
//     title: "Student-Focused Design",
//     description: "Where comfort meets productivity.",
//   },
// ];

// const Carousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleNext = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//   };

//   const handleBack = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <Box sx={{ position: "relative", width: "100%" }}>
//       <SwipeableViews index={activeIndex} onChangeIndex={setActiveIndex}>
//         {carouselItems.map((item, index) => (
//           <Box
//             key={index}
//             sx={{
//               position: "relative",
//               textAlign: "center",
//               color: "white",
//             }}
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               style={{
//                 width: "100%",
//                 height: "70vh",
//                 minHeight: "400px",
//                 objectFit: "cover",
//               }}
//             />

//             <Box
//               sx={{
//                 position: "absolute",
//                 bottom: 40,
//                 left: 50,
//                 bgcolor: "rgba(0,0,0,0.6)",
//                 p: 2,
//                 borderRadius: 1,
//               }}
//             >
//               <Typography variant="h5">{item.title}</Typography>
//               <Typography variant="body1">{item.description}</Typography>
//             </Box>
//           </Box>
//         ))}
//       </SwipeableViews>

//       {/* Navigation Buttons */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: 10,
//           transform: "translateY(-50%)",
//           zIndex: 1,
//         }}
//       >
//         <Button variant="contained" onClick={handleBack}>
//           <ArrowBackIosIcon />
//         </Button>
//       </Box>

//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           right: 10,
//           transform: "translateY(-50%)",
//           zIndex: 1,
//         }}
//       >
//         <Button variant="contained" onClick={handleNext}>
//           <ArrowForwardIosIcon />
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Carousel;




















// import React from "react";
// import { Box, Typography, IconButton } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// // Swiper v12 imports
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const carouselItems = [
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2020/12/10/20/40/color-5821297_1280.jpg",
//     title: "Explore Our Classroom",
//     description: "Engaging and inspiring environments for every student.",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2017/10/10/00/03/child-2835430_1280.jpg",
//     title: "Modern Learning Spaces",
//     description: "Designed for interaction and creativity.",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2019/09/03/01/51/child-4448370_1280.jpg",
//     title: "Student-Focused Design",
//     description: "Where comfort meets productivity.",
//   },
// ];

// const Carousel = () => {
//   return (
//     <Box sx={{ width: "100%", position: "relative" }}>
//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation={{
//           prevEl: ".custom-prev",
//           nextEl: ".custom-next",
//         }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         loop
//         style={{ width: "100%", height: "70vh" }}
//       >
//         {carouselItems.map((item, index) => (
//           <SwiperSlide key={index}>
//             <Box sx={{ position: "relative", width: "100%", height: "70vh" }}>
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                 }}
//               />
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 40,
//                   left: { xs: 20, sm: 50 },
//                   bgcolor: "rgba(0,0,0,0.6)",
//                   p: 2,
//                   borderRadius: 2,
//                   maxWidth: { xs: "80%", sm: "50%" },
//                 }}
//               >
//                 <Typography
//                   variant="h5"
//                   sx={{ color: "#fff", fontWeight: "bold" }}
//                 >
//                   {item.title}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#fff" }}>
//                   {item.description}
//                 </Typography>
//               </Box>
//             </Box>
//           </SwiperSlide>
//         ))}

//         {/* Custom Navigation Buttons */}
//         <IconButton
//           className="custom-prev"
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: 10,
//             transform: "translateY(-50%)",
//             zIndex: 10,
//             bgcolor: "rgba(0,0,0,0.5)",
//             "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
//           }}
//         >
//           <ArrowBackIosIcon sx={{ color: "#fff" }} />
//         </IconButton>

//         <IconButton
//           className="custom-next"
//           sx={{
//             position: "absolute",
//             top: "50%",
//             right: 10,
//             transform: "translateY(-50%)",
//             zIndex: 10,
//             bgcolor: "rgba(0,0,0,0.5)",
//             "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
//           }}
//         >
//           <ArrowForwardIosIcon sx={{ color: "#fff" }} />
//         </IconButton>
//       </Swiper>
//     </Box>
//   );
// };

// export default Carousel;















import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

// Carousel images
const carouselItems = [
  {
    image:
      "https://cdn.pixabay.com/photo/2020/12/10/20/40/color-5821297_1280.jpg",
    title: "Explore Our Classroom",
    description: "Engaging and inspiring environments for every student.",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2017/10/10/00/03/child-2835430_1280.jpg",
    title: "Modern Learning Spaces",
    description: "Designed for interaction and creativity.",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2019/09/03/01/51/child-4448370_1280.jpg",
    title: "Student-Focused Design",
    description: "Where comfort meets productivity.",
  },
];

// Daily proverbs
const proverbs = [
  { en: "Knowledge is power.", ta: "அறிவு சக்தி." },
  { en: "Education is the key to success.", ta: "கல்வி வெற்றிக்கான சாவி." },
  { en: "Learning never exhausts the mind.", ta: "கற்கை மனதை இறக்காது." },
  {
    en: "A good teacher is like a candle.",
    ta: "நல்ல ஆசிரியர் மெழுகுவர்த்தி போல.",
  },
  {
    en: "Small steps lead to big achievements.",
    ta: "சிறிய படிகள் பெரிய சாதனைகளை கொண்டு வருகிறது.",
  },
];

const Carousel = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get formatted date and time
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString();

  // Pick proverb based on day
  const todayProverb = proverbs[currentDate.getDate() % proverbs.length];

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        style={{ width: "100%", height: "70vh" }}
      >
        {carouselItems.map((item, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: "relative", width: "100%", height: "70vh" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              {/* Bottom-right overlay for date, time, proverb */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    bgcolor: "rgba(0,0,0,0.6)",
                    p: 2,
                    borderRadius: 2,
                    maxWidth: { xs: "80%", sm: "35%" },
                    textAlign: "right",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "#00ffff", mb: 0.5 }}
                  >
                    {formattedDate}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#00ffff", mb: 1 }}
                  >
                    {formattedTime}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#fff", mb: 0.5 }}
                  >
                    "{todayProverb.en}"
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ fontStyle: "italic", color: "#fff" }}
                  >
                    "{todayProverb.ta}"
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <IconButton
          className="custom-prev"
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowBackIosIcon sx={{ color: "#fff" }} />
        </IconButton>

        <IconButton
          className="custom-next"
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Swiper>
    </Box>
  );
};

export default Carousel;

