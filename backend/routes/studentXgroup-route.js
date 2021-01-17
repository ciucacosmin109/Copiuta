const { Op } = require("sequelize");
const { models } = require("../database");

const addStudentToGroup = async (req, res) => {
    try {
        let sg = req.body;
        const check = await models.StudentXGroup.findOne({
            where: {
                [Op.and]: [
                    { StudentId: sg.StudentId },
                    { GroupId: sg.GroupId }
                ]
            }
        });
        if (check) {
            res.status(201).send({
                message: "The student is already in the group",
                newId: check.id
            });
            return;
        }

        const result = await models.StudentXGroup.create(sg);
        if (result) {
            res.status(201).send({
                message: "The student was added to the group",
                newId: result.id
            });
        } else {
            res.status(400).send({ message: "Error while adding the student to the group" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const modifyStudentOfGroup = async (req, res) => {
    try {
        let sg = req.body;
        const result = await models.StudentXGroup.update(sg, {
            where: {
                [Op.and]: [
                    { StudentId: sg.StudentId },
                    { GroupId: sg.GroupId }
                ]
            }
        });
        if (result) {
            res.status(201).send({ message: "The student of the group was modified" });
        } else {
            res.status(400).send({ message: "Error while modifying the student of the group" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const removeStudentFromGroup = async (req, res) => {
    try {
        let sg = req.body;

        // Get all courses
        const courses = await models.Course.findAll({
            where: { StudentId: sg.StudentId },
        });
        // Get all notes
        const notes = await models.Note.findAll({
            where: {
                CourseId: { [Op.in]: courses.map(x => x.id) }
            },
        });
        // Remove all shared notes 
        await models.GroupXNote.destroy({
            where: {
                [Op.and]: [
                    { NoteId: { [Op.in]: notes.map(x => x.id) } },
                    { GroupId: sg.GroupId },
                ]
            }
        });

        // Remove student from group
        const result = await models.StudentXGroup.destroy({
            where: {
                [Op.and]: [
                    { StudentId: sg.StudentId },
                    { GroupId: sg.GroupId }
                ]
            }
        });
        if (result) {
            res.status(200).send({ message: "The student was removed from the group" });
        } else {
            res.status(400).send({ message: "Error while removing the student from the group" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const removeAllStudentsFromGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const result = await models.StudentXGroup.destroy({
            where: {
                [Op.and]: [
                    { isAdmin: false },
                    { GroupId: groupId }
                ]
            }
        });
        if (result) {
            res.status(200).send({ message: "The students were removed from the group" });
        } else {
            res.status(400).send({ message: "Error while removing the students from the group" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const removeStudentFromAllGroups = async (req, res) => {
    try {
        const studId = req.params.studId;
        const result = await models.StudentXGroup.destroy({
            where: {
                [Op.and]: [
                    { isAdmin: false },
                    { StudentId: studId }
                ]
            }
        });
        if (result) {
            res.status(200).send({ message: "The student was removed from the groups" });
        } else {
            res.status(400).send({ message: "Error while removing the student from the groups" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { addStudentToGroup, modifyStudentOfGroup, removeStudentFromGroup, removeAllStudentsFromGroup, removeStudentFromAllGroups };
