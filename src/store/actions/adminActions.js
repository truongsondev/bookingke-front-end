import actionTypes from './actionTypes';
import { deleteUser, getAllCodeServices, getAllUsers } from '../../services/userService';
import { createNewUserRedux } from '../../services/adminService';
import { toast } from 'react-toastify';

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

            console.error('Bạn đã gặp lỗi', error);
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
                toast.error('🦄 Successfully Deleted user!', {
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
