module.exports = (database, dataTypes) => {
    return database.define('StudentXGroup',{
        id:{
            allowNull:false,
            type:dataTypes.UUID,
            defaultValue:dataTypes.UUIDV4,
            primaryKey:true
        },
        isAdmin:{
            type:dataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });
};