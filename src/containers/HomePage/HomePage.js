import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './Components/Header/HomeHeader';
import SlickSlider from './Section/ChukSlickSlider';
import './HomePage.scss';
import FamousDoctor from './Section/FamousDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import FooterTwo from './Components/Footer/FooterTwo';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <HomeHeader />
                <div className="slick-slider-speciality video">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>Bác sĩ từ xa qua Video</h2>
                            <button>Xem Thêm</button>
                        </div>
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
                <div className="slick-slider-speciality speciality">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>Chuyên khoa phổ biến</h2>
                            <button>Xem Thêm</button>
                        </div>
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
                        <div className="slider-speciality-header">
                            <h2>Cơ sở y tế nổi bật</h2>
                            <button>Xem Thêm</button>
                        </div>
                        <SlickSlider
                            data={[
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg',
                                    title: 'Phòng khám Vietlife MRI Trần Bình Trọng 3',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w500/2021/09/14/095119-benh-vien-cho-ray-h1.jpg',
                                    title: 'Bác sĩ Nam học từ xa 2',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w500/2020/04/13/114446-anh-bia-bvk.jpg',
                                    title: 'Bác sĩ Nội khoa từ xa',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg',
                                    title: 'Phòng khám Vietlife MRI Trần Bình Trọng 3',
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fr/w500/2020/04/13/114446-anh-bia-bvk.jpg',
                                    title: 'Bác sĩ Nội khoa từ xa',
                                },
                            ]}
                            timeOut={500}
                        />
                    </div>
                </div>
                <div className="slick-slider-speciality bsnb">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>Bác sĩ nổi bật tuần qua</h2>
                            <button>Xem Thêm</button>
                        </div>
                        <FamousDoctor />
                    </div>
                </div>
                <div className="slick-slider-speciality cnang">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>Cẩm nang</h2>
                            <button>Xem Thêm</button>
                        </div>
                        <Handbook
                            RenderItem={[
                                {
                                    image: 'https://cdn.bookingcare.vn/fr/w300/2022/07/29/114730-uu-dai-phau-thuat-tat-khuc-xa-benh-vien-mat-dnd.jpg',
                                    title: 'Ưu đãi 30% phí khám và phẫu thuật tật khúc xạ tại Bệnh viện Mắt DND',
                                },
                                {
                                    image: 'https://cdn.bookingcare.vn/fr/w300/2022/07/28/171518-dia-chi-xet-nghiem-mau-tai-nha-tphcm.jpg',
                                    title: 'Review 6 địa chỉ xét nghiệm máu tại nhà uy tín TP.HCM',
                                },
                                {
                                    image: 'https://cdn.bookingcare.vn/fr/w300/2022/07/28/170308-gia-xet-nghiem-tieu-duong.jpg',
                                    title: 'Xét nghiệm tiểu đường (đái tháo đường) giá bao nhiêu? Giá xét nghiệm tiểu đường tại một số địa chỉ ở TP.HCM',
                                },
                                {
                                    image: 'https://cdn.bookingcare.vn/fr/w300/2021/05/12/095556-chuc-nang-gan.jpg',
                                    title: 'Xét nghiệm kiểm tra chức năng gan ở đâu tốt tại Hà Nội?',
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className="slick-slider-speciality truyenthong">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>Truyền thông nói về BookingCare</h2>
                        </div>
                        <About />
                    </div>
                </div>
                <div className="slick-slider-speciality danhchobacsi">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>Dành cho bác sĩ và cơ sở y tế</h2>
                            <button>Xem Thêm</button>
                        </div>
                        <Handbook
                            RenderItem={[
                                {
                                    image: 'https://cdn.bookingcare.vn/fr/w300/2018/03/19/153047bookingcare-images.jpg',
                                    title: 'Vì sao bệnh nhân đặt lịch khám với bác sĩ thông qua BookingCare?',
                                },
                                {
                                    image: 'https://cdn.bookingcare.vn/fr/w300/2018/03/19/092720waiting-room-doctor.jpg',
                                    title: 'Làm thế nào để nâng cao trải nghiệm khách hàng tại phòng chờ khám bệnh',
                                },
                                {
                                    image: 'https://cdn.bookingcare.vn/fr/w300/2018/03/19/001823bao-son-hospital.jpg',
                                    title: '5 cách cải thiện năng suất hiệu quả cho cơ sở y tế',
                                },
                                {
                                    image: 'https://cdn.bookingcare.vn/fr/w300/2018/03/16/094330online-review-dsim-dsim.jpg',
                                    title: 'Cách bệnh nhân sử dụng công cụ đánh giá trực tuyến',
                                },
                            ]}
                        />
                    </div>
                </div>
                <FooterTwo />
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
