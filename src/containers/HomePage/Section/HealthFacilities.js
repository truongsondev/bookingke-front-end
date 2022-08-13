import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './SlickSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../Components/ArrowSlickSlider/arrow';
import { getLimitAllClinic } from '../../../services/clinicService';
import { withRouter } from 'react-router-dom';

class HealthFacilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }

    async componentDidMount() {
        const Res = await getLimitAllClinic(30);

        if (Res && Res.errCode === 0) {
            this.setState({
                dataClinic: Res.data,
            });
        }
    }

    componentDidUpdate() {}

    handleRedireact = (data) => {
        this.props.history.push(`/clinic-thong-tin-co-so-y-te/${data.id}`);
    };

    render() {
        const PropsData = { ...this.props };

        const timeOut = PropsData.timeOut || 500;

        const { dataClinic } = this.state;

        const settings = {
            dots: false,
            infinite: true,
            speed: timeOut,
            slidesToShow: 4,
            // autoplay: true,
            slidesToScroll: 2,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };

        return (
            <div className="Slick-slider-container">
                <Slider {...settings}>
                    {dataClinic &&
                        dataClinic.length > 0 &&
                        dataClinic.map((data, index) => (
                            <div
                                key={index}
                                className="slider-container-data"
                                onClick={() => this.handleRedireact(data)}
                            >
                                <div
                                    className="img-customize"
                                    style={{
                                        backgroundImage: `url(${data.image})`,
                                    }}
                                ></div>
                                <span className="span-text">{data.name}</span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HealthFacilities));
