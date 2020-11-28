module.exports = (database, dataTypes) => {
    return database.define('Link',{
        id:{
            allowNull:false,
            primaryKey:true,
            type:dataTypes.UUID,
            defaultValue:dataTypes.UUIDV4
        },
        name:{ 
            type:dataTypes.STRING
        },
        url:{
            allowNull:false, 
            type:dataTypes.STRING
        } 
    }); 
}; 