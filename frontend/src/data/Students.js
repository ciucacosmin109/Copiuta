import axios, { getRequestError } from './Axios'

const getAllStudents = async () => {
    try {
        const res = await axios.get('/student/getAll');
        return { ok: true, result: res.data.result }
    } catch (err) {
        return getRequestError(err);
    }
};

const getAllStudentsByGroupId = async (groupId) => {
    try {
        const res = await axios.get('/group/student/getAll/' + groupId);
        return { ok: true, result: res.data.result }
    } catch (err) {
        return getRequestError(err);
    }
};

const getStudent = async (id) => {
    try {
        const res = await axios.get('/student/get/' + id);
        return { ok: true, result: res.data.result }
    } catch (err) {
        return getRequestError(err);
    }
};

const addStudent = async (student) => {
    try {
        const res = await axios.post('/student/add', student);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const updateStudent = async (id, student) => {
    try {
        const res = await axios.put('/student/update/' + id, student);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const deleteStudent = async (id) => {
    try {
        const res = await axios.delete('/student/delete/' + id);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const Students = { getAllStudents, getAllStudentsByGroupId, getStudent, addStudent, updateStudent, deleteStudent };
export default Students;