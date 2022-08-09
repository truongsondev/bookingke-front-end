import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';

import './login.scss';
// import { FormattedMessage } from 'react-intl';

import { userService } from '../../services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        };
    }

    handleOnchangeInputUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    handleOnchangeInputPassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleLogin = async () => {
        const { username, password } = this.state; // ES6

        this.setState({
            errMessage: '',
        });

        try {
            const data = await userService.handleLogin(username, password);

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
        }
    };

    handleHideShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleOnkeyDown(e) {
        if (e.which === 13) {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center">
                            <h3>Login</h3>
                        </div>
                        <div className="col-12 form-group mb-4">
                            <label>Username</label>
                            <input
                                type="text"
                                value={this.state.username}
                                onChange={(e) => this.handleOnchangeInputUsername(e)}
                                className="form-control"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnchangeInputPassword(e)}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    onKeyDown={(e) => this.handleOnkeyDown(e)}
                                />
                                <span onClick={() => this.handleHideShowPassword()}>
                                    {this.state.isShowPassword ? (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEye} />
                                    )}
                                </span>
                            </div>
                        </div>
                        <span className="col-12 mt-2 mb-4" style={{ fontSize: 12, color: 'red' }}>
                            {this.state.errMessage}
                        </span>
                        <div className="col-12 d-block text-center mb-2">
                            <button onClick={() => this.handleLogin()} className="col-9 btn btn-primary text-login">
                                Login
                            </button>
                        </div>
                        <div className="col-12 text-right">
                            <span className="forgot-password">For got your password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or login with</span>
                        </div>
                        <div className="col-12 social-login">
                            <FontAwesomeIcon className="google" icon={faGoogle} />
                            <FontAwesomeIcon className="facebook" icon={faFacebook} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
