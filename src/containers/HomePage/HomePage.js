import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './Components/Header/HomeHeader';
import SlickSlider from './Section/Specialty';
import './HomePage.scss';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <HomeHeader />
                <div className="slick-slider-speciality">
                    <div className="slider-speciality">
                        <h2>Bác sĩ từ xa qua Video</h2>
                        <SlickSlider
                            data={[
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Phòng khám Vietlife MRI Trần Bình Trọng',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2018/10/16/151254nam-hoc.jpg',
                                    title: 'Bác sĩ Nam học từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Bác sĩ Nội khoa từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Phòng khám Vietlife MRI Trần Bình Trọng',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2018/10/16/151254nam-hoc.jpg',
                                    title: 'Bác sĩ Nam học từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Bác sĩ Nội khoa từ xa',
                                },
                            ]}
                            timeOut={1000}
                        />
                    </div>
                </div>
                <div className="slick-slider-speciality">
                    <div className="slider-speciality">
                        <h2>Chuyên khoa phổ biến</h2>
                        <SlickSlider
                            data={[
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Phòng khám Vietlife MRI Trần Bình Trọng',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2018/10/16/151254nam-hoc.jpg',
                                    title: 'Bác sĩ Nam học từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Bác sĩ Nội khoa từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Phòng khám Vietlife MRI Trần Bình Trọng',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2018/10/16/151254nam-hoc.jpg',
                                    title: 'Bác sĩ Nam học từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Bác sĩ Nội khoa từ xa',
                                },
                            ]}
                            timeOut={2000}
                        />
                    </div>
                </div>
                <div className="slick-slider-speciality csyte">
                    <div className="slider-speciality">
                        <h2>Chuyên khoa phổ biến</h2>
                        <SlickSlider
                            data={[
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Phòng khám Vietlife MRI Trần Bình Trọng 3',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2018/10/16/151254nam-hoc.jpg',
                                    title: 'Bác sĩ Nam học từ xa 2',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Bác sĩ Nội khoa từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Phòng khám Vietlife MRI Trần Bình Trọng',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2018/10/16/151254nam-hoc.jpg',
                                    title: 'Bác sĩ Nam học từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg',
                                    title: 'Bác sĩ Nội khoa từ xa',
                                },
                            ]}
                            timeOut={500}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
