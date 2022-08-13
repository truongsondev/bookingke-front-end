import axios from '../axios';

export const CreateNewSite = (data) => {
    return axios.post('/api/v1/create-site', data);
};

export const GettAllSite = (type) => {
    return axios.get(`/api/v1/get-all-site?type=${type}`);
};

export const getDetaiSiteByID = ({ id, type }) => {
    return axios.get(`/api/v1/get-details-site-by-id?id=${id}&type=${type}`);
};
