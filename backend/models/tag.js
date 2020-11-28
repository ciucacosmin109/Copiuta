module.exports = (database, dataTypes) => {
    return database.define('Tag',{
        id:{
            allowNull:false,
            primaryKey:true,
            type:dataTypes.UUID,
            defaultValue:dataTypes.UUIDV4
        },
        name:{
            allowNull:false,
            type:dataTypes.STRING
        } 
    });
}; 