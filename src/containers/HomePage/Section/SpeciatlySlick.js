import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './SlickSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../Components/ArrowSlickSlider/arrow';
import * as actions from '../../../store/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class SpeciatlySLick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllDataSpeciatly: [],
        };
    }

    componentDidMount() {
        this.props.getLimitSpeciatly(30);
    }

    componentDidUpdate(prevProps, NextProps, Next) {
        if (prevProps.AllDataSpeciatly !== this.props.AllDataSpeciatly) {
            this.setState({
                AllDataSpeciatly: this.props.AllDataSpeciatly,
            });
        }
    }

    render() {
        const timeOut = this.props.timeOut || 500;

        const { AllDataSpeciatly } = this.state;

        const settings = {
            dots: false,
            infinite: true,
            speed: timeOut,
            slidesToShow: 4,
            autoplay: true,
            slidesToScroll: 2,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };

        return (
            <div className="Slick-slider-container">
                <Slider {...settings}>
                    {AllDataSpeciatly &&
                        AllDataSpeciatly.length > 0 &&
                        AllDataSpeciatly.map((data, index) => (
                            <Link key={index} to={`/specialty-thong-tin-chuyen-khoa/${data.id}`}>
                                <div className="slider-container-data">
                                    <div
                                        className="img-customize"
                                        style={{
                                            backgroundImage: `url(${data.image})`,
                                        }}
                                    ></div>
                                    <span className="span-text">{data.name}</span>
                                </div>
                            </Link>
                        ))}
                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        AllDataSpeciatly: state.admin.AllDataSpeciatly,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLimitSpeciatly: (data) => dispatch(actions.getLimitSpeciatly(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeciatlySLick);
