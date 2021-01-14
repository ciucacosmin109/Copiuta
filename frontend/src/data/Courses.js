import axios, { getRequestError } from './Axios' 

const getAllCoursesByStudentId = async (studId) => { 
    try{
        const res = await axios.get('/student/course/getAll/' + studId);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
}; 

const getCourse = async (id) => {
    try{
        const res = await axios.get('/course/get/' + id);  
        return { ok: true, result: res.data.result} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const addCourse = async (studentId, course) => {
    try{
        const res = await axios.post('/course/add/' + studentId, course);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const updateCourse = async (id, course) => {
    try{
        const res = await axios.put('/course/update/' + id, course);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
};

const deleteCourse = async (id) => {
    try{
        const res = await axios.delete('/course/delete/' + id);  
        return { ok: true, message: res.data.message} 
    }catch(err){   
        return getRequestError(err);
    }  
}; 

const Courses = {getAllCoursesByStudentId, getCourse, addCourse, updateCourse, deleteCourse};
export default Courses;