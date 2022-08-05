import axios from '../axios';
import * as queryString from 'query-string';

const adminService = {
    /**
     * Đăng nhập hệ thống
     * {
     *  "username": "string",
     *  "password": "string"
     * }
     */
    login(loginBody) {
        return axios.post(`/admin/login`, loginBody);
    },
};

export default adminService;

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
        Image: avatar,
    });
};
