import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import './ManageSpeciatly.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import { CommonUtils } from '../../../../utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpeciatly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkPrevImage: '',
            isOpen: false,
            imageBase64: '',
            name: '',
            descriptionHTML: '',
            descriptionMarkDown: '',
        };
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps, NextProps, Next) {}

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkDown: text,
        });
    };

    onChangeFile = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const LinkFile = URL.createObjectURL(file);

            const base64Image = await CommonUtils.convertBase64(file);

            this.setState({
                linkPrevImage: LinkFile,
                imageBase64: base64Image,
            });
        }
    };

    handlePrevImage = () => {
        this.setState({
            isOpen: true,
        });
    };

    handleChangeInput = (e, id) => {
        const cloneState = { ...this.state };

        cloneState[id] = e.target.value;

        this.setState({
            ...cloneState,
        });
    };

    handleValidate(data) {
        let Validate = true;

        let ArrValidate = ['name', 'imageBase64', 'descriptionMarkDown'];

        for (let i = 0; i < ArrValidate.length; i++) {
            if (!this.state[ArrValidate[i]]) {
                alert('Missing required :' + ArrValidate[i]);
                Validate = false;
                break;
            }
        }

        return Validate;
    }

    handleSaveSpeciatly = () => {
        const Check = this.handleValidate(this.state);

        if (Check) {
            this.props.CreateNewSpeciatly({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkDown: this.state.descriptionMarkDown,
            });

            setTimeout(() => {
                this.setState = {
                    linkPrevImage: '',
                    isOpen: false,
                    imageBase64: '',
                    name: '',
                    descriptionHTML: '',
                    descriptionMarkDown: '',
                };
            }, 1000);
        }
    };

    render() {
        const { linkPrevImage, isOpen, name, descriptionMarkDown } = this.state;

        const images = [linkPrevImage ? linkPrevImage : ''];

        return (
            <div className="manage-speciatly-container container">
                <div>
                    <p className="title">Tạo mới phòng khám</p>
                </div>
                <div className="btn-create-new-speciatly mt-3">
                    <button className="btn btn-primary">Tạo mới phòng khám</button>
                </div>
                <div className="body-all-speciatly mt-3">
                    <div className="row mb-4">
                        <div className="col-12 col-sm-6">
                            <label className="mb-2" htmlFor="namechuyenkhoa">
                                Tên chuyên khoa
                            </label>
                            <input
                                onChange={(e) => this.handleChangeInput(e, 'name')}
                                value={name}
                                className="form-control"
                                id="namechuyenkhoa"
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <div>
                                <label className="mb-2" htmlFor="anhchuyenkhoa">
                                    Ảnh chuyên khoa
                                </label>
                                <input
                                    placeholder="Bạn hãy chọn ảnh chuyên khoa"
                                    type="file"
                                    className="form-control"
                                    id="anhchuyenkhoa"
                                    onChange={(e) => this.onChangeFile(e)}
                                />
                            </div>
                            <div
                                className="prevImage mt-2"
                                style={{ backgroundImage: `url(${linkPrevImage ? linkPrevImage : ''})` }}
                                onClick={this.handlePrevImage}
                            ></div>
                            {isOpen && (
                                <Lightbox mainSrc={images[0]} onCloseRequest={() => this.setState({ isOpen: false })} />
                            )}
                        </div>
                    </div>

                    <MdEditor
                        value={descriptionMarkDown}
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                    <div className="mt-2">
                        <button className="btn btn-primary" onClick={this.handleSaveSpeciatly}>
                            Lưu thay đổi
                        </button>
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
        AllDataSpeciatly: state.admin.AllDataSpeciatly,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        CreateNewSpeciatly: (data) => dispatch(actions.createNewDataSpeciatly(data)),
        getLimitSpeciatly: (data) => dispatch(actions.getLimitSpeciatly(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpeciatly);
