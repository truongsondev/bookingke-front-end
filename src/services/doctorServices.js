import axios from '../axios';

export const getAllDoctor = () => {
    return axios.get(`/api/v1/get-all-doctor`);
};

export const SaveDetailDoctors = (data) => {
    return axios.post(`/api/v1/save-info-doctor`, data);
};

export const GetDetailDoctor = (id) => {
    return axios.get(`/api/v1/get-info-doctor?id=${id}`);
};
