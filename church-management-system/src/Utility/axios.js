import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosUploadImage = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'multipart/form-data' },
});

const token = JSON.parse(localStorage.getItem('token'));

const refreshToken = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const refresh = token?.refresh;
    try {
        const response = await axios.post(
            `${BASE_URL}/api/token/refresh/`,
            { refresh },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        );

        token['access'] = response?.data?.access;
        localStorage.setItem('token', JSON.stringify(token));
        return response.data.access;
    } catch (error) {
        localStorage.clear();
        window.location.reload();
    }
};

axiosPrivate.interceptors.request.use(
    (config) => {
        console.log(token)
        if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${token?.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// axiosPrivate.interceptors.response.use(
//     (response) => response,

//     async (error) => {
//         const prevRequest = error?.config;
//         if (error?.response?.status === 401 && !prevRequest?.sent) {
//             prevRequest.sent = true;
//             const newAccessToken = await refreshToken();
//             prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             return axiosPrivate(prevRequest);
//         }
//         return Promise.reject(error);
//     },
// );


// axiosUploadImage.interceptors.request.use(
//     axiosPrivate.interceptors.request.handlers[0].fulfilled,
//     axiosPrivate.interceptors.request.handlers[0].rejected
// );

// axiosUploadImage.interceptors.response.use(
//     axiosPrivate.interceptors.response.handlers[0].fulfilled,
//     axiosPrivate.interceptors.response.handlers[0].rejected
// );