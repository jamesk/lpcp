import { all, fork } from "redux-saga/effects";

import fetchSearchResultsWatcher from "./search";

export default function* root() {
  yield all([fork(fetchSearchResultsWatcher)]);
}
