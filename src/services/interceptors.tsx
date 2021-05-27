import axios from 'axios';
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
  }, (error) => {
    return Promise.reject(error);
});

export default axiosApiInstance;