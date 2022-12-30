import axios from 'axios';
import config from 'config/config';

const baseURL = config.serverBaseUrl;

const axiosInstance = axios.create({baseURL});

axiosInstance.interceptors.request.use((config) => {
    // use config.params if it has been set
    config.params = config.params || {};
    // add any client instance specific params to config
    config.params.apikey = 'EDdXtDmCV9wLQuMdmjTSIZ631II20pMYldSAgfss';
    return config;
});

export default axiosInstance;
