// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const app = express();

// // ✅ Fix CORS for frontend with credentials
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend origin
//     credentials: true,
//   })
// );

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ✅ Correct Static Image Folder Serving
// app.use(
//   "/images/uploaded/school",
//   express.static(path.join(__dirname, "public/images/uploaded/school"))
// );



// // ✅ MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/schoolManagement2024")
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((e) => console.log(" MongoDB connection error:", e));

// // ✅ Test Route
// app.get("/test", (req, res) => {
//   res.send({ id: 1, message: "Welcome, it is working" });
// });

// // ✅ School Router
// const schoolRouter = require("./routers/school.router");
// const classRouter = require("./routers/class.router");
// const subjectRouter = require("./routers/subject.router");
// const studentRouter = require("./routers/student.router");
// const teacherRouter = require("./routers/teacher.router");
//  const attendanceRouter=require("./routers/attendance.router")
// const examinationRouter = require("./routers/examination.router")
// const noticeRouter = require("./routers/examination.router")
 





// app.use("/api/school", schoolRouter);
// app.use("/api/class",classRouter)
// app.use("/api/subject", subjectRouter)
// app.use("/api/student", studentRouter);
// app.use("/api/teacher", teacherRouter);
// app.use("/api/schedule", require("./routers/schedule.router"));
//  app.use("/api/attendance",attendanceRouter)
// app.use("/api/examination", examinationRouter);
//  app.use("/api/notice",noticeRouter)
 



// // ✅ Server Listen
// const PORT = 4000;
// app.listen(PORT, () =>
//   console.log(` Server running at http://localhost:${PORT}`)
// );





// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const app = express();

// // ✅ Fix CORS for frontend
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// // ✅ Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ✅ Serve uploaded images (School, Student, Teacher)
// app.use(
//   "/images/uploaded/school",
//   express.static(path.resolve(__dirname, process.env.SCHOOL_IMAGE_PATH))
// );
// // ✅ Static folder for images
// app.use(
//   "/uploads/student",
//   express.static(path.join(__dirname, "public/images/uploaded/student"))
// );
// app.use(
//   "/images/uploaded/teacher",
//   express.static(path.resolve(__dirname, process.env.TEACHER_IMAGE_PATH))
// );

// // ✅ MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/schoolManagement2024")
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((e) => console.log("❌ MongoDB connection error:", e));

// // ✅ Routers
// app.use("/api/school", require("./routers/school.router"));
// app.use("/api/class", require("./routers/class.router"));
// app.use("/api/subject", require("./routers/subject.router"));
// app.use("/api/student", require("./routers/student.router"));
// app.use("/api/teacher", require("./routers/teacher.router"));
// app.use("/api/schedule", require("./routers/schedule.router"));
// app.use("/api/attendance", require("./routers/attendance.router"));

// // ✅ Test route
// app.get("/test", (req, res) => {
//   res.send({ id: 1, message: "Welcome, server working fine ✅" });
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running at http://localhost:${PORT}`)
// );



// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const app = express();

// // ✅ Fix CORS for frontend
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ✅ Static folders for uploaded images
// app.use(
//   "/images/uploaded/school",
//   express.static(path.resolve(__dirname, process.env.SCHOOL_IMAGE_PATH))
// );
// app.use(
//   "/uploads/student",
//   express.static(path.join(__dirname, "public/uploads/student"))
// );
// app.use(
//   "/images/uploaded/teacher",
//   express.static(path.resolve(__dirname, process.env.TEACHER_IMAGE_PATH))
// );

// // ✅ MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/schoolManagement2024")
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((e) => console.log("❌ MongoDB connection error:", e));

// // ✅ Routers
// app.use("/api/school", require("./routers/school.router"));
// app.use("/api/class", require("./routers/class.router"));
// app.use("/api/subject", require("./routers/subject.router"));
// app.use("/api/student", require("./routers/student.router"));
// app.use("/api/teacher", require("./routers/teacher.router"));
// app.use("/api/schedule", require("./routers/schedule.router"));
// app.use("/api/attendance", require("./routers/attendance.router"));

// // ✅ Test route
// app.get("/test", (req, res) => {
//   res.send({ id: 1, message: "Welcome, server working fine ✅" });
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running at http://localhost:${PORT}`)
// );








// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const app = express();

// // ✅ Fix CORS for frontend with credentials
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend origin
//     credentials: true,
//   })
// );

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ✅ Correct Static Image Folder Serving
// app.use(
//   "/images/uploaded/school",
//   express.static(path.join(__dirname, "public/images/uploaded/school"))
// );

// // ✅ MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/schoolManagement2024")
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((e) => console.log("❌ MongoDB connection error:", e));

// // ✅ Test Route
// app.get("/test", (req, res) => {
//   res.send({ id: 1, message: "Welcome, it is working" });
// });

// // ✅ Routers
// const schoolRouter = require("./routers/school.router");
// const classRouter = require("./routers/class.router");
// const subjectRouter = require("./routers/subject.router");
// const studentRouter = require("./routers/student.router");
// const teacherRouter = require("./routers/teacher.router");
//  const attendanceRouter = require("./routers/attendance.router");
// const examinationRouter = require("./routers/examination.router");
// const noticeRouter = require("./routers/notice.router"); // ✅ FIXED
// const scheduleRouter = require("./routers/schedule.router")



// // ✅ Use Routers
// app.use("/api/school", schoolRouter);
// app.use("/api/class", classRouter);
// app.use("/api/subject", subjectRouter);
// app.use("/api/student", studentRouter);
// app.use("/api/teacher", teacherRouter);
// app.use("/api/schedule",scheduleRouter)
//  app.use("/api/attendance", attendanceRouter);
// app.use("/api/examination", examinationRouter);
// app.use("/api/notice", noticeRouter); // ✅ FIXED


// // ✅ Server Listen
// const PORT = 4000;
// app.listen(PORT, () =>
//   console.log(`✅ Server running at http://localhost:${PORT}`)
// );


















require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://g1-frontend-school.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  "/images/uploaded/school",
  express.static(path.join(__dirname, "public/images/uploaded/school"))
);

// ✅ MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((e) => console.log("❌ MongoDB connection error:", e.message));

// ✅ Routes
app.get("/test", (req, res) => {
  res.send({ id: 1, message: "Welcome, it is working" });
});

const schoolRouter = require("./routers/school.router");
const classRouter = require("./routers/class.router");
const subjectRouter = require("./routers/subject.router");
const studentRouter = require("./routers/student.router");
const teacherRouter = require("./routers/teacher.router");
const attendanceRouter = require("./routers/attendance.router");
const examinationRouter = require("./routers/examination.router");
const noticeRouter = require("./routers/notice.router");
const scheduleRouter = require("./routers/schedule.router");

app.use("/api/school", schoolRouter);
app.use("/api/class", classRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/examination", examinationRouter);
app.use("/api/notice", noticeRouter);

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
