import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, patientMenu } from './menuApp';
import EN from '../../assets/images/EN.png';
import VN from '../../assets/images/VN.png';
import { languages, USER_ROLE } from '../../utils/constant';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { ChangeLanguageApp } from '../../store/actions';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }

    handleChangeLanguage(lang) {
        this.props.ChangeLanguageAppRedux(lang);
    }

    componentDidMount() {
        const { user } = this.props;
        let Menu = [];

        if (user && !_.isEmpty(user)) {
            const Role = user.roleId;

            if (Role === USER_ROLE.ADMIN) {
                Menu = adminMenu;
            }

            if (Role === USER_ROLE.DOCTOR) {
                Menu = doctorMenu;
            }

            if (Role === USER_ROLE.PATIENT) {
                Menu = patientMenu;
            }
        }
        this.setState({
            menuApp: Menu,
        });
    }

    render() {
        const { processLogout, language, user } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="d-flex align-items-center">
                    <div className="me-3">
                        <span>
                            <FormattedMessage id="home-header.welcome" />{' '}
                            {user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : ''}
                        </span>
                    </div>
                    <div className="d-flex">
                        <div
                            className={
                                language === languages.VI ? 'language language-vi active' : 'language language-vi'
                            }
                            onClick={() => this.handleChangeLanguage(languages.VI)}
                        >
                            <img src={VN} alt="VN" />
                        </div>
                        <div
                            className={
                                language === languages.EN ? 'language language-en active' : 'language language-en'
                            }
                            onClick={() => this.handleChangeLanguage(languages.EN)}
                        >
                            <img src={EN} alt="EN" />
                        </div>
                    </div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log Out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        ChangeLanguageAppRedux: (language) => dispatch(ChangeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
