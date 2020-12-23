import axios from './Axios' 
 
const login = async (email, password) => {
    try{
        const res = await axios.post('/login', {  
            email: email,
            password: password
        }); 
        return { 
            ok: true, 
            message: "Successfully logged in", 
            studId: res.data.studId 
        } 
    }catch(err){ 
        if(err.response.data.message){
            return { ok: false, message: err.response.data.message }
        }else{
            return { ok: false, message: `Internal server error: ${err.response.status}` }
        }
    } 
  
}; 
const logout = async () => {
    try{
        const res = await axios.post('/logout', {});  
        return { ok: true, message: res.data.message } 
    }catch(err){
        if(err.response.data.message){
            return { ok: false, message: err.response.data.message }
        }else{
            return { ok: false, message: `Internal server error: ${err.response.status}` }
        }
    } 
}; 

const Login = {login, logout};
export default Login;