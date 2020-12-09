const express = require("express");
const bodyParser = require("body-parser"); //const jsonParser = bodyParser.json();

const router = express.Router();

// Include the route functions
const studentRoute = require("./student-route");
const linkRoute = require("./link-route");
const groupRoute = require("./group-route");

// // Allowed URLs without login
// const allowedUrls = ["/login", "/register"]; 
// // Login middleware
// router.use((req, res, next) => {
//     if ( !req.session.userId && !allowedUrls.includes(req.originalUrl) ) {
//         res.status(403).send({message: "You don't have access here. Please log in"});
//     }else {
//         next();
//     }
//      /// .... TO DO
// });

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

module.exports = router;
