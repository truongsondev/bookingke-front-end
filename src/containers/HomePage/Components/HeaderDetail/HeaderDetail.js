import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BackIcon } from '../../../../components/Icons';
import { faCircleQuestion, faBars } from '@fortawesome/free-solid-svg-icons';
import { ChangeLanguageApp } from '../../../../store/actions';

import './HeaderDetail.scss';
import { languages } from '../../../../utils';

import VN from '../../../../assets/images/VN.png';
import ENImage from '../../../../assets/images/EN.png';

class HeaderDetail extends Component {
    handleChangeLanguage(lang) {
        this.props.ChangeLanguageAppRedux(lang);
    }

    render() {
        const { language, data, isOpen = false } = this.props;

        let VI;
        let EN;

        if (!isOpen) {
            if (data.firstName && data.lastName) {
                VI = `${data.position.valueVI} ${data.firstName} ${data.lastName}`;
                EN = `${data.position.valueEN} ${data.lastName} ${data.firstName}`;
            }
        }

        return (
            <div className="header-detail-wrapper">
                <div className="container" style={{ height: '100%' }}>
                    <span className="d-flex align-items-center" style={{ height: '100%' }}>
                        <div className="row" style={{ width: '100%' }}>
                            <div className="col-6 col-sm-6 d-flex host-name-header">
                                <Link to="/home">
                                    <BackIcon />
                                </Link>
                                <h2>{language === languages.VI ? VI : EN}</h2>
                                {this.props.Name && <h2>{this.props.Name}</h2>}
                            </div>
                            <div className="col-6 col-sm-6">
                                <div className="d-flex align-items-center right-header-detail">
                                    <div className="d-flex align-items-center content-header-detail">
                                        <div className="d-flex align-items-center language-header-detail">
                                            <span
                                                className={
                                                    language === languages.VI
                                                        ? 'language-header-detail active'
                                                        : 'language-header-detail'
                                                }
                                                onClick={() => this.handleChangeLanguage(languages.VI)}
                                            >
                                                <img src={VN} alt="VN" />
                                            </span>
                                            <span
                                                className={
                                                    language === languages.EN
                                                        ? 'language-header-detail active'
                                                        : 'language-header-detail'
                                                }
                                                onClick={() => this.handleChangeLanguage(languages.EN)}
                                            >
                                                <img src={ENImage} alt="VN" />
                                            </span>
                                        </div>
                                        <div className="item-support">
                                            <FontAwesomeIcon icon={faCircleQuestion} />
                                            <p>Hỗ trợ</p>
                                        </div>
                                        <div className="item-menu">
                                            <FontAwesomeIcon icon={faBars} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDetail);
