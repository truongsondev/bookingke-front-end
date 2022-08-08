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
import { languages } from '../../../../utils';

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            descriptions: '',
            listDoctors: [],
            selectedOptionDoctorReact: {},
            DoctorArr: [],
        };
    }

    async componentDidMount() {
        await this.props.fetchAllDoctor();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctor !== this.props.AllDoctor) {
            const dataSelect = this.buildDataInputSelect(this.props.AllDoctor);

            this.setState({
                DoctorArr: this.props.AllDoctor,
                listDoctors: dataSelect,
            });
        }

        if (prevProps.language !== this.props.language) {
            const dataSelect = this.buildDataInputSelect(this.props.AllDoctor);

            this.setState({
                DoctorArr: this.props.AllDoctor,
                listDoctors: dataSelect,
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
        console.log('Thông tin người dùng :', this.state, this.state.selectedOptionDoctorReact.value);

        const ID = this.state.selectedOptionDoctorReact.value;

        await this.props.SaveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.descriptions,
            doctorId: ID,
        });
    };

    buildDataInputSelect = (data) => {
        let result = [];
        const language = this.props.language;

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

        return result;
    };

    render() {
        // Initialize a markdown parser
        const mdParser = new MarkdownIt(/* Markdown-it options */);

        return (
            <div className="container p-4 manage-doctor-component">
                <div className="Title-manage-doctor text-center py-2">
                    <p className="title">Tạo thông tin cho bác sĩ</p>
                </div>
                <div className="row py-3 introduce-select">
                    <div className="col-12 col-sm-6">
                        <label className="pb-1" htmlFor="react-select-22-placeholder">
                            Chọn bác sĩ
                        </label>
                        <Select
                            id="select-doctor"
                            value={this.state.selectedOptionDoctorReact}
                            onChange={this.handleChangeSelectReact}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className="pb-1">Giới thiệu về bác sĩ</label>
                        <textarea
                            className="text-control form-control"
                            placeholder="Bạn hãy nập thông tin giới thiệu || Please enter the information information"
                            value={this.state.descriptions}
                            onChange={(e) => this.handleOnChangeDescription(e)}
                        />
                    </div>
                </div>
                <div className="body-edit-man   age-doctor">
                    <label className="pb-2">Thân bài và thông tin</label>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <div className="pt-4">
                    <button className="btn btn-primary" onClick={this.handleSaveData}>
                        Lưu thông tin
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        SaveDetailDoctor: (data) => dispatch(actions.SaveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
