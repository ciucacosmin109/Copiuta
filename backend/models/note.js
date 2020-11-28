module.exports = (database, dataTypes) => {
    return database.define('Note',{
        id:{
            allowNull:false,
            type:dataTypes.UUID,
            defaultValue:dataTypes.UUIDV4,
            primaryKey:true
        },
        title:{
            allowNull:false,
            type:dataTypes.STRING
        },
        content:{ 
            type:dataTypes.TEXT
        } 
    });
}; 