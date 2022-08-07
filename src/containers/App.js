import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { ToastContainer } from 'react-toastify';

import { path } from '../utils';

import Home from '../routes/Home';
import Login from './Auth/login';
import System from '../routes/System';

import HomePage from './HomePage';
import CustomScrollbars from '../components/CustomScrollbars';

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
                                    {/* userIsAuthenticated  check quyền xem có dc quyền truy cập hay không  */}
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
