const { database, models } = require("../../database");

const getAllLinks = async (req, res) => {
  try {
    // console.log({
    //     headers: req.headers, // autentificare ?
    //     params: req.params, // parametrii cu : din rute (:id de exemplu)
    //     query: req.query, // parametrii aia din URL cu ? si &
    //     body: req.body // body - obiecte json
    // });
    const links = await models.Link.findAll({
      where: { NoteId: noteId },
    });

    res.status(200).send(links);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getLink = async (req, res) => {};
const addLink = async (req, res) => {};
const updateLink = async (req, res) => {};
const deleteLink = async (req, res) => {};

module.exports = { getAllLinks, getLink, addLink, updateLink, deleteLink };
