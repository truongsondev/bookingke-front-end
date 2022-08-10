import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    users: [],
    genders: [],
    roles: [],
    positions: [],
    OutstandingDoctor: [],
    AllDoctor: [],
    DetailDoctor: {},
    IdDoctorDetail: null,
    MarkDownDetailDoctor: {},
    AllScheduleTime: [],
    BulkSchedule: [],
    ScheduleDoctorByDate: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: {
            const copyStateStart = { ...state };
            copyStateStart.isLoading = true;

            return {
                ...copyStateStart,
            };
        }

        case actionTypes.FETCH_GENDER_SUCCESS: {
            const copyState = { ...state };
            copyState.isLoading = false;
            copyState.genders = action.data;

            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_GENDER_FAILURE: {
            const copyStateFailure = { ...state };
            copyStateFailure.isLoading = false;
            copyStateFailure.genders = [];
            return {
                ...copyStateFailure,
            };
        }

        case actionTypes.FETCH_POSITION_SUCCESS: {
            const cloneState = { ...state };
            if (action.data && action.data.length === 0) {
                cloneState.isLoading = true;
            } else {
                cloneState.positions = action.data;

                cloneState.isLoading = false;
            }

            return {
                ...cloneState,
            };
        }

        case actionTypes.FETCH_POSITION_FAILURE: {
            const cloneState = { ...state };

            cloneState.positions = [];
            cloneState.isLoading = false;

            return {
                ...cloneState,
            };
        }

        case actionTypes.FETCH_ROLE_SUCCESS: {
            const cloneStateRole = { ...state };

            if (action.data && action.data.length === 0) {
                cloneStateRole.isLoading = true;
            } else {
                cloneStateRole.roles = action.data;

                cloneStateRole.isLoading = false;
            }

            return {
                ...cloneStateRole,
            };
        }

        case actionTypes.FETCH_ROLE_FAILURE: {
            const cloneStateRole = { ...state };

            cloneStateRole.roles = [];
            cloneStateRole.isLoading = false;

            return {
                ...cloneStateRole,
            };
        }

        case actionTypes.CREATE_USER_SUCCESS_REDUX: {
            return state;
        }

        case actionTypes.CREATE_USER_FAILURE_REDUX: {
            alert('Missing created user');

            return state;
        }

        case actionTypes.FETCH_ALL_USER_SUCCESS_REDUX: {
            const cloneStateGetAllUserRedux = { ...state };

            cloneStateGetAllUserRedux.users = action.user;

            return {
                ...cloneStateGetAllUserRedux,
            };
        }

        case actionTypes.FETCH_ALL_USER_FAILURE_REDUX: {
            const cloneStateGetAllUserRedux = { ...state };

            cloneStateGetAllUserRedux.users = [];

            return {
                ...cloneStateGetAllUserRedux,
            };
        }

        case actionTypes.DELETE_USER_SUCCESS_REDUX: {
            return state;
        }

        case actionTypes.DELETE_USER_FAILURE_REDUX: {
            return state;
        }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS: {
            const cloneStateOutstandingDoctor = { ...state };

            cloneStateOutstandingDoctor.OutstandingDoctor = action.data;
            return { ...cloneStateOutstandingDoctor };
        }

        case actionTypes.FETCH_TOP_DOCTOR_FAILURE: {
            return state;
        }

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS: {
            const cloneStateAllDoctor = { ...state };

            cloneStateAllDoctor.AllDoctor = action.data;

            return { ...cloneStateAllDoctor };
        }

        case actionTypes.FETCH_ALL_DOCTOR_FAILURE: {
            return state;
        }

        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS: {
            return state;
        }

        case actionTypes.SAVE_DETAIL_DOCTOR_FAILURE: {
            return state;
        }

        case actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS: {
            const cloneStateDetailDoctor = { ...state };

            cloneStateDetailDoctor.DetailDoctor = action.data;

            return { ...cloneStateDetailDoctor };
        }

        case actionTypes.FETCH_DETAIL_DOCTOR_FAILURE: {
            return state;
        }

        case actionTypes.SET_ID_DOCTOR_DETAIL: {
            const cloneStateDetailDoctorID = { ...state };

            cloneStateDetailDoctorID.IdDoctorDetail = action.id;

            return { ...cloneStateDetailDoctorID };
        }

        case actionTypes.FETCH_DETAIL_MARK_DOWN_DOCTOR_SUCCESS: {
            const cloneStateDetailDoctorMarkdown = { ...state };

            cloneStateDetailDoctorMarkdown.MarkDownDetailDoctor = action.data;

            return { ...cloneStateDetailDoctorMarkdown };
        }

        case actionTypes.FETCH_DETAIL_MARK_DOWN_DOCTOR_FAILURE: {
            return state;
        }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS: {
            const cloneStateSchedule = { ...state };

            cloneStateSchedule.AllScheduleTime = action.data;

            return { ...cloneStateSchedule };
        }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILURE: {
            return state;
        }

        case actionTypes.SAVE_BULK_SCHEDULE_SUCCESS: {
            const cloneStateBulkScheduleSuccess = { ...state };

            console.log('check Action :', action);

            cloneStateBulkScheduleSuccess.BulkSchedule = action.data;

            return {
                ...cloneStateBulkScheduleSuccess,
            };
        }

        case actionTypes.SAVE_BULK_SCHEDULE_FAILURE: {
            const cloneStateBulkScheduleSuccess = { ...state };

            console.log('check Action :', action);

            cloneStateBulkScheduleSuccess.BulkSchedule = action.data;

            return {
                ...cloneStateBulkScheduleSuccess,
            };
        }

        case actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_SUCCESS: {
            const cloneStateScheduleDoctorByDate = { ...state };

            cloneStateScheduleDoctorByDate.ScheduleDoctorByDate = action.data;

            return { ...cloneStateScheduleDoctorByDate };
        }

        case actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_FAILURE: {
            return state;
        }

        default:
            return state;
    }
};

export default adminReducer;
