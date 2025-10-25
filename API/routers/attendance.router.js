// const express = require("express");
// const router = express.Router(); // Create router instance
// const authMiddleware = require("../auth/auth");
// const {
//   markAttendance,
//   getAttendance,
//   checkAttendance,
//   fetchStudentsWithQuery,
//   fetchTeachersByClass,
//   fetchAttendanceByClass,
// } = require("../controllers/attendance.controller");

// // ----------------------
// // Attendance Routes
// // ----------------------

// // Mark attendance (TEACHER only)
// router.post("/mark", authMiddleware(["TEACHER"]), markAttendance);

// // Get attendance for a specific student (SCHOOL only)
// router.get("/:studentId", authMiddleware(["SCHOOL"]), getAttendance);

// // Check if attendance is taken for a class today (SCHOOL only)
// router.get("/check/:classId", authMiddleware(["SCHOOL"]), checkAttendance);

// // Fetch students based on query (SCHOOL or TEACHER)
// router.get(
//   "/students",
//   authMiddleware(["SCHOOL", "TEACHER"]),
//   fetchStudentsWithQuery
// );

// // Fetch teachers for a specific class (SCHOOL only)
// router.get(
//   "/teachers/:classId",
//   authMiddleware(["SCHOOL"]),
//   fetchTeachersByClass
// );




// router.get(
//   "/fetch-class/:classId",
//   authMiddleware(["SCHOOL", "TEACHER"]),
//   fetchAttendanceByClass
// );
// module.exports = router;








// const express = require("express")
// const authMiddleware = require("../auth/auth")
// const { getAttendance, markAttendance, checkAttendance } = require("../controllers/attendance.controller")

// const router=express.Router()

// router.post("/mark",authMiddleware(['TEACHER']),markAttendance)
// router.get("/:studentId", authMiddleware(['SCHOOL']), getAttendance)
// router.get("/check/:classId",authMiddleware(['TEACHER']),checkAttendance)
// module.exports = router;

























const express = require("express");
const authMiddleware = require("../auth/auth");
const {
  markAttendance,
  getAttendance,
  checkAttendance,
} = require("../controllers/attendance.controller");

const router = express.Router();

// Teacher marks attendance
router.post("/mark", authMiddleware(["TEACHER"]), markAttendance);

// Check attendance for a class (Teacher)
router.get("/check/:classId", authMiddleware(["TEACHER"]), checkAttendance);

// Fetch student attendance (Student, Teacher, School)
router.get(
  "/:studentId",
  authMiddleware(["STUDENT", "TEACHER", "SCHOOL"]),
  getAttendance
);

module.exports = router;
