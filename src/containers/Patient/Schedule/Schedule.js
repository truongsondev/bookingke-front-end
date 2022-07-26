import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Schedule.scss';
import * as actions from '../../../store/actions';
import moment from 'moment';
import localization from 'moment/locale/vi'; // import để moment hiểu tiếng việt
import { languages } from '../../../utils';
import { faCalendarDays, faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import BookingModal from '../Modal/BookingModal';
import { getScheduleDoctorByDate } from '../../../services/doctorServices';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataModalBookingTime: {},
        };
    }

    async componentDidMount() {
        let arrDay = this.getArrDay(); //Môi tạo thơi gian

        this.setState({
            allDay: arrDay,
        });

        if (this.props.callAsync) {
            if (this.props.detailDoctorId) {
                let Res = await getScheduleDoctorByDate(this.props.detailDoctorId, arrDay[0].value);

                if (Res && Res.errCode === 0) {
                    this.setState({
                        allAvalableTime: Res.data ? Res.data : [],
                    });
                }
            }
        }
    }

    getArrDay() {
        const allDay = [];

        for (let i = 0; i < 7; i++) {
            let Obj = {};

            if (this.props.language === languages.VI) {
                if (i === 0) {
                    const DateTime = (Obj.label = moment(new Date()).add(i, 'day').format('DD/MM'));
                    const today = `Hôm nay ${DateTime}`;
                    Obj.label = today;
                } else {
                    const label = (Obj.label = moment(new Date()).add(i, 'day').format('dddd - DD/MM'));
                    Obj.label = this.capitalizeFirstLetter(label);
                }
            } else {
                if (i === 0) {
                    const DateTime = moment(new Date()).add(i, 'day').locale('en').format('DD/MM');
                    const today = `Today ${DateTime}`;
                    Obj.label = today;
                } else {
                    Obj.label = moment(new Date()).add(i, 'day').locale('en').format('ddd - DD/MM');
                }
            }
            Obj.value = moment(new Date()).add(i, 'day').startOf('day').valueOf();
            allDay.push(Obj);
        }

        return allDay;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidUpdate(prevProps, NextProps, Next) {
        if (prevProps.language !== this.props.language) {
            let arrDay = this.getArrDay(); // Sử lí khi thay đổi

            this.setState({
                allDay: arrDay,
            });
        }

        // lí do vì gọi API trên redux do đó khi render
        // component trên specialty thì call 1 api nhưng lại setState nhiều lần

        if (!this.props.callAsync) {
            if (prevProps.ScheduleDoctorByDate !== this.props.ScheduleDoctorByDate) {
                this.setState({
                    allAvalableTime: this.props.ScheduleDoctorByDate,
                });
            }
        }

        if (prevProps.detailDoctorId !== this.props.detailDoctorId) {
            let doctorID = this.props.detailDoctorId;
            const allDay = this.getArrDay(this.props.language);

            return this.props.getScheduleDoctor(doctorID, allDay[0].value);
        }
    }

    async handleChangeSelect(e) {
        if (this.props.detailDoctorId && this.props.detailDoctorId !== -1) {
            let doctorID = this.props.detailDoctorId;

            const Date = e.target.value;

            if (!this.props.callAsync) {
                this.props.getScheduleDoctor(doctorID, Date);
            } else {
                let Res = await getScheduleDoctorByDate(doctorID, Date);

                if (Res && Res.errCode === 0) {
                    this.setState({
                        allAvalableTime: Res.data ? Res.data : [],
                    });
                }
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            dataModalBookingTime: time,
            isOpenModalBooking: !this.state.isOpenModalBooking,
        });
    };

    handleCloseModalBooking = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking,
        });
    };

    render() {
        let { allDay, allAvalableTime, isOpenModalBooking, dataModalBookingTime } = this.state;
        const { language } = this.props;

        const checklog = localization;
        return (
            <>
                <div className="doctor-schedule-wrapper">
                    {false && checklog}
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleChangeSelect(e)}>
                            {allDay &&
                                allDay.length > 0 &&
                                // eslint-disable-next-line array-callback-return
                                allDay.map((data, index) => {
                                    return (
                                        <option value={data.value} key={index}>
                                            {data.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <span className="mt-2 d-flex">
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <FormattedMessage id="patient.detail-doctor" />
                            </span>
                        </div>
                        <div className="time-calendar-schedule container">
                            <div className="row">
                                {allAvalableTime && allAvalableTime.length > 0 ? (
                                    allAvalableTime.map((data, index) => (
                                        <div className="col-6 col-md-6 col-lg-3 my-2 " key={index}>
                                            <button
                                                className={
                                                    language === languages.VI
                                                        ? 'btn btn-primary'
                                                        : 'btn btn-primary button-en'
                                                }
                                                onClick={() => this.handleClickScheduleTime(data)}
                                            >
                                                {language === languages.VI
                                                    ? data.timeTypeData.valueVI
                                                    : data.timeTypeData.valueEN}
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ padding: '10px 0 0 10px' }}>
                                        <FormattedMessage id="patient.no-schedule" />
                                    </p>
                                )}
                            </div>
                            <div className="select-free">
                                {allAvalableTime && allAvalableTime.length > 0 && (
                                    <span>
                                        chọn
                                        <FontAwesomeIcon icon={faHandPointer} />
                                        và đặt (Phí đặt 0<sup>đ</sup>)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <BookingModal
                    dataTime={dataModalBookingTime}
                    handleCloseModalBooking={this.handleCloseModalBooking}
                    isOpenModal={isOpenModalBooking}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        DoctorSchedule: state.admin.DoctorSchedule,
        language: state.app.language,
        ScheduleDoctorByDate: state.admin.ScheduleDoctorByDate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getScheduleDoctor: (doctorId, date) => dispatch(actions.getScheduleDoctor(doctorId, date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
