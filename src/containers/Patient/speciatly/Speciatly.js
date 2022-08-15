import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../../store/actions';
import './Specialty.scss';
import HeaderDetail from '../../HomePage/Components/HeaderDetail/HeaderDetail';
import DoctorSchedule from '../Schedule';
import DoctorExtra from '../Doctor/DoctorExtra/DoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor/ProfileDoctor';
import { getDetailSpeciatlySevices } from '../../../services/SpeciatlyService';
import _ from 'lodash';
import { getAllCodeServices } from '../../../services/userService';
import { languages } from '../../../utils';

class SpecialtyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            isHideShow: true,
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const Res = await getDetailSpeciatlySevices({
                id: Number(this.props.match.params.id),
                location: 'All',
            });

            const ResProVince = await getAllCodeServices('PROVINCE');

            if (Res && Res.errCode === 0) {
                let Data = Res.data;

                if (Data && !_.isEmpty(Data)) {
                    let Arr = Data.doctorSpecialty;

                    if (Arr && Arr.length > 0) {
                        Arr = Arr.map((data) => data.doctorId);
                    }

                    let dataProvince = ResProVince.data;

                    this.setState({
                        dataDetailSpecialty: Res.data,
                        arrDoctorId: Arr,
                    });

                    if (ResProVince && ResProVince.errCode === 0) {
                        if (dataProvince && dataProvince.length > 0) {
                            dataProvince.unshift({
                                keyMap: 'All',
                                type: 'PROVINCE',
                                valueEN: 'All',
                                valueVI: 'Toàn Quốc',
                            });
                        }

                        this.setState({
                            listProvince: dataProvince,
                        });
                    }
                }
            }
        }
    }

    handleOnchangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const Res = await getDetailSpeciatlySevices({
                id: Number(this.props.match.params.id),
                location: e.target.value,
            });

            if (Res && Res.errCode === 0) {
                let Data = Res.data;

                if (Data && !_.isEmpty(Data)) {
                    let Arr = Data.doctorSpecialty;

                    if (Arr && Arr.length > 0) {
                        Arr = Arr.map((data) => data.doctorId);
                    }

                    this.setState({
                        dataDetailSpecialty: Res.data,
                        arrDoctorId: Arr,
                    });
                }
            }
        }
    };

    componentDidUpdate(prevProps, NextProps, Next) {}

    render() {
        document.title = 'Chuyên khoa phổ biến tại Trường Sơn Booking';

        const { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        const { language } = this.props;

        return (
            <div className="specialty-detail-container">
                <HeaderDetail Name="Các khoa nổi bật" isOpen={true} />
                <div className="specialty-detail-body">
                    <div className="specialty-detail-description col-12">
                        <div className="container">
                            <div
                                className={
                                    this.state.isHideShow
                                        ? 'render-markdow container'
                                        : 'render-markdow container bomaxhiegt'
                                }
                            >
                                {!_.isEmpty(dataDetailSpecialty) && dataDetailSpecialty.descriptionHTML && (
                                    <div
                                        dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}
                                    ></div>
                                )}
                            </div>
                            <div className="specialty-detail-button">
                                <button
                                    className={this.state.isHideShow ? 'hide' : 'more'}
                                    onClick={() => this.setState({ isHideShow: !this.state.isHideShow })}
                                >
                                    {this.state.isHideShow ? 'Xem thêm' : 'Ẩn đi'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="container-layoyt-2">
                        <div className="container">
                            <div className="searh-doctor-sp">
                                <select onChange={(e) => this.handleOnchangeSelect(e)}>
                                    {listProvince &&
                                        listProvince.length > 0 &&
                                        listProvince.map((data, index) => (
                                            <option value={data.keyMap} key={index}>
                                                {language === languages.VI ? data.valueVI : data.valueEN}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {arrDoctorId &&
                                arrDoctorId.length > 0 &&
                                arrDoctorId.map((data, index) => (
                                    <div key={index} className="specialty-detail-each-doctor row my-3 py-3">
                                        <div className="content-left col-12 col-md-6">
                                            <ProfileDoctor
                                                doctorId={data}
                                                callAsync={true}
                                                isShowHideDescriptionDoctor={true}
                                                // dataTime={dataTime}
                                                isPrice={true}
                                            />
                                        </div>
                                        <div className="content-right col-12 col-md-6">
                                            <DoctorSchedule callAsync={true} detailDoctorId={data} />
                                            <DoctorExtra callAsync={true} detailDoctorId={data} />
                                        </div>
                                    </div>
                                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
