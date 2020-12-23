import axios from 'axios'
import config from '../config.json' 
 
const axiosInstance = axios.create({
    withCredentials: true,
    timeout: 20000,
    baseURL: config.backendAddress
});
axiosInstance.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger 
    return response;
  }, 
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if(error.response.status === 403){
        window.location.href = "/login"; 
    }
    return Promise.reject(error);
  });

export default axiosInstance;