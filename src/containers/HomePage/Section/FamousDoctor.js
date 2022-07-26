import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './SlickSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../Components/ArrowSlickSlider/arrow';
import * as actions from '../../../store/actions';
import ConvertBase64Image from '../../System/components/converBase64/convertBase64';
import { languages } from '../../../utils';
import { withRouter } from 'react-router-dom';

class FamousDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorArr: [],
            prevArrow: true,
            nextArrow: true,
        };
    }

    componentDidMount = async () => {
        await this.props.loadTopDoctors(10);
    };

    componentDidUpdate(prevProps, UpdateProps, next) {
        if (prevProps.OutstandingDoctor !== this.props.OutstandingDoctor) {
            this.setState({
                doctorArr: this.props.OutstandingDoctor,
            });
        }
    }

    HandleRedirect = (data) => {
        this.props.history.push(`/doctor-thong-tin-bac-si-chuyen-khoa/${data.id}`);
        // Có thể dùng thẻ link để redirect nhé
    };

    render() {
        // const TopDoctor = this.props.OutstandingDoctor;

        const timeOut = this.props.timeOut || 500;
        const { doctorArr } = this.state;
        const { language } = this.props;

        const sideScollShowe = doctorArr.length > 4 ? 4 : doctorArr.length;

        const settings = {
            dots: false,
            speed: timeOut,
            infinite: true,
            slidesToShow: sideScollShowe || 1,
            autoplay: true,
            slidesToScroll: 3,
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
                    {doctorArr &&
                        doctorArr.length > 0 &&
                        doctorArr.map((data, index) => {
                            const linkImage = ConvertBase64Image(data.image);
                            const NameVI = `${data.positionData.valueVI}, ${data.firstName} ${data.lastName}`;
                            const NameEN = `${data.positionData.valueEN}, ${data.lastName} ${data.firstName}`;

                            return (
                                <div key={index} onClick={() => this.HandleRedirect(data)}>
                                    {/* <Link to={`/:${data.id}`}> Có thể dùng ông thần này nhưng  mình lại muốn sử lí bằng JavaScript */}
                                    <div className="Slick-slider-container-slick-doctor">
                                        <div className="span-rank">{index + 1}</div>
                                        <div
                                            className="img-customize-doctor"
                                            style={{
                                                backgroundImage: `url(${linkImage})`,
                                            }}
                                        ></div>
                                        <h3>{language === languages.VI ? NameVI : NameEN}</h3>
                                        <span>Nguyên Phó chủ tịch Hội Phẫu thuật Thần kinh Việt Nam</span>
                                    </div>
                                    {/* </Link> */}
                                </div>
                            );
                        })}
                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        OutstandingDoctor: state.admin.OutstandingDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: (limit) => dispatch(actions.fetTopDoctorHome(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FamousDoctor));
