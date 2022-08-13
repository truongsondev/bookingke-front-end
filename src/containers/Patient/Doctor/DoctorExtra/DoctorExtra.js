import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtra.scss';
import * as actions from '../../../../store/actions';
import { languages } from '../../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
import { getExtraDoctorInfoByIDService } from '../../../../services/doctorServices';

class DoctorExtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHideShowPrice: false,
            extraDoctorInfoState: {},
        };
    }

    async componentDidMount() {
        if (!this.props.callAsync) {
            this.props.getExtraDoctorInfoByID(this.props.detailDoctorId);
        } else {
            const Res = await getExtraDoctorInfoByIDService(this.props.detailDoctorId);

            if (Res && Res.errCode === 0) {
                this.setState({
                    extraDoctorInfoState: Res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, NextProps, Next) {
        if (prevProps.language !== this.props.language) {
        }

        if (!this.props.callAsync) {
            if (prevProps.detailDoctorId !== this.props.detailDoctorId) {
                if (!this.props.callAsync) {
                    this.props.getExtraDoctorInfoByID(this.props.detailDoctorId);
                } else {
                    const Res = await getExtraDoctorInfoByIDService(this.props.detailDoctorId);

                    if (Res && Res.errCode === 0) {
                        this.setState({
                            extraDoctorInfoState: Res.data,
                        });
                    }
                }
            }
        }

        if (prevProps.extraDoctorInfo !== this.props.extraDoctorInfo) {
            this.setState({
                extraDoctorInfoState: this.props.extraDoctorInfo,
            });
        }
    }

    handleHideShow = () => {
        this.setState({
            isHideShowPrice: !this.state.isHideShowPrice,
        });
    };

    render() {
        const { extraDoctorInfoState } = this.state;
        const { language } = this.props;

        return (
            <div className="doctor-extra-wrapper">
                <div className="content-up">
                    <div className="title-fixed">
                        <p>{<FormattedMessage id="admin.extra.AddressOfExamination" />}</p>
                    </div>
                    <div className="title-dynamic-name-csyt">
                        <p>
                            {extraDoctorInfoState && extraDoctorInfoState.nameClinic
                                ? extraDoctorInfoState.nameClinic
                                : 'Đang cập nhật'}
                        </p>
                    </div>
                    <div className="address-dynamic-clinic">
                        <p>
                            {extraDoctorInfoState && extraDoctorInfoState.addressClinic
                                ? extraDoctorInfoState.addressClinic
                                : 'Đang cập nhật'}
                        </p>
                    </div>
                </div>
                <div className="content-down">
                    <div className="content-title">
                        <p>
                            <span className="text-gia-kham">{<FormattedMessage id="admin.extra.ExamplePice" />}:</span>
                            {!this.state.isHideShowPrice && (
                                <span className="text-gia-kham-event">
                                    {language === languages.VI ? (
                                        extraDoctorInfoState && extraDoctorInfoState.priceTypeData ? (
                                            <NumberFormat
                                                value={extraDoctorInfoState.priceTypeData.valueVI}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        ) : (
                                            ''
                                        )
                                    ) : extraDoctorInfoState && extraDoctorInfoState.priceTypeData ? (
                                        <NumberFormat
                                            value={extraDoctorInfoState.priceTypeData.valueEN}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    .
                                    <button onClick={this.handleHideShow}>
                                        {<FormattedMessage id="admin.extra.SeeDetails" />}
                                    </button>
                                </span>
                            )}
                        </p>
                    </div>
                    {this.state.isHideShowPrice && (
                        <div className="hide-show">
                            <div className="content-hide-show-body">
                                <div className="content-hide-show-body-price">
                                    <span>{<FormattedMessage id="admin.extra.ExamplePice" />}</span>
                                    <span>
                                        {language === languages.VI ? (
                                            extraDoctorInfoState && extraDoctorInfoState.priceTypeData ? (
                                                <NumberFormat
                                                    value={extraDoctorInfoState.priceTypeData.valueVI}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            ) : (
                                                ''
                                            )
                                        ) : extraDoctorInfoState && extraDoctorInfoState.priceTypeData ? (
                                            <NumberFormat
                                                value={extraDoctorInfoState.priceTypeData.valueEN}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                </div>
                                <p className="content-hide-show-body-description">
                                    {extraDoctorInfoState && extraDoctorInfoState.note ? extraDoctorInfoState.note : ''}
                                </p>
                            </div>
                            {true && (
                                <div className="dich-vu-lien-quan">
                                    <span className="text-gia-kham">
                                        {<FormattedMessage id="admin.extra.TYPEOFINSURANCE" />}:
                                    </span>
                                    <div className="content-hide-show-body">
                                        <div className="content-hide-show-body-price">
                                            <span>{<FormattedMessage id="admin.extra.StateHealthInsurance" />}</span>
                                            <span>230.000Vnđ - 560.000Vnđ</span>
                                        </div>
                                        <p
                                            className={
                                                this.props.callAsync
                                                    ? 'content-hide-show-body-description layout-2'
                                                    : 'content-hide-show-body-description'
                                            }
                                        >
                                            {<FormattedMessage id="admin.extra.healthInsurance" />}
                                        </p>
                                    </div>
                                    <div className="content-hide-show-body">
                                        <div className="content-hide-show-body-price">
                                            <span>{<FormattedMessage id="admin.extra.PrivateHealthInsurance" />}</span>
                                        </div>
                                        <p
                                            className={
                                                this.props.callAsync
                                                    ? 'content-hide-show-body-description baohiem layout-2'
                                                    : 'content-hide-show-body-description baohiem'
                                            }
                                        >
                                            {<FormattedMessage id="admin.extra.descriptionPrivateHealthInsurance" />}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <p className="bank-cart">
                                {<FormattedMessage id="admin.extra.PatientsCanPayVia" />}
                                {language === languages.VI
                                    ? extraDoctorInfoState &&
                                      extraDoctorInfoState.payMentTypeData &&
                                      extraDoctorInfoState.payMentTypeData.valueVI
                                        ? ` ${extraDoctorInfoState.payMentTypeData.valueVI}`
                                        : ''
                                    : extraDoctorInfoState &&
                                      extraDoctorInfoState.payMentTypeData &&
                                      extraDoctorInfoState.payMentTypeData.valueEN
                                    ? ` ${extraDoctorInfoState.payMentTypeData.valueEN}`
                                    : ''}
                            </p>
                            <div className="toggle-hide-show">
                                <button onClick={this.handleHideShow}>
                                    {<FormattedMessage id="admin.extra.HideByPrice" />}
                                </button>
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
        extraDoctorInfo: state.admin.extraDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExtraDoctorInfoByID: (id) => dispatch(actions.getExtraDoctorInfoByID(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
