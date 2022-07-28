import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/images/logo.svg';
import BannerImg from '../../../../assets/images/bookingcare-cover-4.jpg';
import GoogleApp from '../../../../assets/images/google-play-badge.svg';
import AppStore from '../../../../assets/images/app-store-badge-black.svg';
import ChuyenKhoaIMG from '../../../../assets/images/chuyenkhoa.png';
import KhamTuXa from '../../../../assets/images/khamtuxa.png';
import KhamTongQuat from '../../../../assets/images/khamtongquat.png';
import XetNghiem from '../../../../assets/images/dichvuxetnghiem.png';
import SucKhoTT from '../../../../assets/images/suckhoetinhthan.png';
import KhamNhaKhoa from '../../../../assets/images/khamnhakhoa.png';
import GoiPhauThuat from '../../../../assets/images/phau-thuat.jpg';
import SPYTE from '../../../../assets/images/khamtainha.png';
import { FormattedMessage } from 'react-intl';

import './HomeHeader.scss';

class HomeHeader extends Component {
    render() {
        return (
            <div>
                <div className="home-header-parents">
                    <div className="home-header-container container">
                        <div className="home-header-content d-flex">
                            <div className="left-content">
                                <div className="button-content">
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                                <Link to="/">
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
                                <div className="language-vi">VN</div>
                                <div className="language-en">EN</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Layout 2 */}
                <div className="parents-home-header-banner">
                    <div className="home-header-banner" style={{ backgroundImage: `url(${BannerImg})` }}>
                        <div className="home-header-banner-content">
                            <div className="content-up">
                                <div className="title-banner-one">
                                    <FormattedMessage id="banner.title-one" />
                                </div>
                                <div className="title-banner-two">
                                    <FormattedMessage id="banner.title-two" />
                                </div>
                                <div className="banner-search">
                                    <div className="search-input">
                                        <div className="icon-search">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </div>
                                        <input type="text" placeholder="Tìm bệnh viện" />
                                    </div>
                                </div>
                                <div className="banner-download-app">
                                    <div>
                                        <img src={GoogleApp} alt="" />
                                    </div>
                                    <div>
                                        <img src={AppStore} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="content-down">
                                <div className="banner-options">
                                    <div className="d-flex justify-content-center container parents-content">
                                        <div className="item-content">
                                            <div className="item-content-wrapper">
                                                <div
                                                    className="image-container"
                                                    style={{ backgroundImage: `url(${ChuyenKhoaIMG})` }}
                                                ></div>
                                            </div>
                                            <div className="text-center item-name">
                                                <p>
                                                    <FormattedMessage id="banner.p1-1" />
                                                </p>
                                                <p className="text-nowrap ">
                                                    <FormattedMessage id="banner.p1-2" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="item-content-wrapper">
                                                <div
                                                    className="image-container"
                                                    style={{ backgroundImage: `url(${KhamTuXa})` }}
                                                ></div>
                                            </div>
                                            <div className="text-center item-name">
                                                <p>
                                                    <FormattedMessage id="banner.p2-1" />
                                                </p>
                                                <p className="text-nowrap ">
                                                    <FormattedMessage id="banner.p2-2" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="item-content-wrapper">
                                                <div
                                                    className="image-container"
                                                    style={{ backgroundImage: `url(${KhamTongQuat})` }}
                                                ></div>
                                            </div>
                                            <div className="text-center item-name">
                                                <p>
                                                    <FormattedMessage id="banner.p3-1" />
                                                </p>
                                                <p className="text-nowrap ">
                                                    <FormattedMessage id="banner.p3-2" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="item-content-wrapper">
                                                <div
                                                    className="image-container"
                                                    style={{ backgroundImage: `url(${XetNghiem})` }}
                                                ></div>
                                            </div>
                                            <div className="text-center item-name">
                                                <p>
                                                    <FormattedMessage id="banner.p4-1" />
                                                </p>
                                                <p className="text-nowrap ">
                                                    <FormattedMessage id="banner.p4-2" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="item-content-wrapper">
                                                <div
                                                    className="image-container"
                                                    style={{ backgroundImage: `url(${SucKhoTT})` }}
                                                ></div>
                                            </div>
                                            <div className="text-center item-name">
                                                <p>
                                                    <FormattedMessage id="banner.p5-1" />
                                                </p>
                                                <p className="text-nowrap ">
                                                    <FormattedMessage id="banner.p5-2" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="item-content-wrapper">
                                                <div
                                                    className="image-container"
                                                    style={{ backgroundImage: `url(${KhamNhaKhoa})` }}
                                                ></div>
                                            </div>
                                            <div className="text-center item-name">
                                                <p>
                                                    <FormattedMessage id="banner.p6-1" />
                                                </p>
                                                <p className="text-nowrap ">
                                                    <FormattedMessage id="banner.p6-2" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="item-content-wrapper">
                                                <div
                                                    className="image-container"
                                                    style={{ backgroundImage: `url(${GoiPhauThuat})` }}
                                                ></div>
                                            </div>
                                            <div className="text-center item-name">
                                                <p>
                                                    <FormattedMessage id="banner.p7-1" />
                                                </p>
                                                <p className="text-nowrap ">
                                                    <FormattedMessage id="banner.p7-2" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="item-content-wrapper">
                                                <div
                                                    className="image-container"
                                                    style={{ backgroundImage: `url(${SPYTE})` }}
                                                ></div>
                                            </div>
                                            <div className="text-center item-name">
                                                <p>
                                                    <FormattedMessage id="banner.p8-1" />
                                                </p>
                                                <p className="text-nowrap ">
                                                    <FormattedMessage id="banner.p8-2" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
