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

export const GetDetailDoctorMarkDown = (id) => {
    return axios.get(`/api/v1/get-info-doctor-markdowns?id=${id}`);
};

export const SaveBulkSchedule = (data) => {
    // const Data = {
    //     scheduleData: data,
    // };

    return axios.post(`/api/v1/bulk-create-schedule`, data);
};

export const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/v1/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
