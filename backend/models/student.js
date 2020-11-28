module.exports = (database, dataTypes) => {
    return database.define('Student',{
        id:{
            allowNull:false,
            type:dataTypes.UUID,
            defaultValue:dataTypes.UUIDV4,
            primaryKey:true
        },
        firstName:{
            allowNull:false,
            type:dataTypes.STRING
        },
        lastName:{
            allowNull:false,
            type:dataTypes.STRING
        }, 
        email:{
            allowNull:false,
            type:dataTypes.STRING,
            validate: {
                isEmail: true
            }
        }
    });
};
 