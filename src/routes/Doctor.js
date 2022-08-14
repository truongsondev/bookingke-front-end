import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import FooterTwo from '../containers/HomePage/Components/Footer/FooterTwo';
import ManagePatient from '../containers/System/components/Doctor/Admin/ManagePatient';
import ManageSchedule from '../containers/System/components/Doctor/ManageSchedule';

class Doctor extends Component {
    render() {
        return (
            <div style={{ height: '100vh' }}>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor-schedule/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor-schedule/manage-patient" component={ManagePatient} />
                        </Switch>
                    </div>
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <FooterTwo />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
