const express = require("express");
const bodyParser = require("body-parser"); //const jsonParser = bodyParser.json();

const router = express.Router();

// Include the route functions
const loginRoute = require("./login-route");
const studentRoute = require("./student-route");
const linkRoute = require("./link-route");
const groupRoute = require("./group-route");
const courseRoute = require("./course-route");
const tagRoute = require("./tag-route");

// Login middleware and routes
router.use(loginRoute.loginChecker); 
router.post("/api/login", loginRoute.login);
router.post("/api/logout", loginRoute.logout);
router.post("/api/register", studentRoute.addStudent);

// Define the routes
router.get("/api/student/getAll", studentRoute.getAllStudents);
router.get("/api/student/get/:id", studentRoute.getStudent);
router.post("/api/student/add", studentRoute.addStudent);
router.put("/api/student/update/:id", studentRoute.updateStudent);
router.delete("/api/student/delete/:id", studentRoute.deleteStudent);

router.get("/api/link/getAll", linkRoute.getAllLinks); // ....
router.get("/api/link/get/:id", linkRoute.getLink);
router.post("/api/link/add", linkRoute.addLink); // ....
router.put("/api/link/update/:id", linkRoute.updateLink);
router.delete("/api/link/delete/:id", linkRoute.deleteLink);

router.get("/api/group/getAll", groupRoute.getAllGroups);
router.get("/api/group/get/:id", groupRoute.getGroup);
router.post("/api/group/add", groupRoute.addGroup);
router.put("/api/group/update/:id", groupRoute.updateGroup);
router.delete("/api/group/delete/:id", groupRoute.deleteGroup);

router.get("/api/course/getAll", courseRoute.getAllCourses);
router.get("/api/course/get/:id", courseRoute.getCourse);
router.get("/api/course/notes", courseRoute.getCourseWithNotes);
router.post("/api/course/add", courseRoute.addCourse);
router.put("/api/course/update/:id", courseRoute.updateCourse);
router.delete("/api/course/delete/:id", courseRoute.deleteCourse);

router.get("/api/tag/getAll", tagRoute.getAllTags);
router.get("/api/tag/get/:id", tagRoute.getTag);
router.post("/api/tag/add", tagRoute.addTag);
router.put("/api/tag/update/:id", tagRoute.updateTag);
router.delete("/api/tag/delete/:id", tagRoute.deleteTag);

module.exports = router;
