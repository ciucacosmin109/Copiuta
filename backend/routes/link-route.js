const { database, models } = require("../database");

// console.log({
//     headers: req.headers, // autentificare ?
//     params: req.params, // parametrii cu : din rute (:id de exemplu)
//     query: req.query, // parametrii aia din URL cu ? si &
//     body: req.body // body - obiecte json
// });

const getAllLinks = async (req, res) => {
  try {
    const links = await models.Link.findAll({
      where: { NoteId: req.params.noteId },
    });

    res.status(200).send({result: links});
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};
const getLink = async (req, res) => {
  try { 
    const link = await models.Link.findOne({
      where: { id: req.params.id },
    });

    res.status(200).send({result: link});
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};
const addLink = async (req, res) => { 
  try { 
    let link = req.body;
    link.NoteId = req.params.noteId;
    const result = await models.Link.create(link); 
    if (result) {
      res.status(201).send({ 
        message: "The link was created", 
        newId: result.id
      });
    }else {
      res.status(400).send({ message: "Error while creating the link" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const updateLink = async (req, res) => {
  try { 
    let link = req.body;
    const result = await models.Link.update(link, {
      where: { id: req.params.id }
    });
    if (result) {
      res.status(201).send({ message: "The link was updated"});
    }else {
      res.status(400).send({ message: "Error while updating the link" });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteLink = async (req, res) => {
  try {
    const result = await models.Link.destroy({
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

module.exports = { getAllLinks, getLink, addLink, updateLink, deleteLink };
