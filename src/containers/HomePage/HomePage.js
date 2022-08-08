import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './Components/Header/HomeHeader';
import './HomePage.scss';
import FooterTwo from './Components/Footer/FooterTwo';

import RenderSlick from './RenderSlick';
import HomeBanner from './Components/Banner';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <HomeHeader />
                <HomeBanner />
                <RenderSlick />
                <FooterTwo />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
