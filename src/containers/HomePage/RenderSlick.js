import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import SlickSlider from './Section/ChukSlickSlider';
import './HomePage.scss';
import FamousDoctor from './Section/FamousDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';

import Banner from './Section/Banner';

class RenderSlick extends Component {
    render() {
        return (
            <div>
                <div className="slick-slider-speciality banner">
                    <div className="slider-speciality">
                        <Banner
                            data={[
                                {
                                    img: 'https://cdn.bookingcare.vn/fo/2022/01/21/170022-kit-test-nhanh.png',
                                    title: 'Kit Test COVID bằng nước bọt',
                                    description: [
                                        'Kit Test nhanh bằng nước bọt',
                                        'Đơn giản, tiện lợi, chính xác',
                                        'Bộ Y tế Việt Nam cấp chứng nhận',
                                    ],
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fo/2022/05/18/115424-221d510df8a339fd60b2.jpg',
                                    title: 'Tư vấn phẫu thuật bao quy đầu trọn gói',
                                    description: [
                                        'Thực hiện bởi bác sĩ Nam học',
                                        'Thực hiện tại cơ sở y tế',
                                        'Chi phí minh bạch',
                                    ],
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fo/2022/07/21/095056-screenshot-2022-07-21-094716.png',
                                    title: 'Bernard: Chương trình tư vấn miễn phí vết thương mạn tính',
                                    description: [
                                        'Tư vấn và thăm khám MIỄN PHÍ cho tất cả khách hàng có nhu cầu chăm sóc, điều trị vết thương, đặc biệt vết thương mạn tính (khó lành).',
                                    ],
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fo/2022/07/30/120743-screenshot-2022-07-30-120031.png',
                                    title: 'Gói Tầm soát Suy giãn tĩnh mạch',
                                    description: [
                                        'Hỗ trợ điều trị dứt điểm 1 - 2 liệu trình ',
                                        'Tư vấn điều trị bằng những Phương pháp ít xâm lấn',
                                    ],
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fo/2021/07/27/140801-test-covid.jpg',
                                    title: 'Ưu đãi 30% phí khám và phẫu thuật tật khúc xạ tại Bệnh viện Mắt DND',
                                    description: [
                                        'Tháng 8, Bệnh viện Mắt Quốc tế DND hỗ trợ đến 30% chi phí khám và phẫu thuật tật khúc xạ.',
                                        'Đặt trước lịch qua BookingCare để nhận ưu đãi.',
                                    ],
                                },
                                {
                                    img: 'https://cdn.bookingcare.vn/fo/2022/02/23/173702-ca03c7ec7699e0c21a18096495e31ab5.jpg',
                                    title: 'Xét nghiệm COVID',
                                    description: [
                                        'Tầm soát và xác định COVID-19',
                                        'Phương pháp Test nhanh & PCR',
                                        'Theo quy chuẩn Bộ Y tế',
                                    ],
                                },
                            ]}
                            timeOut={500}
                        />
                    </div>
                </div>
                <div className="slick-slider-speciality video">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>
                                <FormattedMessage id="homePage.TeleMediCineViaVideo" />
                            </h2>
                            <button>
                                <FormattedMessage id="homePage.more" />
                            </button>
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
                            <h2>
                                <FormattedMessage id="homePage.PopularSpecialties" />
                            </h2>
                            <button>
                                <FormattedMessage id="homePage.more" />
                            </button>
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
                            <h2>
                                <FormattedMessage id="homePage.OutstandingMedicalFacility" />
                            </h2>
                            <button>
                                <FormattedMessage id="homePage.more" />
                            </button>
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
                            <h2>
                                <FormattedMessage id="homePage.LastWeeksFeaturedDoctor" />
                            </h2>
                            <button>
                                <FormattedMessage id="homePage.more" />
                            </button>
                        </div>
                        <FamousDoctor />
                    </div>
                </div>

                <div className="slick-slider-speciality cnang">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>
                                <FormattedMessage id="homePage.Handbook" />
                            </h2>
                            <button>
                                <FormattedMessage id="homePage.more" />
                            </button>
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
                            <h2>
                                <FormattedMessage id="homePage.MediaRalkAboutBookingCare" />
                            </h2>
                        </div>
                        <About />
                    </div>
                </div>
                <div className="slick-slider-speciality danhchobacsi">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>
                                <FormattedMessage id="homePage.ForDoctorsAndMedicalFacilities" />
                            </h2>
                            <button>
                                <FormattedMessage id="homePage.more" />
                            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RenderSlick);
