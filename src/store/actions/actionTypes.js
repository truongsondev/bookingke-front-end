const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE_APP: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // Admin

    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILURE: 'FETCH_GENDER_FAILURE',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILURE: 'FETCH_POSITION_FAILURE',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILURE: 'FETCH_ROLE_FAILURE',

    CREATE_USER_SUCCESS_REDUX: 'CREATE_USER_SUCCESS_REDUX',
    CREATE_USER_FAILURE_REDUX: 'CREATE_USER_FAILURE_REDUX',

    UPDATE_USER_SUCCESS_REDUX: 'UPDATE_USER_SUCCESS_REDUX',
    UPDATE_USER_FAILURE_REDUX: 'UPDATE_USER_FAILURE_REDUX',

    DELETE_USER_SUCCESS_REDUX: 'DELETE_USER_SUCCESS_REDUX',
    DELETE_USER_FAILURE_REDUX: 'DELETE_USER_FAILURE_REDUX',

    FETCH_ALL_USER_SUCCESS_REDUX: 'FETCH_ALL_USER_SUCCESS_REDUX',
    FETCH_ALL_USER_FAILURE_REDUX: 'FETCH_ALL_USER_FAILURE_REDUX',

    // doctor

    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAILURE: 'FETCH_TOP_DOCTOR_FAILURE',

    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAILURE: 'FETCH_ALL_DOCTOR_FAILURE',

    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAILURE: 'SAVE_DETAIL_DOCTOR_FAILURE',
});

export default actionTypes;
