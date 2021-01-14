import axios, { getRequestError } from './Axios' 
 
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
        return getRequestError(err);
    } 
  
}; 
const googleLogin = async tokenId => {
    try{
        const res = await axios.post('/google/login', {  
            tokenId: tokenId 
        }); 
        return { 
            ok: true, 
            message: "Successfully logged in using google", 
            studId: res.data.studId 
        } 
    }catch(err){  
        return getRequestError(err);
    } 
  
}; 
const logout = async () => {
    try{
        const res = await axios.post('/logout', {});  
        return { ok: true, message: res.data.message } 
    }catch(err){  
        return getRequestError(err);
    } 
}; 
const register = async (firstName, lastName, email, password) => {
    try{
        const res = await axios.post('/register', { 
            firstName: firstName,
            lastName: lastName, 
            email: email,
            password: password
        }); 
        return { ok: true, message: res.data.message } 
    }catch(err){  
        return getRequestError(err);
    } 
}; 

const getCurrentLoggedIn = async () => { 
    try{
        const res = await axios.get('/isLoggedIn');   
        return { 
            ok: res.data.result, 
            stud: res.data.stud 
        } 
    }catch(err){   
        return getRequestError(err);
    } 
}

const isLoggedIn = () => {
    return document.cookie.includes("isLoggedIn");
}  
const Login = {login, googleLogin, logout, register, getCurrentLoggedIn, isLoggedIn};
export default Login;