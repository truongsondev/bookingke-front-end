import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Schedule.scss';
import * as actions from '../../../store/actions';
import moment from 'moment';
import localization from 'moment/locale/vi'; // import để moment hiểu tiếng việt
import { languages } from '../../../utils';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
        };
    }

    setArrDate() {
        const allDay = [];

        for (let i = 0; i < 7; i++) {
            let Obj = {};

            if (this.props.language === languages.VI) {
                Obj.label = moment(new Date()).add(i, 'day').format('dddd - DD/MM');
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

    async componentDidMount() {
        this.setArrDate(); //Môi tạo thơi gian
    }

    componentDidUpdate(prevProps, NextProps, Next) {
        if (prevProps.language !== this.props.language) {
            this.setArrDate(); // Sử lí khi thay đổi
        }
    }

    handleChangeSelect(e) {
        if (this.props.detailDoctorId && this.props.detailDoctorId !== -1) {
            let doctorID = this.props.detailDoctorId;

            const Date = e.target.value;

            this.props.getScheduleDoctor(doctorID, Date);
        }
    }

    render() {
        const { allDay } = this.state;

        console.log('check props :', this.props.ScheduleDoctorByDate);

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
                <div className="all-available-time"></div>
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
