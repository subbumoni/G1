const Subject = require("../models/subject.model");

const Student = require("../models/student.model");
const Exam = require("../models/examination.model");
const Schedule = require("../models/schedule.model");

module.exports = {
  getAllSubjects: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const allSubjects = await Subject.find({ school: schoolId });
      res.status(200).json({
        success: true,
        message: "Success in fetching all Subjects.",
        data: allSubjects,
      });
    } catch (error) {
      console.error("GetAllSubjects error", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Getting Subjects.",
      });
    }
  },

  createSubject: async (req, res) => {
    try {
      const newSubject = new Subject({
        school: req.user.schoolId,
        subject_name: req.body.subject_name,
        subject_codename: req.body.subject_codename,
      });
      await newSubject.save();
      res.status(200).json({
        success: true,
        message: "Successfully created the subject.",
      });
    } catch (err) {
      console.error("CreateSubject error:", err);
      res.status(500).json({
        success: false,
        message: "Server Error in Creating Subject.",
      });
    }
  },

  updateSubjectWithId: async (req, res) => {
    try {
      const id = req.params.id;
      await Subject.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
      const updatedSubject = await Subject.findOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Subject Updated.",
        data: updatedSubject,
      });
    } catch (error) {
      console.error("Update Subject Error=>", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Updating Subject.",
      });
    }
  },

  deleteSubjectWithId: async (req, res) => {
    try {
      const id = req.params.id;
      const schoolId = req.user.schoolId;
      const { force } = req.query; // ?force=true

      const SubjectExamCount = await Exam.countDocuments({
        subject: id,
        school: schoolId,
      });
      const SubjectScheduleCount = await Schedule.countDocuments({
        subject: id,
        school: schoolId,
      });

      if (force === "true") {
        await Exam.updateMany(
          { subject: id, school: schoolId },
          { $unset: { subject: "" } }
        );
        await Schedule.updateMany(
          { subject: id, school: schoolId },
          { $unset: { subject: "" } }
        );
        await Subject.findOneAndDelete({ _id: id, school: schoolId });
        return res.status(200).json({
          success: true,
          message: "Subject forcibly deleted (was in use).",
        });
      }

      if (SubjectExamCount === 0 && SubjectScheduleCount === 0) {
        await Subject.findOneAndDelete({ _id: id, school: schoolId });
        res.status(200).json({
          success: true,
          message: "Subject Deleted Successfully.",
        });
      } else {
        res.status(409).json({
          success: false,
          message: "This Subject is already in use.",
        });
      }
    } catch (error) {
      console.error("Delete Subject Error=>", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Deleting Subject.",
      });
    }
  },
};
