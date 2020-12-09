const express = require("express");
const bodyParser = require("body-parser"); //const jsonParser = bodyParser.json();

const router = express.Router();

// Include the route functions
const linkRoute = require("./link-route");
const groupRoute = require("./group-route");

// Define the routes
router.get("/api/link/getAll/:noteId", linkRoute.getAllLinks);
router.get("/api/link/get/:id", linkRoute.getLink);
router.post("/api/link/add/:noteId", linkRoute.addLink);
router.put("/api/link/edit/:id", linkRoute.updateLink);
router.delete("/api/link/delete/:id", linkRoute.deleteLink);

router.get("/api/group/getAll", groupRoute.getAllGroups);
router.get("/api/group/get/:id", groupRoute.getGroup);
router.post("/api/group/add", groupRoute.addGroup);
router.put("/api/group/edit/:id", groupRoute.updateGroup);
router.delete("/api/group/delete/:id", groupRoute.deleteGroup);

module.exports = router;
