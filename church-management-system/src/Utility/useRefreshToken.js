import axios from './axios';

const useRefreshToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    const refresh = async () => {
        const response = await axios.get('api/token/refresh/', JSON.stringify(token?.refresh), {
            headers: { 'Content-Type': 'application/json' },
        });
        token['access'] = response?.data?.access;
        localStorage.setItem('token', token);
        return response.data.access;
    };
    return refresh;
};

export default useRefreshToken;
