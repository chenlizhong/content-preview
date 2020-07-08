import './App.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Routes } from './Routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends Component {
    componentDidMount() { insights.chrome.init(); }
    componentWillUnmount() { this.appNav(); }
    render() {
        return (<Routes childProps={this.props} />);
    }
}

App.propTypes = { history: PropTypes.object };

export default withRouter(connect()(App));
