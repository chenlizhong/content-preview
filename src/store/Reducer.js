/* eslint camelcase: 0 */
import * as ActionTypes from '../AppConstants';

import Immutable from 'seamless-immutable';

// eslint-disable-next-line new-cap
const initialState = Immutable({
    content: [],
    contentFetchStatus: '',
    contentDetails: {},
    contentDetailsFetchStatus: '',
    pyData: [],
    pyDataFetchStatus: ''
});

export const getCPStore = () => (state = initialState, action) => {
    switch (action.type) {
        case `${ActionTypes.CONTENT_FETCH}_PENDING`:
            return state.set('contentFetchStatus', 'pending');
        case `${ActionTypes.CONTENT_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                content: action.payload,
                contentFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.CONTENT_FETCH}_REJECTED`:
            return state.set('contentFetchStatus', 'rejected');

        case `${ActionTypes.CONTENT_DETAILS_FETCH}_PENDING`:
            return state.set('contentDetailsFetchStatus', 'pending');
        case `${ActionTypes.CONTENT_DETAILS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                contentDetails: action.payload[0],
                contentDetailsFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.CONTENT_DETAILS_FETCH}_REJECTED`:
            return state.set('contentDetailsFetchStatus', 'rejected');

        case `${ActionTypes.PY_DATA_FETCH}_PENDING`:
            return state.set('pyDataFetchStatus', 'pending');
        case `${ActionTypes.PY_DATA_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                pyData: action.payload,
                pyDataFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.PY_DATA_FETCH}_REJECTED`:
            return state.set('pyDataFetchStatus', 'rejected');

        default:
            return state;
    }
};

