const { database, models } = require("../database");
//===============Vizualizare notite pentru un curs=================
const getAllNotes = async (req, res) => {
  try {
    const notes = await models.Note.findAll({
      where: { CourseId: req.params.courseId },
    });

    res.status(200).send({ result: notes });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//============Adaugare notita pentru un curs==================
const addNote = async (req, res) => {
  try {
    const note = req.body;
    const result = await models.Note.create(note, {
      where: { CourseId: req.params.courseId },
    });

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
      res.status(201).send({ message: "The note was successfully updated" });
    } else {
      res.status(400).send({ message: "Ups,error while updating" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//===================Modificare notita de un curs=================
const updateNoteCourse = async (req, res) => {
  try {
    const note = req.body;
    const result = await models.Note.update(note, {
      where: { CourseId: req.params.courseId },
    });

    if (result) {
      res.status(201).send({ message: "The note was successfully updated" });
    } else {
      res.status(400).send({ message: "Ups,error while updating" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//========Vizualizare tags si links aferente unei notite==============
const getTagsAndLinks = async (req, res) => {
  try {
    const notes = await models.Note.findAll({
      include: [
        {
          model: models.Link,
          attributes: ["name", "url"],
        },
        {
          model: models.Tag,
          attributes: ["id", "name"],
        },
      ],
      where: { id: req.params.id },
    });
    return notes;
  } catch (err) {
    throw new Error(err.message);
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

    const resultNote = await models.Note.destroy({
      where: { id: req.params.id },
    });

    if (resultNote && resultTag && resultLink) {
      res.status(200).send({ message: "The note was deleted" });
    } else {
      res.status(400).send({ message: "Error while deleting the note" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllNotes,
  addNote,
  updateNote,
  updateNoteCourse,
  getTagsAndLinks,
  deleteNote,
};
