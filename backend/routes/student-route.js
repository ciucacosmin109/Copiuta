const bcrypt = require("bcrypt");
const { Op } = require("sequelize/types");
const { database, models } = require("../database");
 
const getAllStudentsByGroupId = async (req, res) => {
    try {
        const studXGroup = await models.StudentXGroup.findAll({
            where: {GroupId: req.params.groupId},
            attributes: ['StudentId']
        })
 
        const studs = await models.Student.findAll({
            where:{
                id: {[Op.or]: studXGroup.map(x => x.StudentId)}
            }
        });
    
        res.status(200).send({result: studs});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

const getAllStudents = async (req, res) => {
    try {
        const studs = await models.Student.findAll();
    
        res.status(200).send({result: studs});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};
const getStudent = async (req, res) => {
    try { 
        const stud = await models.Student.findOne({
          where: { id: req.params.id },
        });
    
        res.status(200).send({result: stud});
    
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};
const addStudent = async (req, res) => {
    try{ 
        const student = req.body;
        if (!student.firstName || !student.lastName || !student.email || !student.password){
            res.status(400).send({
                message: "Invalid student"
            });
            return;
        } 
        if (await models.Student.findOne({ where: { email: student.email } })){ 
            res.status(400).send({
                message: "The student with this email already exists"
            });
            return;
        }
        
        student.password = await bcrypt.hash(student.password , bcrypt.genSaltSync(5));

        const result = await models.Student.create(student);
        if (result) {
            res.status(201).send({
                message: "Student created successfully",
                newId: result.id,
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
const updateStudent = async (req, res) => {
    try{ 
        const student = req.body;  

        // o sa validez si o parola a.i. doar userul sa poata sa-si actualizeze contul
        
        if(student.password){
            student.password = await bcrypt.hash(student.password , bcrypt.genSaltSync(5));
        }

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
const deleteStudent = async (req, res) => {  
    try {
    
        // o sa validez si o parola a.i. doar userul sa poata sa-si actualizeze contul

        const result = await models.Student.destroy({
            where: { id: req.params.id }
        });
        if(result){
            res.status(200).send({ message: "The link was deleted"});
        }else {
            res.status(400).send({ message: "Error while deleting the link" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { getAllStudentsByGroupId, getAllStudents, getStudent, addStudent, updateStudent, deleteStudent };
