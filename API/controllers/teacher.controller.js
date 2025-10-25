// require("dotenv").config();
// const formidable = require("formidable");
// const path = require("path");
// const fs = require("fs");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const Teacher = require("../models/teacher.model");

// const imageDir = path.join(__dirname, "../", process.env.TEACHER_IMAGE_PATH);
// if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

// module.exports = {
//   // REGISTER TEACHER
//   registerTeacher: (req, res) => {
//     const form = formidable({ multiples: false });

//     form.parse(req, async (err, fields, files) => {
//       if (err)
//         return res
//           .status(400)
//           .json({ success: false, message: "Form parsing error" });

//       const [email, name, age, gender, qualification, password] = [
//         fields.email,
//         fields.name,
//         fields.age,
//         fields.gender,
//         fields.qualification,
//         fields.password,
//       ].map((f) => f?.[0]);

//       const photo = files.image?.[0];

//       if (
//         !email ||
//         !name ||
//         !age ||
//         !gender ||
//         !qualification ||
//         !password ||
//         !photo
//       ) {
//         return res
//           .status(400)
//           .json({ success: false, message: "All fields are required" });
//       }

//       if (await Teacher.findOne({ email })) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Email already exists" });
//       }

//       const filename = photo.originalFilename.replace(/ /g, "_");
//       const destPath = path.join(imageDir, filename);
//       fs.copyFileSync(photo.filepath, destPath);

//       const hashedPassword = bcrypt.hashSync(password, 10);

//       const teacher = new Teacher({
//         school: req.user?.schoolId,
//         email,
//         name,
//         age,
//         gender,
//         qualification,
//         password: hashedPassword,
//         image: filename,
//       });

//       await teacher.save();

//       res.status(201).json({
//         success: true,
//         message: "Teacher registered successfully",
//         data: {
//           _id: teacher._id,
//           email,
//           name,
//           age,
//           gender,
//           qualification,
//           image: teacher.image,
//         },
//       });
//     });
//   },

//   // LOGIN TEACHER
//   loginTeacher: async (req, res) => {
//     try {
//       const teacher = await Teacher.findOne({ email: req.body.email });
//       if (
//         !teacher ||
//         !bcrypt.compareSync(req.body.password, teacher.password)
//       ) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Invalid credentials" });
//       }

//       const token = jwt.sign(
//         { id: teacher._id, schoolId: teacher.school },
//         process.env.JWT_SECRET,
//         { expiresIn: "2h" }
//       );

//       res.header("Authorization", `Bearer ${token}`).json({
//         success: true,
//         message: "Logged in successfully",
//         user: {
//           _id: teacher._id,
//           email: teacher.email,
//           name: teacher.name,
//           school: teacher.school,
//           image: teacher.image,
//         },
//         token,
//       });
//     } catch (err) {
//       console.error("Login Error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   },

//   // FETCH TEACHERS
//   fetchTeachers: async (req, res) => {
//     try {
//       const school = req.user.schoolId;
//       const query = req.query.search
//         ? { school, name: { $regex: req.query.search, $options: "i" } }
//         : { school };

//       const teachers = await Teacher.find(query).select("-password");
//       res.json({ success: true, teachers });
//     } catch (err) {
//       console.error("Fetch error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   },

//   // UPDATE TEACHER
//   updateTeacher: (req, res) => {
//     const id = req.params.id;
//     const form = formidable({ multiples: false });

//     form.parse(req, async (err, fields, files) => {
//       try {
//         const teacher = await Teacher.findOne({
//           _id: id,
//           school: req.user.schoolId,
//         });
//         if (!teacher)
//           return res
//             .status(404)
//             .json({ success: false, message: "Teacher not found" });

//         ["name", "email", "age", "gender", "qualification", "password"].forEach(
//           (key) => {
//             if (fields[key]?.[0]) {
//               teacher[key] =
//                 key === "password"
//                   ? bcrypt.hashSync(fields[key][0], 10)
//                   : fields[key][0];
//             }
//           }
//         );

//         if (files.image?.[0]) {
//           const orig = files.image[0].originalFilename.replace(/ /g, "_");
//           const newPath = path.join(imageDir, orig);
//           fs.copyFileSync(files.image[0].filepath, newPath);

//           // Remove old image safely
//           if (
//             teacher.image &&
//             fs.existsSync(path.join(imageDir, teacher.image))
//           ) {
//             fs.unlinkSync(path.join(imageDir, teacher.image));
//           }

//           teacher.image = orig;
//         }

//         await teacher.save();

//         res.json({
//           success: true,
//           message: "Teacher updated successfully",
//           teacher,
//         });
//       } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//       }
//     });
//   },

//   // DELETE TEACHER
//   deleteTeacher: async (req, res) => {
//     try {
//       const deleted = await Teacher.findOneAndDelete({
//         _id: req.params.id,
//         school: req.user.schoolId,
//       });

//       if (deleted?.image && fs.existsSync(path.join(imageDir, deleted.image))) {
//         fs.unlinkSync(path.join(imageDir, deleted.image));
//       }

//       res.json({ success: true, message: "Teacher deleted successfully" });
//     } catch (err) {
//       console.error("Delete error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   },
// };



// require("dotenv").config();
// const formidable = require("formidable");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Teacher = require("../models/teacher.model");
// const cloudinary = require("../config/cloudinary"); // Cloudinary config

// module.exports = {
//   // REGISTER TEACHER
//   registerTeacher: async (req, res) => {
//     const form = new formidable.IncomingForm({ multiples: false });
//     form.parse(req, async (err, fields, files) => {
//       if (err)
//         return res
//           .status(400)
//           .json({ success: false, message: "Form parsing error" });

//       const { email, name, age, gender, qualification, password } = fields;
//       const photo = files.image;

//       // Validate
//       if (
//         !email ||
//         !name ||
//         !age ||
//         !gender ||
//         !qualification ||
//         !password ||
//         !photo
//       ) {
//         return res
//           .status(400)
//           .json({ success: false, message: "All fields are required" });
//       }

//       if (await Teacher.findOne({ email })) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Email already exists" });
//       }

//       // Upload to Cloudinary
//       let uploadedImage;
//       try {
//         uploadedImage = await cloudinary.uploader.upload(photo.filepath, {
//           folder: "teachers",
//           public_id: `${name}_${Date.now()}`,
//         });
//       } catch (uploadError) {
//         console.error("Cloudinary upload error:", uploadError);
//         return res
//           .status(500)
//           .json({ success: false, message: "Image upload failed" });
//       }

//       // Hash password
//       const hashedPassword = bcrypt.hashSync(password, 10);

//       // Save to DB
//       const teacher = new Teacher({
//         school: req.user?.schoolId, // auth middleware must set req.user
//         email,
//         name,
//         age,
//         gender,
//         qualification,
//         password: hashedPassword,
//         image: uploadedImage.secure_url,
//       });

//       await teacher.save();

//       res.status(201).json({
//         success: true,
//         message: "Teacher registered successfully",
//         data: teacher,
//       });
//     });
//   },

//   // LOGIN TEACHER
//   loginTeacher: async (req, res) => {
//     try {
//       const teacher = await Teacher.findOne({ email: req.body.email });
//       if (
//         !teacher ||
//         !bcrypt.compareSync(req.body.password, teacher.password)
//       ) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Invalid credentials" });
//       }

//       const token = jwt.sign(
//         { id: teacher._id, schoolId: teacher.school },
//         process.env.JWT_SECRET,
//         { expiresIn: "2h" }
//       );

//       res.header("Authorization", `Bearer ${token}`).json({
//         success: true,
//         message: "Logged in successfully",
//         user: teacher,
//         token,
//       });
//     } catch (err) {
//       console.error("Login Error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   },

//   // FETCH TEACHERS (with auth)
//   fetchTeachers: async (req, res) => {
//     try {
//       const school = req.user.schoolId;
//       const query = req.query.search
//         ? { school, name: { $regex: req.query.search, $options: "i" } }
//         : { school };

//       const teachers = await Teacher.find(query).select("-password");
//       res.json({ success: true, teachers });
//     } catch (err) {
//       console.error("Fetch error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   },

//   // FETCH TEACHERS PUBLIC
//   fetchTeachersPublic: async (req, res) => {
//     try {
//       const teachers = await Teacher.find().select("-password");
//       res.json({ success: true, teachers });
//     } catch (err) {
//       console.error("Fetch public error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   },

//   // UPDATE TEACHER
//   updateTeacher: async (req, res) => {
//     const id = req.params.id;
//     const form = new formidable.IncomingForm({ multiples: false });
//     form.parse(req, async (err, fields, files) => {
//       try {
//         const teacher = await Teacher.findOne({
//           _id: id,
//           school: req.user.schoolId,
//         });
//         if (!teacher)
//           return res
//             .status(404)
//             .json({ success: false, message: "Teacher not found" });

//         const keys = [
//           "name",
//           "email",
//           "age",
//           "gender",
//           "qualification",
//           "password",
//         ];
//         keys.forEach((key) => {
//           if (fields[key]) {
//             teacher[key] =
//               key === "password"
//                 ? bcrypt.hashSync(fields[key], 10)
//                 : fields[key];
//           }
//         });

//         if (files.image) {
//           const uploadedImage = await cloudinary.uploader.upload(
//             files.image.filepath,
//             {
//               folder: "teachers",
//               public_id: `${teacher.name}_${Date.now()}`,
//             }
//           );
//           teacher.image = uploadedImage.secure_url;
//         }

//         await teacher.save();
//         res.json({
//           success: true,
//           message: "Teacher updated successfully",
//           teacher,
//         });
//       } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//       }
//     });
//   },

//   // DELETE TEACHER
//   deleteTeacher: async (req, res) => {
//     try {
//       const deleted = await Teacher.findOneAndDelete({
//         _id: req.params.id,
//         school: req.user.schoolId,
//       });
//       res.json({
//         success: true,
//         message: "Teacher deleted successfully",
//         deleted,
//       });
//     } catch (err) {
//       console.error("Delete error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   },
// };


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher.model");
const Class = require("../models/class.model");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to normalize formidable file/field arrays
const normalizeField = (value) => (Array.isArray(value) ? value[0] : value);
const normalizeFile = (file) => (Array.isArray(file) ? file[0] : file);

// 🟢 Register Teacher
exports.registerTeacher = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({ message: "Error parsing form data" });

    try {
      // Normalize fields
      const name = normalizeField(fields.name);
      const email = normalizeField(fields.email);
      const age = normalizeField(fields.age);
      const gender = normalizeField(fields.gender);
      const qualification = normalizeField(fields.qualification);
      const password = normalizeField(fields.password);

      if (!name || !email || !age || !gender || !qualification || !password)
        return res.status(400).json({ message: "All fields are required" });

      // Check if teacher exists
      const existingTeacher = await Teacher.findOne({ email });
      if (existingTeacher)
        return res.status(400).json({ message: "Email already registered" });

      if (!files.teacher_image)
        return res.status(400).json({ message: "Teacher image is required" });

      // Upload image to Cloudinary
      const teacherFile = normalizeFile(files.teacher_image);
      const result = await cloudinary.uploader.upload(teacherFile.filepath, {
        folder: "teachers",
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const teacher = new Teacher({
        school: req.user.id,
        name,
        email,
        age,
        gender,
        qualification,
        password: hashedPassword,
        image: result.secure_url, // ✅ must match schema
      });

      await teacher.save();
      res
        .status(201)
        .json({ message: "Teacher registered successfully", teacher });
    } catch (error) {
      console.error("Register Teacher Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// 🟢 Update Teacher
exports.updateTeacher = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({ message: "Error parsing form data" });

    try {
      const { id } = req.params;
      const teacher = await Teacher.findById(id);
      if (!teacher)
        return res.status(404).json({ message: "Teacher not found" });

      // Normalize fields
      const name = normalizeField(fields.name) || teacher.name;
      const email = normalizeField(fields.email) || teacher.email;
      const age = normalizeField(fields.age) || teacher.age;
      const gender = normalizeField(fields.gender) || teacher.gender;
      const qualification =
        normalizeField(fields.qualification) || teacher.qualification;
      const password = normalizeField(fields.password);

      // Hash password if provided
      let updatedPassword = teacher.password;
      if (password && password.trim() !== "") {
        updatedPassword = await bcrypt.hash(password, 10);
      }

      // Upload new image if provided
      let teacherImage = teacher.image;
      if (files.teacher_image) {
        const teacherFile = normalizeFile(files.teacher_image);
        const result = await cloudinary.uploader.upload(teacherFile.filepath, {
          folder: "teachers",
        });
        teacherImage = result.secure_url;
      }

      // Update teacher
      teacher.name = name;
      teacher.email = email;
      teacher.age = age;
      teacher.gender = gender;
      teacher.qualification = qualification;
      teacher.password = updatedPassword;
      teacher.image = teacherImage;

      await teacher.save();
      res
        .status(200)
        .json({ message: "Teacher updated successfully", teacher });
    } catch (error) {
      console.error("Update Teacher Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// 🟢 Delete Teacher
exports.deleteTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    await Teacher.findByIdAndDelete(id);
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Delete Teacher Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🟢 Get Teachers with Query
exports.getTeachersWithQuery = async (req, res) => {
  try {
    const query = { school: req.user.id };
    if (req.query.name) query.name = new RegExp(req.query.name, "i");

    const teachers = await Teacher.find(query);
    res.status(200).json({ teachers });
  } catch (error) {
    console.error("Get Teachers Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🟢 Get Teacher Own Data
exports.getTeacherOwnData = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json({ teacher });
  } catch (error) {
    console.error("Get Teacher Own Data Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// exports.loginTeacher = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const teacher = await Teacher.findOne({ email });
//     if (!teacher)
//       return res.status(404).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, teacher.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid email or password" });

// //    const token = jwt.sign(
// //   { id: teacher._id, role: "TEACHER", schoolId: teacher.school }, // ✅ changed key name
// //   process.env.JWT_SECRET,
// //   { expiresIn: "7d" }
// // );

    
//     const token = jwt.sign(
//       { id: teacher._id, role: "TEACHER", school: teacher.schoolId }, // rename key back to "school"
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );
//     res.status(200).json({ message: "Login successful", token, teacher });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

















exports.loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher)
      return res.status(404).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // JWT token payload
    const token = jwt.sign(
      { id: teacher._id, role: "TEACHER", schoolId: teacher.school },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, teacher });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};