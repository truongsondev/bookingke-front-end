import axios from '../axios';

export const createNewUserRedux = (state) => {
    const { email, password, firstName, lastName, phonenumber, address, gender, position, roleId, avatar } = state;

    return axios.post(`/api/v1/create-new-user`, {
        email,
        password: password,
        firstName,
        lastName,
        phonenumber,
        address,
        gender,
        positionId: position,
        roleId,
        image: avatar,
    });
};

export const getTopDoctorHomeServices = (limit) => {
    return axios.get(`/api/v1/top/doctor-home?limit=${limit}`);
};
