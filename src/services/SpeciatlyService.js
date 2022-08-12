import axios from '../axios';

export const CreateNewSpeciatly = (data) => {
    return axios.post('/api/v1/create-specialty-booking', data);
};
