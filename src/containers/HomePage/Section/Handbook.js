import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './SlickSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../Components/ArrowSlickSlider/arrow';

class Handbook extends Component {
    render() {
        const timeOut = this.props.timeOut || 500;

        const PropsData = { ...this.props };

        const settings = {
            dots: false,
            infinite: true,
            speed: timeOut,
            slidesToShow: 2,
            autoplay: true,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };

        return (
            <div className="Slick-slider-container">
                <Slider {...settings}>
                    {PropsData.RenderItem &&
                        PropsData.RenderItem.map((data, index) => (
                            <div key={index}>
                                <div className="camnnang-parents">
                                    <div className="slider-container-cnang d-flex">
                                        <div
                                            className="img-customize-cnang"
                                            style={{
                                                backgroundImage: `url(${data.image})`,
                                            }}
                                        ></div>
                                        <div className="slider-container-cnang-text ">
                                            <h3>{data.title}</h3>
                                        </div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
