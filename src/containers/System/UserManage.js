import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getAllUsers, createNewuserData, deleteUser } from '../../services/userService';
import { connect } from 'react-redux';
import { emitter } from '../../utils';

import './User.scss';
import ModalUser from './ModalUser';
import { Alert } from 'reactstrap';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isHidenModal: false,
        };
    }

    state = {};

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        try {
            let Res = await getAllUsers('All');

            if (Res && Res.errCode === 0) {
                this.setState({ arrUsers: Res.user });
            } else {
                console.log(Res.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleAddUser = () => {
        this.setState({
            isHidenModal: true,
        });
    };

    handleToggle = () => {
        this.setState({
            isHidenModal: !this.state.isHidenModal,
        });
    };

    createNewuser = async (state) => {
        try {
            const check = await createNewuserData(state);

            if (check && check.errCode === 0) {
                this.setState({
                    isHidenModal: false,
                });
                await this.getAllUsersFromReact();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            } else {
                alert(check.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async (id) => {
        try {
            const checkErrorCode = await deleteUser(id);

            if (checkErrorCode.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(checkErrorCode.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className="user-container">
                <div className="title text-center">Manage users</div>
                <div className="px-3">
                    <div className="my-1 mx-1">
                        <button
                            type="button"
                            className="btn btn-primary px-3 text-center align-center"
                            onClick={this.handleAddUser}
                        >
                            Thêm Người Dùng Mới
                            <FontAwesomeIcon icon={faPlus} style={{ marginLeft: 5 }} />
                        </button>
                    </div>
                    <table className="table table-hover mt-4">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">email</th>
                                <th scope="col">first Name</th>
                                <th scope="col">last Name</th>
                                <th scope="col">address</th>
                                <th scope="col" className="text-center">
                                    actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrUsers &&
                                this.state.arrUsers.map((user, index) => (
                                    <tr key={index}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td className="text-center action-users">
                                            <button type="button" className="btn link">
                                                <FontAwesomeIcon icon={faPen} />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn link ms-4"
                                                onClick={() => this.handleDelete(user.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <button type="button" className="btn link ms-4">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <ModalUser
                    isHidenModal={this.state.isHidenModal}
                    handleToggle={this.handleToggle}
                    createNewuser={this.createNewuser}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
