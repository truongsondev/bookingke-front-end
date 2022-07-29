import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './SlickSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../Components/ArrowSlickSlider/arrow';

class FamousDoctor extends Component {
    render() {
        const timeOut = this.props.timeOut || 500;

        const settings = {
            dots: false,
            infinite: true,
            speed: timeOut,
            slidesToShow: 4,
            autoplay: true,
            slidesToScroll: 4,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };

        return (
            <div className="Slick-slider-container">
                <Slider {...settings}>
                    <div>
                        <div className="Slick-slider-container-slick-doctor">
                            <div
                                className="img-customize-doctor"
                                style={{
                                    backgroundImage: `url('https://cdn.bookingcare.vn/fr/w200/2019/12/31/155850-pgs-nguyen-tho-lo.jpg')`,
                                }}
                            ></div>
                            <h3>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                            <span>Nguyên Phó chủ tịch Hội Phẫu thuật Thần kinh Việt Nam</span>
                        </div>
                    </div>
                    <div>
                        <div className="Slick-slider-container-slick-doctor">
                            <div
                                className="img-customize-doctor"
                                style={{
                                    backgroundImage: `url('https://cdn.bookingcare.vn/fr/w200/2019/12/31/155850-pgs-nguyen-tho-lo.jpg')`,
                                }}
                            ></div>
                            <h3>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                            <span>Nguyên Phó chủ tịch Hội Phẫu thuật Thần kinh Việt Nam</span>
                        </div>
                    </div>
                    <div>
                        <div className="Slick-slider-container-slick-doctor">
                            <div
                                className="img-customize-doctor"
                                style={{
                                    backgroundImage: `url('https://cdn.bookingcare.vn/fr/w200/2019/12/31/155850-pgs-nguyen-tho-lo.jpg')`,
                                }}
                            ></div>
                            <h3>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                            <span>Nguyên Phó chủ tịch Hội Phẫu thuật Thần kinh Việt Nam</span>
                        </div>
                    </div>
                    <div>
                        <div className="Slick-slider-container-slick-doctor">
                            <div
                                className="img-customize-doctor"
                                style={{
                                    backgroundImage: `url('https://cdn.bookingcare.vn/fr/w200/2019/12/31/155850-pgs-nguyen-tho-lo.jpg')`,
                                }}
                            ></div>
                            <h3>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                            <span>Nguyên Phó chủ tịch Hội Phẫu thuật Thần kinh Việt Nam</span>
                        </div>
                    </div>

                    <div>
                        <div className="Slick-slider-container-slick-doctor">
                            <div
                                className="img-customize-doctor"
                                style={{
                                    backgroundImage: `url('https://cdn.bookingcare.vn/fr/w200/2019/12/31/155850-pgs-nguyen-tho-lo.jpg')`,
                                }}
                            ></div>
                            <h3>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                            <span>Nguyên Phó chủ tịch Hội Phẫu thuật Thần kinh Việt Nam</span>
                        </div>
                    </div>
                </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(FamousDoctor);
