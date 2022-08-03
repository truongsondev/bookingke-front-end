import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
class UserRedux extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className="user-redux-container container">
                <div className="title text-center">
                    <FormattedMessage id="tableAdmin.titleUserRedux" />
                </div>
                <div className="body-redux-user">
                    <Button size="sm" color="primary" className="px-2">
                        Thêm người dùng mới
                    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
