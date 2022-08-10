import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Schedule.scss';
import * as actions from '../../../store/actions';
import moment from 'moment';
import localization from 'moment/locale/vi'; // import để moment hiểu tiếng việt
import { languages } from '../../../utils';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            allAvalableTime: [],
        };
    }

    setArrDate() {
        const allDay = [];

        for (let i = 0; i < 7; i++) {
            let Obj = {};

            if (this.props.language === languages.VI) {
                const label = (Obj.label = moment(new Date()).add(i, 'day').format('dddd - DD/MM'));

                Obj.label = this.capitalizeFirstLetter(label);
            } else {
                Obj.label = moment(new Date()).add(i, 'day').locale('en').format('ddd - DD/MM');
            }
            Obj.value = moment(new Date()).add(i, 'day').startOf('day').valueOf();
            allDay.push(Obj);
        }

        this.setState({
            allDay: allDay,
        });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        this.setArrDate(); //Môi tạo thơi gian
    }

    componentDidUpdate(prevProps, NextProps, Next) {
        if (prevProps.language !== this.props.language) {
            this.setArrDate(); // Sử lí khi thay đổi
        }

        if (prevProps.ScheduleDoctorByDate !== this.props.ScheduleDoctorByDate) {
            this.setState({
                allAvalableTime: this.props.ScheduleDoctorByDate,
            });
        }
    }

    handleChangeSelect(e) {
        if (this.props.detailDoctorId && this.props.detailDoctorId !== -1) {
            let doctorID = this.props.detailDoctorId;

            const Date = e.target.value || this.state.allDay[0].value;

            this.props.getScheduleDoctor(doctorID, Date);
        }
    }

    render() {
        const { allDay, allAvalableTime } = this.state;
        const { language } = this.props;
        console.info(localization);

        return (
            <div className="doctor-schedule-wrapper">
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
                            lịch khám
                        </span>
                    </div>
                    <div className="time-calendar-schedule">
                        <div className="row">
                            {allAvalableTime && allAvalableTime.length > 0 ? (
                                allAvalableTime.map((data, index) => (
                                    <div className="col-6 col-sm-3 my-2 " key={index}>
                                        <button className="btn btn-primary">
                                            {language === languages.VI
                                                ? data.timeTypeData.valueVI
                                                : data.timeTypeData.valueEN}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p style={{ padding: '10px 0 0 0' }}>Bác sĩ không có lịch khám</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
