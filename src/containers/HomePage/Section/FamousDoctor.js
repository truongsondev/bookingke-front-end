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

class FamousDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorArr: [],
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

    render() {
        // const TopDoctor = this.props.OutstandingDoctor;

        const timeOut = this.props.timeOut || 500;
        const { doctorArr } = this.state;
        const { language } = this.props;

        const sideScollShowe = doctorArr.length > 4 ? 4 : doctorArr.length;

        const settings = {
            dots: false,
            // infinite: true,
            speed: timeOut,
            slidesToShow: sideScollShowe || 1,
            autoplay: true,
            slidesToScroll: 4,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };

        return (
            <div className="Slick-slider-container">
                <Slider {...settings}>
                    {doctorArr &&
                        doctorArr.length > 0 &&
                        doctorArr.map((data, index) => {
                            const linkImage = ConvertBase64Image(data.image);

                            return (
                                <div key={index}>
                                    <div className="Slick-slider-container-slick-doctor">
                                        <div
                                            className="img-customize-doctor"
                                            style={{
                                                backgroundImage: `url(${linkImage})`,
                                            }}
                                        ></div>
                                        <h3>
                                            {language === languages.VI
                                                ? data.positionData.valueVI
                                                : data.positionData.valueEN}
                                            , {data.firstName} {data.lastName}
                                        </h3>
                                        <span>Nguyên Phó chủ tịch Hội Phẫu thuật Thần kinh Việt Nam</span>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FamousDoctor);
