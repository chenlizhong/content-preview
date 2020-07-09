export const CONTENT_FETCH = 'CONTENT_FETCH';
export const CONTENT_DETAILS_FETCH = 'CONTENT_DETAILS_FETCH';
export const PY_DATA_FETCH = 'PY_DATA_FETCH';

const baseParams = (base)=>`:8090/${base}/`;

export const BASE_URL = `https://10.72.32.104`;
export const CONTENT_FETCH_URL = `${BASE_URL}${baseParams('content')}?metadata_only=True`;
export const CONTENT_DETAILS_FETCH_URL = `${BASE_URL}${baseParams('content')}`;
export const PY_DATA_FETCH_URL = `${BASE_URL}${baseParams('params')}`;
