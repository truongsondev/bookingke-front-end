import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from '../../../../../components/Input/DatePicker';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        };
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps, NextProps, Next) {}

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
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
                                    <table class="table mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">First</th>
                                                <th scope="col">Last</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
