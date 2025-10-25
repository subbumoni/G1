// // const Class = require('../models/class.model')

// // const Student = require("../models/student.model")
// // const Exam = require("../models/examination.model")
// // const Schedule =require("../models/schedule.model")
// // module.exports = {
// //       getAllClasses: async (req, res) => {

// //           try {
// //               const schoolId = req.user.schoolId;
// //               const allClasses = await Class.find({ school: schoolId });
// //               res.status(200).json({success:true,message:"Success in fetching all Classes.",data:allClasses})
// //           } catch (error) {
// //               console.log("GetAllClasses error",error)
// //               res
// //                 .status(500)
// //                 .json({
// //                   success: false,
// //                   message: "Server Error in Getting Classes.",
// //                 });
// //           }
// //      },
// //   getAllClasses: async (req, res) => {
// //     try {
// //       const schoolId = req.user.schoolId;
// //       // Populate teacher's name
// //       const allClasses = await Class.find({ school: schoolId }).populate(
// //         "teacher",
// //         "name email"
// //       );

// //       res.status(200).json({
// //         success: true,
// //         message: "Success in fetching all Classes.",
// //         data: allClasses,
// //       });
// //     } catch (error) {
// //       console.log("GetAllClasses error", error);
// //       res.status(500).json({
// //         success: false,
// //         message: "Server Error in Getting Classes.",
// //       });
// //     }
// //   },

// //   createClass: async (req, res) => {
// //     try {
// //       const newClass = new Class({
// //         school: req.user.schoolId,
// //         class_text: req.body.class_text,
// //         class_num: req.body.class_num,
// //       });
// //       await newClass.save();
// //       res
// //         .status(200)
// //         .json({ success: true, message: "Successfully created the class." });
// //     } catch (err) {
// //       res
// //         .status(500)
// //         .json({ success: false, message: "Server Error in Creating Class." });
// //     }
// //   },
// //   updateClassWithId: async (req, res) => {
// //     try {
// //       let id = req.params.id;
// //       await Class.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
// //       const classAfterUpdate = await Class.findOne({ _id: id });
// //       res
// //         .status(200)
// //         .json({
// //           success: true,
// //           message: "Class Updated.",
// //           data: classAfterUpdate,
// //         });
// //     } catch (error) {
// //       console.log("Update class Error=>", error);
// //       res
// //         .status(500)
// //         .json({ success: false, message: "Server Error in Updating Class." });
// //     }
// //   },
// //   deleteClassWithId: async (req, res) => {
// //     try {
// //       let id = req.params.id;
// //       let schoolId = req.user.schoolId;

// //       const classStudentCount = (
// //         await Student.find({ student_class: id, schoolId })
// //       ).length;
// //       const classExamCount = (await Exam.find({ class: id, schoolId })).length;
// //       const classScheduleCount = (
// //         await Schedule.find({ class: id, school: schoolId })
// //       ).length;

// //       if (
// //         classStudentCount === 0 &&
// //         classExamCount === 0 &&
// //         classScheduleCount === 0
// //       ) {
// //         await Class.findOneAndDelete({ _id: id, school: schoolId });

// //         res
// //           .status(200)
// //           .json({ success: true, message: "Class Deleted Successfully." });
// //       } else {
// //         res
// //           .status(500)
// //           .json({ success: false, message: "This Class is already in use." });
// //       }
// //     } catch (error) {
// //       console.log("Delete class Error=>", error);
// //       res.status(500).json({
// //         success: false,
// //         message: "Server Error in Deleting Class.",
// //       });
// //     }
// //   },
// // };



const Class = require("../models/class.model");
const Student = require("../models/student.model");
const Exam = require("../models/examination.model");
const Schedule = require("../models/schedule.model");

module.exports = {
  // // ✅ Get all classes with teacher info (from Schedule)
  // getAllClasses: async (req, res) => {
  //   try {
  //     const schoolId = req.user.schoolId; // ✅ now exists
  //     if (!schoolId)
  //       return res
  //         .status(400)
  //         .json({ message: "School ID missing in user token." });

  //     const allClasses = await Class.find({ school: schoolId });

  //     const classesWithTeacher = await Promise.all(
  //       allClasses.map(async (cls) => {
  //         const schedule = await Schedule.findOne({
  //           class: cls._id,
  //           school: schoolId,
  //         }).populate("teacher", "name email");

  //         return {
  //           ...cls.toObject(),
  //           teacher: schedule?.teacher || { name: "N/A", email: "N/A" },
  //         };
  //       })
  //     );

  //     res.status(200).json({
  //       success: true,
  //       message: "Success in fetching all Classes.",
  //       data: classesWithTeacher,
  //     });
  //   } catch (error) {
  //     console.log("GetAllClasses error", error);
  //     res
  //       .status(500)
  //       .json({ success: false, message: "Server Error in Getting Classes." });
  //   }
  // },

  // controllers/class.controller.js

  getAllClasses: async (req, res) => {
    try {
      let { schoolId, role, classId } = req.user;

      if (!schoolId) {
        return res
          .status(400)
          .json({
            success: false,
            message: "School ID missing in user token.",
          });
      }

      let allClasses;

      // ✅ Student sees only their own class
      if (role === "STUDENT") {
        allClasses = await Class.find({ _id: classId, school: schoolId });
      } else {
        allClasses = await Class.find({ school: schoolId });
      }

      const classesWithTeacher = await Promise.all(
        allClasses.map(async (cls) => {
          const schedule = await Schedule.findOne({
            class: cls._id,
            school: schoolId,
          }).populate("teacher", "name email");

          return {
            ...cls.toObject(),
            teacher: schedule?.teacher || { name: "N/A", email: "N/A" },
          };
        })
      );

      res.status(200).json({
        success: true,
        message: "Success in fetching Classes.",
        data: classesWithTeacher,
      });
    } catch (error) {
      console.log("GetAllClasses error", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Getting Classes.",
        error: error.message,
      });
    }
  },

  // getAllClasses: async (req, res) => {
  //   try {
  //     const schoolId = req.user.schoolId;
  //     if (!schoolId) {
  //       return res
  //         .status(400)
  //         .json({
  //           success: false,
  //           message: "School ID missing in user token.",
  //         });
  //     }

  //     const allClasses = await Class.find({ school: schoolId });

  //     const classesWithTeacher = await Promise.all(
  //       allClasses.map(async (cls) => {
  //         const schedule = await Schedule.findOne({
  //           class: cls._id,
  //           school: schoolId,
  //         }).populate("teacher", "name email");
  //         return {
  //           ...cls.toObject(),
  //           teacher: schedule?.teacher || { name: "N/A", email: "N/A" },
  //         };
  //       })
  //     );

  //     res.status(200).json({
  //       success: true,
  //       message: "Success in fetching all Classes.",
  //       data: classesWithTeacher,
  //     });
  //   } catch (error) {
  //     console.log("GetAllClasses error", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Server Error in Getting Classes.",
  //       error: error.message,
  //     });
  //   }
  // },

  //       getSingleClass: async (req, res) => {

  //     try {
  //       const schoolId = req.user.schoolId;
  //       const classId = req.params.id;
  //       const allClass = await Class.findOne({
  //         school: schoolId,
  //         _id: classId,
  //       }).populate("attendee");
  //       res
  //         .status(200)
  //         .json({
  //           success: true,
  //           message: "Success in fetching single class",
  //           data: allClasses,
  //         });
  //     } catch (error) {
  //       console.log("GetAllClasses error", error);
  //       res
  //         .status(500)
  //         .json({
  //           success: false,
  //           message: "Server Error in Getting Single Classes",
  //         });
  //     }
  //   },

  getSingleClass: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const classId = req.params.id;

      if (!schoolId) {
        return res.status(400).json({
          success: false,
          message: "School ID missing in user token.",
        });
      }

      // Fetch the class by ID for this school
      const singleClass = await Class.findOne({
        school: schoolId,
        _id: classId,
      }).populate("attendee", "name email");

      if (!singleClass) {
        return res.status(404).json({
          success: false,
          message: "Class not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Success in fetching single class.",
        data: singleClass,
      });
    } catch (error) {
      console.log("GetSingleClass error", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Getting Single Class.",
        error: error.message,
      });
    }
  },

  // Get Attendee Classes
  getAttendeeClass: async (req, res) => {
    console.log("called")
    try {
      const schoolId = req.user.schoolId;
      const attendeeId = req.user.id
      const classes = await Class.find({ school: schoolId, attendee: attendeeId });
      res.status(200).json({ success: true, message: "Success in Fetching Attendee Class.", data: classes })
    } catch (error) {
      console.log("GetAttendeeClasses error", error)
      res.status(500).json({success:false,message:"Server Error in Getting Attendee class."})
    }
  },

  // ✅ Create new class
  createClass: async (req, res) => {
    try {
      const newClass = new Class({
        school: req.user.schoolId,
        class_text: req.body.class_text,
        class_num: req.body.class_num,
      });
      await newClass.save();
      res
        .status(200)
        .json({ success: true, message: "Successfully created the class." });
    } catch (err) {
      console.log("Create class Error=>", err);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Creating Class." });
    }
  },

  // ✅ Update class
  updateClassWithId: async (req, res) => {
    try {
      let id = req.params.id;
      await Class.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
      const classAfterUpdate = await Class.findOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Class Updated.",
        data: classAfterUpdate,
      });
    } catch (error) {
      console.log("Update class Error=>", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Updating Class." });
    }
  },





  // ✅ Delete class (only if not used)
  deleteClassWithId: async (req, res) => {
    try {
      let id = req.params.id;
      let schoolId = req.user.schoolId;

      const classStudentCount = (
        await Student.find({ student_class: id, schoolId })
      ).length;
      const classExamCount = (await Exam.find({ class: id, schoolId })).length;
      const classScheduleCount = (
        await Schedule.find({ class: id, school: schoolId })
      ).length;

      if (
        classStudentCount === 0 &&
        classExamCount === 0 &&
        classScheduleCount === 0
      ) {
        await Class.findOneAndDelete({ _id: id, school: schoolId });

        res
          .status(200)
          .json({ success: true, message: "Class Deleted Successfully." });
      } else {
        res
          .status(400)
          .json({ success: false, message: "This Class is already in use." });
      }
    } catch (error) {
      console.log("Delete class Error=>", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Deleting Class.",
      });
    }
  },
};












