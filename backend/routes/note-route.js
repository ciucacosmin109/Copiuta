const { Op } = require("sequelize");
const { database, models } = require("../database");
//===============Vizualizare notite pentru un curs=================
const getAllNotesByCourseId = async (req, res) => {
  try {
    const notes = await models.Note.findAll({
      where: { CourseId: req.params.courseId },
    });

    res.status(200).send({ result: notes });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//===============Vizualizare notite pentru un grup=================
const getAllNotesByGroupId = async (req, res) => {
  try {
    const groupXNote = await models.GroupXNote.findAll({
      where: { GroupId: req.params.groupId },
      attributes: ['NoteId']
    });

    const notes = await models.Note.findAll({
      where: { 
        id: {[Op.or]: groupXNote.map(x => x.NoteId)}
      },
    });

    res.status(200).send({ result: notes });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//===============Vizualizare notite pentru un id=================
const getNote = async (req, res) => {
  try { 
    const note = await models.Note.findOne({
      where: { id: req.params.id }
    });

    res.status(200).send({ result: note });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//============Adaugare notita pentru un curs==================
const addNote = async (req, res) => {
  try {
    let note = req.body;
    note.CourseId = req.params.courseId;

    const result = await models.Note.create(note); 
    if (result) {
      res.status(201).send({
        message: "The note was successfully created",
        newId: result.id,
      });
    } else {
      res.status(400).send({ message: "Ups,error while creating the note" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//====================Modificare notita=======================
const updateNote = async (req, res) => {
  try {
    const note = req.body;
    const result = await models.Note.update(note, {
      where: { id: req.params.id },
    });

    if (result) {
      res.status(200).send({ message: "The note was successfully updated" });
    } else {
      res.status(400).send({ message: "Ups,error while updating" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};  
//================Stergere notita de la un curs==================
const deleteNote = async (req, res) => {
  try {
    const resultTag = await models.Tag.destroy({
      where: { NoteId: req.params.id },
    });
    const resultLink = await models.Link.destroy({
      where: { NoteId: req.params.id },
    });
    const resultGXN = await models.GroupXNote.destroy({
        where: { NoteId: req.params.id }
    });

    const resultNote = await models.Note.destroy({
      where: { id: req.params.id },
    });

    if (resultNote && resultTag && resultGXN && resultLink) {
      res.status(200).send({ message: "The note was deleted" });
    } else {
      res.status(400).send({ message: "Error while deleting the note" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllNotesByCourseId,
  getAllNotesByGroupId,
  getNote,
  addNote,
  updateNote,  
  deleteNote,
};
