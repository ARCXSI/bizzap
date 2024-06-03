import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/'

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        else {
            config.headers.Authorization = ``
        }
        return config
    },
    // (error) => {
    //     return Promise.reject(error)
    // }
)

AxiosInstance.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
    }
)

export default AxiosInstance