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

class HandbookSlick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ArrHandBook: [],
        };
    }

    async componentDidMount() {
        const Res = await GettAllSite('CM3');

        if (Res && Res.errCode === 0) {
            this.setState({
                ArrHandBook: Res.data,
            });
        }
    }

    componentDidUpdate(prevProps, props, next) {}

    handleRedireact = (data) => {
        this.props.history.push(
            `/site-thong-tin-new-bang-tin-cam-nang-chuyen-khoa-van-van?id=${data.id}&type=${data.case}`,
        );
    };

    render() {
        const PropsData = { ...this.props };

        const timeOut = PropsData.timeOut || 500;

        const { ArrHandBook } = this.state;

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
                    {ArrHandBook &&
                        ArrHandBook.length > 0 &&
                        ArrHandBook.map((data, index) => (
                            <div key={index} onClick={() => this.handleRedireact(data)}>
                                <div className="camnnang-parents">
                                    <div className="slider-container-cnang d-flex">
                                        <div
                                            className="img-customize-cnang"
                                            style={{
                                                backgroundImage: `url(${ConvertBase64Image(data.image)})`,
                                            }}
                                        ></div>
                                        <div className="slider-container-cnang-text ">
                                            <h3>{data.name}</h3>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandbookSlick));
