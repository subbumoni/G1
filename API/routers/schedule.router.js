// const express = require("express");
// const router = express.Router();
// const {
//   createSchedule,
//   getScheduleWithClass,
//   updateScheduleWithId,
//   deleteScheduleWithId,
//   getScheduleWithId,
  
// } = require("../controllers/schedule.controller");

// const authMiddleware = require("../auth/auth");

// // Routes
// router.post("/create", authMiddleware(["SCHOOL"]), createSchedule);
// router.get("/fetch-with-query/:id", authMiddleware(["SCHOOL", "TEACHER", "STUDENT"]), getScheduleWithClass);
// router.get("/fetch/:id", authMiddleware(["SCHOOL"]), getScheduleWithId);
// router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateScheduleWithId);
// router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteScheduleWithId);


// module.exports = router;






const express = require("express");
const router = express.Router();
const {
  createSchedule,
  getScheduleWithClass,
  updateScheduleWithId,
  deleteScheduleWithId,
  getScheduleWithId,
} = require("../controllers/schedule.controller");

const authMiddleware = require("../auth/auth");

// Routes
router.post("/create", authMiddleware(["SCHOOL"]), createSchedule);
router.get(
  "/fetch-with-query/:id",
  authMiddleware(["SCHOOL", "TEACHER", "STUDENT"]),
  getScheduleWithClass
);
router.get("/fetch/:id", authMiddleware(["SCHOOL"]), getScheduleWithId);
// router.post("/update/:id", authMiddleware(["SCHOOL"]), updateScheduleWithId);
router.put("/update/:id", authMiddleware(["SCHOOL"]), updateScheduleWithId);
router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteScheduleWithId);

module.exports = router;












