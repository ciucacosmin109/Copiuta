const { Op } = require("sequelize");
const { models } = require("../database");
 
const addStudentToGroup = async (req, res) => {
    try{
        let sg = req.body; 
        const result = await models.StudentXGroup.create(sg); 
        if (result) {
          res.status(201).send({ 
            message: "The student was added to the group", 
            newId: result.id
          });
        }else {
          res.status(400).send({ message: "Error while adding the student to the group" });
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
};
const modifyStudentOfGroup = async (req, res) => {
    try{
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
        }else {
          res.status(400).send({ message: "Error while modifying the student of the group" });
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
};
const removeStudentFromGroup = async (req, res) => { 
    try{ 
        let sg = req.body; 
        const result = await models.StudentXGroup.destroy({
            where: {
                [Op.and]: [
                    { StudentId: sg.StudentId },
                    { GroupId: sg.GroupId }
                ]
            }
        });
        if(result){
            res.status(200).send({ message: "The student was removed from the group"});
        }else {
            res.status(400).send({ message: "Error while removing the student from the group" });
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
};

module.exports = { addStudentToGroup, modifyStudentOfGroup, removeStudentFromGroup };
