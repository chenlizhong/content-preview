import { Redirect, Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from './Utilities/asyncComponent';

const RecList = asyncComponent(() => import(/* webpackChunkName: "RecList" */ './SmartComponents/Recs/List'));
const RecDetails = asyncComponent(() => import(/* webpackChunkName: "RecDetails" */ './SmartComponents/Recs/Details'));
const paths = {
    reclist: '/',
    recdetails: '/:recDetail'
};

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
    const root = document.getElementById('root');
    root.removeAttribute('class');
    root.classList.add(`page__${rootClass}`, 'pf-c-page__main');
    root.setAttribute('role', 'main');

    return (<Route {...rest} component={Component} />);
};

InsightsRoute.propTypes = {
    component: PropTypes.func,
    rootClass: PropTypes.string
};

export const Routes = () => <Switch>
    <InsightsRoute key='RecList' exact path={paths.reclist} component={RecList} rootClass='Insights' />
    <InsightsRoute key='RecDetail' exact path={paths.recdetails} component={RecDetails} rootClass='Insights' />

    { /* Finally, catch all unmatched routes */}
    <Redirect path='*' to={paths.reclist} push />
</Switch>;

