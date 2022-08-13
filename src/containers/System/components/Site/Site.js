import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import './Site.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import { CommonUtils } from '../../../../utils';
import { CreateNewSite } from '../../../../services/SiteService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class setTimeout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkPrevImage: '',
            isOpen: false,
            imageBase64: '',
            name: '',
            descriptionHTML: '',
            descriptionMarkDown: '',
            type: '',
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

    handleSaveClinic = async () => {
        const Check = this.handleValidate(this.state);
        if (Check) {
            const Res = await CreateNewSite({
                name: this.state.name,
                image: this.state.imageBase64,
                contentHTML: this.state.descriptionHTML,
                contentMarkdown: this.state.descriptionMarkDown,
                case: this.state.type,
            });

            if (Res && Res.errCode === 0) {
                toast.success('🦄 Bạn đã đang tải thông tin thành công!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.success('🦄 Bạn đã đang tải thông tin thất bại!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    };

    render() {
        const { linkPrevImage, isOpen, name, descriptionMarkDown, type } = this.state;

        const images = [linkPrevImage ? linkPrevImage : ''];

        return (
            <div className="manage-speciatly-container container">
                <div>
                    <p className="title">Tạo mới Site</p>
                </div>
                <div className="btn-create-new-speciatly mt-3">
                    <button className="btn btn-primary">Tạo mới chuyên khoa</button>
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
                            <label className="mb-2" htmlFor="namechuyenkhoatype">
                                Case chuyên khoa
                            </label>
                            <input
                                onChange={(e) => this.handleChangeInput(e, 'type')}
                                value={type}
                                className="form-control"
                                id="namechuyenkhoatype"
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
                        <button className="btn btn-primary" onClick={this.handleSaveClinic}>
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

export default connect(mapStateToProps, mapDispatchToProps)(setTimeout);
