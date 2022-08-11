import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { languages } from '../../../../utils';
import './ProfileDoctor.scss';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let id = this.props.doctorId;

        this.getProfileDoctor(id);
    }

    componentDidUpdate(prevProps, NextProps, Next) {
        if (prevProps.doctorId !== this.props.doctorId) {
            this.getProfileDoctor(this.props.doctorId);
        }

        if (prevProps.profileDoctorInfo !== this.props.profileDoctorInfo) {
            this.setState({
                dataProfile: this.props.profileDoctorInfo,
            });
        }
    }

    getProfileDoctor = (id) => {
        let result = {};

        if (id) {
            result = this.props.getProfileDoctorInfoByID(id);
        }

        return result;
    };

    renderTimeBooking = (dataTime) => {
        const { language } = this.props;

        console.log('check date 1:', dataTime);

        if (dataTime && !_.isEmpty(dataTime)) {
            let date =
                language === languages.VI
                    ? moment(new Date(Number(dataTime.date))).format('dddd - DD/MM/YYYY')
                    : moment(new Date(Number(dataTime.date))).format('ddd - MM/DD/YYYY');

            return (
                <div>
                    <div>
                        {language === languages.VI ? dataTime.timeTypeData.valueVI : dataTime.timeTypeData.valueEN} -{' '}
                        {date}
                    </div>
                    <div>
                        <FormattedMessage id="admin.bookingModal.description" />
                    </div>
                </div>
            );
        }

        return '';
    };

    render() {
        console.log('check state profile :', this.state);

        const { dataProfile } = this.state;

        const { language, isShowHideDescriptionDoctor, dataTime } = this.props;

        let VI = '';
        let EN = '';

        if (dataProfile && dataProfile.firstName && dataProfile.lastName) {
            VI = `${dataProfile.firstName} ${dataProfile.lastName}`;
            EN = `${dataProfile.lastName} ${dataProfile.firstName}`;
        }

        return (
            <div className="profile-doctor-wrapper">
                <div className="row">
                    <div className="col-4 col-md-3 col-lg-2 left-image">
                        <div
                            style={{
                                backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                            }}
                        ></div>
                    </div>
                    <div className="col-8 col-md-9  col-lg-10 container-introduce">
                        <div className="title-introduce">
                            <h2>{this.props.language === languages.VI ? VI : EN}</h2>
                        </div>
                        <div className="description-introduce">
                            {isShowHideDescriptionDoctor ? (
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                        <p>{dataProfile.Markdown.description}</p>
                                    )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="content-price">
                    <span>
                        <FormattedMessage id="admin.bookingModal.ExamplePice" /> :
                    </span>
                    <span>
                        {language === languages.VI ? (
                            dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData ? (
                                <NumberFormat
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueVI}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            ) : (
                                ''
                            )
                        ) : dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData ? (
                            <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEN}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        ) : (
                            ''
                        )}
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        profileDoctorInfo: state.admin.profileDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProfileDoctorInfoByID: (id) => dispatch(actions.getProfileDoctorInfoByID(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);