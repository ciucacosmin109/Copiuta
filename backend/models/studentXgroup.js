module.exports = (database, dataTypes) => {
    return database.define('StudentXGroup',{
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