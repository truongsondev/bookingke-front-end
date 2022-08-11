import actionTypes from './actionTypes';
import { deleteUser, getAllCodeServices, getAllUsers, upDateUser } from '../../services/userService';
import { createNewUserRedux } from '../../services/adminService';
import { toast } from 'react-toastify';
import { getTopDoctorHomeServices } from '../../services/index';
import {
    getAllDoctor,
    GetDetailDoctor,
    GetDetailDoctorMarkDown,
    SaveBulkSchedule,
    SaveDetailDoctors,
    getScheduleDoctorByDate,
    getExtraDoctorInfoByIDService,
    getProfileDoctorInfoByIDService,
} from '../../services/doctorServices';
import { CRUD_ACTIONS } from '../../utils';

export const fetChGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });

            const Res = await getAllCodeServices('GENDER');

            if (Res && Res.errCode === 0) {
                dispatch(fetChGenderSuccess(Res.data));
            } else {
                dispatch(fetChGenderFailure());
            }
        } catch (error) {
            dispatch(fetChGenderFailure());
        }
    };
};

export const fetChGenderSuccess = (genderData) => {
    return { type: actionTypes.FETCH_GENDER_SUCCESS, data: genderData };
};

export const fetChGenderFailure = () => {
    return { type: actionTypes.FETCH_GENDER_FAILURE };
};

export const fetChPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetPositionSuccess([]));

            const Res = await getAllCodeServices('POSITION');

            if (Res && Res.errCode === 0) {
                dispatch(fetPositionSuccess(Res.data));
            } else {
                dispatch(fetPositionFailure());
            }
        } catch (error) {
            dispatch(fetPositionFailure());

            console.error('Bạn đã gặp lỗi', error);
        }
    };
};

export const fetPositionSuccess = (data) => {
    return { type: actionTypes.FETCH_POSITION_SUCCESS, data: data };
};

export const fetPositionFailure = () => {
    return { type: actionTypes.FETCH_POSITION_FAILURE };
};

export const fetChRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetRoleSuccess([]));

            const Res = await getAllCodeServices('ROLE');

            if (Res && Res.errCode === 0) {
                dispatch(fetRoleSuccess(Res.data));
            } else {
                dispatch(fetRoleFailure());
            }
        } catch (error) {
            dispatch(fetRoleFailure());

            console.error('Bạn đã gặp lỗi', error);
        }
    };
};

export const fetRoleSuccess = (data) => {
    return { type: actionTypes.FETCH_ROLE_SUCCESS, data: data };
};

export const fetRoleFailure = () => {
    return { type: actionTypes.FETCH_ROLE_FAILURE };
};

export const createUserRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createNewUserRedux(data);

            if (res && res.errCode === 0) {
                toast.success('🦄 Successfully created new user!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                dispatch(createUserSuccessRedux(res.user));
                dispatch(fetchAllUserStart());
            } else {
                dispatch(createUserFailureRedux(res));
            }
        } catch (error) {
            dispatch(createUserFailureRedux());
        }
    };
};

export const createUserSuccessRedux = (res) => {
    return { type: actionTypes.CREATE_USER_SUCCESS_REDUX, res };
};

export const createUserFailureRedux = (res) => {
    return { type: actionTypes.CREATE_USER_FAILURE_REDUX, res };
};

export const fetchAllUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllUsers('All');

            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.user.reverse()));
            } else {
                dispatch(fetchAllUserFailure());
            }
        } catch (error) {
            dispatch(fetchAllUserFailure());
        }
    };
};

export const fetchAllUserSuccess = (user) => {
    return { type: actionTypes.FETCH_ALL_USER_SUCCESS_REDUX, user };
};

export const fetchAllUserFailure = (user) => {
    return { type: actionTypes.FETCH_ALL_USER_FAILURE_REDUX, user };
};

export const deleteUserRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteUser(data);

            if (res && res.errCode === 0) {
                toast.success('🦄 Successfully Deleted user!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                dispatch(deleteUserSuccessRedux(res.user));
                dispatch(fetchAllUserStart());
            } else {
                toast.error('🦄 Error Deleted user!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                dispatch(deleteUserFailureRedux(res));
            }
        } catch (error) {
            toast.error('🦄 Error Deleted user!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            dispatch(deleteUserFailureRedux());
        }
    };
};

export const deleteUserSuccessRedux = (res) => {
    return { type: actionTypes.DELETE_USER_SUCCESS_REDUX, res };
};

export const deleteUserFailureRedux = () => {
    return { type: actionTypes.DELETE_USER_FAILURE_REDUX };
};

export const editUserRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await upDateUser(data);

            if (res && res.errCode === 0) {
                toast.success('🦄 Successfully Update user!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                dispatch(deleteUserSuccessRedux(res.user));
                dispatch(fetchAllUserStart());
            } else {
                toast.error('🦄 Error Update user!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('🦄 Error Update user!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };
};

export const fetTopDoctorHome = (limit) => {
    return async (dispatch, getState) => {
        try {
            const res = await getTopDoctorHomeServices(limit);

            if (res && res.errCode === 0) {
                dispatch(fetTopDoctorSuccess(res.data));
            } else {
                dispatch(fetTopDoctorFailure());
            }
        } catch (error) {
            dispatch(fetTopDoctorFailure());
        }
    };
};

export const fetTopDoctorSuccess = (data) => {
    return { type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS, data };
};

export const fetTopDoctorFailure = () => {
    return { type: actionTypes.FETCH_TOP_DOCTOR_FAILURE };
};

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllDoctor();

            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorFailure());
            }
        } catch (error) {
            dispatch(fetchAllDoctorFailure());
        }
    };
};

export const fetchAllDoctorSuccess = (data) => {
    return { type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS, data };
};

export const fetchAllDoctorFailure = () => {
    return { type: actionTypes.FETCH_ALL_DOCTOR_FAILURE };
};

export const SaveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await SaveDetailDoctors(data);

            if (res && res.errCode === 0) {
                dispatch(fetDetailDoctorMArkDown(data.doctorId));

                const Message =
                    data.action === CRUD_ACTIONS.CREATE
                        ? '🦄 Successfully Create Info Doctor!'
                        : '🦄 Successfully Update Info Doctor!';
                toast.success(Message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                dispatch(SaveDetailDoctorSuccess(res.data));
            } else {
                toast.error('🦄 Error Update Info Doctor!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                dispatch(SaveDetailDoctorFailure());
            }
        } catch (error) {
            toast.error('🦄 Error Update Info Doctor!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            dispatch(SaveDetailDoctorFailure());
        }
    };
};

export const SaveDetailDoctorSuccess = () => {
    return { type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS };
};

export const SaveDetailDoctorFailure = () => {
    return { type: actionTypes.SAVE_DETAIL_DOCTOR_FAILURE };
};

export const fetDetailDoctor = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await GetDetailDoctor(id);

            if (res && res.errCode === 0) {
                dispatch(GetDetailDoctorSuccess(res.data));
            } else {
                dispatch(GetDetailDoctorFailure());
            }
        } catch (error) {
            dispatch(GetDetailDoctorFailure());
        }
    };
};

export const GetDetailDoctorSuccess = (data) => {
    return { type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS, data };
};

export const GetDetailDoctorFailure = () => {
    return { type: actionTypes.FETCH_DETAIL_DOCTOR_FAILURE };
};

export const SetIDDoctorDetail = (id) => {
    return { type: actionTypes.SET_ID_DOCTOR_DETAIL, id };
};

export const fetDetailDoctorMArkDown = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await GetDetailDoctorMarkDown(id);

            if (res && res.errCode === 0) {
                dispatch(GetDetailDoctorMArkDownSuccess(res.data));
            } else {
                dispatch(GetDetailDoctorMArkDownFailure());
            }
        } catch (error) {
            dispatch(GetDetailDoctorMArkDownFailure());
        }
    };
};

export const GetDetailDoctorMArkDownSuccess = (data) => {
    return { type: actionTypes.FETCH_DETAIL_MARK_DOWN_DOCTOR_SUCCESS, data };
};

export const GetDetailDoctorMArkDownFailure = () => {
    return { type: actionTypes.FETCH_DETAIL_MARK_DOWN_DOCTOR_FAILURE };
};

export const fetScheduleHours = (type) => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCodeServices(type);

            if (res && res.errCode === 0) {
                dispatch(fetScheduleHoursSuccess(res.data));
            } else {
                dispatch(fetScheduleHoursFailure());
            }
        } catch (error) {
            dispatch(fetScheduleHoursFailure());
        }
    };
};

export const fetScheduleHoursSuccess = (data) => {
    return { type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS, data };
};

export const fetScheduleHoursFailure = () => {
    return { type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILURE };
};

export const saveBulkSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await SaveBulkSchedule(data);

            if (res && res.errCode === 0) {
                dispatch(saveBulkScheduleSuccess(res.errCode));
            } else {
                dispatch(saveBulkScheduleFailure(res.errCode));
            }
        } catch (error) {
            dispatch(
                saveBulkScheduleFailure({
                    errCode: -2,
                    errorMessage: 'error from client',
                }),
            );
        }
    };
};

export const saveBulkScheduleSuccess = (data) => {
    return { type: actionTypes.SAVE_BULK_SCHEDULE_SUCCESS, data };
};

export const saveBulkScheduleFailure = (data) => {
    return { type: actionTypes.SAVE_BULK_SCHEDULE_FAILURE, data };
};

export const getScheduleDoctor = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            const res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                dispatch(getScheduleDoctorSuccess(res.data));
            } else {
                dispatch(getScheduleDoctorFailure());
            }
        } catch (error) {
            dispatch(
                getScheduleDoctorFailure({
                    errCode: -2,
                    errorMessage: 'error from client',
                }),
            );
        }
    };
};

export const getScheduleDoctorSuccess = (data) => {
    return { type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_SUCCESS, data };
};

export const getScheduleDoctorFailure = () => {
    return { type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_FAILURE };
};

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
            });

            const ResPrice = await getAllCodeServices('PRICE');
            const ResPayment = await getAllCodeServices('PAYMENT');
            const ResProvince = await getAllCodeServices('PROVINCE');

            if (
                ResPrice &&
                ResPayment &&
                ResProvince &&
                ResPrice.errCode === 0 &&
                ResPayment.errCode === 0 &&
                ResProvince.errCode === 0
            ) {
                const dataRequired = {
                    ResPrice: ResPrice.data,
                    ResPayment: ResPayment.data,
                    ResProvince: ResProvince.data,
                };

                dispatch(getRequiredDoctorInfoSuccess(dataRequired));
            } else {
                dispatch(getRequiredDoctorInfoFailure());
            }
        } catch (error) {
            dispatch(getRequiredDoctorInfoFailure());
        }
    };
};

export const getRequiredDoctorInfoSuccess = (data) => {
    return { type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS, data };
};

export const getRequiredDoctorInfoFailure = () => {
    return { type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILURE };
};

export const getExtraDoctorInfoByID = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            const res = await getExtraDoctorInfoByIDService(doctorId);

            if (res && res.errCode === 0) {
                dispatch(getExtraDoctorInfoByIDSuccess(res.data));
            } else {
                dispatch(getExtraDoctorInfoByIDFailure());
            }
        } catch (error) {
            dispatch(
                getExtraDoctorInfoByIDFailure({
                    errCode: -2,
                    errorMessage: 'error from client',
                }),
            );
        }
    };
};

export const getExtraDoctorInfoByIDSuccess = (data) => {
    return { type: actionTypes.GET_EXTRA_DOCTOR_INFO_SUCCESS, data };
};

export const getExtraDoctorInfoByIDFailure = () => {
    return { type: actionTypes.GET_EXTRA_DOCTOR_INFO_FAILURE };
};

export const getProfileDoctorInfoByID = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            const res = await getProfileDoctorInfoByIDService(doctorId);

            if (res && res.errCode === 0) {
                dispatch(getProfileDoctorInfoByIDSuccess(res.data));
            } else {
                dispatch(getProfileDoctorInfoByIDFailure());
            }
        } catch (error) {
            dispatch(
                getProfileDoctorInfoByIDFailure({
                    errCode: -2,
                    errorMessage: 'error from client',
                }),
            );
        }
    };
};

export const getProfileDoctorInfoByIDSuccess = (data) => {
    return { type: actionTypes.GET_PROFILE_DOCTOR_INFO_SUCCESS, data };
};

export const getProfileDoctorInfoByIDFailure = () => {
    return { type: actionTypes.GET_PROFILE_DOCTOR_INFO_FAILURE };
};
