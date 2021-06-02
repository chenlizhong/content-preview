import './App.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { Routes } from './Routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const App = () => <Routes />;

App.propTypes = { history: PropTypes.object };

export default withRouter(connect()(App));
