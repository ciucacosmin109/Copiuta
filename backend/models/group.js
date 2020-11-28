module.exports = (database, dataTypes) => {
    return database.define('Group',{
        id:{
            allowNull:false,
            type:dataTypes.UUID,
            defaultValue:dataTypes.UUIDV4,
            primaryKey:true
        },
        name:
        {
            allowNull:false,
            type:dataTypes.STRING
        },
        description:{
            allowNull:false,
            type:dataTypes.TEXT
        } 
    });
}; 