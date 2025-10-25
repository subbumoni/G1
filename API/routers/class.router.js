const express = require('express');
const authMiddleware=require('../auth/auth');
const { createClass, getAllClasses, updateClassWithId, deleteClassWithId, getSingleClass, getAttendeeClass } = require('../controllers/class.controller');

const router = express.Router();

router.post("/create", authMiddleware(["SCHOOL"]), createClass);
router.get("/all", authMiddleware(["SCHOOL","TEACHER","STUDENT"]), getAllClasses);  //,"TEACHER","STUDENT"
 router.get("/single/:id", authMiddleware(["SCHOOL","TEACHER","STUDENT"]), getSingleClass);
router.get("/attendee",authMiddleware(['TEACHER']),getAttendeeClass)
router.patch("/update/:id", authMiddleware(["SCHOOL"]), updateClassWithId);; //AUTHENTICATED USER FOR UPDATE 
router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteClassWithId);





module.exports = router;








