import './list.scss';

import { Main, PageHeader, PageHeaderTitle, Section } from '@redhat-cloud-services/frontend-components';
import React, { useEffect } from 'react';

import { Button } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import asyncComponent from '../../Utilities/asyncComponent';
import { connect } from 'react-redux';
import { fetchContent } from '../../store/AppActions';
import { withRouter } from 'react-router-dom';

const SampleComponent = asyncComponent(() => import('../../PresentationalComponents/SampleComponent/sample-component'));

const List = ({ content, fetchContentStatus }) => {

    useEffect(() => { fetchContent(); }, []);

    console.error(content, fetchContentStatus);
    return (
        <React.Fragment>
            <PageHeader>
                <PageHeaderTitle title='Content Preview App' />
                <p> This is page header text </p>
            </PageHeader>
            <Main>
                <h1> Sample Component </h1>
                <SampleComponent> Sample Component </SampleComponent>
                <h1> Cards </h1>
                <h1> Buttons </h1>
                <Section type='button-group'>
                    <Button variant='primary'> PF-Next Primary Button </Button>
                    <Button variant='secondary'> PF-Next Secondary Button </Button>
                    <Button variant='tertiary'> PF-Next Tertiary Button </Button>
                    <Button variant='danger'> PF-Next Danger Button </Button>
                </Section>
            </Main>
        </React.Fragment>
    );
};

List.propTypes = {
    fetchContent: PropTypes.func,
    fetchContentStatus: PropTypes.string,
    content: PropTypes.object
};

const mapStateToProps = ({ CPStore }) => ({
    content: CPStore.content,
    fetchContentStatus: CPStore.fetchContentStatus
});

const mapDispatchToProps = dispatch => ({
    fetchContent: () => dispatch(fetchContent())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(List));
