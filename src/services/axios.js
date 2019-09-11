import axios from 'axios';
import config from 'config/config';

const baseURL = config.serverBaseUrl;

const axiosInstance = axios.create({baseURL});

export default axiosInstance;
