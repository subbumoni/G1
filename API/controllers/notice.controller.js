

// const Notice = require("../models/notice.model");

// module.exports = {
 


//   //Create Notices:
//   createNotice: async (req, res) => {
//     try {
//       const { title, message, audience } = req.body;
//       const newNotice = new Notice({
//         school: req.user.schoolId,
//         title: title,
//         message: message,
//         audience:audience
//       })
//       await newNotice.save();
//       res.status(200).json({success:true,message:"Successfully created the Notices."})
//     } catch (error) {
//       res.status(500).json({success:false,message:"Server Error in Creating Notices."})
//     }
//   },


//   // ✅ Get all notices
//   getAllNotices: async (req, res) => {
//     try {
//       let schoolId;

//       if (req.user.role === "SCHOOL") schoolId = req.user.id;
//       else if (req.user.role === "TEACHER" || req.user.role === "STUDENT") {
//         schoolId = req.user.school;
//       } else
//         return res
//           .status(403)
//           .json({ success: false, message: "Access Denied" });

//       const allNotices = await Notice.find({ school: schoolId }).sort({
//         createdAt: -1,
//       });

//       res.status(200).json({
//         success: true,
//         message: "Fetched all notices",
//         data: allNotices,
//       });
//     } catch (err) {
//       console.error("GetAllNotices Error =>", err);
//       res.status(500).json({ success: false, message: "Server Error" });
//     }
//   },

//   //Get All Teacher Notices:

//   getTeacherNotices: async (req, res) => {
//     try {
//       const schoolId = req.user.schoolId;
//       const allNotices = await Notice.find({ school: schoolId,audience:"teacher" });
//       res
//         .status(200)
//         .json({
//           success: true,
//           message: "Success in fetching all Notices.",
//           data: allNotices,
//         });
//     } catch (error) {
//       console.log("GetAllNotices error", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Server Error in Getting Notices." });
//     }
//   },





//   //Get All Student Notices:
//   getStudentNotices: async (req, res) => {
//     try {
//       const schoolId = req.user.schoolId;
//       const allNotices = await Notice.find({ school: schoolId,audience:"student" });
//       res
//         .status(200)
//         .json({
//           success: true,
//           message: "Success in fetching all Notices.",
//           data: allNotices,
//         });
//     } catch (error) {
//       console.log("GetAllNotices error", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Server Error in Getting Notices." });
//     }
//   },

//   // ✅ Update notice (School only)
//   updateNotice: async (req, res) => {
//     try {
//       const id = req.params.id;
//       const updated = await Notice.findByIdAndUpdate(
//         id,
//         { $set: req.body },
//         { new: true }
//       );

//       if (!updated)
//         return res
//           .status(404)
//           .json({ success: false, message: "Notice not found" });

//       res
//         .status(200)
//         .json({ success: true, message: "Notice updated", data: updated });
//     } catch (err) {
//       console.error("Update Notice Error =>", err);
//       res.status(500).json({ success: false, message: "Server Error" });
//     }
//   },

//   // ✅ Delete notice (School only)
//   deleteNotice: async (req, res) => {
//     try {
//       const id = req.params.id;
//       const deleted = await Notice.findByIdAndDelete(id);

//       if (!deleted)
//         return res
//           .status(404)
//           .json({ success: false, message: "Notice not found" });

//       res.status(200).json({ success: true, message: "Notice deleted" });
//     } catch (err) {
//       console.error("Delete Notice Error =>", err);
//       res.status(500).json({ success: false, message: "Server Error" });
//     }
//   },
// };










const Notice = require("../models/notice.model");

module.exports = {
  // ✅ Create a notice
  createNotice: async (req, res) => {
    try {
      const { title, message, audience } = req.body;
      const newNotice = new Notice({
        school: req.user.schoolId,
        title,
        message,
        audience,
      });

      await newNotice.save();
      res
        .status(200)
        .json({ success: true, message: "Notice created successfully." });
    } catch (error) {
      console.error("Create Notice Error =>", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Server error while creating notice.",
        });
    }
  },

  // ✅ Fetch all notices (school + teacher + student)
  getAllNotices: async (req, res) => {
    try {
      let schoolId;

      // Determine school ID based on role
      if (req.user.role === "SCHOOL") schoolId = req.user.id;
      else if (req.user.role === "TEACHER" || req.user.role === "STUDENT")
        schoolId = req.user.schoolId || req.user.school;
      else
        return res
          .status(403)
          .json({ success: false, message: "Access Denied" });

      // Define audience filter
      const audienceFilter =
        req.user.role === "TEACHER"
          ? ["teacher", "all"]
          : req.user.role === "STUDENT"
          ? ["student", "all"]
          : ["teacher", "student", "all"];

      const allNotices = await Notice.find({
        school: schoolId,
        audience: { $in: audienceFilter },
      }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        message: "Fetched all relevant notices",
        data: allNotices,
      });
    } catch (err) {
      console.error("GetAllNotices Error =>", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },

  // ✅ Get teacher-only notices
  getTeacherNotices: async (req, res) => {
    try {
      const schoolId = req.user.schoolId || req.user.school;
      const allNotices = await Notice.find({
        school: schoolId,
        audience: { $in: ["teacher", "all"] },
      }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        message: "Teacher notices fetched successfully.",
        data: allNotices,
      });
    } catch (error) {
      console.error("Teacher Notices Error =>", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching teacher notices." });
    }
  },

  // ✅ Get student-only notices
  getStudentNotices: async (req, res) => {
    try {
      const schoolId = req.user.schoolId || req.user.school;
      const allNotices = await Notice.find({
        school: schoolId,
        audience: { $in: ["student", "all"] },
      }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        message: "Student notices fetched successfully.",
        data: allNotices,
      });
    } catch (error) {
      console.error("Student Notices Error =>", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching student notices." });
    }
  },

  // ✅ Update notice
  updateNotice: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await Notice.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      if (!updated)
        return res
          .status(404)
          .json({ success: false, message: "Notice not found" });

      res.status(200).json({
        success: true,
        message: "Notice updated successfully",
        data: updated,
      });
    } catch (err) {
      console.error("Update Notice Error =>", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },

  // ✅ Delete notice
  deleteNotice: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Notice.findByIdAndDelete(id);

      if (!deleted)
        return res
          .status(404)
          .json({ success: false, message: "Notice not found" });

      res.status(200).json({ success: true, message: "Notice deleted" });
    } catch (err) {
      console.error("Delete Notice Error =>", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },
};















