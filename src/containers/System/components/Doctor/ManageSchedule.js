import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import DatePicker from '../../../../components/Input/DatePicker';

import * as actions from '../../../../store/actions';
import { languages } from '../../../../utils';
import moment from 'moment/moment';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DoctorArr: [],
            listDoctors: [],
            selectedOptionDoctorReactSchedule: {},
            currentDate: new Date(),
            rangeTime: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetScheduleHours('TIME');
    }

    componentDidUpdate(prevProps, props, next) {
        if (prevProps.AllDoctor !== this.props.AllDoctor) {
            const dataSelect = this.buildDataInputSelect(this.props.AllDoctor);

            this.setState({
                DoctorArr: this.props.AllDoctor,
                listDoctors: dataSelect,
            });
        }

        if (prevProps.AllScheduleTime !== this.props.AllScheduleTime) {
            this.setState({
                rangeTime: this.props.AllScheduleTime,
            });
        }
    }

    handleChangeSelectReact = (selectedOptionDoctorReactSchedule) => {
        this.setState({
            selectedOptionDoctorReactSchedule: selectedOptionDoctorReactSchedule,
        });
    };

    buildDataInputSelect = (data) => {
        let result = [];
        const language = this.props.language;

        if (data && data.length > 0) {
            // eslint-disable-next-line array-callback-return
            data.map((item, index) => {
                const Obj = {};
                const labelVI = `${item.firstName} ${item.lastName}`;
                const labelEN = `${item.lastName} ${item.firstName}`;
                Obj.label = language === languages.VI ? labelVI : labelEN;

                Obj.value = item.id;

                result.push(Obj);
            });
        }

        return result;
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
        const { rangeTime } = this.state;
        const { language } = this.props;

        return (
            <div className="wrapper-manage-schedule">
                <div className="container">
                    <div className="title" size="sm">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <label>
                                <FormattedMessage id="manage-schedule.ChoosseDoctor" />
                            </label>
                            <Select
                                placeholder="Vui lòng chọn bác sĩ"
                                id="select-doctor"
                                value={this.state.selectedOptionDoctorReactSchedule}
                                onChange={this.handleChangeSelectReact}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <label>
                                <FormattedMessage id="manage-schedule.ChooseDate" />
                            </label>
                            <DatePicker
                                value={this.state.currentDate}
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                minDate={new Date()}
                            />
                        </div>

                        <div className="col-12 col-sm-12 pick-hour-container">
                            <div className="row justify-content-center">
                                {rangeTime &&
                                    rangeTime.length > 0 &&
                                    rangeTime.map((data, index) => (
                                        <button key={index} className="col-10 col-sm-2 btn mx-3 my-3 btn-schedule">
                                            {language === languages.VI ? data.valueVI : data.valueEN}
                                        </button>
                                    ))}
                            </div>
                        </div>
                        <div className="col-12 col-sm-12">
                            <button className="btn btn-primary m-0 my-4">
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
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
        user: state.user.userInfo,
        language: state.app.language,
        AllDoctor: state.admin.AllDoctor,
        AllScheduleTime: state.admin.AllScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        SaveDetailDoctor: (data) => dispatch(actions.SaveDetailDoctor(data)),
        fetScheduleHours: (type) => dispatch(actions.fetScheduleHours(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
