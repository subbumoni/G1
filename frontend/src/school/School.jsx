// /* eslint-disable no-unused-vars */
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

// //import ICONS
// import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
// import PeopleIcon from '@mui/icons-material/People';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import EventIcon from '@mui/icons-material/Event';
// // import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SubjectIcon from '@mui/icons-material/Subject';
// import ExplicitIcon from '@mui/icons-material/Explicit';
// import RecentActorsIcon from '@mui/icons-material/RecentActors';
// import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
// import HomeIcon from "@mui/icons-material/Home";
// import LogoutIcon from "@mui/icons-material/Logout";

// import {Outlet, useNavigate} from 'react-router-dom'

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function School() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//     const navArr = [
//      {
//             link: "/",
//             component: "Home",
//             icon: HomeIcon,
//           },
//         { link: "/school", component: "Dashboard", icon: DashboardCustomizeIcon },
//         {link:"/school/class", component:"Class", icon:FormatListNumberedIcon},
//         {link:"/school/subjects", component:"Subjects" ,icon:SubjectIcon},
//         {link:"/school/students", component:"Students", icon:PeopleIcon},
//         {link:"/school/teachers", component:"Teachers", icon:PeopleAltIcon},
//         {link:"/school/schedule", component:"Schedule", icon:EventIcon},
//         {link:"/school/attendance", component:"Attendance", icon:RecentActorsIcon},
//         {link:"/school/examinations", component:"Examinations", icon:ExplicitIcon},
//       { link: "/school/notice", component: "Notice", icon: NotificationsIcon },
//         {link:"/logout",component:"Log Out",icon:LogoutIcon}
//     ]

//    const navigate=useNavigate()
//     const handleNavigation = (link) => {
//      navigate(link)
//    }

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             School Management System [Multiple]
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {navArr.map((navItem, index) => (
//             <ListItem key={index} disablePadding sx={{ display: "block" }}>
//               <ListItemButton
//                       sx={{
//                           minHeight: 48,
//                           justifyContent: open ? "initial" : "center",
//                           px: 2.5,
//                       }}

//                       onClick={() => { handleNavigation(navItem.link) }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <navItem.icon/>
//                 </ListItemIcon>
//                 <ListItemText primary={navItem.component} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         {/* <List>
//           {["All mail", "Trash", "Spam"].map((text, index) => (
//             <ListItem key={text} disablePadding sx={{ display: "block" }}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List> */}
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//               <DrawerHeader />
              
//               <Outlet/>
//         {/* Content here */}
//       </Box>
//     </Box>
//   );
// }






















// /* eslint-disable no-unused-vars */
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import HomeIcon from "@mui/icons-material/Home";
// import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
// import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
// import SubjectIcon from "@mui/icons-material/Subject";
// import PeopleIcon from "@mui/icons-material/People";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import EventIcon from "@mui/icons-material/Event";
// import RecentActorsIcon from "@mui/icons-material/RecentActors";
// import ExplicitIcon from "@mui/icons-material/Explicit";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
//   boxShadow: "0 0 20px rgba(0,255,255,0.2)",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
//   boxShadow: "0 0 8px rgba(0,0,0,0.2)",
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   background: "linear-gradient(90deg, #00f, #0ff, #0f0, #ff0, #f00)",
//   color: "#fff",
//   boxShadow: "0 0 20px rgba(0,255,255,0.4)",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function School() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeLink, setActiveLink] = React.useState(location.pathname);

//   const handleDrawerOpen = () => setOpen(true);
//   const handleDrawerClose = () => setOpen(false);

//   const navArr = [
//     { link: "/", component: "Home", icon: HomeIcon },
//     { link: "/school", component: "Dashboard", icon: DashboardCustomizeIcon },
//     { link: "/school/class", component: "Class", icon: FormatListNumberedIcon },
//     { link: "/school/subjects", component: "Subjects", icon: SubjectIcon },
//     { link: "/school/students", component: "Students", icon: PeopleIcon },
//     { link: "/school/teachers", component: "Teachers", icon: PeopleAltIcon },
//     { link: "/school/schedule", component: "Schedule", icon: EventIcon },
//     { link: "/school/attendance", component: "Attendance", icon: RecentActorsIcon },
//     { link: "/school/examinations", component: "Examinations", icon: ExplicitIcon },
//     { link: "/school/notice", component: "Notice", icon: NotificationsIcon },
//     { link: "/logout", component: "Log Out", icon: LogoutIcon },
//   ];

//   const handleNavigation = (link) => {
//     setActiveLink(link);
//     navigate(link);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ marginRight: 5, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ textShadow: "0 0 10px #0ff, 0 0 20px #0ff" }}
//           >
//             School Management System [Multiple]
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {navArr.map((navItem, index) => {
//             const IconComp = navItem.icon;
//             return (
//               <motion.div
//                 key={navItem.link}
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <ListItem disablePadding sx={{ display: "block" }}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? "initial" : "center",
//                       px: 2.5,
//                       backgroundColor:
//                         activeLink === navItem.link ? "rgba(0,255,255,0.2)" : "transparent",
//                       "&:hover": { backgroundColor: "rgba(0,255,255,0.1)" },
//                       transition: "all 0.3s",
//                     }}
//                     onClick={() => handleNavigation(navItem.link)}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 3 : "auto",
//                         justifyContent: "center",
//                         color: activeLink === navItem.link ? "#0ff" : "#fff",
//                         transition: "color 0.3s",
//                       }}
//                     >
//                       <IconComp />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={navItem.component}
//                       sx={{ opacity: open ? 1 : 0 }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </motion.div>
//             );
//           })}
//         </List>
//         <Divider />
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }

























// /* eslint-disable no-unused-vars */
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import HomeIcon from "@mui/icons-material/Home";
// import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
// import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
// import SubjectIcon from "@mui/icons-material/Subject";
// import PeopleIcon from "@mui/icons-material/People";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import EventIcon from "@mui/icons-material/Event";
// import RecentActorsIcon from "@mui/icons-material/RecentActors";
// import ExplicitIcon from "@mui/icons-material/Explicit";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
//   backgroundColor: "#111", // Make sidebar visible
//   color: "#fff",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
//   backgroundColor: "#111", // Make sidebar visible
//   color: "#fff",
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   background:
//     "linear-gradient(90deg, #00f, #0ff, #0f0, #ff0, #f00)",
//   color: "#fff",
//   boxShadow: "0 0 20px rgba(0,255,255,0.4)",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function School() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeLink, setActiveLink] = React.useState(location.pathname);

//   const handleDrawerOpen = () => setOpen(true);
//   const handleDrawerClose = () => setOpen(false);

//   const navArr = [
//     { link: "/", component: "Home", icon: HomeIcon },
//     { link: "/school", component: "Dashboard", icon: DashboardCustomizeIcon },
//     { link: "/school/class", component: "Class", icon: FormatListNumberedIcon },
//     { link: "/school/subjects", component: "Subjects", icon: SubjectIcon },
//     { link: "/school/students", component: "Students", icon: PeopleIcon },
//     { link: "/school/teachers", component: "Teachers", icon: PeopleAltIcon },
//     { link: "/school/schedule", component: "Schedule", icon: EventIcon },
//     { link: "/school/attendance", component: "Attendance", icon: RecentActorsIcon },
//     { link: "/school/examinations", component: "Examinations", icon: ExplicitIcon },
//     { link: "/school/notice", component: "Notice", icon: NotificationsIcon },
//     { link: "/logout", component: "Log Out", icon: LogoutIcon },
//   ];

//   const handleNavigation = (link) => {
//     setActiveLink(link);
//     navigate(link);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ marginRight: 5, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ textShadow: "0 0 10px #0ff, 0 0 20px #0ff" }}
//           >
//             School Management System [Multiple]
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {navArr.map((navItem, index) => {
//             const IconComp = navItem.icon;
//             return (
//               <motion.div
//                 key={navItem.link}
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <ListItem disablePadding sx={{ display: "block" }}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? "initial" : "center",
//                       px: 2.5,
//                       backgroundColor:
//                         activeLink === navItem.link ? "rgba(0,255,255,0.2)" : "transparent",
//                       "&:hover": { backgroundColor: "rgba(0,255,255,0.1)" },
//                       transition: "all 0.3s",
//                     }}
//                     onClick={() => handleNavigation(navItem.link)}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 3 : "auto",
//                         justifyContent: "center",
//                         color: activeLink === navItem.link ? "#0ff" : "#fff",
//                         transition: "color 0.3s",
//                       }}
//                     >
//                       <IconComp />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={navItem.component}
//                       sx={{ opacity: open ? 1 : 0 }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </motion.div>
//             );
//           })}
//         </List>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }








/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import HomeIcon from "@mui/icons-material/Home";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SubjectIcon from "@mui/icons-material/Subject";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventIcon from "@mui/icons-material/Event";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ExplicitIcon from "@mui/icons-material/Explicit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: 300, // transition duration for smooth slide
  }),
  overflowX: "hidden",
  backgroundColor: "#111",
  color: "#fff",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: 300, // transition duration for smooth slide
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "#111",
  color: "#fff",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background:
    "linear-gradient(90deg, #00f, #0ff, #0f0, #ff0, #f00)",
  color: "#fff",
  boxShadow: "0 0 20px rgba(0,255,255,0.4)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: 300, // transition duration for smooth appbar resize
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function School() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = React.useState(location.pathname);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const navArr = [
    { link: "/", component: "Home", icon: HomeIcon },
    { link: "/school", component: "Dashboard", icon: DashboardCustomizeIcon },
    { link: "/school/class", component: "Class", icon: FormatListNumberedIcon },
    { link: "/school/subjects", component: "Subjects", icon: SubjectIcon },
    { link: "/school/students", component: "Students", icon: PeopleIcon },
    { link: "/school/teachers", component: "Teachers", icon: PeopleAltIcon },
    { link: "/school/schedule", component: "Schedule", icon: EventIcon },
    { link: "/school/attendance", component: "Attendance", icon: RecentActorsIcon },
    { link: "/school/examinations", component: "Examinations", icon: ExplicitIcon },
    { link: "/school/notice", component: "Notice", icon: NotificationsIcon },
    { link: "/logout", component: "Log Out", icon: LogoutIcon },
  ];

  const handleNavigation = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ textShadow: "0 0 10px #0ff, 0 0 20px #0ff" }}
          >
            School Management System [Multiple]
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navArr.map((navItem, index) => {
            const IconComp = navItem.icon;
            return (
              <motion.div
                key={navItem.link}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor:
                        activeLink === navItem.link ? "rgba(0,255,255,0.2)" : "transparent",
                      "&:hover": { backgroundColor: "rgba(0,255,255,0.1)" },
                      transition: "all 0.3s", // smooth transition for hover
                    }}
                    onClick={() => handleNavigation(navItem.link)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: activeLink === navItem.link ? "#0ff" : "#fff",
                        transition: "color 0.3s",
                      }}
                    >
                      <IconComp />
                    </ListItemIcon>
                    <ListItemText
                      primary={navItem.component}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}











// /* eslint-disable no-unused-vars */
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import HomeIcon from "@mui/icons-material/Home";
// import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
// import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
// import SubjectIcon from "@mui/icons-material/Subject";
// import PeopleIcon from "@mui/icons-material/People";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import EventIcon from "@mui/icons-material/Event";
// import RecentActorsIcon from "@mui/icons-material/RecentActors";
// import ExplicitIcon from "@mui/icons-material/Explicit";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
//   backgroundColor: "#111",
//   color: "#fff",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
//   backgroundColor: "#111",
//   color: "#fff",
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   background:
//     "linear-gradient(90deg, #00f, #0ff, #0f0, #ff0, #f00)",
//   color: "#fff",
//   boxShadow: "0 0 20px rgba(0,255,255,0.4)",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function School() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeLink, setActiveLink] = React.useState(location.pathname);

//   React.useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleDrawerOpen = () => setOpen(true);
//   const handleDrawerClose = () => setOpen(false);

//   const navArr = [
//     { link: "/", component: "Home", icon: HomeIcon },
//     { link: "/school", component: "Dashboard", icon: DashboardCustomizeIcon },
//     { link: "/school/class", component: "Class", icon: FormatListNumberedIcon },
//     { link: "/school/subjects", component: "Subjects", icon: SubjectIcon },
//     { link: "/school/students", component: "Students", icon: PeopleIcon },
//     { link: "/school/teachers", component: "Teachers", icon: PeopleAltIcon },
//     { link: "/school/schedule", component: "Schedule", icon: EventIcon },
//     { link: "/school/attendance", component: "Attendance", icon: RecentActorsIcon },
//     { link: "/school/examinations", component: "Examinations", icon: ExplicitIcon },
//     { link: "/school/notice", component: "Notice", icon: NotificationsIcon },
//     { link: "/logout", component: "Log Out", icon: LogoutIcon },
//   ];

//   const handleNavigation = (link) => {
//     setActiveLink(link);
//     navigate(link);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={isMobile ? () => setOpen(!open) : handleDrawerOpen}
//             edge="start"
//             sx={{ marginRight: 5, ...(open && !isMobile && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ textShadow: "0 0 10px #0ff, 0 0 20px #0ff" }}
//           >
//             School Management System [Multiple]
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={open}
//         onMouseEnter={() => !isMobile && setOpen(true)}
//         onMouseLeave={() => !isMobile && setOpen(false)}
//         ModalProps={{ keepMounted: true }}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {navArr.map((navItem, index) => {
//             const IconComp = navItem.icon;
//             return (
//               <motion.div
//                 key={navItem.link}
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <ListItem disablePadding sx={{ display: "block" }}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? "initial" : "center",
//                       px: 2.5,
//                       backgroundColor:
//                         activeLink === navItem.link ? "rgba(0,255,255,0.2)" : "transparent",
//                       "&:hover": { backgroundColor: "rgba(0,255,255,0.1)" },
//                       transition: "all 0.3s",
//                     }}
//                     onClick={() => handleNavigation(navItem.link)}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 3 : "auto",
//                         justifyContent: "center",
//                         color: activeLink === navItem.link ? "#0ff" : "#fff",
//                         transition: "color 0.3s",
//                       }}
//                     >
//                       <IconComp />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={navItem.component}
//                       sx={{ opacity: open ? 1 : 0 }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </motion.div>
//             );
//           })}
//         </List>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }


























// /* eslint-disable no-unused-vars */
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";

// // Icons
// import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
// import PeopleIcon from "@mui/icons-material/People";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import EventIcon from "@mui/icons-material/Event";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SubjectIcon from "@mui/icons-material/Subject";
// import ExplicitIcon from "@mui/icons-material/Explicit";
// import RecentActorsIcon from "@mui/icons-material/RecentActors";
// import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
// import HomeIcon from "@mui/icons-material/Home";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { Outlet, useNavigate } from "react-router-dom";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.easeInOut,
//     duration: 300,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.easeInOut,
//     duration: 300,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.easeInOut,
//     duration: 300,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.easeInOut,
//       duration: 300,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function School() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const navigate = useNavigate();

//   const navArr = [
//     { link: "/", component: "Home", icon: HomeIcon },
//     { link: "/school", component: "Dashboard", icon: DashboardCustomizeIcon },
//     { link: "/school/class", component: "Class", icon: FormatListNumberedIcon },
//     { link: "/school/subjects", component: "Subjects", icon: SubjectIcon },
//     { link: "/school/students", component: "Students", icon: PeopleIcon },
//     { link: "/school/teachers", component: "Teachers", icon: PeopleAltIcon },
//     { link: "/school/schedule", component: "Schedule", icon: EventIcon },
//     { link: "/school/attendance", component: "Attendance", icon: RecentActorsIcon },
//     { link: "/school/examinations", component: "Examinations", icon: ExplicitIcon },
//     { link: "/school/notice", component: "Notice", icon: NotificationsIcon },
//     { link: "/logout", component: "Log Out", icon: LogoutIcon },
//   ];

//   const handleNavigation = (link) => navigate(link);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{ bgcolor: "#0f2027" }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={() => setOpen(true)}
//             edge="start"
//             sx={{ marginRight: 5, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             School Management System [Multiple]
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         open={open}
//         onMouseEnter={() => setOpen(true)}
//         onMouseLeave={() => setOpen(false)}
//       >
//         <DrawerHeader>
//           <IconButton onClick={() => setOpen(false)}>
//             {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {navArr.map((navItem, index) => {
//             const IconComp = navItem.icon;
//             return (
//               <ListItem key={index} disablePadding sx={{ display: "block" }}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                     "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
//                   }}
//                   onClick={() => handleNavigation(navItem.link)}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                       color: "#fff",
//                     }}
//                   >
//                     <IconComp />
//                   </ListItemIcon>
//                   <ListItemText primary={navItem.component} sx={{ opacity: open ? 1 : 0, color: "#fff" }} />
//                 </ListItemButton>
//               </ListItem>
//             );
//           })}
//         </List>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }











// /* eslint-disable no-unused-vars */
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";

// // Icons
// import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
// import PeopleIcon from "@mui/icons-material/People";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import EventIcon from "@mui/icons-material/Event";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SubjectIcon from "@mui/icons-material/Subject";
// import ExplicitIcon from "@mui/icons-material/Explicit";
// import RecentActorsIcon from "@mui/icons-material/RecentActors";
// import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
// import HomeIcon from "@mui/icons-material/Home";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { Outlet, useNavigate } from "react-router-dom";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function School() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const navigate = useNavigate();

//   const navArr = [
//     { link: "/", component: "Home", icon: HomeIcon },
//     { link: "/school", component: "Dashboard", icon: DashboardCustomizeIcon },
//     { link: "/school/class", component: "Class", icon: FormatListNumberedIcon },
//     { link: "/school/subjects", component: "Subjects", icon: SubjectIcon },
//     { link: "/school/students", component: "Students", icon: PeopleIcon },
//     { link: "/school/teachers", component: "Teachers", icon: PeopleAltIcon },
//     { link: "/school/schedule", component: "Schedule", icon: EventIcon },
//     { link: "/school/attendance", component: "Attendance", icon: RecentActorsIcon },
//     { link: "/school/examinations", component: "Examinations", icon: ExplicitIcon },
//     { link: "/school/notice", component: "Notice", icon: NotificationsIcon },
//     { link: "/logout", component: "Log Out", icon: LogoutIcon },
//   ];

//   const handleNavigation = (link) => navigate(link);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{ bgcolor: "#0f2027" }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={() => setOpen(true)}
//             edge="start"
//             sx={{ marginRight: 5, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             School Management System [Multiple]
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         open={open}
//         onMouseEnter={() => setOpen(true)}
//         onMouseLeave={() => setOpen(false)}
//       >
//         <DrawerHeader>
//           <IconButton onClick={() => setOpen(false)}>
//             {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {navArr.map((navItem, index) => {
//             const IconComp = navItem.icon;
//             return (
//               <ListItem key={index} disablePadding sx={{ display: "block" }}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                     "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
//                   }}
//                   onClick={() => handleNavigation(navItem.link)}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                       color: "#fff",
//                     }}
//                   >
//                     <IconComp />
//                   </ListItemIcon>
//                   <ListItemText primary={navItem.component} sx={{ opacity: open ? 1 : 0, color: "#fff" }} />
//                 </ListItemButton>
//               </ListItem>
//             );
//           })}
//         </List>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }
