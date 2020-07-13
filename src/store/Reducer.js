/* eslint camelcase: 0 */
import * as ActionTypes from '../AppConstants';
import { hits } from '../AppConstants';
import Immutable from 'seamless-immutable';

// eslint-disable-next-line new-cap
const initialState = Immutable({
    content: [],
    contentFetchStatus: '',
    contentHits: hits,
    contentHitsFetchStatus: '',
    contentDetails: {},
    contentDetailsFetchStatus: '',
    contentDetailsHits: {},
    contentDetailsHitsFetchStatus: '',
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

        case `${ActionTypes.CONTENT_HITS_FETCH}_PENDING`:
            return state.set('contentHitsFetchStatus', 'pending');
        case `${ActionTypes.CONTENT_HITS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                contentHits: action.payload,
                contentHitsFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.CONTENT_HITS_FETCH}_REJECTED`:
            return state.set('contentHitsFetchStatus', 'rejected');

        case `${ActionTypes.CONTENT_DETAILS_FETCH}_PENDING`:
            return state.set('contentDetailsFetchStatus', 'pending');
        case `${ActionTypes.CONTENT_DETAILS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                contentDetails: action.payload[0],
                contentDetailsFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.CONTENT_DETAILS_FETCH}_REJECTED`:
            return state.set('contentDetailsFetchStatus', 'rejected');

        case `${ActionTypes.CONTENT_DETAILS_HITS_FETCH}_PENDING`:
            return state.set('contentDetailsHitsFetchStatus', 'pending');
        case `${ActionTypes.CONTENT_DETAILS_HITS_FETCH}_FULFILLED`:
            return Immutable.merge(state, {
                contentDetailsHits: action.payload,
                contentDetailsHitsFetchStatus: 'fulfilled'
            });
        case `${ActionTypes.CONTENT_DETAILS_HITS_FETCH}_REJECTED`:
            return state.set('contentDetailsHitsFetchStatus', 'rejected');

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

