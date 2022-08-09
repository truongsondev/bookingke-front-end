import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ROLE } from '../utils';

class Home extends Component {
    render() {
        const { isLoggedIn, user } = this.props;

        const RedirectApp =
            user && user.roleId === USER_ROLE.ADMIN
                ? '/system/user-manage'
                : user && user.roleId === USER_ROLE.DOCTOR
                ? '/doctor-schedule/manage-schedule'
                : '/system/login';

        let linkToRedirect = isLoggedIn ? RedirectApp : '/home';

        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
