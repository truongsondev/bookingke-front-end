import axios from '../axios';

export const CreateDataClinic = (data) => {
    return axios.post('api/v1/create-new-clinic', data);
};

export const getLimitAllClinic = (limit) => {
    return axios.get(`/api/v1/get-limit-all-clinic?limit=${limit}`);
};

export const getDetailClinicSevices = ({ id }) => {
    return axios.get(`/api/v1/get-details-clinic-by-id?id=${id}`);
};

export const EditSaveClinic = (data) => {
    return axios.post(`/api/v1/save-clinic-edit`, data);
};
