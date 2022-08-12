import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { ToastContainer } from 'react-toastify';
import DetailDoctor from './Patient/Doctor/DetailDoctor/DetailDoctor';
import NotFound from './System/components/404_not_found/404';

import { path } from '../utils';

import Home from '../routes/Home';
import Login from './Auth/login';
import System from '../routes/System';
import Doctor from '../routes/Doctor';

import HomePage from './HomePage';
import CustomScrollbars from '../components/CustomScrollbars';
import verifyEmail from './Patient/verifyEmail/verifyEmail';

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <>
                <Router history={history}>
                    <div className="main-container">
                        {/* {this.props.isLoggedIn && <Header />} */}
                        <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                            <div className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={Home} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    {/* userIsAuthenticated  check quyền xem có dc quyền truy cập hay không  */}
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={verifyEmail} />
                                    <Route component={NotFound} />
                                </Switch>
                            </div>
                        </CustomScrollbars>
                        <ToastContainer />
                    </div>
                </Router>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
