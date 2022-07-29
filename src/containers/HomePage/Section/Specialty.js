import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SlickSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

class SlickSlider extends Component {
    render() {
        const timeOut = this.props.timeOut || 500;

        const PropsData = { ...this.props };

        const settings = {
            dots: false,
            infinite: true,
            speed: timeOut,
            slidesToShow: 4,
            autoplay: true,
            slidesToScroll: 4,
            nextArrow: <FontAwesomeIcon icon={faAngleRight} />,
            prevArrow: <FontAwesomeIcon icon={faAngleLeft} />,
        };

        return (
            <div className="Slick-slider-container">
                <Slider {...settings}>
                    {PropsData.data &&
                        PropsData.data.map((data, index) => (
                            <div key={index}>
                                <div
                                    className="img-customize"
                                    style={{
                                        backgroundImage: `url(${data.img})`,
                                    }}
                                ></div>
                                <span className="span-text">{data.title}</span>
                            </div>
                        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(SlickSlider);
