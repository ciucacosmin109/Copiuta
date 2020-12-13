const { Op } = require("sequelize");
const { database, models } = require("../database");

//=================Vizualizare grupuri - ale unui student ========== ||functioneaza
const getAllGroupsByStudentId = async (req, res) => {
  try {
    const studXGroup = await models.StudentXGroup.findAll({
        where: {StudentId: req.params.studentId},
        attributes: ['GroupId']
    })
 
    const groups = await models.Group.findAll({
      where:{
          id: {[Op.or]: studXGroup.map(x => x.GroupId)}
      }
    });

    res.status(200).send({ result: groups });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//=================Vizualizare grupuri - ale unei notite ========== ||functioneaza
const getAllGroupsByNoteId = async (req, res) => {
  try {
    const groupXNote = await models.GroupXNote.findAll({
        where: {NoteId: req.params.noteId},
        attributes: ['GroupId']
    })
 
    const groups = await models.Group.findAll({
      where:{
          id: {[Op.or]: groupXNote.map(x => x.GroupId)}
      }
    });
 
    res.status(200).send({ result: groups });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
 
//=================Vizualizare grup dupa id===== ||functioneaza
const getGroup = async (req, res) => {
  try{
    const group = await models.Group.findOne({
      where: { id: req.params.id }
    });

    res.status(200).send({ result: group });
  }catch(err){
    res.status(500).send({message: err.message});
  }
};
//=================Adauga grup================== ||functioneaza
const addGroup = async (req, res) => {
  try{
    const group = req.body; 

    const result = await models.Group.create(group);
    if (result) {
      const resSXG = await models.StudentXGroup.create({
        StudentId: req.params.adminId,
        GroupId: result.id,
        isAdmin: true
      });
      
      if(resSXG){
        res.status(201).send({
          message: "Grup creat cu succes",
          newId: result.id
        });
        return;
      }
    }

    res.status(400).send({ message: "Ups, eroare la crearea grupului" });

  }catch(err){
    res.status(500).send({message: err.message});
  }
};
//================Modificare grup=============== || functioneaza
const updateGroup = async (req, res) => {
  try {
    let group = req.body;
    const result = await models.Group.update(group, {
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).send({ message: "Grupul a fost modificat cu succes." });
    } else {
      res.status(400).send({ message: "Ups, a aparut o eroare" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//===============stergere grup====================== ||functioneaza
const deleteGroup = async (req, res) => {
  try {
    const resSXG = await models.StudentXGroup.destroy({
      where: { GroupId: req.params.id }
    });
    const resGXN = await models.GroupXNote.destroy({
      where: { GroupId: req.params.id }
    });
    const result = await models.Group.destroy({
      where: { id: req.params.id }
    });
    if (resSXG && resGXN && result) {
      res.status(200).send({ message: "Grupul a fost sters" });
    } else {
      res.status(400).send({ message: "Ups, a aparut o eroare la stergerea grupului" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getAllGroupsByStudentId, getAllGroupsByNoteId, getGroup, addGroup, updateGroup, deleteGroup };
