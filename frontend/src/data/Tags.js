import axios, { getRequestError } from './Axios' 

const getAllTags = async (noteId) => { 
    try{
        const res = await axios.get('/tag/getAll/' + noteId);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const getTag = async (id) => {
    try{
        const res = await axios.get('/tag/get/' + id);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};

// etc...

const Tags = {getAllTags, getTag};
export default Tags;