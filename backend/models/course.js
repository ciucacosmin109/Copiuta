// database e de tip Sequlize
// dataTypes e de tip sequlize
module.exports = (database, dataTypes) => {
    return database.define('Course', {
        id:{
            allowNull:false,
            type:dataTypes.UUID,
            defaultValue:dataTypes.UUIDV4,
            primaryKey:true
        }, 
        name:{
            allowNull:false,
            type:dataTypes.STRING
        },
        description:{ 
            type:dataTypes.TEXT
        } 
    });
};