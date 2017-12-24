import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import styles from "./App.css";
import { increment } from "../actions/counter";
import { searchQueryUpdated } from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedOption: ""
  };

  onSearchKeyUp = evt => {
    this.props.queryChanged(evt.target.value);
  };

  render() {
    return (
      <div>
        <input onChange={this.onSearchKeyUp} placeholder="Enter search here" />
        <select
          style={{ maxHeight: "300px", overflowY: "scroll" }}
          size={15}
          onChange={e => console.log(e.target.value)}
        >
          {this.props.results.map(x => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

/*
App.propTypes = {
  counter: PropTypes.number.isRequired
};
*/

function mapDispatchToProps(dispatch) {
  return {
    queryChanged: q => {
      dispatch(searchQueryUpdated(q));
    }
  };
}

function mapStateToProps(state) {
  return {
    query: state.query,
    results: state.results
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
