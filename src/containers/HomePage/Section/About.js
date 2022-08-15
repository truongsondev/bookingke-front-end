import React, { Component } from 'react';
import { connect } from 'react-redux';
import SKDS from '../../../assets/images/suckhoedoisong.png';
import VTV1 from '../../../assets/images/vtv1.png';
import ICT from '../../../assets/images/ictnews.png';
import VNEXPRESS from '../../../assets/images/vnexpress.png';
import VTCNEW from '../../../assets/images/vtcnews.png';
import CNTTBYT from '../../../assets/images/cuc-cong-nghe-thong-tin-bo-y-te-2.png';

class About extends Component {
    render() {
        return (
            <div className="Slick-slider-container">
                <div className="d-flex flex-wrap">
                    <div className="d-con-video">
                        <iframe
                            width="100%"
                            height="320px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="d-con-item">
                        <div className="d-con-item-truyenthong row">
                            <div className="col-2 col-md-4">
                                <img style={{ width: '162px' }} src={SKDS} alt="" />
                            </div>
                            <div className="col-2 col-md-4">
                                <img style={{ width: '106px' }} src={VTV1} alt="" />
                            </div>
                            <div className="col-2 col-md-4">
                                <img style={{ width: '127px' }} src={ICT} alt="" />
                            </div>
                            <div className="col-2 col-md-4">
                                <img style={{ width: '183px' }} src={VNEXPRESS} alt="" />
                            </div>
                            <div className="col-2 col-md-4">
                                <img style={{ width: '151px', backgroundColor: '#16325c' }} src={VTCNEW} alt="" />
                            </div>
                            <div className="col-2 col-md-4">
                                <img style={{ width: '127px' }} src={CNTTBYT} alt="" />
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
