const sequelize = require('sequelize');
const database = require('../database'); 
  
const Group = database.define('Group',{
    GroupId:{
        allowNull:false,
        type:sequelize.UUID,
        defaultValue:sequelize.UUIDV4,
        primaryKey:true
    },
    Name:
    {
        allowNull:false,
        type:sequelize.STRING
    },
    Description:{
        allowNull:false,
        type:sequelize.TEXT
    } 
})

module.exports = Group;