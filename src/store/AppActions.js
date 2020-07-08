import * as ActionTypes from '../AppConstants';

import API from '../Utilities/Api';

const fetchData = async (url, headers, options) => {
    const response = await API.get(url, headers, options);
    return response.data;
};

export const fetchContent = (options) => ({
    type: ActionTypes.CONTENT_FETCH,
    payload: fetchData(ActionTypes.CONTENT_FETCH_URL, {}, options)
});
export const fetchContentDetails = (options) => ({
    type: ActionTypes.CONTENT_DETAILS_FETCH,
    payload: fetchData(`${ActionTypes.CONTENT_DETAILS_FETCH_URL}${options.name}`, {})
});
export const fetchPyData = (options) => ({
    type: ActionTypes.PY_DATA_FETCH,
    payload: fetchData(`${ActionTypes.PY_DATA_FETCH_URL}${options.name}`, {})
});
