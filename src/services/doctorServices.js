import axios from '../axios';

export const getAllDoctor = () => {
    return axios.get(`/api/v1/get-all-doctor`);
};

export const SaveDetailDoctors = (data) => {
    return axios.post(`/api/v1/save-info-doctor`, data);
};
