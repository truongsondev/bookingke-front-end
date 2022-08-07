import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
// import style manually

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

import './ManageDoctor.scss';

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            descriptions: '',
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
            selectedOptionDoctorReact: null,
        });
    };

    handleChangeSelectReact = (selectedOptionDoctorReact) => {
        this.setState({
            selectedOptionDoctorReact,
        });
    };

    handleOnChangeDescription = (e) => {
        this.setState({
            descriptions: e.target.value,
        });
    };

    handleSaveData = () => {
        console.log('Thông tin người dùng :', this.state);
    };

    render() {
        // Initialize a markdown parser
        const mdParser = new MarkdownIt(/* Markdown-it options */);

        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
        ];

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
                            options={options}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className="pb-1">Giới thiệu về bác sĩ</label>
                        <textarea
                            className="text-control form-control"
                            placeholder
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
