import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import DatePicker from '../../../../components/Input/DatePicker';

import * as actions from '../../../../store/actions';
import { languages } from '../../../../utils';
// import moment from 'moment/moment';
import { toast } from 'react-toastify';
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DoctorArr: [],
            listDoctors: [],
            selectedOptionDoctorReactSchedule: {},
            currentDate: '',
            rangeTime: [],
            isSuccess: null,
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
            const data = this.props.AllScheduleTime;

            if (data && data.length > 0) {
                const DataMaps = data.map((data) => {
                    return {
                        ...data,
                        isSelected: false,
                    };
                });

                this.setState({
                    rangeTime: DataMaps,
                });
            }
        }

        if (prevProps.BulkSchedule !== this.props.BulkSchedule) {
            if (this.props.BulkSchedule === 0) {
                this.setState({
                    isSuccess: this.props.BulkSchedule,
                });

                toast.warn('🦄 Successfully save bulk!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                this.setState({
                    isSuccess: null,
                });
            } else {
                toast.warn('🦄 Error save bulk!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }
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

    handleClickBtnTime(data) {
        let { rangeTime } = this.state;

        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item, index) => {
                if (item.id === data.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });

            this.setState({
                rangeTime: rangeTime,
            });
        }
    }

    handleSchedule = () => {
        let { rangeTime, selectedOptionDoctorReactSchedule, currentDate } = this.state;
        let result = [];

        if (rangeTime && rangeTime.length > 0) {
            if (!currentDate) {
                toast.warn('🦄 please select a date!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            if (selectedOptionDoctorReactSchedule && _.isEmpty(selectedOptionDoctorReactSchedule)) {
                toast.warn('🦄 please select a doctor!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            // const formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
            // const formatedDate = moment(currentDate).unix();
            const formatedDate = new Date(currentDate).getTime();

            const selectedResult = rangeTime.filter((item) => item.isSelected === true);

            if (selectedResult && selectedResult.length === 0) {
                toast.warn('🦄 please select a time!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            } else {
                // eslint-disable-next-line array-callback-return
                selectedResult.map((item) => {
                    const Obj = {};
                    Obj.doctorId = selectedOptionDoctorReactSchedule.value;
                    Obj.date = String(formatedDate);
                    Obj.timeType = item.keyMap;
                    result.push(Obj);
                });
            }

            this.props.saveBulkSchedule(result);

            setTimeout(() => {
                this.props.fetchAllDoctor();
                this.props.fetScheduleHours('TIME');
            }, 2000);
        }
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
                                minDate={new Date(new Date().valueOf() - 1000 * 3600 * 24)}
                            />
                        </div>

                        <div className="col-12 col-sm-12 pick-hour-container">
                            <div className="row justify-content-center">
                                {rangeTime &&
                                    rangeTime.length > 0 &&
                                    rangeTime.map((data, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={
                                                    data && data.isSelected
                                                        ? 'col-10 col-sm-2 btn mx-3 my-3 btn-schedule active'
                                                        : 'col-10 col-sm-2 btn mx-3 my-3 btn-schedule'
                                                }
                                                onClick={() => this.handleClickBtnTime(data)}
                                            >
                                                {language === languages.VI ? data.valueVI : data.valueEN}
                                            </button>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="col-12 col-sm-12">
                            <button className="btn btn-primary m-0 my-4" onClick={this.handleSchedule}>
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
        BulkSchedule: state.admin.BulkSchedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        SaveDetailDoctor: (data) => dispatch(actions.SaveDetailDoctor(data)),
        fetScheduleHours: (type) => dispatch(actions.fetScheduleHours(type)),
        saveBulkSchedule: (data) => dispatch(actions.saveBulkSchedule(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
