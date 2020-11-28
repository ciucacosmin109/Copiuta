module.exports = (database, dataTypes) => {
    return database.define('GroupXNote',{
        id:{
            allowNull:false,
            type:dataTypes.UUID,
            defaultValue:dataTypes.UUIDV4,
            primaryKey:true
        } 
    }, {
        freezeTableName: true
    });
}; 