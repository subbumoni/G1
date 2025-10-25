// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const {
//   createNotice,
//   getAllNotices,
//   updateNotice,
//   deleteNotice,
// } = require("../controllers/notice.controller");

// // Routes
// router.post("/create", authMiddleware(["SCHOOL"]), createNotice);
// router.get("/all", authMiddleware(["SCHOOL","TEACHER"]), getAllNotices);
// router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateNotice);
// router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteNotice);

// module.exports = router;









// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const {
//   createNotice,
//   getAllNotices,
//   updateNotice,
//   deleteNotice,
// } = require("../controllers/notice.controller");

// // School can create, update, delete notices
// router.post("/create", authMiddleware(["SCHOOL"]), createNotice);
// router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateNotice);
// router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteNotice);

// // Both school and teacher can get notices
// router.get("/all", authMiddleware(["SCHOOL", "TEACHER"]), getAllNotices);

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const {
//   createNotice,
//   getAllNotices,
//   updateNotice,
//   deleteNotice,
// } = require("../controllers/notice.controller");

// // Routes
// router.post("/create", authMiddleware(["SCHOOL"]), createNotice);
// router.get("/all", authMiddleware(["SCHOOL", "TEACHER"]), getAllNotices);
// router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateNotice);
// router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteNotice);

// module.exports = router;










// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const {
//   createNotice,
//   getAllNotices,
//   updateNotice,
//   deleteNotice,
//   getTeacherNotices,
//   getStudentNotices,
// } = require("../controllers/notice.controller");

// // Routes
// router.post("/create", authMiddleware(["SCHOOL"]), createNotice);
// router.get(
//   "/all",
//   authMiddleware(["SCHOOL"]), //, "TEACHER", "STUDENT"
//   getAllNotices
// );
// router.get("/teacher",authMiddleware(['TEACHER']),getTeacherNotices)
// router.get("/student", authMiddleware(["STUDENT"]), getStudentNotices);
// router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateNotice);
// router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteNotice);

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const {
//   createNotice,
//   getAllNotices,
//   updateNotice,
//   deleteNotice,
//   getTeacherNotices,
//   getStudentNotices,
// } = require("../controllers/notice.controller");

// router.post("/create", authMiddleware(["SCHOOL"]), createNotice);
// router.get("/all", authMiddleware(["SCHOOL"]), getAllNotices);
// router.get("/teacher", authMiddleware(["TEACHER"]), getTeacherNotices);
// router.get("/student", authMiddleware(["STUDENT"]), getStudentNotices);
// router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateNotice);
// router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteNotice);






// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const {
//   createNotice,
//   getAllNotices,
//   updateNotice,
//   deleteNotice,
//   getTeacherNotices,
//   getStudentNotices,
// } = require("../controllers/notice.controller");

// // Routes
// router.post("/create", authMiddleware(["SCHOOL"]), createNotice);
// router.get("/all", authMiddleware(["SCHOOL","TEACHER"]), getAllNotices);
//  router.get("/teacher", authMiddleware(["TEACHER"]), getTeacherNotices);
// router.get("/student", authMiddleware(["STUDENT"]), getStudentNotices);
// router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateNotice);
// router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteNotice);

// module.exports = router;














const express = require("express");
const router = express.Router();
const authMiddleware = require("../auth/auth");
const {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
  getTeacherNotices,
  getStudentNotices,
} = require("../controllers/notice.controller");

// ✅ Routes
router.post("/create", authMiddleware(["SCHOOL"]), createNotice);
router.get(
  "/all",
  authMiddleware(["SCHOOL", "TEACHER", "STUDENT"]),
  getAllNotices
);
router.get("/teacher", authMiddleware(["TEACHER"]), getTeacherNotices);
router.get("/student", authMiddleware(["STUDENT"]), getStudentNotices);
router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateNotice);
router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteNotice);

module.exports = router;








