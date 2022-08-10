import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderDetail from '../../../HomePage/Components/HeaderDetail/HeaderDetail';
import './DetailDoctor.scss';
import * as actions from '../../../../store/actions';
import { languages } from '../../../../utils';
import FooterTwo from '../../../HomePage/Components/Footer/FooterTwo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import DoctorSchedule from '../../Schedule';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorInfor: {},
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            await this.props.fetDetailDoctor(this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps, NextProps, Next) {
        if (prevProps.DetailDoctor !== this.props.DetailDoctor) {
            this.setState({
                doctorInfor: this.props.DetailDoctor,
            });
        }
    }

    render() {
        const { doctorInfor } = this.state;

        const { language } = this.props;

        let VI = '';
        let EN = '';

        if (doctorInfor && doctorInfor.positionData && doctorInfor.firstName && doctorInfor.lastName) {
            VI = `${doctorInfor.positionData.valueVI} ${doctorInfor.firstName} ${doctorInfor.lastName}`;
            EN = `${doctorInfor.positionData.valueEN} ${doctorInfor.lastName} ${doctorInfor.firstName}`;
        }

        return (
            <div className="Detail-Doctor-wrapper">
                <HeaderDetail
                    data={{
                        position: doctorInfor.positionData,
                        lastName: doctorInfor.lastName,
                        firstName: doctorInfor.firstName,
                    }}
                />
                <div className="detail-doctor-container">
                    <div className="detail-block">
                        <div className="detail-doctor-introduce container">
                            <div className="detail-doctor-redirect">
                                <p>
                                    <Link to="/home">
                                        <FontAwesomeIcon icon={faHouse} />
                                    </Link>
                                    {/* {doctorInfor && doctorInfor.roleId && (
                                        <span>
                                            {language === languages.VI
                                                ? doctorInfor.roleId === 'R1'
                                                    ? 'Quản trị viên'
                                                    : doctorInfor.roleId === 'R2'
                                                    ? 'Bác sĩ'
                                                    : 'Bệnh nhân'
                                                : doctorInfor.roleId === 'R1'
                                                ? 'Admin'
                                                : doctorInfor.roleId === 'R2'
                                                ? 'Doctor'
                                                : 'Patient'}
                                        </span>
                                    )} */}
                                    {doctorInfor && doctorInfor.positionData && doctorInfor.positionData.valueVI && (
                                        <span>
                                            {language === languages.VI
                                                ? doctorInfor.positionData.valueVI
                                                : doctorInfor.positionData.valueEN}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-3 col-md-2 left-image">
                                    <div
                                        style={{
                                            backgroundImage: `url(${
                                                doctorInfor && doctorInfor.image ? doctorInfor.image : ''
                                            })`,
                                        }}
                                    ></div>
                                </div>
                                <div className="col-9 col-md-10 container-introduce">
                                    <div className="title-introduce">
                                        <h2>{this.props.language === languages.VI ? VI : EN}</h2>
                                    </div>
                                    <div className="description-introduce">
                                        {doctorInfor && doctorInfor.Markdown && doctorInfor.Markdown.description && (
                                            <p>{doctorInfor.Markdown.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="detail-doctor-schedule">
                                <div className="row">
                                    <div className="col-12 col-sm-6 content-left">
                                        <DoctorSchedule
                                            detailDoctorId={doctorInfor && doctorInfor.id ? doctorInfor.id : -1}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6  content-left">
                                        {/* <DoctorSchedule
                                            detailDoctorId={doctorInfor && doctorInfor.id ? doctorInfor.id : -1}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-doctor-info">
                        <div className="container">
                            {doctorInfor && doctorInfor.Markdown && doctorInfor.Markdown.contentHTML && (
                                <>
                                    <div dangerouslySetInnerHTML={{ __html: doctorInfor.Markdown.contentHTML }}></div>
                                    <span className="created-at">
                                        cập nhật lần cuối: {doctorInfor.Markdown.updatedAt}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="detail-doctor-comment"></div>
                </div>
                <FooterTwo />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        DetailDoctor: state.admin.DetailDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetDetailDoctor: (id) => dispatch(actions.fetDetailDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
