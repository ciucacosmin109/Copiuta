import axios from 'axios'
import config from '../config.json' 
 
const axiosInstance = axios.create({
    withCredentials: true,
    timeout: 20000,
    baseURL: config.backendAddress
});

export default axiosInstance;