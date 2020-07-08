import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import React, { useEffect } from 'react';
import { fetchDetailsContent, fetchPyData } from '../../store/AppActions';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Details = ({ match, fetchDetailsContent, fetchPyData, details, contentDetailsFetchStatus, pyData, pyDataFetchStatus }) => {

    useEffect(() => {
        const detailName = { name: match.params.recDetail };
        fetchDetailsContent(detailName);
        fetchPyData(detailName);
    }, [fetchDetailsContent, fetchPyData, match.params.recDetail]);

    console.error(details, contentDetailsFetchStatus, pyData, pyDataFetchStatus);
    return (
        <React.Fragment>
            <PageHeader>
                <PageHeaderTitle title='Recommendations Details Page' />
                <p>{`Rec: ${match.params.recDetail}`}</p>
            </PageHeader>
            <Main>
                <p> content </p>
            </Main>
        </React.Fragment>
    );
};

Details.displayName = 'view-rec-details';

Details.propTypes = {
    match: PropTypes.object,
    fetchDetailsContent: PropTypes.func,
    fetchPyData: PropTypes.func,
    details: PropTypes.object,
    contentDetailsFetchStatus: PropTypes.string,
    pyData: PropTypes.object,
    pyDataFetchStatus: PropTypes.string
};

const mapStateToProps = ({ CPStore }) => ({
    details: CPStore.contentDetails,
    detailsFetchStatus: CPStore.fetchContentStatus,
    pyData: CPStore.pyData,
    pyDataFetchStatus: CPStore.pyDataFetchStatus
});

const mapDispatchToProps = dispatch => ({
    fetchDetailsContent: (options) => dispatch(fetchDetailsContent(options)),
    fetchPyData: (options) => dispatch(fetchPyData(options))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Details));
