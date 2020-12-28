import axios, { getRequestError } from './Axios' 

const getAllNotesByCourseId = async (studId) => { 
    try{
        const res = await axios.get('/course/note/' + studId);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};
const getAllNotesByGroupId = async (groupId) => { 
    try{
        const res = await axios.get('/group/note/' + groupId);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const getNote = async (id) => {
    try{
        const res = await axios.get('/note/get/' + id);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const addNote = async (courseId, note) => {
    try{
        const res = await axios.post('/note/add/' + courseId, note);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const updateNote = async (id, note) => {
    try{
        const res = await axios.put('/note/update/' + id, note);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const deleteNote = async (id) => {
    try{
        const res = await axios.put('/note/delete/' + id);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
}; 

const Notes = {getAllNotesByCourseId, getAllNotesByGroupId, getNote, addNote, updateNote, deleteNote};
export default Notes;