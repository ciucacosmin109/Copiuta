const StudentSetup = require('./student');
const CourseSetup = require('./course');
const NoteSetup = require('./note');
const GroupSetup = require('./group');
const StudentXGroupSetup = require('./studentXgroup');
const GroupXNoteSetup = require('./groupXnote');
const LinkSetup = require('./link');
const TagSetup = require('./tag');

module.exports = (database, dataTypes) => {
    // Definire de obiecte
    const Student = StudentSetup(database, dataTypes);
    const Course = CourseSetup(database, dataTypes);
    const Note = NoteSetup(database, dataTypes);
    const Group = GroupSetup(database, dataTypes);
    const StudentXGroup = StudentXGroupSetup(database, dataTypes);
    const GroupXNote = GroupXNoteSetup(database, dataTypes);
    const Link = LinkSetup(database, dataTypes);
    const Tag = TagSetup(database, dataTypes); 
 
    // ====== Definire relatii intre tabele ======= 
    // Student - Course
    Student.hasMany(Course);
    Course.belongsTo(Student);
    
    // Course - Note
    Course.hasMany(Note);
    Note.belongsTo(Course);
    
    // Note - Group
    Note.belongsToMany(Group,{through: GroupXNote});
    Group.belongsToMany(Note,{through: GroupXNote});

    // Student - Group
    Student.belongsToMany(Group,{through: StudentXGroup });
    Group.belongsToMany(Student,{through: StudentXGroup }); 

    // Note - Link&Tag
    Note.hasMany(Link);
    Link.belongsTo(Note); 
    Note.hasMany(Tag);
    Tag.belongsTo(Note); 

    return { 
        Student, 
        Course, 
        Note, 
        Group, 
        StudentXGroup, 
        GroupXNote, 
        Link, 
        Tag 
    };
};
