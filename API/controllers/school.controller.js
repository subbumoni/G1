// require("dotenv").config();
// const formidable = require("formidable");
// const path = require("path");
// const fs = require("fs");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const School = require("../models/school.model");

// module.exports = {
//   // Register School
//   registerSchool: async (req, res) => {
//     try {
//       const form = new formidable.IncomingForm({ multiples: false });

//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           console.error("Form parse error:", err);
//           return res
//             .status(400)
//             .json({ success: false, message: "Form parsing failed." });
//         }

//         if (!files.image || files.image.length === 0) {
//           return res
//             .status(400)
//             .json({ success: false, message: "Image file is required." });
//         }

//         const school = await School.findOne({ email: fields.email[0] });
//         if (school) {
//           return res
//             .status(400)
//             .json({ success: false, message: "Email is already registered." });
//         }

//         const photo = files.image[0];
//         const filepath = photo.filepath;
//         const originalFilename =
//           photo.originalFilename?.replace(/\s+/g, "_") ||
//           `image_${Date.now()}.jpg`;

//         const imageDir = path.join(
//           __dirname,
//           "..",
//           process.env.SCHOOL_IMAGE_PATH || "uploads/schools"
//         );
//         if (!fs.existsSync(imageDir)) {
//           fs.mkdirSync(imageDir, { recursive: true });
//         }

//         const newPath = path.join(imageDir, originalFilename);
//         const photoData = fs.readFileSync(filepath);
//         fs.writeFileSync(newPath, photoData);

//         const salt = bcrypt.genSaltSync(10);
//         const hashPassword = bcrypt.hashSync(fields.password[0], salt);

//         const newSchool = new School({
//           school_name: fields.school_name[0],
//           email: fields.email[0],
//           owner_name: fields.owner_name[0],
//           school_image: originalFilename,
//           password: hashPassword,
//         });

//         const savedSchool = await newSchool.save();

//         return res.status(200).json({
//           success: true,
//           data: savedSchool,
//           message: "School is Registered Successfully.",
//         });
//       });
//     } catch (error) {
//       console.error("Server error:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "School Registration Failed." });
//     }
//   },

//   // School Login
//   loginSchool: async (req, res) => {
//     try {
//       const school = await School.findOne({ email: req.body.email });
//       if (!school) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Email is not registered." });
//       }
  
//       const isAuth = bcrypt.compareSync(req.body.password, school.password);
//       if (!isAuth) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Incorrect password." });
//       }
  
//       const token = jwt.sign(
//         {
//           id: school._id,
//           schoolId: school._id,
//           owner_name: school.owner_name,
//           school_name: school.school_name,
//           image_url: school.school_image,
//           role: "SCHOOL",
//         },
//         process.env.JWT_SECRET
//       );
  
//       res.status(200).json({
//         success: true,
//         message: "Login successful.",
//         token, // ✅ send token here
//         user: {
//           id: school._id,
//           owner_name: school.owner_name,
//           school_name: school.school_name,
//           image_url: school.school_image,
//           role: "SCHOOL",
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         message: "Internal server error during login.",
//       });
//     }
//   },
  

//   // Get All Schools
//   getAllSchools: async (req, res) => {
//     try {
//       const schools = await School.find().select([
//         "-password",
//         "-_id",
//         "-email",
//         "-owner_name",
//         "-createdAt",
//       ]);
//       res.status(200).json({
//         success: true,
//         message: "Fetched all schools successfully.",
//         schools,
//       });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({
//           success: false,
//           message: "Internal server error fetching schools.",
//         });
//     }
//   },

//   // Get Logged-in School's Own Data
//   getSchoolOwnData: async (req, res) => {
//     try {
//       const id = req.user.id;
//       const school = await School.findById(id).select("-password");
//       if (!school) {
//         return res
//           .status(404)
//           .json({ success: false, message: "School not found." });
//       }

//       res.status(200).json({ success: true, school });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ success: false, message: "Error fetching school data." });
//     }
//   },

//   // Update School Profile
//   updateSchool: async (req, res) => {
//     try {
//       const id = req.user.id;
//       const form = new formidable.IncomingForm();
//       form.multiples = true;

//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           return res
//             .status(400)
//             .json({ success: false, message: "Form parse error" });
//         }

//         const school = await School.findById(id);
//         if (!school) {
//           return res
//             .status(404)
//             .json({ success: false, message: "School not found." });
//         }

//         // Update image
//         if (files.image) {
//           const photo = Array.isArray(files.image)
//             ? files.image[0]
//             : files.image;
//           const originalFilename =
//             photo.originalFilename?.replace(/ /g, "_") ||
//             `image_${Date.now()}.jpg`;

//           const uploadDir = path.resolve(
//             __dirname,
//             "..",
//             process.env.SCHOOL_IMAGE_PATH || "uploads/schools"
//           );
//           if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//           }

//           if (school.school_image) {
//             const oldPath = path.join(uploadDir, school.school_image);
//             if (fs.existsSync(oldPath)) {
//               fs.unlinkSync(oldPath);
//             }
//           }

//           const newPath = path.join(uploadDir, originalFilename);
//           const photoData = fs.readFileSync(photo.filepath);
//           fs.writeFileSync(newPath, photoData);

//           school.school_image = originalFilename;
//         }

//         // Update other fields
//         Object.keys(fields).forEach((key) => {
//           school[key] = fields[key][0];
//         });

//         await school.save();
//         res
//           .status(200)
//           .json({
//             success: true,
//             message: "School updated successfully.",
//             school,
//           });
//       });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ success: false, message: "School update failed." });
//     }
//   },
// };





require("dotenv").config();
const formidable = require("formidable");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const School = require("../models/school.model");
const cloudinary = require("../config/cloudinary"); // cloudinary config file

module.exports = {
  // Register School
  registerSchool: async (req, res) => {
    try {
      const form = new formidable.IncomingForm({ multiples: false });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res
            .status(400)
            .json({ success: false, message: "Form parsing failed." });
        }

        if (!files.image) {
          return res
            .status(400)
            .json({ success: false, message: "Image file is required." });
        }

        const schoolExists = await School.findOne({ email: fields.email[0] });
        if (schoolExists) {
          return res
            .status(400)
            .json({ success: false, message: "Email is already registered." });
        }

        const photo = Array.isArray(files.image) ? files.image[0] : files.image;

        // Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(photo.filepath, {
          folder: "schools",
          public_id: `${fields.school_name[0]}_${Date.now()}`,
        });

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(fields.password[0], salt);

        const newSchool = new School({
          school_name: fields.school_name[0],
          email: fields.email[0],
          owner_name: fields.owner_name[0],
          school_image: uploadedImage.secure_url, // store Cloudinary URL
          password: hashPassword,
        });

        const savedSchool = await newSchool.save();

        res.status(200).json({
          success: true,
          data: savedSchool,
          message: "School is Registered Successfully.",
        });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "School Registration Failed." });
    }
  },

  // School Login
  loginSchool: async (req, res) => {
    try {
      const { email, password } = req.body;
      const school = await School.findOne({ email });
      if (!school) return res.status(404).json({ message: "School not found" });

      const isMatch = await bcrypt.compare(password, school.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      // ✅ Include schoolId in JWT payload
      const token = jwt.sign(
        { id: school._id, schoolId: school._id, role: "SCHOOL" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: school._id,
          owner_name: school.owner_name,
          school_name: school.school_name,
          image_url: school.image_url,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },


//   // controllers/school.controller.js
// loginSchool: async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const school = await School.findOne({ email });
//     if (!school) return res.status(404).json({ message: "School not found" });

//     const isMatch = await bcrypt.compare(password, school.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Include schoolId in JWT
//     const token = jwt.sign(
//       { schoolId: school._id, role: "SCHOOL" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: school._id,
//         owner_name: school.owner_name,
//         school_name: school.school_name,
//         image_url: school.image_url,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// },

  // Get All Schools
  getAllSchools: async (req, res) => {
    try {
      const schools = await School.find().select(["-password"]);
      res.status(200).json({
        success: true,
        message: "Fetched all schools successfully.",
        schools,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error fetching schools.",
      });
    }
  },

  // Get Logged-in School's Own Data
  getSchoolOwnData: async (req, res) => {
    try {
      const id = req.user.id;
      const school = await School.findById(id).select("-password");
      if (!school)
        return res
          .status(404)
          .json({ success: false, message: "School not found." });
      res.status(200).json({ success: true, school });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching school data." });
    }
  },

  // Update School Profile
  updateSchool: async (req, res) => {
    try {
      const id = req.user.id;
      const form = new formidable.IncomingForm({ multiples: true });

      form.parse(req, async (err, fields, files) => {
        if (err)
          return res
            .status(400)
            .json({ success: false, message: "Form parse error" });

        const school = await School.findById(id);
        if (!school)
          return res
            .status(404)
            .json({ success: false, message: "School not found." });

        // Update image if provided
        if (files.image) {
          const photo = Array.isArray(files.image)
            ? files.image[0]
            : files.image;

          // Upload new image to Cloudinary
          const uploadedImage = await cloudinary.uploader.upload(
            photo.filepath,
            {
              folder: "schools",
              public_id: `${school.school_name}_${Date.now()}`,
            }
          );

          school.school_image = uploadedImage.secure_url;
        }

        // Update other fields
        Object.keys(fields).forEach((key) => {
          school[key] = fields[key][0];
        });

        await school.save();
        res.status(200).json({
          success: true,
          message: "School updated successfully.",
          school,
        });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "School update failed." });
    }
  },
};


















