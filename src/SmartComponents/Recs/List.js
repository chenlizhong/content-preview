import './list.scss';

import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import React, { Suspense, lazy, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchContent } from '../../store/Actions';
import { withRouter } from 'react-router-dom';

const CotentTable = lazy(() => import('../../PresentationalComponents/ContentTable/ContentTable'));

const List = ({ content, fetchContent, contentFetchStatus }) => {

    useEffect(() => { fetchContent(); }, [fetchContent]);
    return <React.Fragment>
        <PageHeader>
            <PageHeaderTitle title='Content Preview App' />
        </PageHeader>
        <Main>
            <Suspense fallback={<span>loading</span>}> {contentFetchStatus === 'fulfilled' && <CotentTable data={content} />}</Suspense>
        </Main>
    </React.Fragment>;
};

List.propTypes = {
    fetchContent: PropTypes.func,
    contentFetchStatus: PropTypes.string,
    content: PropTypes.array
};

const mapStateToProps = ({ CPStore }) => ({
    content: CPStore.content,
    contentFetchStatus: CPStore.contentFetchStatus
});

const mapDispatchToProps = dispatch => ({
    fetchContent: () => dispatch(fetchContent())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(List));
