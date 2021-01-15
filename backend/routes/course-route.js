const { models } = require("../database");

const getAllCourses = async (req, res) => {
  try {
    const courses = await models.Course.findAll({
      where: { StudentId: req.params.studentId },
    });

    if (courses && courses.length > 0) {
      res.status(200).send({ result: courses });
    } else {
      res.status(404).send({ message: "Not found" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await models.Course.findOne({
      where: { id: req.params.id },
    });

    if (course) {
      res.status(200).send({ result: course });
    } else {
      res.status(404).send({ message: "Not found" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addCourse = async (req, res) => {
  try {
    let course = req.body;
    course.StudentId = req.params.studentId;

    const result = await models.Course.create(course);
    if (result) {
      res.status(201).send({
        message: "The Course was created",
        newId: result.id
      });

    } else {
      res.status(400).send({ message: "Error while creating the Course" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    let course = req.body;
    const result = await models.Course.update(course, {
      where: { id: req.params.id }
    });

    if (result) {
      res.status(200).send({ message: "The Course was updated" });
    } else {
      res.status(400).send({ message: "Error while updating the Course" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {

    let attachedNotes = await models.Note.findAll({
      where: { CourseId: req.params.id }
    });
    for (let i = 0; i < attachedNotes.length; i++) {
      await models.Tag.destroy({
        where: { NoteId: attachedNotes[i].id }
      });
      await models.Link.destroy({
        where: { NoteId: attachedNotes[i].id }
      });
      await models.GroupXNote.destroy({
        where: { NoteId: attachedNotes[i].id }
      });
    }

    await models.Note.destroy({
      where: { CourseId: req.params.id }
    });
    const resultCourse = await models.Course.destroy({
      where: { id: req.params.id }
    });

    if (resultCourse) {
      res.status(200).send({ message: "The Course was deleted" });
    } else {
      res.status(400).send({ message: "Error while deleting the Course" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getAllCourses, getCourse, addCourse, updateCourse, deleteCourse };
