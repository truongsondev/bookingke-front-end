import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './BookingModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ProfileDoctor from '../Doctor/ProfileDoctor/ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps, NextProps, Next) {}

    render() {
        const { isOpenModal, dataTime } = this.props;

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
                                <span className="header-left">Thông tin đặt lịch khám bệnh</span>
                                <span className="header-right" onClick={() => this.props.handleCloseModalBooking()}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                            </div>
                            <div className="booking-modal-body container">
                                <div className="doctor_info">
                                    <ProfileDoctor
                                        doctorId={!_.isEmpty(dataTime) && dataTime.doctorId ? dataTime.doctorId : ''}
                                    />
                                </div>

                                <div className="body-form">
                                    <div className="row">
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="hotenasa" className="form-label">
                                                Họ tên
                                            </label>
                                            <input className="form-control" type="text" id="hotenasa" />
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="dienthoai" className="form-label">
                                                Số điện thoại
                                            </label>
                                            <input className="form-control" type="text" id="dienthoai" />
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="diachiemail" className="form-label">
                                                Địa chỉ email
                                            </label>
                                            <input className="form-control" type="text" id="diachiemail" />
                                        </div>

                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="diachilienhe" className="form-label">
                                                Địa chỉ liên hệ
                                            </label>
                                            <input className="form-control" type="text" id="diachilienhe" />
                                        </div>
                                        <div className="mb-3 col-12">
                                            <label htmlFor="lidokham" className="form-label">
                                                Lí do khám
                                            </label>
                                            <textarea className="form-control" type="text" id="lidokham" />
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="lidokham" className="form-label">
                                                Đặt cho ai
                                            </label>
                                            <input className="form-control" type="text" id="lidokham" />
                                        </div>
                                        <div className="mb-3 col-12 col-md-6">
                                            <label htmlFor="lidokham" className="form-label">
                                                Giới tính
                                            </label>
                                            <input className="form-control" type="text" id="lidokham" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="booking-modal-footer">
                                <div>
                                    <button className="btn btn-primary px-2 mx-2">Xác nhận</button>
                                    <button
                                        className="btn btn-warning px-2 mx-2 me-3"
                                        onClick={() => this.props.handleCloseModalBooking()}
                                    >
                                        Hủy bỏ
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
