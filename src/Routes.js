import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';

const List = lazy(() => import(/* webpackChunkName: "List" */ './SmartComponents/Recs/List'));
const Details = lazy(() => import(/* webpackChunkName: "Details" */ './SmartComponents/Recs/Details'));
const paths = { list: '/', details: '/:recDetail/' };

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
    <InsightsRoute key='List' exact path={paths.list} rootClass='Insights'
        component={() => <Suspense fallback={<Loading />}> <List /> </Suspense>} />
    <InsightsRoute key='Details' exact path={paths.details} rootClass='Insights'
        component={() => <Suspense fallback={<Loading />}> <Details /> </Suspense>} />
    <Redirect path='*' to={paths.list} push />
</Switch>;
