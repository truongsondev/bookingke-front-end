import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import EN from '../../assets/images/EN.png';
import VN from '../../assets/images/VN.png';
import { languages } from '../../utils/constant';
import './Header.scss';
import { ChangeLanguageApp } from '../../store/actions';

class Header extends Component {
    handleChangeLanguage(lang) {
        this.props.ChangeLanguageAppRedux(lang);
    }

    render() {
        const { processLogout, language } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className="d-flex">
                    <div className="d-flex align-items-center">
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
