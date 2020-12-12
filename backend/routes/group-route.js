const { database, models } = require("../database");
//=================Vizualizare grupuri========== ||functioneaza
const getAllGroups = async (req, res) => {
  try {
    const group = await models.Group.findAll();

    res.status(200).send({ result: group });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getGroup = async (req, res) => {};
//=================Adauga grup================== ||functioneaza
const addGroup = async (req, res) => {
  const group = req.body;
  if (group.name) {
    const result = await models.Group.create(group);
    if (result) {
      res.status(201).send({
        message: "Grup creat cu succes",
      });
    } else {
      res.status(400).send({
        message: "Ups, eroare la crearea grupului",
      });
    }
  } else {
    res.status(400).send({
      message: "Invalid group.",
    });
  }
};
//================Modificare grup=============== || functioneaza
// primeste ca parametru numele grupului, mi se pare mai util ca Id-ul
const updateGroup = async (req, res) => {
  try {
    let group = req.body;
    const result = await models.Group.update(group, {
      where: { name: req.params.name },
    });
    if (result) {
      res.status(201).send({ message: "Grupul a fost modificat cu succes." });
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
    const result = await models.Group.destroy({
      where: { name: req.params.name },
    });
    if (result) {
      res.status(200).send({ message: "Grupul a fost sters" });
    } else {
      res
        .status(400)
        .send({ message: "Ups, a aparut o eroare la stergerea grupului" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getAllGroups, getGroup, addGroup, updateGroup, deleteGroup };
