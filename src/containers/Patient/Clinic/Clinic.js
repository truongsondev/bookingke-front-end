import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './Clinic.scss';
import HeaderDetail from '../../HomePage/Components/HeaderDetail/HeaderDetail';
import DoctorSchedule from '../Schedule';
import DoctorExtra from '../Doctor/DoctorExtra/DoctorExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor/ProfileDoctor';
import _ from 'lodash';
import { getDetailClinicSevices } from '../../../services/clinicService';
import ConvertBase64Image from '../../System/components/converBase64/convertBase64';
import Lightbox from 'react-image-lightbox';

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            isHideShow: true,
            isOpen: false,
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const Res = await getDetailClinicSevices({
                id: Number(this.props.match.params.id),
            });

            if (Res && Res.errCode === 0) {
                let Data = Res.data;

                if (Data && !_.isEmpty(Data)) {
                    let Arr = Data.doctorSpecialty;

                    if (Arr && Arr.length > 0) {
                        Arr = Arr.map((data) => data.doctorId);
                    }

                    this.setState({
                        dataDetailClinic: Res.data,
                        arrDoctorId: Arr,
                    });
                }
            }
        }
    }

    componentDidUpdate(prevProps, NextProps, Next) {}

    handlePrevImage = () => {
        this.state({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        const { arrDoctorId, dataDetailClinic } = this.state;

        const images = [
            !_.isEmpty(dataDetailClinic) && dataDetailClinic.image ? ConvertBase64Image(dataDetailClinic.image) : '',
        ];

        return (
            <div className="specialty-detail-container">
                <HeaderDetail
                    Name={!_.isEmpty(dataDetailClinic) && dataDetailClinic.name ? dataDetailClinic.name : ''}
                    isOpen={true}
                />
                <div className="specialty-detail-body">
                    <div className="specialty-detail-description col-12">
                        <div className="container">
                            <div
                                className="specialty-detail-image"
                                style={{
                                    backgroundImage: `url(${
                                        !_.isEmpty(dataDetailClinic) && dataDetailClinic.image ? images[0] : ''
                                    })`,
                                }}
                                onClick={() =>
                                    this.setState({
                                        isOpen: !this.state.isOpen,
                                    })
                                }
                            ></div>
                            {this.state.isOpen && (
                                <Lightbox
                                    onClick={() => this.handlePrevImage()}
                                    mainSrc={images[0]}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            )}

                            <div
                                className={
                                    this.state.isHideShow
                                        ? 'render-markdow container'
                                        : 'render-markdow container bomaxhiegt'
                                }
                            >
                                {!_.isEmpty(dataDetailClinic) && dataDetailClinic.descriptionHTML && (
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
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
    return {
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
