export const actionTypes = {
  SEARCH_QUERY_UPDATED: "SEARCH_QUERY_UPDATED",
  SEARCH_FETCH_SUCCESS: "SEARCH_FETCH_SUCCESS",
  SEARCH_FETCH_FAILED: "SEARCH_FETCH_FAILED"
};

export const searchQueryUpdated = q => ({
  type: actionTypes.SEARCH_QUERY_UPDATED,
  q
});

export const searchFetchSuccess = results => ({
  type: actionTypes.SEARCH_FETCH_SUCCESS,
  results
});

export const searchFetchFailed = error => ({
  type: actionTypes.SEARCH_FETCH_FAILED,
  error
});
