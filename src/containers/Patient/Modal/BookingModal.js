import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ProfileDoctor from '../Doctor/ProfileDoctor/ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../components/Input/DatePicker';
import { languages } from '../../../utils';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import * as EmailValidator from 'email-validator';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            doctorId: '',
            timeTypeData: '',
            timeType: '',
            genders: [],
            selectedGender: {},
        };
    }

    async componentDidMount() {
        this.props.fetChGenders();
    }

    componentDidUpdate(prevProps, NextProps, Next) {
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime !== !_.isEmpty(this.props.dataTime)) {
                this.setState({
                    doctorId: this.props.dataTime.doctorId,
                    timeType: this.props.dataTime.timeType,
                    timeTypeData: JSON.stringify(this.props.dataTime.timeTypeData),
                });
            }
        }

        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
    }

    handleOnchangeInput(e, id) {
        // Good code không nên sửa trực tiếp

        const cloneState = { ...this.state };

        cloneState[id] = e.target.value;

        this.setState({
            ...cloneState,
        });
    }

    buildTimeBooking = (dataTime) => {
        const { language } = this.props;

        console.log('check date 1:', dataTime);

        if (dataTime && !_.isEmpty(dataTime)) {
            let Time = language === languages.VI ? dataTime.timeTypeData.valueVI : dataTime.timeTypeData.valueEN;

            let date =
                language === languages.VI
                    ? moment(new Date(Number(dataTime.date))).format('dddd - DD/MM/YYYY')
                    : moment(new Date(Number(dataTime.date))).format('ddd - MM/DD/YYYY');

            return `${Time} ${date}`;
        }

        return '';
    };

    buildDoctorBooking = (dataTime) => {
        const { language } = this.props;

        console.log('check date 1:', dataTime);

        if (dataTime && !_.isEmpty(dataTime)) {
            let DoctorName =
                language === languages.VI
                    ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                    : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;

            return DoctorName;
        }

        return '';
    };

    buildDataGender = (data) => {
        let language = this.props.language;
        let result = [];

        if (data && data.length > 0) {
            // eslint-disable-next-line array-callback-return
            data.map((data) => {
                let Obj = {};

                Obj.label = language === languages.VI ? data.valueVI : data.valueEN;
                Obj.value = data.keyMap;

                result.push(Obj);
            });

            return result;
        }
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    };

    handleChangeSelectReactGender = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    };

    handleValidateState = (data) => {
        let validate = true;

        const ArrValidate = ['fullName', 'phoneNumber', 'address', 'reason', 'birthday'];

        const check = EmailValidator.validate(this.state.email);

        if (check) {
            for (let i = 0; i < ArrValidate.length; i++) {
                if (!this.state[ArrValidate[i]]) {
                    validate = false;
                    alert('Missing required parameter ' + ArrValidate[i]);
                    break;
                }
            }
        } else {
            validate = false;
            alert('Missing required @gmail.com ');
        }

        return validate;
    };

    // !data.email || !data.timeType || !data.date || !data.doctorId

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();

        const check = this.handleValidateState(this.state);
        const TimeString = this.buildTimeBooking(this.props.dataTime);
        const DoctorName = this.buildDoctorBooking(this.props.dataTime);

        if (check) {
            this.props.postPatientBookingAppointment({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: date,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                timeTypeData: this.state.timeTypeData,
                selectedGender: this.state.selectedGender.value,
                language: this.props.language,
                TimeString: TimeString,
                doctorName: DoctorName,
            });

            setTimeout(() => {
                this.props.handleCloseModalBooking();
            }, 1000);
        }
    };

    handleValidateOnchangePhone = (e) => {
        this.setState({
            phoneNumber: e,
        });
    };

    render() {
        const { isOpenModal, dataTime } = this.props;

        const { fullName, phoneNumber, email, address, reason, birthday, genders, selectedGender } = this.state;

        return (
            <div className="booking-modal-wrapper">
                <div className="container">
                    <Modal
                        isOpen={isOpenModal}
                        toggle={() => this.props.handleCloseModalBooking()}
                        className="testTingClassName"
                        size="lg"
                        centered={true}
                    >
                        <div className="content-booking">
                            <div className="booking-modal-header">
                                <span className="header-left">
                                    <FormattedMessage id="admin.bookingModal.title" />
                                </span>
                                <span className="header-right" onClick={() => this.props.handleCloseModalBooking()}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                            </div>
                            <div className="booking-modal-body container">
                                <div className="doctor_info">
                                    <ProfileDoctor
                                        doctorId={!_.isEmpty(dataTime) && dataTime.doctorId ? dataTime.doctorId : ''}
                                        isShowHideDescriptionDoctor={false}
                                        dataTime={dataTime}
                                    />
                                </div>

                                <div className="body-form">
                                    <div className="row">
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="hotenasa" className="form-label">
                                                <FormattedMessage id="admin.bookingModal.fullName" />
                                            </label>
                                            <input
                                                value={fullName}
                                                onChange={(e) => this.handleOnchangeInput(e, 'fullName')}
                                                className="form-control"
                                                type="text"
                                                id="hotenasa"
                                            />
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="dienthoai" className="form-label">
                                                <FormattedMessage id="admin.bookingModal.phoneNumber" />
                                            </label>
                                            <PhoneInput
                                                placeholder="Enter phone number"
                                                value={phoneNumber}
                                                onChange={this.handleValidateOnchangePhone}
                                                defaultCountry="VN"
                                                limitMaxLength="10"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="diachiemail" className="form-label">
                                                <FormattedMessage id="admin.bookingModal.emailAddress" />
                                            </label>
                                            <input
                                                value={email}
                                                onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                                className="form-control"
                                                type="text"
                                                id="diachiemail"
                                            />
                                        </div>

                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="diachilienhe" className="form-label">
                                                <FormattedMessage id="admin.bookingModal.contactAddress" />
                                            </label>
                                            <input
                                                value={address}
                                                onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                                className="form-control"
                                                type="text"
                                                id="diachilienhe"
                                            />
                                        </div>
                                        <div className="mb-3 col-12">
                                            <label htmlFor="lidokham" className="form-label">
                                                <FormattedMessage id="admin.bookingModal.ReasonForExamination" />
                                            </label>
                                            <textarea
                                                value={reason}
                                                onChange={(e) => this.handleOnchangeInput(e, 'reason')}
                                                className="form-control"
                                                type="text"
                                                id="lidokham"
                                            />
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="lidokham" className="form-label">
                                                <FormattedMessage id="admin.bookingModal.birthday" />
                                            </label>
                                            <DatePicker
                                                value={birthday}
                                                className="form-control"
                                                onChange={this.handleOnChangeDatePicker}
                                                // minDate={new Date(new Date().valueOf() - 1000 * 3600 * 24)}
                                            />
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="lidokham" className="form-label">
                                                <FormattedMessage id="admin.bookingModal.gender" />
                                            </label>
                                            <Select
                                                placeholder="Vui lòng chọn giới tính"
                                                id="select-doctor"
                                                value={selectedGender}
                                                onChange={this.handleChangeSelectReactGender}
                                                options={genders}
                                            />
                                            {/* <input
                                                value={gender}
                                                onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                                className="form-control"
                                                type="text"
                                                id="lidokham"
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="booking-modal-footer">
                                <div>
                                    <button
                                        className="btn btn-primary px-2 mx-2"
                                        onClick={() => this.handleConfirmBooking()}
                                    >
                                        <FormattedMessage id="admin.bookingModal.btnConfirm" />
                                    </button>
                                    <button
                                        className="btn btn-warning px-2 mx-2 me-3"
                                        onClick={() => this.props.handleCloseModalBooking()}
                                    >
                                        <FormattedMessage id="admin.bookingModal.btnClose" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        genders: state.admin.genders,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetChGenders: () => dispatch(actions.fetChGenderStart()),
        postPatientBookingAppointment: (data) => dispatch(actions.postPatientBookingAppointment(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
