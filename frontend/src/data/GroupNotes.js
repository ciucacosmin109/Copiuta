import axios, { getRequestError } from './Axios'

const addNoteToGroup = async (noteId, groupId) => {
    try {
        const res = await axios.post('/groupXnote/add', {
            NoteId: noteId,
            GroupId: groupId
        });
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const removeNoteFromGroup = async (noteId, groupId) => {
    try {
        console.log(noteId)
        console.log(groupId)
        const res = await axios.post('/groupXnote/remove', {
            NoteId: noteId,
            GroupId: groupId
        });
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};
const removeNoteFromAllGroups = async (noteId) => {
    try {
        const res = await axios.delete('/groupXnote/removeFromAll/' + noteId);
        return { ok: true, message: res.data.message }
    } catch (err) {
        return getRequestError(err);
    }
};

const GroupNotes = { addNoteToGroup, removeNoteFromGroup, removeNoteFromAllGroups };
export default GroupNotes;