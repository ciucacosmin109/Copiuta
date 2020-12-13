const { Op } = require("sequelize");
const { models } = require("../database");
 
const addNoteToGroup = async (req, res) => {
    try{
        let gn = req.body; 
        const result = await models.GroupXNote.create(gn); 
        if (result) {
          res.status(201).send({ 
            message: "The note was shared to the group", 
            newId: result.id
          });
        }else {
          res.status(400).send({ message: "Error while sharing the note to the group" });
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
}; 
const removeNoteFromGroup = async (req, res) => {
    try{ 
        let gn = req.body; 
        const result = await models.GroupXNote.destroy({
            where: {
                [Op.and]: [
                    { NoteId: gn.NoteId },
                    { GroupId: gn.GroupId }
                ]
            }
        });
        if(result){
            res.status(200).send({ message: "The shared note was removed from the group"});
        }else {
            res.status(400).send({ message: "Error while removing the shared note from the group" });
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
};

module.exports = { addNoteToGroup, removeNoteFromGroup };
