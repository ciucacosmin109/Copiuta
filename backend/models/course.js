const sequelize = require('sequelize');
const database = require('../database');

const Student = require('./student');

const Course = database.define('Course',{
    CourseId:{
        allowNull:false,
        type:sequelize.UUID,
        defaultValue:sequelize.UUIDV4,
        primaryKey:true
    },
    StudentId:{
        allowNull:false,
        type:sequelize.UUID,
        references:{
            model: Student,
            key: 'StudentId'
        }
    },
    Name:{
        allowNull:false,
        type:sequelize.STRING
    },
    Description:{
        allowNull:false,
        type:sequelize.TEXT
    } 
});

module.exports = Course;