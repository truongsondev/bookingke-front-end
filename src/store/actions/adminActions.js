import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/userService';
import { createNewUserRedux } from '../../services/adminService';

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
                dispatch(createUserSuccessRedux(res));
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
