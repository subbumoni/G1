const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  image: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Teacher", teacherSchema);
