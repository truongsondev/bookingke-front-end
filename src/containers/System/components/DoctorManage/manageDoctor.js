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
import _ from 'lodash';

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
            selectedPrice: {},
            selectedPayment: {},
            selectedProvince: {},
            nameClinic: '',
            addRessClinic: '',
            note: '',

            // clinic and specialty
            listClinic: [],
            listSpecialty: [],
            selectedClinic: {},
            selectedSpecialty: {},
            clinicId: '',
            specialtyId: '',
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

            if (!_.isEmpty(MarkdownEdit)) {
                if (
                    !!MarkdownEdit.Markdown.contentMarkdown ||
                    !!MarkdownEdit.Markdown.contentHTML ||
                    !!MarkdownEdit.Markdown.description ||
                    !!MarkdownEdit.Doctor_Infor.addressClinic ||
                    !!MarkdownEdit.Doctor_Infor.nameClinic ||
                    !!MarkdownEdit.Doctor_Infor.note ||
                    (!!MarkdownEdit.Doctor_Infor.payMentTypeData.id &&
                        !!MarkdownEdit.Doctor_Infor.payMentTypeData.valueEN &&
                        !!MarkdownEdit.Doctor_Infor.payMentTypeData.valueVI) ||
                    (!!MarkdownEdit.Doctor_Infor.priceTypeData.id &&
                        !!MarkdownEdit.Doctor_Infor.priceTypeData.valueEN &&
                        !!MarkdownEdit.Doctor_Infor.priceTypeData.valueVI) ||
                    (!!MarkdownEdit.Doctor_Infor.provinceTypeData.id &&
                        !!MarkdownEdit.Doctor_Infor.provinceTypeData.valueEN &&
                        !!MarkdownEdit.Doctor_Infor.provinceTypeData.valueVI &&
                        !!MarkdownEdit.Doctor_Infor.specialtyId &&
                        !!MarkdownEdit.Doctor_Infor.clinicData.id &&
                        !!MarkdownEdit.Doctor_Infor.clinicData.name)
                ) {
                    let selectedPrice = this.handleBuileSelectReact(
                        this.state.listPrice,
                        MarkdownEdit.Doctor_Infor.priceId,
                    );
                    let selectedPayment = this.handleBuileSelectReact(
                        this.state.listPayment,
                        MarkdownEdit.Doctor_Infor.paymentId,
                    );

                    let selectedProvince = this.handleBuileSelectReact(
                        this.state.listProvince,
                        MarkdownEdit.Doctor_Infor.provinceId,
                    );

                    let selectedSpecialty = this.handleBuileSelectReact(
                        this.state.listSpecialty,
                        MarkdownEdit.Doctor_Infor.specialtyId,
                    );

                    let selectedClinic = this.handleBuileSelectReact(
                        this.state.listClinic,
                        MarkdownEdit.Doctor_Infor.clinicData.id,
                    );

                    this.setState({
                        contentMarkdown: MarkdownEdit.Markdown.contentMarkdown || '',
                        descriptions: MarkdownEdit.Markdown.description || '',
                        contentHTML: MarkdownEdit.Markdown.contentHTML || '',
                        hasOldData: true,

                        selectedPrice: selectedPrice,
                        selectedPayment: selectedPayment,
                        selectedProvince: selectedProvince,
                        nameClinic: MarkdownEdit.Doctor_Infor.nameClinic || '',
                        addRessClinic: MarkdownEdit.Doctor_Infor.addressClinic || '',
                        note: MarkdownEdit.Doctor_Infor.note || '',
                        selectedSpecialty: selectedSpecialty,
                        selectedClinic: selectedClinic,
                    });
                } else {
                    this.setState({
                        contentMarkdown: '',
                        descriptions: '',
                        contentHTML: '',
                        hasOldData: false,

                        selectedPrice: '',
                        selectedPayment: '',
                        selectedProvince: '',
                        nameClinic: '',
                        addRessClinic: '',
                        note: '',
                        selectedClinic: {},
                        selectedSpecialty: {},
                    });
                }
            }
        }

        if (prevProps.language !== this.props.language) {
            const dataSelect = this.buildDataInputSelect(this.props.AllDoctor, 'markdown');
            const listPrice = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResPrice, 'price');
            const listPayment = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResPayment, 'required');
            const listProvince = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResProvince, 'required');
            const listSpecialty = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResSpecialty, 'specialty');

            this.setState({
                DoctorArr: this.props.AllDoctor,
                listDoctors: dataSelect,
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
                listSpecialty: listSpecialty,
            });
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            const listPrice = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResPrice, 'price');
            const listPayment = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResPayment, 'required');
            const listProvince = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResProvince, 'required');
            const listSpecialty = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResSpecialty, 'specialty');
            const dataSelectClinic = this.buildDataInputSelect(this.props.allRequiredDoctorInfo.ResClinic, 'clinic');

            this.setState({
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
                listSpecialty: listSpecialty,
                listClinic: dataSelectClinic,
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

    handleOnChangeText = (e, id) => {
        let copyStateText = { ...this.state };

        copyStateText[id] = e.target.value;

        this.setState({
            ...copyStateText,
        });
    };

    handleBuileSelectReact = (Arr, data, id) => {
        return Arr.find((item) => item.value === data);
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

                    Obj.value = item.keyMap;

                    result.push(Obj);
                });
            }
        }

        if (type === 'price') {
            if (data && data.length > 0) {
                // eslint-disable-next-line array-callback-return
                data.map((item, index) => {
                    const Obj = {};
                    const labelVI = `${item.valueVI} VND`;
                    const labelEN = `${item.valueEN} USD`;
                    Obj.label = language === languages.VI ? labelVI : labelEN;

                    Obj.value = item.keyMap;

                    result.push(Obj);
                });
            }
        }

        if (type === 'specialty') {
            if (data && data.length > 0) {
                // eslint-disable-next-line array-callback-return
                data.map((item, index) => {
                    let Obj = {};

                    Obj.label = item.name;
                    Obj.value = item.id;

                    result.push(Obj);
                });
            }
        }

        if (type === 'clinic') {
            if (data && data.length > 0) {
                // eslint-disable-next-line array-callback-return
                data.map((item, index) => {
                    let Obj = {};

                    Obj.label = item.name;
                    Obj.value = item.id;

                    result.push(Obj);
                });
            }
        }

        return result;
    };

    handleSaveData = async () => {
        const ID = this.state.selectedOptionDoctorReact.value;
        const { hasOldData } = this.state;

        await this.props.SaveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.descriptions,
            doctorId: ID,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addRessClinic: this.state.addRessClinic,
            note: this.state.note,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            clinicId:
                this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId:
                this.state.selectedSpecialty && this.state.selectedSpecialty.value
                    ? this.state.selectedSpecialty.value
                    : '',
        });

        setTimeout(() => {
            this.props.fetDetailDoctorMArkDown(0);
        });
    };

    handleChangeSelectDoctorInfo = (selectedOptions, nameParent) => {
        let { name } = nameParent;

        let copyState = { ...this.state };

        copyState[name] = selectedOptions;

        this.setState({
            ...copyState,
        });
    };

    render() {
        // Initialize a markdown parser
        const mdParser = new MarkdownIt(/* Markdown-it options */);

        const {
            hasOldData,
            listPrice,
            listPayment,
            listProvince,
            selectedPrice,
            selectedPayment,
            selectedProvince,
            listSpecialty,
            selectedSpecialty,
            selectedClinic,
            listClinic,
        } = this.state;

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
                            value={this.state.selectedOptionDoctorReact}
                            id="select-doctor"
                            onChange={this.handleChangeSelectReact}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.ChoosseDoctor" />}
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
                            onChange={(e) => this.handleOnChangeText(e, 'descriptions')}
                        />
                    </div>
                </div>
                <div className="col-12 row doctor-payment-and-more">
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.ChoosePrice" />
                        </label>
                        <Select
                            value={selectedPrice}
                            defaultValue={this.state.listPrice[0]}
                            id="select-doctor"
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listPrice}
                            name="selectedPrice"
                            placeholder={<FormattedMessage id="admin.manage-doctor.ChoosePrice" />}
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.SelectPayment" />
                        </label>
                        <Select
                            value={selectedPayment}
                            defaultValue={this.state.listPayment[0]}
                            id="select-doctor"
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listPayment}
                            name="selectedPayment"
                            placeholder={<FormattedMessage id="admin.manage-doctor.SelectPayment" />}
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.SelectProvince" />
                        </label>
                        <Select
                            value={selectedProvince}
                            defaultValue={this.state.listProvince[0]}
                            id="select-doctor"
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.SelectProvince" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.ClinicName" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.nameClinic}
                            onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.ClinicAddress" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.addRessClinic}
                            onChange={(e) => this.handleOnChangeText(e, 'addRessClinic')}
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.Note" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.note}
                            onChange={(e) => this.handleOnChangeText(e, 'note')}
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.chooseSpecialty" />
                        </label>
                        <Select
                            value={selectedSpecialty}
                            id="select-doctor"
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.SelectProvince" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-12 col-sm-4 mb-3 mt-2">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.chooseClinic" />
                        </label>
                        <Select
                            value={selectedClinic}
                            id="select-doctor"
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.SelectProvince" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className="body-edit-manage-doctor">
                    <label className="pb-2">
                        <FormattedMessage id="admin.manage-doctor.body-doctor-info" />
                    </label>
                    <MdEditor
                        value={this.state.contentMarkdown}
                        style={{ minHeight: '350px' }}
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
        users: state.user.userInfo,
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
