import { combineReducers } from "redux";

import { INCREMENT } from "../actions/counter";

const counter = (counter = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return counter + 1;
    default:
      return counter;
  }
};

const rootReducer = combineReducers({
  counter
});

export default rootReducer;
