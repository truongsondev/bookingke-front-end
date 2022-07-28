import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/images/logo.svg';

import './HomeHeader.scss';

class HomeHeader extends Component {
    render() {
        return (
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
                            <b>Chuyên khoa</b>
                            <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className="item-container">
                            <b>Cơ sở y tế</b>
                            <div className="sub-title">Chọn bệnh viện phòng khám</div>
                        </div>
                        <div className="item-container">
                            <b>Bác sĩ</b>
                            <div className="sub-title">Chọn bác sĩ giỏi</div>
                        </div>
                        <div className="item-container">
                            <b>Gói khám</b>
                            <div className="sub-title">Khám sức khỏe tổng quát</div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="faqs">
                            <FontAwesomeIcon icon={faCircleQuestion} />
                            Hỗ trợ
                        </div>
                        <div className="flag">
                            <img src="../../../../assets/images/logo.svg" />
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
