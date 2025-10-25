// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const studentController = require("../controllers/student.controller");

// // Register Student (SCHOOL Only)
// router.post(
//   "/register",
//   authMiddleware(["SCHOOL"]),
//   studentController.registerStudent
// );

// // Get Students with Query (SCHOOL Only)
// router.get(
//   "/fetch-with-query",
//   authMiddleware(["SCHOOL"]),
//   studentController.getStudentsWithQuery
// );

// // Get Student Own Data (STUDENT Only)
// router.get(
//   "/own-data",
//   authMiddleware(["STUDENT"]),
//   studentController.getStudentOwnData
// );

// // Update Student (SCHOOL Only)
// router.put(
//   "/update/:id",
//   authMiddleware(["SCHOOL"]),
//   studentController.updateStudent
// );




// // Delete Student (SCHOOL Only)
// router.delete(
//   "/delete/:id",
//   authMiddleware(["SCHOOL"]),
//   studentController.deleteStudentById
// );



// // Student Login
// router.post("/login", studentController.loginStudent);


// module.exports = router;









const express = require("express");
const router = express.Router();
const authMiddleware = require("../auth/auth");
const studentController = require("../controllers/student.controller");

// Register Student (SCHOOL Only)
router.post(
  "/register",
  authMiddleware(["SCHOOL"]),
  studentController.registerStudent
);

// Get Students with Query (SCHOOL Only)
router.get(
  "/fetch-with-query",
  authMiddleware(["SCHOOL","TEACHER"]),
  studentController.getStudentsWithQuery
);

// Get Student Own Data (STUDENT Only)
router.get(
  "/own-data",
  authMiddleware(["SCHOOL","STUDENT"]),
  studentController.getStudentOwnData
);

// Update Student (SCHOOL Only)
router.put(
  "/update/:id",
  authMiddleware(["SCHOOL"]),
  studentController.updateStudent
);

// Delete Student (SCHOOL Only)
router.delete(
  "/delete/:id",
  authMiddleware(["SCHOOL"]),
  studentController.deleteStudentById
);

// Student Login
router.post("/login", studentController.loginStudent);

module.exports = router;

