// import React from "react";
// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import School from "./school/School";

// import Class from "./school/component/class/Class";
// import DashBoard from "./school/component/dashboard/DashBoard";
// import Examinations from "./school/component/examinations/Examinations";
// import Notice from "./school/component/notice/Notice";
// import Schedule from "./school/component/schedule/Schedule";
// import Students from "./school/component/students/Students";
// import Subjects from "./school/component/subjects/Subjects";
// import Teachers from "./school/component/teachers/Teachers";
// import Client from "./client/Client";
// import Home from "./client/components/home/Home";
// import Login from "./client/components/login/Login";
// import Register from "./client/components/register/Register";
// import Teacher from "./teacher/Teacher";
// import TeacherDetails from "./teacher/components/teacher details/TeacherDetails";
// import ScheduleTeacher from "./teacher/components/schedule/ScheduleTeacher";
// import AttendanceTeacher from "./teacher/components/attendance/AttendanceTeacher";
// import ExaminationsTeacher from "./teacher/components/examinations/ExaminationsTeacher";
// import NoticeTeacher from "./teacher/components/notice/NoticeTeacher";
// import Student from "./student/Student";
// import StudentDetails from "./student/components/student details/StudentDetails";
// import ScheduleStudent from "./student/components/schedule/ScheduleStudent";
// import AttendanceStudent from "./student/components/attendance/AttendanceStudent";
// import ExaminationsStudent from "./student/components/examinations/ExaminationsStudent";
// import NoticeStudent from "./student/components/notice/NoticeStudent";
// import ProtecteRouter from "./guard/ProtecteRouter";
// import { AuthProvider } from "./context/AuthContext";
// import AttendanceStudentList from "./school/component/attendence/AttendanceStudentList";
// import AttendanceDetails from "./school/component/attendence/AttendanceDetails";
// import LogOut from "./client/components/logout/LogOut";

// // console.log("BASE_URL =", import.meta.env.VITE_BASE_URL);

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/*School*/}
//           <Route
//             path="school"
//             element={
//               <ProtecteRouter allowedRoles={["SCHOOL"]}>
//                 <School />
//               </ProtecteRouter>
//             }
//           >
//             <Route index element={<DashBoard />} />
//             <Route path="dashboard" element={<DashBoard />} />

//             <Route path="attendance" element={<AttendanceStudentList />} />
//             <Route path="attendance/:id" element={<AttendanceDetails />} />
//             <Route
//               path="attendance/:id"
//               element={<AttendanceDetails />}
//             />
//             <Route path="class" element={<Class />} />
//             <Route path="examinations" element={<Examinations />} />
//             <Route path="notice" element={<Notice />} />
//             <Route path="schedule" element={<Schedule />} />
//             <Route path="students" element={<Students />} />
//             <Route path="subjects" element={<Subjects />} />
//             <Route path="teachers" element={<Teachers />} />
//           </Route>

//           {/*Student*/}
//           <Route
//             path="student"
//             element={
//               <ProtecteRouter allowedRoles={["STUDENT"]}>
//                 <Student />
//               </ProtecteRouter>
//             }
//           >
//             <Route index element={<StudentDetails />} />
//             <Route path="schedule" element={<ScheduleStudent />} />
//             <Route path="attendance" element={<AttendanceStudent />} />
//             <Route path="examinations" element={<ExaminationsStudent />} />
//             <Route path="notice" element={<NoticeStudent />} />
//           </Route>
//           {/*Teacher*/}
//           <Route
//             path="teacher"
//             element={
//               <ProtecteRouter allowedRoles={["TEACHER"]}>
//                 <Teacher />
//               </ProtecteRouter>
//             }
//           >
//             <Route index element={<TeacherDetails />} />
//             <Route path="schedule" element={<ScheduleTeacher />} />
//             <Route path="attendance" element={<AttendanceTeacher />} />
//             <Route path="examinations" element={<ExaminationsTeacher />} />
//             <Route path="notice" element={<NoticeTeacher />} />
//           </Route>
//           {/*Client*/}
//           <Route path="/" element={<Client />}>
//             <Route index element={<Home />} />
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route path="logout" element={<LogOut/>}/>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;



























import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import School from "./school/School";

import Class from "./school/component/class/Class";
import DashBoard from "./school/component/dashboard/DashBoard";
import Examinations from "./school/component/examinations/Examinations";
import Notice from "./school/component/notice/Notice";
import Schedule from "./school/component/schedule/Schedule";
import Students from "./school/component/students/Students";
import Subjects from "./school/component/subjects/Subjects";
import Teachers from "./school/component/teachers/Teachers";
import Client from "./client/Client";
import Home from "./client/components/home/Home";
import Login from "./client/components/login/Login";
import Register from "./client/components/register/Register";
import Teacher from "./teacher/Teacher";
import TeacherDetails from "./teacher/components/teacher details/TeacherDetails";
import ScheduleTeacher from "./teacher/components/schedule/ScheduleTeacher";
import AttendanceTeacher from "./teacher/components/attendance/AttendanceTeacher";
import ExaminationsTeacher from "./teacher/components/examinations/ExaminationsTeacher";
import NoticeTeacher from "./teacher/components/notice/NoticeTeacher";
import Student from "./student/Student";
import StudentDetails from "./student/components/student details/StudentDetails";
import ScheduleStudent from "./student/components/schedule/ScheduleStudent";
import AttendanceStudent from "./student/components/attendance/AttendanceStudent";
import ExaminationsStudent from "./student/components/examinations/ExaminationsStudent";
import NoticeStudent from "./student/components/notice/NoticeStudent";
import ProtecteRouter from "./guard/ProtecteRouter";
import { AuthProvider } from "./context/AuthContext";
import AttendanceStudentList from "./school/component/attendence/AttendanceStudentList";
import AttendanceDetails from "./school/component/attendence/AttendanceDetails";
import LogOut from "./client/components/logout/LogOut";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* SCHOOL SECTION */}
          <Route
            path="school"
            element={
              <ProtecteRouter allowedRoles={["SCHOOL"]}>
                <School />
              </ProtecteRouter>
            }
          >
            <Route index element={<DashBoard />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="attendance" element={<AttendanceStudentList />} />
            <Route path="attendance/:id" element={<AttendanceDetails />} />
            <Route path="class" element={<Class />} />
            <Route path="examinations" element={<Examinations />} />
            <Route path="notice" element={<Notice />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="students" element={<Students />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="teachers" element={<Teachers />} />
          </Route>

          {/* STUDENT SECTION */}
          <Route
            path="student"
            element={
              <ProtecteRouter allowedRoles={["STUDENT"]}>
                <Student />
              </ProtecteRouter>
            }
          >
            <Route index element={<StudentDetails />} />
            <Route path="schedule" element={<ScheduleStudent />} />
            <Route path="attendance" element={<AttendanceStudent />} />
            <Route path="examinations" element={<ExaminationsStudent />} />
            <Route path="notice" element={<NoticeStudent />} />
          </Route>

          {/* TEACHER SECTION */}
          <Route
            path="teacher"
            element={
              <ProtecteRouter allowedRoles={["TEACHER"]}>
                <Teacher />
              </ProtecteRouter>
            }
          >
            <Route index element={<TeacherDetails />} />
            <Route path="schedule" element={<ScheduleTeacher />} />
            <Route path="attendance" element={<AttendanceTeacher />} />
            <Route path="examinations" element={<ExaminationsTeacher />} />
            <Route path="notice" element={<NoticeTeacher />} />
          </Route>

          {/* CLIENT SECTION */}
          <Route path="/" element={<Client />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="logout" element={<LogOut />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
