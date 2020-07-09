import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import React, { useEffect } from 'react';
import { fetchContentDetails, fetchPyData } from '../../store/Actions';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Details = ({ match, fetchContentDetails, fetchPyData, details, contentDetailsFetchStatus, pyData, pyDataFetchStatus }) => {

    useEffect(() => {
        const detailName = { name: match.params.recDetail };
        fetchContentDetails(detailName);
        fetchPyData(detailName);
    }, [fetchContentDetails, fetchPyData, match.params.recDetail]);

    useEffect(() => {
        console.error(details, contentDetailsFetchStatus, pyData, pyDataFetchStatus);
    }, [contentDetailsFetchStatus, details, fetchContentDetails, fetchPyData, match.params.recDetail, pyData, pyDataFetchStatus]);

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
    fetchContentDetails: PropTypes.func,
    fetchPyData: PropTypes.func,
    details: PropTypes.object,
    contentDetailsFetchStatus: PropTypes.string,
    pyData: PropTypes.array,
    pyDataFetchStatus: PropTypes.string
};

const mapStateToProps = ({ CPStore }) => ({
    details: CPStore.contentDetails,
    detailsFetchStatus: CPStore.fetchContentStatus,
    pyData: CPStore.pyData,
    pyDataFetchStatus: CPStore.pyDataFetchStatus
});

const mapDispatchToProps = dispatch => ({
    fetchContentDetails: options => dispatch(fetchContentDetails(options)),
    fetchPyData: options => dispatch(fetchPyData(options))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Details));
