



// // auth/auth.js
// const jwt = require("jsonwebtoken");

// function authMiddleware(roles = []) {
//   return (req, res, next) => {
//     try {
//       const authHeader = req.headers.authorization;
//       if (!authHeader)
//         return res.status(401).json({ message: "No token provided" });

//       const token = authHeader.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = decoded; // contains id, role, and school ✅

//       // Role-based access
//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ message: "Access denied" });
//       }

//       next();
//     } catch (err) {
//       res.status(401).json({ message: "Invalid or expired token" });
//     }
//   };
// }

// module.exports = authMiddleware;












const jwt = require("jsonwebtoken");

function authMiddleware(roles = []) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      req.user = decoded; // contains { id, role, school }
// console.log("decoded", decoded);
      // If roles are specified, check access
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access Denied" });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

module.exports = authMiddleware;








// const jwt = require("jsonwebtoken");

// function authMiddleware(roles = []) {
//   return (req, res, next) => {
//     try {
//       const authHeader = req.headers.authorization;
//       if (!authHeader)
//         return res.status(401).json({ message: "No token provided" });

//       const token = authHeader.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // decoded now has { id, role, schoolId }
//       req.user = decoded;

//       // Role-based access check
//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ message: "Access Denied" });
//       }

//       next();
//     } catch (err) {
//       res.status(401).json({ message: "Invalid or expired token" });
//     }
//   };
// }

// module.exports = authMiddleware;



