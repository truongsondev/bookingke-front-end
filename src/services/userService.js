// import { useEffect } from 'react';
import axios from '../axios';

export const handleLogin = (email, password) => {
    return axios.post('/api/v1/login', { email, password });
};

export const getAllUsers = (id) => {
    return axios.get(`/api/v1/get-all-users/?id=${id}`);
};

export const createNewuserData = (state) => {
    return axios.post(`/api/v1/create-new-user`, state);
};

export const deleteUser = (id) => {
    return axios.delete(`/api/v1/delete-user`, {
        data: {
            id,
        },
    });
};
