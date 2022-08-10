import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
// import style manually

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

import './ManageDoctor.scss';
import { CRUD_ACTIONS, languages } from '../../../../utils';

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // save to doctor mark down

            contentHTML: '',
            contentMarkdown: '',
            descriptions: '',
            listDoctors: [],
            selectedOptionDoctorReact: {},
            DoctorArr: [],
            hasOldData: false,

            // save to doctor doctorInfor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedPrince: '',
            nameClinic: '',
            addRessClinic: '',
            noye: '',
        };
    }

    async componentDidMount() {
        await this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfo();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctor !== this.props.AllDoctor) {
            const dataSelect = this.buildDataInputSelect(this.props.AllDoctor, 'markdown');

            this.setState({
                DoctorArr: this.props.AllDoctor,
                listDoctors: dataSelect,
            });
        }

        if (prevProps.MarkDownDetailDoctor !== this.props.MarkDownDetailDoctor) {
            const MarkdownEdit = this.props.MarkDownDetailDoctor;

            if (
                !!MarkdownEdit.Markdown.contentMarkdown ||
                !!MarkdownEdit.Markdown.contentHTML ||
                !!MarkdownEdit.Markdown.description
            ) {
                this.setState({
                    contentMarkdown: MarkdownEdit.Markdown.contentMarkdown || '',
                    descriptions: MarkdownEdit.Markdown.description || '',
                    contentHTML: MarkdownEdit.Markdown.contentHTML || '',
                    hasOldData: true,
                });
            } else {
                this.setState({
                    contentMarkdown: '',
                    descriptions: '',
                    contentHTML: '',
                    hasOldData: false,
                });
            }
        }

        if (prevProps.language !== this.props.language) {
            const dataSelect = this.buildDataInputSelect(this.props.AllDoctor, 'markdown');
            const listPrice = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResPrice, 'required');
            const listPayment = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResPayment, 'required');
            const listProvince = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResProvince, 'required');

            this.setState({
                DoctorArr: this.props.AllDoctor,
                listDoctors: dataSelect,
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
            });
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            const listPrice = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResPrice, 'required');
            const listPayment = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResPayment, 'required');
            const listProvince = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResProvince, 'required');

            this.setState({
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };

    handleChangeSelectReact = (selectedOptionDoctorReact) => {
        this.props.fetDetailDoctorMArkDown(selectedOptionDoctorReact.value);
        this.setState({
            selectedOptionDoctorReact: selectedOptionDoctorReact,
        });
    };

    handleOnChangeDescription = (e) => {
        this.setState({
            descriptions: e.target.value,
        });
    };

    handleSaveData = async () => {
        const ID = this.state.selectedOptionDoctorReact.value;
        const { hasOldData } = this.state;

        await this.props.SaveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.descriptions,
            doctorId: ID,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    };

    buildDataInputSelect = (data, type) => {
        let result = [];
        const language = this.props.language;

        if (type === 'markdown') {
            if (data && data.length > 0) {
                // eslint-disable-next-line array-callback-return
                data.map((item, index) => {
                    const Obj = {};
                    const labelVI = `${item.firstName} ${item.lastName}`;
                    const labelEN = `${item.lastName} ${item.firstName}`;
                    Obj.label = language === languages.VI ? labelVI : labelEN;

                    Obj.value = item.id;

                    result.push(Obj);
                });
            }
        }

        if (type === 'required') {
            if (data && data.length > 0) {
                // eslint-disable-next-line array-callback-return
                data.map((item, index) => {
                    const Obj = {};
                    const labelVI = `${item.valueVI}`;
                    const labelEN = `${item.valueEN}`;
                    Obj.label = language === languages.VI ? labelVI : labelEN;

                    Obj.value = item.id;

                    result.push(Obj);
                });
            }
        }

        return result;
    };

    render() {
        // Initialize a markdown parser
        const mdParser = new MarkdownIt(/* Markdown-it options */);

        const { hasOldData, listPrice, listPayment, listProvince } = this.state;
        const { allRequiredDoctorInfo } = this.props;

        return (
            <div className="container p-4 manage-doctor-component">
                <div className="Title-manage-doctor text-center py-2">
                    <p className="title">
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </p>
                </div>
                <div className="row py-3 introduce-select">
                    <div className="col-12 col-sm-6">
                        <label className="pb-1" htmlFor="react-select-22-placeholder">
                            <FormattedMessage id="admin.manage-doctor.ChoosseDoctor" />
                        </label>
                        <Select
                            id="select-doctor"
                            onChange={this.handleChangeSelectReact}
                            options={this.state.listDoctors}
                            placeholder="Chọn bác sĩ"
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className="pb-1">
                            <FormattedMessage id="admin.manage-doctor.introduce-doctor" />
                        </label>
                        <textarea
                            className="text-control form-control"
                            placeholder="Bạn hãy nập thông tin giới thiệu || Please enter the information information"
                            value={this.state.descriptions}
                            onChange={(e) => this.handleOnChangeDescription(e)}
                        />
                    </div>
                </div>
                <div className="col-12 row doctor-payment-and-more">
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>Chọn giá</label>
                        <Select
                            id="select-doctor"
                            // onChange={this.handleChangeSelectReact}
                            options={listPrice}
                            placeholder="Chọn giá"
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>Chọn phương thức Thanh Toán</label>
                        <Select
                            id="select-doctor"
                            // onChange={this.handleChangeSelectReact}
                            options={listPayment}
                            placeholder="Chọn phương thức Thanh Toán"
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>Chọn Tỉnh thành</label>
                        <Select
                            id="select-doctor"
                            // onChange={this.handleChangeSelectReact}
                            options={listProvince}
                            placeholder="Chọn Tỉnh thành"
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>Tên phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>Note</label>
                        <input className="form-control" />
                    </div>
                </div>
                <div className="body-edit-manage-doctor">
                    <label className="pb-2">
                        <FormattedMessage id="admin.manage-doctor.body-doctor-info" />
                    </label>
                    <MdEditor
                        value={this.state.contentMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <div className="pt-4">
                    <button
                        className={hasOldData ? 'btn btn-warning' : 'btn btn-primary'}
                        onClick={this.handleSaveData}
                    >
                        {hasOldData ? (
                            <FormattedMessage id="admin.manage-doctor.save" />
                        ) : (
                            <FormattedMessage id="admin.manage-doctor.add" />
                        )}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
        language: state.app.language,
        AllDoctor: state.admin.AllDoctor,
        MarkDownDetailDoctor: state.admin.MarkDownDetailDoctor,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        SaveDetailDoctor: (data) => dispatch(actions.SaveDetailDoctor(data)),
        fetDetailDoctorMArkDown: (id) => dispatch(actions.fetDetailDoctorMArkDown(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
