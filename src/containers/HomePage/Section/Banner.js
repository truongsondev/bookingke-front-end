import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './SlickSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../Components/ArrowSlickSlider/arrow';
import { GettAllSite } from '../../../services/SiteService';
import ConvertBase64Image from '../../System/components/converBase64/convertBase64';
import { withRouter } from 'react-router-dom';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ArrBanner: [],
        };
    }

    async componentDidMount() {
        const Res = await GettAllSite('CM1');

        if (Res && Res.errCode === 0) {
            this.setState({
                ArrBanner: Res.data,
            });
        }
    }

    handleRedireact = (data) => {
        this.props.history.push(
            `/site-thong-tin-new-bang-tin-cam-nang-chuyen-khoa-van-van?id=${data.id}&type=${data.case}`,
        );
    };

    render() {
        const PropsData = { ...this.props };

        const timeOut = PropsData.timeOut || 500;

        const { ArrBanner } = this.state;

        const settings = {
            dots: false,
            infinite: true,
            speed: timeOut,
            slidesToShow: 4,
            autoplay: true,
            slidesToScroll: 4,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        return (
            <div className="Slick-slider-container">
                <Slider {...settings}>
                    {ArrBanner &&
                        ArrBanner.length > 0 &&
                        ArrBanner.map((data, index) => (
                            <div key={index} onClick={() => this.handleRedireact(data)}>
                                <div className="slider-container-data-banner">
                                    <div
                                        className="img-customize"
                                        style={{
                                            backgroundImage: `url(${ConvertBase64Image(data.image)})`,
                                        }}
                                    ></div>
                                    <div className="body">
                                        <span className="span-text-banner">{data.name}</span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner));
