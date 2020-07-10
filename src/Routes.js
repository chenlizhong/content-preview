import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';

const RecList = lazy(() => import(/* webpackChunkName: "RecList" */ './SmartComponents/Recs/List'));
const RecDetails = lazy(() => import(/* webpackChunkName: "RecDetails" */ './SmartComponents/Recs/Details'));
const paths = { reclist: '/', recdetails: '/:recDetail/' };

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
    <InsightsRoute key='RecList' exact path={paths.reclist} rootClass='Insights'
        component={() => <Suspense fallback={<span>wait</span>}> <RecList /> </Suspense>} />
    <InsightsRoute key='RecDetail' exact path={paths.recdetails} rootClass='Insights'
        component={() => <Suspense fallback={<span>wait</span>}> <RecDetails /> </Suspense>} />
    <Redirect path='*' to={paths.reclist} push />
</Switch>;
