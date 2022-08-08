import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/images/logo.svg';

import EN from '../../../../assets/images/EN.png';
import VN from '../../../../assets/images/VN.png';
import { languages } from '../../../../utils/constant';
import { ChangeLanguageApp } from '../../../../store/actions';

import { FormattedMessage } from 'react-intl';

import './HomeHeader.scss';

class HomeHeader extends Component {
    handleChangeLanguage(lang) {
        this.props.ChangeLanguageAppRedux(lang);
    }

    render() {
        const language = this.props.language;

        return (
            <div>
                <div className="home-header-parents">
                    <div className="home-header-container container">
                        <div className="home-header-content d-flex">
                            <div className="left-content">
                                <div className="button-content">
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                                <Link to="/home">
                                    <div className="header-logo" style={{ backgroundImage: `url(${Logo})` }}></div>
                                </Link>
                            </div>
                            <div className="center-content">
                                <div className="item-container">
                                    <b>
                                        <FormattedMessage id="home-header.speciality" />
                                    </b>
                                    <div className="sub-title">
                                        <FormattedMessage id="home-header.search-doctor" />
                                    </div>
                                </div>
                                <div className="item-container">
                                    <b>
                                        <FormattedMessage id="home-header.Health-facilities" />
                                    </b>
                                    <div className="sub-title">
                                        <FormattedMessage id="home-header.Choose-hospital-clinic" />
                                    </div>
                                </div>
                                <div className="item-container">
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                    <div className="sub-title">
                                        <FormattedMessage id="home-header.Choose-a-good-doctor" />
                                    </div>
                                </div>
                                <div className="item-container">
                                    <b>
                                        <FormattedMessage id="home-header.Checkup-package" />
                                    </b>
                                    <div className="sub-title">
                                        <FormattedMessage id="home-header.General-health-check" />
                                    </div>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="faqs">
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                    <FormattedMessage id="common.support" />
                                </div>
                                <div
                                    className={
                                        language === languages.VI
                                            ? 'language language-vi active'
                                            : 'language language-vi'
                                    }
                                    onClick={() => this.handleChangeLanguage(languages.VI)}
                                >
                                    <img src={VN} alt="VN" />
                                </div>
                                <div
                                    className={
                                        language === languages.EN
                                            ? 'language language-en active'
                                            : 'language language-en'
                                    }
                                    onClick={() => this.handleChangeLanguage(languages.EN)}
                                >
                                    <img src={EN} alt="EN" />
                                </div>
                            </div>
                        </div>
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
        ChangeLanguageAppRedux: (language) => dispatch(ChangeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
