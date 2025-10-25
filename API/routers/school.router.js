const express = require('express');

const { registerSchool, getAllSchools, loginSchool, updateSchool, getSchoolOwnData } = require('../controllers/school.controller');
const  authMiddleware  = require('../auth/auth');

const router = express.Router();

router.post("/register", registerSchool);
router.get("/all", getAllSchools);
router.post("/login", loginSchool);
router.patch("/update", authMiddleware(["SCHOOL"]), updateSchool);; //AUTHENTICATED USER FOR UPDATE
router.get("/fetch-single", authMiddleware(["SCHOOL"]), getSchoolOwnData);




module.exports = router;








// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../auth/auth");
// const {
//   registerSchool,
//   loginSchool,
//   getSchoolOwnData,
//   updateSchool,
//   getAllSchools,
// } = require("../controllers/school.controller");

// router.post("/register", registerSchool);
// router.post("/login", loginSchool);
// router.get("/own", authMiddleware(["SCHOOL"]), getSchoolOwnData);
// router.patch("/update", authMiddleware(["SCHOOL"]), updateSchool);
// router.get("/all", authMiddleware(["SCHOOL"]), getAllSchools);

// module.exports = router;




