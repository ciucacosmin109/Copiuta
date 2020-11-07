const sequelize = require('sequelize'); 
const database = require('../database');

const Student = require('./student');
const Group = require('./group');

const StudentXGroup = database.define('StudentXGroup',{
    StudentXGroupId:{
        allowNull:false,
        type:sequelize.UUID,
        defaultValue:sequelize.UUIDV4,
        primaryKey:true
    },
    StudentId:{
        allowNull:false,
        type:sequelize.UUID,
        references:{
            model:Student,
            key:'StudentId'
        }
    },
    GroupId:{
        allowNull:false,
        type:sequelize.UUID,
        references:{
            model:Group,
            key:'GroupId'
        }
    } 
}, {
    freezeTableName: true
})

module.exports = StudentXGroup;