import axios from '../axios';

export const CreateDataClinic = (data) => {
    return axios.post('api/v1/create-new-clinic', data);
};
