// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const teacherController = require("../controllers/teacher.controller");

// // ✅ Register Teacher (SCHOOL Only)
// router.post(
//   "/register",
//   authMiddleware(["SCHOOL"]),
//   teacherController.registerTeacher
// );

// // ✅ Get Teachers with Query (SCHOOL Only)
// router.get(
//   "/fetch-with-query",
//   authMiddleware(["SCHOOL"]),
//   teacherController.getTeachersWithQuery
// );

// // ✅ Get Teacher Own Data (TEACHER Only)
// router.get(
//   "/own-data",
//   authMiddleware(["TEACHER"]),
//   teacherController.getTeacherOwnData
// );

// // ✅ Login Teacher
// router.post("/login", teacherController.loginTeacher);

// // ✅ Update Teacher (SCHOOL Only)
// router.put(
//   "/update/:id",
//   authMiddleware(["SCHOOL"]),
//   teacherController.updateTeacher
// );

// // ✅ Delete Teacher (SCHOOL Only)
// router.delete(
//   "/delete/:id",
//   authMiddleware(["SCHOOL"]),
//   teacherController.deleteTeacherById
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../auth/auth");
const teacherController = require("../controllers/teacher.controller");

// Register Teacher (SCHOOL Only)
router.post(
  "/register",
  authMiddleware(["SCHOOL"]),
  teacherController.registerTeacher
);

// Get Teachers with Query (SCHOOL Only)
router.get(
  "/fetch-with-query",
  authMiddleware(["SCHOOL"]),
  teacherController.getTeachersWithQuery
);

// Get Teacher Own Data (TEACHER Only)
router.get(
  "/own-data",
  authMiddleware(["TEACHER"]),
  teacherController.getTeacherOwnData
);




// Login Teacher
router.post("/login", teacherController.loginTeacher);

// Update Teacher (SCHOOL Only)
router.put(
  "/update/:id",
  authMiddleware(["SCHOOL"]),
  teacherController.updateTeacher
);

// Delete Teacher (SCHOOL Only)
router.delete(
  "/delete/:id",
  authMiddleware(["SCHOOL"]),
  teacherController.deleteTeacherById
);

module.exports = router;
















// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const teacherController = require("../controllers/teacher.controller");

// // ✅ Register Teacher (SCHOOL Only)
// router.post(
//   "/register",
//   authMiddleware(["SCHOOL"]),
//   teacherController.registerTeacher
// );

// // ✅ Get Teachers with Query (SCHOOL Only)
// router.get(
//   "/fetch-with-query",
//   authMiddleware(["SCHOOL"]),
//   teacherController.getTeachersWithQuery
// );

// // ✅ Get Teacher's Own Data (TEACHER Only)
// router.get(
//   "/own-data",
//   authMiddleware(["TEACHER"]),
//   teacherController.getTeacherOwnData
// );

// // ✅ Login Teacher (Public)
// router.post("/login", teacherController.loginTeacher);

// // ✅ Update Teacher (SCHOOL Only)
// router.put(
//   "/update/:id",
//   authMiddleware(["SCHOOL"]),
//   teacherController.updateTeacher
// );

// // ✅ Delete Teacher (SCHOOL Only)
// router.delete(
//   "/delete/:id",
//   authMiddleware(["SCHOOL"]),
//   teacherController.deleteTeacherById
// );

// module.exports = router;