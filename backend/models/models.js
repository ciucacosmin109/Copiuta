const Student = require('./student');
const Course = require('./course');
const Note = require('./note');
const Group = require('./group');
const StudentXGroup = require('./studentXgroup');
const GroupXNote = require('./groupXnote');
const Link = require('./link');
const Tag = require('./tag');

//Definire relatii intre tabele
Student.hasMany(Course);
Course.belongsTo(Student);
  
Course.hasMany(Note);
Note.belongsTo(Course);
 
Note.belongsToMany(Group,{through: GroupXNote});
Group.belongsToMany(Note,{through: GroupXNote});

Student.belongsToMany(Group,{through: StudentXGroup });
Group.belongsToMany(Student,{through: StudentXGroup });

Note.hasMany(Link);
Link.belongsTo(Note);

Note.hasMany(Tag);
Tag.belongsTo(Note);

module.exports = {
    Student,
    Course,
    Note,
    Group,
    StudentXGroup,
    GroupXNote,
    Link,
    Tag
};