import axios, { getRequestError } from './Axios' 

const getAllGroupsByStudentId = async (studId) => { 
    try{
        const res = await axios.get('/student/group/getAll/' + studId);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};
const getAllGroupsByNoteId = async (noteId) => { 
    try{
        const res = await axios.get('/note/group/getAll/' + noteId);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const getGroup = async (id) => {
    try{
        const res = await axios.get('/group/get/' + id);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const addGroup = async (adminId, group) => {
    try{
        const res = await axios.post('/group/add/' + adminId, group);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const updateGroup = async (id, group) => {
    try{
        const res = await axios.put('/group/update/' + id, group);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const deleteGroup = async (id) => {
    try{
        const res = await axios.delete('/group/delete/' + id);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
}; 

const Groups = {getAllGroupsByStudentId, getAllGroupsByNoteId, getGroup, addGroup, updateGroup, deleteGroup};
export default Groups;