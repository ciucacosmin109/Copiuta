const { models } = require("../database");

const getAllCourses = async (req, res) => {
  try {

    const courses = await models.Course.findAll({
        where: { StudentId: req.params.studentId },
    });

    res.status(200).send({result: courses});

  }catch (err) {
    res.status(500).send({message: err.message});
  }
};

const getCourse = async (req, res) => {
  try { 
    const course = await models.Course.findOne({
      where: { id: req.params.id },
    });

    res.status(200).send({result: course});

  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

const getCourseWithNotes = async (req, res)=> {
  try {
      const courses = await Course.findAll({
          include: 
          [
              {
                  model: Note,
                  attributes: ["name", "id"]
              }
          ]
      });
      return courses;

  } catch (err) {
      throw new Error(err.message);
  }
};

const addCourse = async (req, res) => { 
  try { 
    const course = req.body;
    const result = await models.Course.create(course); 

    if (result) {
      res.status(201).send({ message: "The Course was created", newId: result.id});

    }else {
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
      res.status(201).send({ message: "The Course was updated"});
    }else {
      res.status(400).send({ message: "Error while updating the Course" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {

    const resultNote = await models.note.destroy({
      where: { CourseId: req.params.id }
    })

    const resultCourse = await models.course.destroy({
      where: { id: req.params.id }
    })
    
    if(resultNote && resultCourse){
      res.status(200).send({ message: "The Course was deleted"});
    }else {
      res.status(400).send({ message: "Error while deleting the Course" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getAllCourses, getCourse, getCourseWithNotes, addCourse, updateCourse, deleteCourse };
