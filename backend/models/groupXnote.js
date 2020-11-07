const sequelize = require('sequelize'); 
const database = require('../database');

const Note = require('./note');
const Group = require('./group');
 
const GroupXNote=database.define('GroupXNote',{
    GroupXNoteId:{
        allowNull:false,
        type:sequelize.UUID,
        defaultValue:sequelize.UUIDV4,
        primaryKey:true
    },
    GroupId:{
        allowNull:false,
        type:sequelize.UUID,
        references:{
            model:Group,
            key:'GroupId'
        }
    },
    NoteId:{
        allowNull:false,
        type:sequelize.UUID,
        references:{
            model:Note,
            key:'NoteId'
        }
    }
}, {
        freezeTableName: true
});

module.exports = GroupXNote;