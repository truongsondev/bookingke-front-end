import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from '../../../../../components/Input/DatePicker';
import { getAllPatientForDoctorService } from '../../../../../services/doctorServices';
import moment from 'moment';
import _ from 'lodash';
import { languages } from '../../../../../utils';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
        };
    }

    async componentDidMount() {
        const { currentDate } = this.state;

        this.getDataParence(currentDate);
    }

    getDataParence = async (currentDate) => {
        if (this.props.user) {
            const Res = await getAllPatientForDoctorService(this.props.user.id, currentDate);

            if (Res && Res.errCode === 0) {
                this.setState({
                    dataPatient: Res.data,
                });
            }
        }
    };

    componentDidUpdate(prevProps, NextProps, Next) {}

    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: moment(date[0]).startOf('day').valueOf(),
            },
            () => {
                const { currentDate } = this.state;

                this.getDataParence(currentDate);
            },
        );
    };

    render() {
        const { dataPatient } = this.state;

        return (
            <div className="manage-patient-container">
                <div className="container">
                    <div className="body-manage-patient">
                        <div>
                            <h2 className="title">Quản lí bệnh nhân khám bệnh</h2>
                        </div>
                        <div className="body-manage-patient-container">
                            <div className="row">
                                <div className="col-12 col-sm-6 mb-3">
                                    <label className="label mb-2" htmlFor="sfsfsfdsfdsfds">
                                        Chọn ngày
                                    </label>
                                    <DatePicker
                                        value={this.state.currentDate}
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                        minDate={new Date(new Date().valueOf() - 1000 * 3600 * 24)}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 mb-3">
                                    <label className="label mb-2" htmlFor="sfsfsfdsfdsfds">
                                        Danh Sách Bệnh Nhân Đặt Lịch
                                    </label>
                                    <table className="table mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Họ Và Tên</th>
                                                <th scope="col">Gới tính</th>
                                                <th scope="col">Địa chỉ</th>
                                                <th scope="col">Thời gian khám</th>
                                                <th scope="col">Xác nhận của bác sĩ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataPatient &&
                                                dataPatient.length > 0 &&
                                                dataPatient.map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>
                                                                {!_.isEmpty(data.patientData) &&
                                                                data.patientData.firstName
                                                                    ? data.patientData.firstName
                                                                    : ''}
                                                            </td>
                                                            <td>
                                                                {!_.isEmpty(data.patientData) &&
                                                                !_.isEmpty(data.patientData.genderData) &&
                                                                data.patientData.genderData.valueEN &&
                                                                data.patientData.genderData.valueVI &&
                                                                this.props.language === languages.VI
                                                                    ? data.patientData.genderData.valueVI
                                                                    : data.patientData.genderData.valueEN}
                                                            </td>
                                                            <td>
                                                                {!_.isEmpty(data.patientData) &&
                                                                data.patientData.address
                                                                    ? data.patientData.address
                                                                    : 'Đang cập nhật'}
                                                            </td>
                                                            <td>
                                                                {!_.isEmpty(data.timeData) &&
                                                                data.timeData.valueVI &&
                                                                data.timeData.valueEN &&
                                                                this.props.language === languages.VI
                                                                    ? data.timeData.valueVI
                                                                    : data.timeData.valueEN}
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <button className="btn btn-primary mx-2">
                                                                        Xác nhận
                                                                    </button>
                                                                    <button className="btn btn-warning mx-2">
                                                                        Hủy
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
