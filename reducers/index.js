import { combineReducers } from "redux";

import { INCREMENT } from "../actions/counter";
import { actionTypes } from "../actions";

const counter = (counter = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return counter + 1;
    default:
      return counter;
  }
};

const query = (query = "", action) => {
  switch (action.type) {
    case actionTypes.SEARCH_QUERY_UPDATED:
      return action.q;
    default:
      return query;
  }
};

const results = (results = [], action) => {
  switch (action.type) {
    case actionTypes.SEARCH_FETCH_SUCCESS:
      return action.results;
    default:
      return results;
  }
};

const rootReducer = combineReducers({
  counter,
  query,
  results
});

export default rootReducer;
