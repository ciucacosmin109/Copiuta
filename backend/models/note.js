const sequelize = require('sequelize');
const database = require('../database');

const Course = require('./course');

const Note = database.define('Note',{
    NoteId:{
        allowNull:false,
        type:sequelize.UUID,
        defaultValue:sequelize.UUIDV4,
        primaryKey:true
    },
    CourseId:{
        allowNull:false,
        type:sequelize.UUID,
        references:{
            model:Course,
            key:'CourseId'
        }
    },
    Title:{
        allowNull:false,
        type:sequelize.STRING
    },
    Content:{
        allowNull:true,
        type:sequelize.TEXT
    } 
});

module.exports = Note;