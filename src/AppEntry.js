import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import getBaseName from './Utilities/getBaseName';
import { init } from './store';
import logger from 'redux-logger';

const AppEntry = () => <Provider store={ init(logger).getStore() }>
    <Router basename={ getBaseName(window.location.pathname) }>
        <App/>
    </Router>
</Provider>;

export default AppEntry;
