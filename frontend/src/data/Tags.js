import axios from './Axios' 

const getAllTags = async (noteId) => { 
    try{
        const res = await axios.get('/tag/getAll/' + noteId);  
        return { ok: true, result: res.data.result} 
    }catch(err){ 
        console.log(err.response)
        if(true || err.response.data.message){ 
            return { ok: false, message: `$f{err.response.data.message}` }
        }else{
            return { ok: false, message: `Internal server error: $f{err.response.status}` }
        }
    }  
};

const getTag = async (id) => {
    try{
        const res = await axios.get('/tag/get/' + id);  
        return { ok: true, result: res.data.result} 
    }catch(err){ 
        if(err.response.data.message){ 
            return { ok: false, message: `${err.response.data.message}` }
        }else{
            return { ok: false, message: `Internal server error: ${err.response.status}` }
        }
    }  
};

// etc...

const Tags = {getAllTags, getTag};
export default Tags;