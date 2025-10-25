const Examination = require("../models/examination.model")


module.exports = {
  newExamination: async (req, res) => {
    console.log("caller", req.body);
    try {
      const schoolId = req.user.schoolId;
      const { date, subjectId, examType, classId } = req.body;
      const newExamination = new Examination({
        school: schoolId,
        examDate: date,
        subject: subjectId,
        examType: examType,
        class: classId,
      });
      const saveData = await newExamination.save();
      res.status(200).json({
        success: true,
        message: "Success in creating new Examination.",
        data: saveData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in Creating New Examination.",
      });
    }
  },
  getAllExaminations: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const examinations = await Examination.find({school:schoolId});
      res.status(200).json({ success: true, examinations });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in Fetching Examination.",
      });
    }
  },

 
  getExaminationsByClass: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const classId = req.params.id;
      const examinations = await Examination.find({
        class: classId,
        school: schoolId,
      }).populate("subject");
      res.status(200).json({ success: true, examinations });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in Fetching Examination.",
      });
    }
  },
  updateExaminationWithId: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const examinationId = req.params.id;
      const { date, subjectId, examType } = req.body;
      await Examination.findOneAndUpdate(
        { _id: examinationId, school: schoolId },
        {
          $set: {
            examDate: date,
            subject: subjectId,
            examType: examType,
          },
        }
      );
      res
        .status(200)
        .json({
          success: true,
          message: "Examination is updated Successfully.",
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error in Updating Examination." });
    }
  },
  deleteExaminationWithId: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const examinationId = req.params.id;
      await Examination.findOneAndDelete({
        _id: examinationId,
        school: schoolId,
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Examination is Delete Successfully.",
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error in Deleting Examination." });
    }
  },
};













// controllers/examination.controller.js
// const Examination = require("../models/examination.model");
// const Subject = require("../models/subject.model");
// const Class = require("../models/class.model");

// module.exports = {
//   newExamination: async (req, res) => {
//     try {
//       const schoolId = req.user.schoolId;
//       const { examDate, subjectId, examType, classId } = req.body;

//       const newExam = new Examination({
//         school: schoolId,
//         examDate,
//         subject: subjectId,
//         examType,
//         class: classId,
//       });

//       const saveData = await newExam.save();
//       res.status(200).json({
//         success: true,
//         message: "Examination created successfully.",
//         data: saveData,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Error creating examination." });
//     }
//   },

//   getAllExaminations: async (req, res) => {
//     try {
//       const schoolId = req.user.schoolId;
//       const exams = await Examination.find({ school: schoolId })
//         .populate("subject", "subject_name")
//         .populate("class", "class_text");

//       // Map to frontend-friendly format
//       const mappedExams = exams.map(exam => ({
//         _id: exam._id,
//         examDate: exam.examDate,
//         examType: exam.examType,
//         subject: exam.subject?.subject_name || "-",
//         class: exam.class?.class_text || "-",
//       }));

//       res.status(200).json({ success: true, examinations: mappedExams });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Error fetching examinations." });
//     }
//   },

//   updateExaminationWithId: async (req, res) => {
//     try {
//       const schoolId = req.user.schoolId;
//       const examId = req.params.id;
//       const { examDate, subjectId, examType, classId } = req.body;

//       await Examination.findOneAndUpdate(
//         { _id: examId, school: schoolId },
//         { $set: { examDate, subject: subjectId, examType, class: classId } }
//       );

//       res.status(200).json({ success: true, message: "Examination updated successfully." });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Error updating examination." });
//     }
//   },

//   deleteExaminationWithId: async (req, res) => {
//     try {
//       const schoolId = req.user.schoolId;
//       const examId = req.params.id;

//       await Examination.findOneAndDelete({ _id: examId, school: schoolId });
//       res.status(200).json({ success: true, message: "Examination deleted successfully." });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Error deleting examination." });
//     }
//     },
  
    
// };
