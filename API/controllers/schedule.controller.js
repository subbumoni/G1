// const Subject = require("../models/subject.model")
// const Student = require("../models/student.model")
// const Exam = require("../models/examination.model")
// const Schedule = require("../models/schedule.model")

// module.exports = {
//   getScheduleWithClass: async (req, res) => {
//     try {
//       const classId=req.params.id
//       const schoolId = req.user.schoolId;
//       const Schedules = await Schedule.find({ school: schoolId,class:classId });
//       res.status(200).json({success:true,message:"Success in fetching all Schedules.",data:Schedules})
//     } catch (error) {
//       console.log("Get Schedule with class  error", error)
//       res.status(500).json({success:false,message:"Server Error in Getting Schedule with class."})
//     }
//   },
//   createSchedule: async (req, res) => {
//     try {
//       const newSchedule = new Schedule({
//         school: req.user.schoolId,
//         teacher: req.body.teacher,
//         subject: req.body.subject,
//         class: req.body.selectedClass,
//         startTime: req.body.startTime,
//         endTime:req.body.endTime
//       })
//       await newSchedule.save();
//       res.status(200).json({success:true,message:"Successfully created the Schedule."})
//     } catch (error) {
//       res.status(500).json({success:false,message:"Server Error in Creating Schedule."})
//     }
//   },
//   updateScheduleWithId: async (req, res) => {
//     try {
//       let id = req.params.id;
//       await Schedule.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
//       const scheduleAfterUpdate = await Schedule.findOne({ _id: id });
//       res.status(200).json({success:true,message:"Schedule Update.",data:scheduleAfterUpdate})
//     } catch (error) {
//       console.log("Update Schedule Erro=>", error)
//       res.status(500).json({success:false,message:"Server Error in Updating Schedule."})
//     }
//   },
//   deleteScheduleWithId: async (req, res) => {
//     try {
//       let id = req.params.id;
//       let schoolId = req.user.schoolId;



      
//         await Schedule.findByIdAndDelete({ _id: id, school: schoolId })
//         res.status(200).json({success:true,message:"Schedule Deleted Successfully."})
      
//     } catch (error) {
//       console.log("Delete Schedule Error=>", error)
//       res.status(500).json({success:true,message:"Server Error in Deleting Schedule."})
//     }
//   }
// }













const Subject = require("../models/subject.model");
const Student = require("../models/student.model");
const Exam = require("../models/examination.model");
const Schedule = require("../models/schedule.model");

module.exports = {
  // ✅ fixed typo: modele.exports → module.exports
  getScheduleWithClass: async (req, res) => {
    try {
      const classId = req.params.id;
      const schoolId = req.user.schoolId;
      const Schedules = await Schedule.find({
        school: schoolId,
        class: classId,
      }).populate(["teacher", "subject"]);
      res.status(200).json({
        success: true,
        message: "Success in fetching all Schedules.",
        data: Schedules,
      });
    } catch (error) {
      console.log("Get Schedule with class  error", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Getting Schedule with class.",
      });
    }
  },
  createSchedule: async (req, res) => {
    try {
      const newSchedule = new Schedule({
        // ✅ fixed: newSubjects → newSchedule and Subject → Schedule
        school: req.user.schoolId,
        teacher: req.body.teacher,
        subject: req.body.subject,
        class: req.body.class, // class: req.body.selectedClass,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      });
      await newSchedule.save(); // ✅ save correct variable
      res
        .status(200)
        .json({ success: true, message: "Successfully created the Schedule." });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error in Creating Schedule.",
      });
    }
  },
  getScheduleWithId: async (req, res) => {
    try {
      const id = req.params.id;
      const schoolId = req.user.schoolId;

      // use another variable name instead of "Schedule"
      const scheduleData = await Schedule.findOne({
        school: schoolId,
        _id: id,
      });

      res.status(200).json({
        success: true,
        message: "Success in fetching the Schedule.",
        data: scheduleData,
      });
    } catch (error) {
      console.log("Get Schedule with class error", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Getting Schedule with class.",
      });
    }
  },
  updateScheduleWithId: async (req, res) => {
    try {
      let id = req.params.id;
      await Schedule.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
      const scheduleAfterUpdate = await Schedule.findOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Schedule Update.",
        data: scheduleAfterUpdate,
      });
    } catch (error) {
      console.log("Update Schedule Erro=>", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Updating Schedule.",
      });
    }
  },
  deleteScheduleWithId: async (req, res) => {
    try {
      let id = req.params.id;
      let schoolId = req.user.schoolId;

      await Schedule.findOneAndDelete({ _id: id, school: schoolId }); // ✅ fixed findByIdAndDelete usage
      res
        .status(200)
        .json({ success: true, message: "Schedule Deleted Successfully." });
    } catch (error) {
      console.log("Delete Schedule Error=>", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Deleting Schedule.",
      });
    }
  },
};
















