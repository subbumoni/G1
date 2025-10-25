// const mongoose = require("mongoose")

// const attendanceSchema = new mongoose.Schema({
//   school:{type:mongoose.Schema.ObjectId,ref:"School"},
//   student:{type:mongoose.Schema.ObjectId,ref:"Student"},
//   class: { type: mongoose.Schema.ObjectId, ref: "Class" },
//   date: { type: Date, required: true },
//   status: { type: String, enum: ['present', 'absent'], default: 'Absent' },
  
//   createdAt:{type:Date,default:new Date()}
// })

// module.exports=mongoose.model("Attendance",attendanceSchema)


















const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  school: { type: mongoose.Schema.ObjectId, ref: "School", required: true },
  student: { type: mongoose.Schema.ObjectId, ref: "Student", required: true },
  class: { type: mongoose.Schema.ObjectId, ref: "Class", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], default: "absent" },
  createdAt: { type: Date, default: Date.now },
});

// Prevent duplicate attendance for same student & date
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
