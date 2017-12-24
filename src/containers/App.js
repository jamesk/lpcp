import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./App.css";
import Search from "../components/Search";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("mounted");
  };

  render() {
    console.log("rendering");

    return (
      <div>
        <Search />
      </div>
    );
  }
}

/*
App.propTypes = {
  counter: PropTypes.number.isRequired
};
*/

export default App;
