import axios, { getRequestError } from './Axios'

const getAllTags = async (noteId) => {
    try {
        const res = await axios.get('/tag/getAll/' + noteId);
        return { ok: true, result: res.data.result }
    } catch (err) {
        return getRequestError(err);
    }
};

const getTag = async (id) => {
    try {
        const res = await axios.get('/tag/get/' + id);
        return { ok: true, result: res.data.result }
    } catch (err) {
        return getRequestError(err);
    }
};

const addTag = async (noteId, tag) => {
    try {
        const res = await axios.post('/tag/add/' + noteId, tag);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const updateTag = async (id, tag) => {
    try {
        const res = await axios.put('/tag/update/' + id, tag);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const deleteTag = async (id) => {
    try {
        const res = await axios.delete('/tag/delete/' + id);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};
const deleteAllTags = async (noteId) => {
    try {
        const res = await axios.delete('/tag/deleteAll/' + noteId);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const Tags = { getAllTags, getTag, addTag, updateTag, deleteTag, deleteAllTags };
export default Tags;