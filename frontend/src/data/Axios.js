import axios from 'axios'
import config from '../config.json' 

const axiosInstance = axios.create({
    withCredentials: true,
    timeout: 20000,
    baseURL: config.backendAddress
});
axiosInstance.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger 
    //if(urlAfterLogin && response.config.url === "/login" && response.status === 200 && response.data.studId){
    //  window.location.href = urlAfterLogin;
    //  history.replaceState({cosmin: 123}, "", urlAfterLogin);
    //}
    return response;
  }, 
  error => {
    if(error.response){ 
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if(error.response.status === 403 && error.response.config.url !== "/login"){
        let urlAfterLogin = window.location.pathname;
        
        window.history.pushState({previousUrl: urlAfterLogin}, "", "/login"); 
        window.location.reload();
      }
    }else{
      console.log("!!!!" + error);
      console.log("!!!!" + error.message);
    }
    return Promise.reject(error);
  }
);

const getRequestError = err => {
  if(!err.response){
      return { ok: false, message: `Internal client error: ${err.message}` }
  }else if(err.response.data.message){ 
      return { ok: false, message: `${err.response.data.message}` }
  }else{
      return { ok: false, message: `Internal server error: ${err.response.status}` }
  }
} 
export default axiosInstance; 
export { getRequestError };