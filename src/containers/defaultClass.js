import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';

class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps, NextProps, Next) {}

    render() {
        return <div></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Default);
