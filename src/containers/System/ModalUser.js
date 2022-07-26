import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Row,
    FormGroup,
    Col,
    Label,
    Input,
} from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as EmailValidator from 'email-validator';
import { connect } from 'react-redux';
import { emitter } from '../../utils';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: null,
            roleId: null,
        };

        this.listenEmitter();
    }

    listenEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: null,
                roleId: null,
            });
        });
    }

    componentDidMount() {}

    handleOnchangeInput(e, id) {
        // cách viết kiểu bad code ( không nên dùng )
        /* 
        this.state[id] = e.target.value;

        this.setState(
            {
                ...this.state,
            },
            () => {
                console.log('State changed :', this.state);
            },
        ); */

        // Cach viết good code (clone state) => Ta nên sử dụng

        const cloneState = { ...this.state };

        cloneState[id] = e.target.value;

        this.setState({
            ...cloneState,
        });
    }

    handleValidate() {
        let isInvalid = true;

        let arrClone = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId'];

        for (let i = 0; i < arrClone.length; i++) {
            if (!this.state[arrClone[i]]) {
                isInvalid = false;
                alert('Missing required parameter : ' + arrClone[i]);
                break;
            }
        }

        if (this.state.email) {
            const checkValidate = EmailValidator.validate(this.state.email);

            if (!checkValidate) {
                isInvalid = false;
                alert('email required key @gmail.com ');
            }
        }

        return isInvalid;
    }

    handleAddUser = () => {
        const validate = this.handleValidate();

        if (validate) {
            this.props.createNewuser(this.state);
        }
    };

    render() {
        return (
            <div className="text-center">
                <Modal
                    isOpen={this.props.isHidenModal}
                    toggle={() => this.props.handleToggle()}
                    className="testTingClassName"
                    size="lg"
                    // centered={true}
                >
                    <ModalHeader toggle={() => this.props.handleToggle()}>Create new user</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row className="mb-3">
                                <Col md={6} className="mb-3">
                                    <FormGroup>
                                        <Label for="exampleEmail">Email</Label>
                                        <Input
                                            id="exampleEmail"
                                            placeholder="with a placeholder"
                                            type="email"
                                            value={this.state.email}
                                            onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input
                                            id="examplePassword"
                                            placeholder="password placeholder"
                                            type="password"
                                            value={this.state.password}
                                            onChange={(e) => this.handleOnchangeInput(e, 'password')}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <FormGroup>
                                        <Label for="firstName">firstName</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="with a placeholder"
                                            type="text"
                                            value={this.state.firstName}
                                            onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <FormGroup>
                                        <Label for="exampleLastName">lastName</Label>
                                        <Input
                                            id="exampleLastName"
                                            placeholder="lastName placeholder"
                                            type="text"
                                            value={this.state.lastName}
                                            onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup className="mb-3">
                                <Label for="exampleAddress">Address</Label>
                                <Input
                                    id="exampleAddress"
                                    placeholder="1234 Main St"
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="examplePhoneNumber">PhoneNumber</Label>
                                <Input
                                    id="examplePhoneNumber"
                                    placeholder="+84 ...."
                                    value={this.state.phonenumber}
                                    onChange={(e) => this.handleOnchangeInput(e, 'phonenumber')}
                                />
                            </FormGroup>
                            <Row className="align-center">
                                <Col lg={6} className="mb-3">
                                    <FormGroup>
                                        <label htmlFor="inputState" className="form-label">
                                            SEX
                                        </label>
                                        <select
                                            id="inputState"
                                            className="form-select"
                                            value={this.state.gender || undefined}
                                            onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                        >
                                            <option defaultValue="">Giới Tính</option>
                                            <option value="1">Nam</option>
                                            <option value="0">Nữ</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <label htmlFor="inputState1" className="form-label">
                                            Role
                                        </label>
                                        <select
                                            id="inputState1"
                                            className="form-select"
                                            value={this.state.roleId || undefined}
                                            onChange={(e) => this.handleOnchangeInput(e, 'roleId')}
                                        >
                                            <option defaultValue="">-- Vui lòng chọn --</option>
                                            <option value="1">Admin</option>
                                            <option value="2">Doctor</option>
                                            <option value="3">Patient</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="px-2 me-2" onClick={this.handleAddUser}>
                            Save Create
                        </Button>
                        <Button color="secondary" className="px-2" onClick={() => this.props.handleToggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
