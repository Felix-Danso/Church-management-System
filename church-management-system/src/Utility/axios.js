import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

const refreshToken = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const refresh = token?.refresh;
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/token/refresh/`,
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
        if (!config.headers['Authorization']) {
            const token =   JSON.parse(localStorage.getItem('token'))
            config.headers['Authorization'] = `Bearer ${token?.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
    (response) => response,

    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refreshToken();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
    },
);
