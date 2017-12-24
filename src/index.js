// React imports
import React from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";

// app specific imports
import App from "./containers/App";
import configureStore from "./store/configureStore";
import rootSaga from "./sagas";

const store = configureStore({ counter: 0, query: "", results: [] });
store.runSaga(rootSaga);

const render = Component => {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  );
};

render(App);

if (module.hot) {
  module.hot.accept(); /*
  module.hot.accept("./containers/App", () => {
    const NextApp = require("./containers/App").default;
    render(App);
  });*/
}
