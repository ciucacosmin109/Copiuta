const sequelize = require('sequelize'); 
const database = require('../database');
   
const Note = require('./note');

const Tag = database.define('Tag',{
    TagId:{
        allowNull:false,
        primaryKey:true,
        type:sequelize.UUID,
        defaultValue:sequelize.UUIDV4
    },
    Name:{
        allowNull:false,
        type:sequelize.STRING
    }, 
    NoteId:{
        allowNull:false,
        type:sequelize.UUID,
        references:{
            model:Note,
            key:'NoteId'
        }
    }
});
  
module.exports = Tag;