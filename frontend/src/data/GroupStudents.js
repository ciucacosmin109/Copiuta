import axios, { getRequestError } from './Axios'

const addStudentToGroup = async (studId, groupId) => {
    try {
        const res = await axios.post('/studentXgroup/add', {
            StudentId: studId,
            GroupId: groupId
        });
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const removeStudentFromGroup = async (studId, groupId) => {
    try {
        const res = await axios.post('/studentXgroup/remove', {
            StudentId: studId,
            GroupId: groupId
        });
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const removeStudentFromAllGroups = async (studId) => {
    try {
        const res = await axios.delete('/studentXgroup/removeFromAll/' + studId);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const removeAllStudentsFromGroup = async (groupId) => {
    try {
        const res = await axios.delete('/studentXgroup/removeAllFromGroup/' + groupId);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const GroupStudents = { addStudentToGroup, removeStudentFromGroup, removeAllStudentsFromGroup, removeStudentFromAllGroups };
export default GroupStudents;