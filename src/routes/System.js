import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/components/Admin/UserRedux';
import ManageDoctor from '../containers/System/components/DoctorManage';

import Header from '../containers/Header/Header';
import Footer from '.././containers/HomePage/Components/Footer/FooterTwo';
import './system.scss';
import { USER_ROLE } from '../utils';
import NotFound from '../containers/System/components/404_not_found/404';
import Patient from '../containers/System/components/DoctorManage/patient';
// import { lang } from 'moment';
// import { languages } from '../utils';

class System extends Component {
    render() {
        const { systemMenuPath, user } = this.props;

        return (
            <div style={{ height: '100vh' }}>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {user && user.roleId === USER_ROLE.ADMIN && (
                                <>
                                    <Route path="/system/user-manage" component={UserManage} />
                                    <Route path="/system/user-redux" component={UserRedux} />
                                    <Route path="/system/manage-doctor" component={ManageDoctor} />
                                    <Route path="/system/" component={Patient} />
                                </>
                            )}
                            {user && user.roleId === USER_ROLE.DOCTOR && (
                                <Route path="/system/manage-doctor" component={ManageDoctor} />
                            )}

                            {user && user.roleId === USER_ROLE.PATIENT && <Route path="/system/" component={Patient} />}

                            <Route component={NotFound} />
                            {/* 
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            /> */}
                        </Switch>
                    </div>
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
