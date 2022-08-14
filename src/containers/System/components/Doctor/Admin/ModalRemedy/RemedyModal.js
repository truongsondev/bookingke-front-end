import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../../../../utils';

import './REmedyModal.scss';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
        };
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    componentDidUpdate(prevProps, NextProps, SnapSoft) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    handleOnchange = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    handleOnchangeFile = async (e) => {
        let file = e.target.files[0];

        if (file) {
            file = await CommonUtils.convertBase64(file);

            this.setState({
                imageBase64: file,
            });
        }
    };

    SendSemedyModal = () => {
        this.props.SendSemedy(this.state);
    };

    render() {
        const { isOpenRemedyModal } = this.props;

        return (
            <Modal
                isOpen={isOpenRemedyModal}
                toggle={() => this.props.handleCloseModalBooking()}
                className="testTingClassName"
                size="md"
                centered={true}
            >
                <ModalHeader toggle={() => this.props.handleCloseModalBooking()}>Xuất hóa đơn khám bệnh</ModalHeader>
                <ModalBody>
                    <div className="row py-4">
                        <div className="col-12 col-sm-6">
                            <label className="mb-2" htmlFor="sffdhdfbdh">
                                Email gửi hóa đơn
                            </label>
                            <input
                                value={this.state.email}
                                type="email"
                                className="form-control"
                                onChange={(e) => this.handleOnchange(e)}
                                id="sffdhdfbdh"
                                required
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <label className="mb-2" htmlFor="sffdhdfbdhdsdsd">
                                Chọn file hóa đơn
                            </label>
                            <input
                                onChange={(e) => this.handleOnchangeFile(e)}
                                type="file"
                                className="form-control"
                                id="sffdhdfbdhdsdsd"
                                required
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => this.SendSemedyModal()}>
                        Hoàn Thành
                    </button>
                    <button className="btn btn-warning" onClick={() => this.props.handleCloseModalBooking()}>
                        Hủy bỏ
                    </button>
                </ModalFooter>
            </Modal>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
