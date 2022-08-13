import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import SlickSlider from './Section/ChukSlickSlider';
import './HomePage.scss';
import FamousDoctor from './Section/FamousDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import * as actions from '../../store/actions';
import SpeciatlySlick from './Section/SpeciatlySlick';
import HealthFacilities from './Section/HealthFacilities';
import HandbookSlick from './Section/HandbookSlick';
import Banner from './Section/Banner';
class RenderSlick extends Component {
    render() {
        return (
            <div>
                <div className="slick-slider-speciality banner">
                    <div className="slider-speciality">
                        <Banner timeOut={500} />
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
                        <SpeciatlySlick />
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
                        <HealthFacilities timeOut={1000} />
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
                        <HandbookSlick />
                    </div>
                </div>
                <div className="slick-slider-speciality truyenthong">
                    <div className="slider-speciality">
                        <div className="slider-speciality-header">
                            <h2>
                                <FormattedMessage id="homePage.MediaRalkAboutBookingTS" />
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
                        <Handbook />
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RenderSlick);
