const { models } = require("../database");

const getAllTags = async (req, res) => {
  try { 
    const tags = await models.Tag.findAll({
        where: { NoteId: req.params.noteId },
    });

    if(tags && tags.length > 0){
      res.status(200).send({ result: tags });
    }else{
      res.status(404).send({ message: "Not found" });
    }

  }catch (err) {
    res.status(500).send({message: err.message});
  }
};

const getTag = async (req, res) => {
  try { 
    const tag = await models.Tag.findOne({
      where: { id: req.params.id },
    });

    if(tag){
      res.status(200).send({ result: tag });
    }else{
      res.status(404).send({ message: "Not found" });
    }

  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

const addTag = async (req, res) => { 
  try { 
    let tag = req.body;
    tag.NoteId = req.params.noteId;

    const result = await models.Tag.create(tag);  
    if (result) {
      res.status(201).send({ 
        message: "The Tag was created", 
        newId: result.id
      });

    }else {
      res.status(400).send({ message: "Error while creating the Tag" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateTag = async (req, res) => {
  try { 
    let tag = req.body;
    const result = await models.Tag.update(tag, {
      where: { id: req.params.id }
    });
    
    if (result) {
      res.status(200).send({ message: "The Tag was updated"});
    }else {
      res.status(400).send({ message: "Error while updating the Tag" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteTag = async (req, res) => {
  try {
 
    const resultTag = await models.tag.destroy({
      where: { id: req.params.id }
    })
    
    if(resultTag){
      res.status(200).send({ message: "The Tag was deleted"});
    }else {
      res.status(400).send({ message: "Error while deleting the Tag" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getAllTags, getTag, addTag, updateTag, deleteTag };
