import { takeLatest, put, call } from "redux-saga/effects";

import {
  searchQueryUpdated,
  searchFetchSuccess,
  searchFetchFailed,
  actionTypes
} from "../actions";

function* fetchSearchResults(action) {
  console.log("fetching search results");

  try {
    const output = yield call(searchLPRaw, action.q);
    console.log(`search output:\n${output}`);
    yield put(searchFetchSuccess(output.split("\n").filter(x => x !== "")));
  } catch (error) {
    console.log(error);
    yield put(searchFetchFailed(error));
  }
}

export default function* fetchSearchResultsWatcher() {
  yield takeLatest(actionTypes.SEARCH_QUERY_UPDATED, fetchSearchResults);
}

/* TODO: should go in an api module */
function searchLPRaw(q) {
  return new Promise(function(fulfill, reject) {
    const process = require("child_process"); // The power of Node.JS

    // var ls = process.spawn('ls', ['-l']);
    var ls = process.spawn("lpass", ["ls", "--sync=no"]); //TODO: use windowsHide option?
    var grep = process.spawn("grep", ["-i", q]);

    ls.stdout.pipe(grep.stdin);

    let lsStdErr = "";
    let grepStdOut = "";
    let grepStdErr = "";

    grep.stdout.on("data", function(data) {
      grepStdOut += data;
    });

    ls.stderr.on("data", function(data) {
      lsStdErr += data;
    });
    grep.stderr.on("data", function(data) {
      grepStdErr += data;
    });

    ls.on("close", function(code) {
      if (code != 0) {
        reject(`lpass ls exited with code ${code}, stderr is:\n${lsStdErr}`);
      }
    });
    grep.on("close", function(code) {
      if (code == 0) {
        fulfill(grepStdOut);
      } else {
        reject(`grep exited with code ${code}, stderr is:\n${grepStdErr}`);
      }
    });

    const timeout = 10000;
    setTimeout(function() {
      reject(`lpass ls timed out after ${timeout}ms`);
    }, timeout);
  });
}
