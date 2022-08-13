import axios from '../axios';

export const CreateNewSpeciatly = (data) => {
    return axios.post('/api/v1/create-specialty-booking', data);
};

export const getAllSpeciatlySevices = (limit) => {
    return axios.get(`/api/v1/get-limit-all-speciatly?limit=${limit}`);
};

export const getDetailSpeciatlySevices = ({ id, location }) => {
    return axios.get(`/api/v1/get-details-speciatly-by-id?id=${id}&location=${location}`);
};
