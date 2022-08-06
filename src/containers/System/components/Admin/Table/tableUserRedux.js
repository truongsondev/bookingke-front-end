import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';

import './tableUserRedux.scss';

class TableUserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsersRedux: [],
        };
    }

    async componentDidMount() {
        await this.props.fetAllUserRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                arrUsersRedux: this.props.users,
            });
        }
    }

    handleEditUser() {}

    handleDelete(id) {
        this.props.deleteUserRedux(id);
    }

    render() {
        // console.log('Check your props :', this.props.users);
        console.log('Check state :', this.state);

        return (
            <table className="table table-hover mt-4">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                            <FormattedMessage id="tableAdmin.email" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="tableAdmin.firstName" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="tableAdmin.lastName" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="tableAdmin.address" />
                        </th>
                        <th scope="col" className="text-center">
                            <FormattedMessage id="tableAdmin.actions" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.arrUsersRedux &&
                        this.state.arrUsersRedux.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{user.id}</th>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.address}</td>
                                <td className="text-center action-users">
                                    <button
                                        type="button"
                                        className="btn link"
                                        onClick={() => this.handleEditUser(user)}
                                    >
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUserRedux(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);
