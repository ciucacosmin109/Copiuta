const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { database, models } = require("../database");

const getAllStudentsByGroupId = async (req, res) => {
    try {
        const studXGroup = await models.StudentXGroup.findAll({
            where: { GroupId: req.params.groupId }
        })

        let studs = await models.Student.findAll({
            where: {
                id: { [Op.in]: studXGroup.map(x => x.StudentId) }
            },
        });
        studs = studs.map(el => el.get({ plain: true }));

        for (let i = 0; i < studs.length; i++) {
            const rel = studXGroup.find(x => x.StudentId === studs[i].id);
            studs[i].isAdmin = (rel && rel.isAdmin) ? true : false;
        }

        res.status(200).send({ result: studs });
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const studs = await models.Student.findAll();
        res.status(200).send({ result: studs });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const getStudent = async (req, res) => {
    try {
        const stud = await models.Student.findOne({
            where: { id: req.params.id },
        });
        res.status(200).send({ result: stud });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const addStudent = async (req, res) => {
    try {
        const student = req.body;
        if (!student.firstName || !student.lastName || !student.email || !student.password) {
            res.status(400).send({
                message: "Invalid student"
            });
            return;
        }
        if (await models.Student.findOne({ where: { email: student.email } })) {
            res.status(400).send({
                message: "The student with this email already exists"
            });
            return;
        }

        student.password = await bcrypt.hash(student.password, bcrypt.genSaltSync(5));

        const result = await models.Student.create(student);
        if (result) {
            // Auto login
            req.session.studId = result.id;
            res.cookie('isLoggedIn', {}, { httpOnly: false });

            // Send request
            res.status(201).send({
                message: "Student created successfully",
                newId: result.id,
                studId: result.id
            });
        } else {
            res.status(400).send({
                message: "Error while trying to create the student"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
const updateStudent = async (req, res) => {
    try {
        const student = req.body;
        student.id = req.params.id;

        // Validare
        if (req.params.id !== req.session.studId) {
            res.status(400).send({
                message: "You are not logged in as the student you are trying to update"
            });
        }

        if (student.password && student.password !== 'external') {
            student.password = await bcrypt.hash(student.password, bcrypt.genSaltSync(5));
        }

        const result = await models.Student.update(student, {
            where: { id: req.params.id }
        });
        if (result) {
            res.status(200).send({
                message: "Student updated successfully"
            });
        } else {
            res.status(400).send({
                message: "Error while trying to update the student"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
const deleteStudent = async (req, res) => {
    try {
        // Validare
        if (req.params.id !== req.session.studId) {
            res.status(400).send({
                message: "You are not logged in as the student you are trying to delete"
            });
        }

        let attachedCourses = await models.Course.findAll({
            where: { StudentId: req.params.id },
            attributes: ['id']
        });
        // Sterge toate cursurile atasate
        for (let i = 0; i < attachedCourses.length; i++) {
            let attachedNotes = await models.Note.findAll({
                where: { CourseId: attachedCourses[i].id },
                attributes: ['id']
            });
            // Sterge toate notitele atasate
            for (let j = 0; j < attachedNotes.length; j++) {
                await models.Tag.destroy({
                    where: { NoteId: attachedNotes[j].id }
                });
                await models.Link.destroy({
                    where: { NoteId: attachedNotes[j].id }
                });
                await models.GroupXNote.destroy({
                    where: { NoteId: attachedNotes[j].id }
                });
            }

            await models.Note.destroy({
                where: { CourseId: attachedCourses[i].id }
            });
        }
        await models.Course.destroy({
            where: { StudentId: req.params.id }
        });

        // Sterge studentul
        const result = await models.Student.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.status(200).send({ message: "The student was deleted" });
        } else {
            res.status(400).send({ message: "Error while deleting the student" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { getAllStudentsByGroupId, getAllStudents, getStudent, addStudent, updateStudent, deleteStudent };
