// import { useEffect } from 'react';
import axios from '../axios';

export const handleLogin = (email, password) => {
    return axios.post('/api/v1/login', { email, password });
};
