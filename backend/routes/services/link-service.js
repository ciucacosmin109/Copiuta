const { database, models } = require('../../database');
 
const getAll = async noteId => { 
    const links = await models.Link.findAll({
        where: { NoteId: noteId }
    });
    return links; 
};
const get = async id => { 

};
const add = async link => { 

};
const update = async link => { 

};
const deleteWithId = async id => { 

};

module.exports = { getAll, get, add, update, deleteWithId };