import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VerifyBookingAppointment } from '../../../services';
import './verifyEmail.scss';
import HomeHeader from '../../HomePage/Components/Header/HomeHeader';
import Trademark from '../../../assets/images/Logo2.jpg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../System/components/Loading';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');

            let Res = await VerifyBookingAppointment({
                token,
                doctorId,
            });

            if (Res && Res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: Res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: Res && Res.errCode ? Res.errCode : -1,
                });
            }
        }
    }

    componentDidUpdate(prevProps, NextProps, Next) {}

    render() {
        const { statusVerify, errCode } = this.state;

        return (
            <div className="verify-email-container">
                <HomeHeader />
                <div className="container trademark-true-nf">
                    {statusVerify === false ? (
                        <Loading />
                    ) : errCode === 0 ? (
                        <div>
                            <div className="trademark">
                                <Link to="/home">
                                    <div style={{ backgroundImage: `url(${Trademark})` }}></div>
                                </Link>
                                <span>
                                    <strong>Lịch khám của bạn đã được xác nhận thành công !</strong>
                                </span>
                            </div>
                            <div className="body-very">
                                <p>
                                    Bạn muốn quay lại trang chủ ? <a href="/">click me !</a>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="trademark">
                                <Link to="/home">
                                    <div style={{ backgroundImage: `url(${Trademark})` }}></div>
                                </Link>
                                <span>
                                    <strong>Lịch khám của bạn đã được xác nhận vui lòng không spam!</strong>
                                </span>
                            </div>
                            <div className="body-very">
                                <p>
                                    Bạn muốn quay lại trang chủ ? <a href="/">click me !</a>
                                </p>
                            </div>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
