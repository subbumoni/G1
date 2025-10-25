const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId, // <--- fix here
    ref: "School",
    required: true,
  },
  class_text: {
    type: String,
    required: true,
  },
  class_num: {
    type: String,
    required: true,
  },
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Class", classSchema);
