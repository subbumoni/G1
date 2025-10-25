// const Attendance = require("../models/attendance.model");
// const moment = require("moment");

// module.exports = {
//   // ✅ Mark bulk attendance
//   markAttendance: async (req, res) => {
//     try {
//       const { records } = req.body;
//       const schoolId = req.user.schoolId;
//       const teacherId = req.user._id;

//       if (!records || !Array.isArray(records) || records.length === 0) {
//         return res
//           .status(400)
//           .json({ success: false, message: "No attendance records provided" });
//       }

//       const today = moment().startOf("day").toDate();

//       const bulkOps = records.map((record) => ({
//         updateOne: {
//           filter: {
//             student: record.student,
//             class: record.class,
//             date: today,
//           },
//           update: {
//             $set: {
//               status: record.status,
//               teacher: teacherId,
//               school: schoolId,
//               date: today,
//             },
//           },
//           upsert: true,
//         },
//       }));

//       await Attendance.bulkWrite(bulkOps);
//       res
//         .status(200)
//         .json({ success: true, message: "Attendance marked successfully" });
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error in marking attendance" });
//     }
//   },

//   // ✅ Get attendance for a student
//   getAttendance: async (req, res) => {
//     const { studentId } = req.params;
//     try {
//       const attendance = await Attendance.find({ student: studentId }).populate(
//         "student"
//       );
//       res.status(200).json(attendance);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ success: false, message: "Error in getting attendance" });
//     }
//   },

//   // ✅ Check today’s attendance already taken or not
//   checkAttendance: async (req, res) => {
//     const { classId } = req.params;
//     try {
//       const today = moment().startOf("day").toDate();
//       const tomorrow = moment(today).add(1, "days").toDate();

//       const attendance = await Attendance.findOne({
//         class: classId,
//         date: { $gte: today, $lt: tomorrow },
//       });

//       if (attendance) {
//         return res
//           .status(200)
//           .json({ attendanceTaken: true, message: "Attendance already taken" });
//       } else {
//         return res.status(200).json({
//           attendanceTaken: false,
//           message: "No attendance taken yet for today.",
//         });
//       }
//     } catch (error) {
//       res
//         .status(500)
//         .json({ success: false, message: "Error in checking attendance." });
//     }
//   },

//   // ✅ Filter attendance by class and teacher
//   filterAttendance: async (req, res) => {
//     const { classId, teacherId } = req.query;

//     if (!classId || !teacherId) {
//       return res
//         .status(400)
//         .json({ message: "classId and teacherId are required" });
//     }

//     try {
//       const attendance = await Attendance.find({
//         class: classId,
//         teacher: teacherId,
//       })
//         .populate("student", "name")
//         .sort({ date: -1 });

//       res.status(200).json({ attendance });
//     } catch (error) {
//       console.error("Error filtering attendance:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error in filtering attendance" });
//     }
//   },
// };

// const Attendance = require("../models/attendance.model");
// const Student = require("../models/student.model");
// const Schedule = require("../models/schedule.model");

// // ✅ Mark attendance (for school or teacher)
// exports.markAttendance = async (req, res) => {
//   try {
//     const { studentId, date, status, teacherName } = req.body;
//     const { role, id } = req.user;

//     if (!studentId || !date || !status) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // ✅ Find student
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // ✅ Find teacher name — use from body or schedule
//     let teacher = teacherName;

//     if (!teacher && role === "TEACHER") {
//       teacher = req.user.owner_name || "Unknown Teacher";
//     }

//     if (!teacher && role === "SCHOOL") {
//       // Try to find from schedule
//       const schedule = await Schedule.findOne({
//         class: student.student_class,
//         schoolId: student.school,
//       });
//       teacher = schedule?.teacher || "N/A";
//     }

//     // ✅ Upsert (update if already exists)
//     const existingAttendance = await Attendance.findOne({
//       student: studentId,
//       date,
//     });

//     if (existingAttendance) {
//       existingAttendance.status = status;
//       existingAttendance.teacher = teacher;
//       await existingAttendance.save();
//       return res.status(200).json({
//         message: "Attendance updated successfully",
//         data: existingAttendance,
//       });
//     }

//     // ✅ Create new record
//     const attendance = new Attendance({
//       student: studentId,
//       date,
//       status,
//       teacher,
//       school: student.school,
//       class: student.student_class,
//     });

//     await attendance.save();

//     res.status(201).json({
//       message: "Attendance marked successfully",
//       data: attendance,
//     });
//   } catch (error) {
//     console.error("Error marking attendance:", error);
//     res.status(500).json({
//       message: "Error marking attendance",
//       error: error.message,
//     });
//   }
// };

// // ✅ Get attendance by class
// exports.getAttendanceByClass = async (req, res) => {
//   try {
//     const { classId } = req.params;
//     const records = await Attendance.find({ class: classId })
//       .populate("student", "name roll_no")
//       .sort({ date: -1 });

//     res.status(200).json({
//       message: "Attendance fetched successfully",
//       data: records,
//     });
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     res.status(500).json({
//       message: "Error fetching attendance",
//       error: error.message,
//     });
//   }
// };

// // ✅ Get all attendance (for school or teacher)
// exports.getAllAttendance = async (req, res) => {
//   try {
//     const { role, id } = req.user;

//     let filter = {};
//     if (role === "SCHOOL") {
//       filter.school = id;
//     }

//     const records = await Attendance.find(filter)
//       .populate("student", "name roll_no student_class")
//       .sort({ date: -1 });

//     res.status(200).json({
//       message: "All attendance fetched successfully",
//       data: records,
//     });
//   } catch (error) {
//     console.error("Error fetching all attendance:", error);
//     res.status(500).json({
//       message: "Error fetching all attendance",
//       error: error.message,
//     });
//   }
// };

// const Attendance = require("../models/attendance.model");
// const Student = require("../models/student.model");
// const Schedule = require("../models/schedule.model");

// // ✅ Mark attendance (Teacher or School can do this)
// exports.markAttendance = async (req, res) => {
//   try {
//     const { studentId, date, status, classId } = req.body;
//     const teacherId = req.user?.id; // from auth middleware (JWT)
//     const schoolId = req.user?.schoolId || req.body.schoolId;

//     if (!studentId || !status || !classId || !date) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Check if already marked
//     const existing = await Attendance.findOne({
//       studentId,
//       date: new Date(date),
//     });

//     if (existing) {
//       existing.status = status;
//       await existing.save();
//       return res
//         .status(200)
//         .json({
//           message: "Attendance updated successfully",
//           attendance: existing,
//         });
//     }

//     const newAttendance = new Attendance({
//       studentId,
//       date: new Date(date),
//       status,
//       classId,
//       teacherId,
//       schoolId,
//     });

//     await newAttendance.save();
//     res
//       .status(201)
//       .json({
//         message: "Attendance marked successfully",
//         attendance: newAttendance,
//       });
//   } catch (err) {
//     console.error("Error marking attendance:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // ✅ Fetch attendance list for a specific class
// exports.getAttendanceByClass = async (req, res) => {
//   try {
//     const { classId, date } = req.query;
//     if (!classId) return res.status(400).json({ message: "classId required" });

//     const filter = { classId };
//     if (date) filter.date = new Date(date);

//     const attendance = await Attendance.find(filter)
//       .populate("studentId", "name roll_number student_class")
//       .populate("teacherId", "name")
//       .sort({ date: -1 });

//     res.status(200).json({ success: true, attendance });
//   } catch (err) {
//     console.error("Error fetching attendance:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Fetch attendance for a specific student
// exports.getAttendanceByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     if (!studentId)
//       return res.status(400).json({ message: "studentId required" });

//     const attendance = await Attendance.find({ studentId }).sort({ date: -1 });
//     res.status(200).json({ success: true, attendance });
//   } catch (err) {
//     console.error("Error fetching attendance for student:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Fetch all attendance (School Admin overview)
// exports.getAllAttendance = async (req, res) => {
//   try {
//     const { schoolId } = req.query;
//     if (!schoolId)
//       return res.status(400).json({ message: "schoolId required" });

//     const attendance = await Attendance.find({ schoolId })
//       .populate("studentId", "name roll_number student_class")
//       .populate("teacherId", "name");

//     res.status(200).json({ success: true, attendance });
//   } catch (err) {
//     console.error("Error fetching all attendance:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Fetch teacher + class info for mapping frontend tables
// exports.getClassesWithTeacher = async (req, res) => {
//   try {
//     const { schoolId } = req.query;
//     if (!schoolId)
//       return res.status(400).json({ message: "schoolId required" });

//     const schedules = await Schedule.find({ schoolId });
//     const classes = await Student.distinct("student_class", {
//       school: schoolId,
//     });

//     const result = classes.map((cls) => {
//       const teacher = schedules.find((s) => s.class === cls)?.teacher || "N/A";
//       return { class: cls, teacher };
//     });

//     res.status(200).json({ success: true, data: result });
//   } catch (err) {
//     console.error("Error fetching classes with teachers:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// const Attendance = require("../models/attendance.model");
// const Student = require("../models/student.model");
// const Schedule = require("../models/schedule.model");

// // Mark attendance
// exports.markAttendance = async (req, res) => {
//   try {
//     const { studentId, date, status, classId } = req.body;
//     const teacherId = req.user?.id;
//     const schoolId = req.user?.schoolId || req.body.schoolId;

//     if (!studentId || !status || !classId || !date)
//       return res.status(400).json({ message: "Missing required fields" });

//     const existing = await Attendance.findOne({
//       student: studentId,
//       date: new Date(date),
//     });

//     if (existing) {
//       existing.status = status;
//       await existing.save();
//       return res
//         .status(200)
//         .json({ message: "Attendance updated", attendance: existing });
//     }

//     const newAttendance = new Attendance({
//       student: studentId,
//       date: new Date(date),
//       status,
//       class: classId,
//       teacher: teacherId,
//       school: schoolId,
//     });

//     await newAttendance.save();
//     res
//       .status(201)
//       .json({ message: "Attendance marked", attendance: newAttendance });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Get attendance by student
// exports.getAttendanceByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     if (!studentId)
//       return res.status(400).json({ message: "studentId required" });

//     const attendance = await Attendance.find({ student: studentId })
//       .populate("student", "name roll_number student_class")
//       .populate("teacher", "name")
//       .sort({ date: -1 });

//     res.status(200).json({ success: true, attendance });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get attendance by class
// exports.getAttendanceByClass = async (req, res) => {
//   try {
//     const { classId, date } = req.query;
//     if (!classId) return res.status(400).json({ message: "classId required" });

//     const filter = { class: classId };
//     if (date) filter.date = new Date(date);

//     const attendance = await Attendance.find(filter)
//       .populate("student", "name roll_number student_class")
//       .populate("teacher", "name")
//       .sort({ date: -1 });

//     res.status(200).json({ success: true, attendance });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get all attendance (school admin)
// exports.getAllAttendance = async (req, res) => {
//   try {
//     const { schoolId } = req.query;
//     if (!schoolId)
//       return res.status(400).json({ message: "schoolId required" });

//     const attendance = await Attendance.find({ school: schoolId })
//       .populate("student", "name roll_number student_class")
//       .populate("teacher", "name");

//     res.status(200).json({ success: true, attendance });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Classes with teacher mapping
// exports.getClassesWithTeacher = async (req, res) => {
//   try {
//     const { schoolId } = req.query;
//     if (!schoolId)
//       return res.status(400).json({ message: "schoolId required" });

//     const schedules = await Schedule.find({ schoolId });
//     const classes = await Student.distinct("student_class", {
//       school: schoolId,
//     });

//     const result = classes.map((cls) => {
//       const teacher = schedules.find((s) => s.class === cls)?.teacher || "N/A";
//       return { class: cls, teacher };
//     });

//     res.status(200).json({ success: true, data: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// const Attendance = require("../models/attendance.model");
// const moment = require("moment");

// module.exports = {
//   markAttendance: async (req, res) => {
//     try {
//       const { studentId, date, status, classId } = req.body;
//       const schoolId = req.user.schoolId;

//       const newAttendance = new Attendance({
//         student: studentId,
//         date,
//         status,
//         class: classId,
//         school: schoolId,
//       });
//       await newAttendance.save();
//       res.status(201).json(newAttendance);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ success: false, message: "Error in marking attendance" });
//     }
//   },

//   getAttendance: async (req, res) => {
//     try {
//       const { studentId } = req.params;
//       const attendance = await Attendance.find({ student: studentId }).populate(
//         "student"
//       );
//       res.status(200).json(attendance);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ success: false, message: "Error in getting attendance" });
//     }
//   },

//   checkAttendance: async (req, res) => {
//     const { classId } = req.params;
//     try {
//       const today = moment().startOf("day");

//       const attendanceForToday = await Attendance.findOne({
//         class: classId,
//         date: {
//           $gte: today.toDate(),
//           $lte: moment(today).endOf("day").toDate(),
//         },
//       });

//       if (attendanceForToday) {
//         return res.status(200).json({
//           attendanceTaken: true,
//           message: "Attendance already taken",
//         });
//       } else {
//         return res.status(200).json({
//           attendanceTaken: false,
//           message: "No attendance taken yet for today.",
//         });
//       }
//     } catch (error) {
//       res
//         .status(500)
//         .json({ success: false, message: "Error in checking attendance" });
//     }
//   },
// };



// const Attendance = require("../models/attendance.model");
// const Student = require("../models/student.model");
// const Teacher = require("../models/teacher.model");
// const Class = require("../models/class.model");
// const moment = require("moment");

// module.exports = {
//   // ✅ Mark attendance
//   markAttendance: async (req, res) => {
//     try {
//       const { student, status, teacher } = req.body;
//       const schoolId = req.user.schoolId;

//       const today = moment().startOf("day").toDate();

//       // Check if already marked today for this student
//       const existing = await Attendance.findOne({
//         student,
//         date: {
//           $gte: today,
//           $lte: moment(today).endOf("day").toDate(),
//         },
//       });

//       if (existing) {
//         existing.status = status;
//         existing.teacher = teacher;
//         await existing.save();
//         return res.status(200).json(existing);
//       }

//       const newAttendance = new Attendance({
//         student,
//         status,
//         teacher,
//         date: today,
//         school: schoolId,
//       });

//       await newAttendance.save();
//       res.status(201).json(newAttendance);
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error marking attendance" });
//     }
//   },

//   // ✅ Get attendance of a student
//   getAttendance: async (req, res) => {
//     try {
//       const { studentId } = req.params;
//       const attendance = await Attendance.find({ student: studentId }).populate(
//         "student"
//       );
//       res.status(200).json(attendance);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ success: false, message: "Error getting attendance" });
//     }
//   },

//   // ✅ Check if attendance already taken today for a class
//   checkAttendance: async (req, res) => {
//     const { classId } = req.params;
//     try {
//       const today = moment().startOf("day");
//       const attendanceForToday = await Attendance.findOne({
//         class: classId,
//         date: {
//           $gte: today.toDate(),
//           $lte: moment(today).endOf("day").toDate(),
//         },
//       });

//       res.status(200).json({
//         attendanceTaken: !!attendanceForToday,
//         message: attendanceForToday
//           ? "Attendance already taken"
//           : "No attendance taken yet for today.",
//       });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ success: false, message: "Error checking attendance" });
//     }
//   },

//   // ✅ Fetch students with optional class filter and search
//   fetchStudentsWithQuery: async (req, res) => {
//     try {
//       const { student_class, search } = req.query;
//       const schoolId = req.user.schoolId;

//       const query = { school: schoolId };
//       if (student_class) query.student_class = student_class;
//       if (search) query.name = { $regex: search, $options: "i" };

//       const students = await Student.find(query);
//       res.status(200).json({ students });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error fetching students" });
//     }
//   },

//   // ✅ Fetch teachers for a class
//   fetchTeachersByClass: async (req, res) => {
//     try {
//       const { class_id } = req.query;
//       const schoolId = req.user.schoolId;

//       if (!class_id)
//         return res
//           .status(400)
//           .json({ success: false, message: "class_id required" });

//       const teachers = await Teacher.find({
//         school: schoolId,
//         assigned_classes: class_id, // assuming Teacher model has assigned_classes array
//       });

//       res.status(200).json({ teachers });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error fetching teachers" });
//     }
//   },

//   // Fetch attendance for all students in a class
//   fetchAttendanceByClass: async (req, res) => {
//     try {
//       const { classId } = req.params;
//       const schoolId = req.user.schoolId;

//       if (!classId)
//         return res
//           .status(400)
//           .json({ success: false, message: "Class ID required" });

//       const attendance = await Attendance.find({
//         class: classId,
//         school: schoolId,
//       })
//         .populate("student", "name") // optional: get student names
//         .populate("teacher", "name"); // optional: get teacher names

//       res.status(200).json({
//         success: true,
//         message: "Success in Fetching Attendee Class.",
//         data: attendance || [],
//       });
//     } catch (err) {
//       console.error(err);
//       res
//         .status(500)
//         .json({ success: false, message: "Error fetching attendance" });
//     }
//   },
// };




// -------------------------------------------------------------------------



// const Attendance = require("../models/attendance.model");
// const moment=require('moment')


// module.exports = {
  
//   markAttendance: async (req, res) => {
//     try {
//       const { studentId, date, status, classId } = req.body;
//       const schoolId = req.user.schoolId;
      
//       const newAttendance = new Attendance({
//         student: studentId,
//         date,
//         status,
//         class:classId,
//         school:schoolId
//       })
//       await newAttendance.save()
//       res.status(201).json(newAttendance)
//     } catch (error) {
//       res.status(500).json({success:false,message:"Error in Marking attendance"})
//     }
//   },

//   // getAttendance: async (req, res) => {
//   //   try {
      
//   //     const { studentId } = req.params;
//   //     const attendance = await Attendance.find({ student: studentId }).populate('student');
//   //     res.status(200).json(attendance)
//   //   } catch (error) {
//   //     res
//   //       .status(500)
//   //       .json({ success: false, message: "Error in getting attendance" });
//   //   }
//   // },



//   getAttendance: async (req, res) => {
//   try {
//     const { studentId } = req.params;
    
//     // Fetch all attendance for student
//     const attendance = await Attendance.find({ student: studentId });

//     const total = attendance.length;
//     const presentCount = attendance.filter(a => a.status === "present").length;
//     const absentCount = total - presentCount;
//     const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

//     res.status(200).json({
//       studentId,
//       total,
//       presentCount,
//       absentCount,
//       percentage,
//       attendance
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error in getting attendance" });
//   }
// },

  
//   checkAttendance: async (req, res) => {
//     const { classId } = req.params;
//     try {
//       const today=moment().startOf('day')
//       const attendanceForToday = await Attendance.findOne({
//         class: req.params.classId,
//         date: {
//           //00:00 hrs to 23:59
//           $gte:today.toDate(),
//           $lt:moment(today).endOf("day").toDate()
//         }
//       })


//       if (attendanceForToday) {
//         return res.status(200).json({attendanceTaken:true,message:"Attendance already taken"})
//       } else {
//         return res.status(200).json({attendanceTaken:false,message:"No attendance yet for today."})
//       }
//     } catch (error) {
//       res.status(500).json({success:false,message:"Error in Checking attendance."})
//     }
//   }

// }


// ----------------------------------------------------------------








// const Attendance = require("../models/attendance.model");
// const moment = require("moment");

// module.exports = {
//   markAttendance: async (req, res) => {
//     try {
//       const { studentId, date, status, classId } = req.body;
//       const schoolId = req.user.schoolId;

//       const newAttendance = new Attendance({
//         student: studentId,
//         date,
//         status: status.toLowerCase(), // normalize
//         class: classId,
//         school: schoolId,
//       });

//       await newAttendance.save();
//       res.status(201).json(newAttendance);
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error in marking attendance" });
//     }
//   },

//   getAttendance: async (req, res) => {
//     try {
//       const { studentId } = req.params;

//       const attendance = await Attendance.find({ student: studentId });

//       const total = attendance.length;
//       const presentCount = attendance.filter(
//         (a) => a.status.toLowerCase() === "present"
//       ).length;
//       const absentCount = total - presentCount;
//       const percentage =
//         total > 0 ? Math.round((presentCount / total) * 100) : 0;

//       res.status(200).json({
//         studentId,
//         total,
//         presentCount,
//         absentCount,
//         percentage,
//         attendance,
//       });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error in getting attendance" });
//     }
//   },

//   checkAttendance: async (req, res) => {
//     const { classId } = req.params;
//     try {
//       const today = moment().startOf("day");
//       const attendanceForToday = await Attendance.findOne({
//         class: classId,
//         date: {
//           $gte: today.toDate(),
//           $lt: moment(today).endOf("day").toDate(),
//         },
//       });

//       if (attendanceForToday) {
//         return res
//           .status(200)
//           .json({ attendanceTaken: true, message: "Attendance already taken" });
//       } else {
//         return res
//           .status(200)
//           .json({
//             attendanceTaken: false,
//             message: "No attendance yet for today.",
//           });
//       }
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error in checking attendance" });
//     }
//   },
// };










const Attendance = require("../models/attendance.model");
const Student = require("../models/student.model");
const moment = require("moment");

module.exports = {
  markAttendance: async (req, res) => {
    try {
      const { studentId, date, status, classId } = req.body;
      const schoolId = req.user.schoolId;

      const newAttendance = new Attendance({
        student: studentId,
        date,
        status: status.toLowerCase(),
        class: classId,
        school: schoolId,
      });

      await newAttendance.save();
      res.status(201).json({ success: true, data: newAttendance });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error in marking attendance" });
    }
  },

  getAttendance: async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch attendance and populate student name
    const attendance = await Attendance.find({ student: studentId })
      .sort({ date: -1 })
      .populate("student", "name");

    const total = attendance.length;
    const presentCount = attendance.filter(a => a.status.toLowerCase() === "present").length;
    const absentCount = total - presentCount;
    const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

    const studentName = attendance[0]?.student?.name || "Student";

    res.status(200).json({
      success: true,
      studentId,
      studentName,
      total,
      presentCount,
      absentCount,
      percentage,
      attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in getting attendance" });
  }
},
  checkAttendance: async (req, res) => {
    const { classId } = req.params;
    try {
      const today = moment().startOf("day");
      const attendanceForToday = await Attendance.findOne({
        class: classId,
        date: {
          $gte: today.toDate(),
          $lt: moment(today).endOf("day").toDate(),
        },
      });

      res.status(200).json({
        attendanceTaken: !!attendanceForToday,
        message: attendanceForToday
          ? "Attendance already taken"
          : "No attendance yet for today.",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error in checking attendance" });
    }
  },
};
