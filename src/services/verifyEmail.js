import axios from '../axios';

export const VerifyBookingAppointment = (data) => {
    return axios.post(`/api/v1/verify-booking`, data);
};
