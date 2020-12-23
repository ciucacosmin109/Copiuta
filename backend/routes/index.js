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
const noteRoute = require("./note-route");
const studentXgroupRoute = require("./studentXgroup-route");
const groupXnoteRoute = require("./groupXnote-route");

// Login middleware and routes
router.use(loginRoute.loginChecker);
router.post("/api/login", loginRoute.login);
router.post("/api/logout", loginRoute.logout);
router.post("/api/register", studentRoute.addStudent);
router.get("/api/isLoggedIn", loginRoute.isLoggedIn);

// ================== Define the routes ===================
// Student
router.get("/api/group/student/getAll/:groupId", studentRoute.getAllStudentsByGroupId);//

router.get("/api/student/getAll", studentRoute.getAllStudents);
router.get("/api/student/get/:id", studentRoute.getStudent);
router.post("/api/student/add", studentRoute.addStudent);
router.put("/api/student/update/:id", studentRoute.updateStudent);
router.delete("/api/student/delete/:id", studentRoute.deleteStudent);//

// Course
router.get("/api/course/getAll/:studentId", courseRoute.getAllCourses);
router.get("/api/course/get/:id", courseRoute.getCourse); 
router.post("/api/course/add/:studentId", courseRoute.addCourse);
router.put("/api/course/update/:id", courseRoute.updateCourse);
router.delete("/api/course/delete/:id", courseRoute.deleteCourse);//

// Note 
router.get("/api/course/note/getAll/:courseId", noteRoute.getAllNotesByCourseId);
router.get("/api/group/note/getAll/:groupId", noteRoute.getAllNotesByGroupId);//

router.get("/api/note/get/:id", noteRoute.getNote);
router.post("/api/note/add/:courseId", noteRoute.addNote);
router.put("/api/note/update/:id", noteRoute.updateNote);  
router.delete("/api/note/delete/:id", noteRoute.deleteNote);//

// Links & Tags
router.get("/api/link/getAll/:noteId", linkRoute.getAllLinks); 
router.get("/api/link/get/:id", linkRoute.getLink);
router.post("/api/link/add/:noteId", linkRoute.addLink); 
router.put("/api/link/update/:id", linkRoute.updateLink);
router.delete("/api/link/delete/:id", linkRoute.deleteLink);

router.get("/api/tag/getAll/:noteId", tagRoute.getAllTags);
router.get("/api/tag/get/:id", tagRoute.getTag);
router.post("/api/tag/add/:noteId", tagRoute.addTag);
router.put("/api/tag/update/:id", tagRoute.updateTag);
router.delete("/api/tag/delete/:id", tagRoute.deleteTag);

// Group
router.get("/api/student/group/getAll/:studentId", groupRoute.getAllGroupsByStudentId);
router.get("/api/note/group/getAll/:noteId", groupRoute.getAllGroupsByNoteId);
 
router.get("/api/group/get/:id", groupRoute.getGroup);
router.post("/api/group/add/:adminId", groupRoute.addGroup);  //.....
router.put("/api/group/update/:id", groupRoute.updateGroup);
router.delete("/api/group/delete/:id", groupRoute.deleteGroup);

// Group - Pentru a adauga stud la grupui sau pt a da share la notite in grupuri
router.post("/api/studentXgroup/add", studentXgroupRoute.addStudentToGroup); 
router.put("/api/studentXgroup/modify", studentXgroupRoute.modifyStudentOfGroup); 
router.delete("/api/studentXgroup/remove", studentXgroupRoute.removeStudentFromGroup); 

router.post("/api/groupXnote/add", groupXnoteRoute.addNoteToGroup); 
router.delete("/api/groupXnote/remove", groupXnoteRoute.removeNoteFromGroup); 


module.exports = router;
