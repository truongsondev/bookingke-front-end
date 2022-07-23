import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getAllUsers } from '../../services/userService';
import { connect } from 'react-redux';

import './User.scss';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        };
    }

    state = {};

    async componentDidMount() {
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
    }

    render() {
        return (
            <div className="user-container">
                <div className="title text-center">Manage users</div>
                <div className="px-3">
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
                                            <button type="button" className="btn link ms-4">
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
