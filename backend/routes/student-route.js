const bcrypt = require("bcrypt");
const { database, models } = require("../database");

const getAllStudents = async (req, res) => {};
const getStudent = async (req, res) => {};
const addStudent = async (req, res) => {
    const student = req.body;
    try{ 
        if (!student.firstName || !student.lastName || !student.email || !student.password){
            res.status(400).send({
                message: "Invalid student"
            });
            return;
        } 
        if (await models.Student.findOne({ where: { email: student.email } })){ 
            res.status(400).send({
                message: "The student already exists"
            });
            return;
        }
        
        student.password = await bcrypt.hash(student.password , bcrypt.genSaltSync(5));

        const result = await models.Student.create(student);
        if (result) {
            res.status(201).send({
                message: "Student created successfully"
            });
        } else {
            res.status(400).send({
                message: "Error while trying to create the student"
            });
        } 
    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};
const updateStudent = async (req, res) => {};
const deleteStudent = async (req, res) => {};

module.exports = { getAllStudents, getStudent, addStudent, updateStudent, deleteStudent };
