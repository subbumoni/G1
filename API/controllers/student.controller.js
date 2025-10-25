














const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helpers
const normalizeField = (v) => (Array.isArray(v) ? v[0] : v);
const normalizeFile = (f) => (Array.isArray(f) ? f[0] : f);

// 🟢 Register Student
exports.registerStudent = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({ message: "Error parsing form data" });

    try {
      const name = normalizeField(fields.name);
      const email = normalizeField(fields.email);
      const age = normalizeField(fields.age);
      const gender = normalizeField(fields.gender);
      const student_class = normalizeField(
        fields.student_class || fields.class
      );
      const guardian = normalizeField(fields.guardian);
      const guardian_phone = normalizeField(fields.guardian_phone);
      const password = normalizeField(fields.password);

      if (
        !name ||
        !email ||
        !age ||
        !gender ||
        !student_class ||
        !guardian ||
        !guardian_phone ||
        !password
      )
        return res.status(400).json({ message: "All fields are required" });

      const existingStudent = await Student.findOne({ email });
      if (existingStudent)
        return res.status(400).json({ message: "Email already registered" });

      if (!files.student_image)
        return res.status(400).json({ message: "Student image is required" });

      const studentFile = normalizeFile(files.student_image);
      const result = await cloudinary.uploader.upload(studentFile.filepath, {
        folder: "students",
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const student = new Student({
        school: req.user.id,
        name,
        email,
        age,
        gender,
        student_class,
        guardian,
        guardian_phone,
        password: hashedPassword,
        student_image: result.secure_url,
      });

      await student.save();
      res
        .status(201)
        .json({ message: "Student registered successfully", student });
    } catch (error) {
      console.error("Register Student Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// 🟢 Update Student
exports.updateStudent = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({ message: "Error parsing form data" });

    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      if (!student)
        return res.status(404).json({ message: "Student not found" });

      const name = normalizeField(fields.name) || student.name;
      const email = normalizeField(fields.email) || student.email;
      const age = normalizeField(fields.age) || student.age;
      const gender = normalizeField(fields.gender) || student.gender;
      const student_class =
        normalizeField(fields.student_class || fields.class) ||
        student.student_class;
      const guardian = normalizeField(fields.guardian) || student.guardian;
      const guardian_phone =
        normalizeField(fields.guardian_phone) || student.guardian_phone;
      const password = normalizeField(fields.password);

      let updatedPassword = student.password;
      if (password && password.trim() !== "") {
        updatedPassword = await bcrypt.hash(password, 10);
      }

      let studentImage = student.student_image;
      if (files.student_image) {
        const studentFile = normalizeFile(files.student_image);
        const result = await cloudinary.uploader.upload(studentFile.filepath, {
          folder: "students",
        });
        studentImage = result.secure_url;
      }

      Object.assign(student, {
        name,
        email,
        age,
        gender,
        student_class,
        guardian,
        guardian_phone,
        password: updatedPassword,
        student_image: studentImage,
      });

      await student.save();
      res
        .status(200)
        .json({ message: "Student updated successfully", student });
    } catch (error) {
      console.error("Update Student Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// 🟢 Delete Student
exports.deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete Student Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// exports.getStudentsWithQuery = async (req, res) => {
//   try {
//     const query = { school: req.user.id };
//     if (req.query.name) query.name = new RegExp(req.query.name, "i");

//     const students = await Student.find(query)
//       .populate("student_class", "class_text class_num") // ✅ populate class
//       .lean(); // optional, easier for frontend

//     res.status(200).json({ students });
//   } catch (error) {
//     console.error("Get Students Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };




exports.getStudentsWithQuery = async (req, res) => {
  try {
    const schoolId = req.user.schoolId; // ✅ use schoolId from token
    const query = { school: schoolId };

    // Optional: search by name
    if (req.query.name) query.name = new RegExp(req.query.name, "i");

    // Filter by class if provided
    if (req.query.classId) query.student_class = req.query.classId;

    const students = await Student.find(query)
      .populate("student_class", "class_text class_num")
      .lean();

    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("Get Students Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// 🟢 Get Student Own Data with class populated
exports.getStudentOwnData = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .populate("student_class", "class_text class_num") // populate class name & section
      .lean(); // optional, returns plain JS object

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ student });
  } catch (error) {
    console.error("Get Student Own Data Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// 🟢 Login Student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email })
      .populate("student_class")
      .populate("school");

    if (!student)
      return res.status(404).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: student._id,
        role: "STUDENT",
        classId: student.student_class?._id,
        schoolId: student.school?._id, // ✅ add this line
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      student,
    });
  } catch (error) {
    console.error("Login Student Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};