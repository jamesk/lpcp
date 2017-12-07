// React imports
import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";

// app specific imports
import App from "./containers/App";
import configureStore from "./store/configureStore";
import rootSaga from "./sagas";

const store = configureStore({ counter: 0, query: "", results: [] });
store.runSaga(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
