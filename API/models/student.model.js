






// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   school: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "School",
//     required: true,
//   },
//   name: { type: String, required: true },
//   student_class: { type: String, required: true }, // class stored as string or ObjectId if populated later
//   age: { type: String, required: true },
//   gender: { type: String, required: true },
//   guardian: { type: String, required: true },
//   guardian_phone: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   student_image: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Student", studentSchema);









const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  name: { type: String, required: true },
  student_class: {
    type: mongoose.Schema.Types.ObjectId, // must be ObjectId
    ref: "Class", // reference Class model
    required: true,
  },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  guardian: { type: String, required: true },
  guardian_phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  student_image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
