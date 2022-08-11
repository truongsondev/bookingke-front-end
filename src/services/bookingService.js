import axios from '../axios';

export const postPatientBookingAppointmentService = (data) => {
    return axios.post('/api/v1/patient-booking-appointment', data);
};
