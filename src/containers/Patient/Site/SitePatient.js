import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './SitePatient.scss';
import HeaderDetail from '../../HomePage/Components/HeaderDetail/HeaderDetail';

import _ from 'lodash';
import ConvertBase64Image from '../../System/components/converBase64/convertBase64';
import Lightbox from 'react-image-lightbox';
import { getDetaiSiteByID } from '../../../services/SiteService';
import FooterTwo from '../../HomePage/Components/Footer/FooterTwo';

class SitePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSite: {},
            isHideShow: true,
            isOpen: false,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const id = urlParams.get('id');
            const type = urlParams.get('type');

            const Res = await getDetaiSiteByID({ id, type });

            if (Res && Res.errCode === 0) {
                this.setState({
                    dataDetailSite: Res.data,
                });
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
        const { dataDetailSite } = this.state;

        document.title = dataDetailSite && dataDetailSite.name ? dataDetailSite.name : '';

        const images = [
            !_.isEmpty(dataDetailSite) && dataDetailSite.image ? ConvertBase64Image(dataDetailSite.image) : '',
        ];

        return (
            <div className="specialty-detail-container">
                <HeaderDetail
                    Name={!_.isEmpty(dataDetailSite) && dataDetailSite.name ? dataDetailSite.name : ''}
                    isOpen={true}
                />
                <div className="specialty-detail-body">
                    <div className="specialty-detail-description col-12">
                        <div className="container">
                            <div className="render-markdow container bomaxhiegt">
                                <h1 className="tile-camnang">
                                    {dataDetailSite && dataDetailSite.name ? dataDetailSite.name : ''}
                                </h1>

                                <div
                                    className="specialty-detail-image"
                                    style={{
                                        backgroundImage: `url(${
                                            !_.isEmpty(dataDetailSite) && dataDetailSite.image ? images[0] : ''
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
                                {!_.isEmpty(dataDetailSite) && dataDetailSite.contentHTML && (
                                    <div
                                        className="ds-er-sd"
                                        dangerouslySetInnerHTML={{ __html: dataDetailSite.contentHTML }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <FooterTwo />
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

export default connect(mapStateToProps, mapDispatchToProps)(SitePatient);
