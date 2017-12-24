import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import Select from "react-select";
import "react-select/dist/react-select.css";

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
    console.log("styles:");
    console.log(styles);
    console.log(`key up recieved event target value was ${evt.target.value}`);
    console.log(evt);
    this.props.queryChanged(evt.target.value);
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  };

  render() {
    return (
      <div
        className={classnames(styles.customClass, styles.bobo)}
        style={{ backgroundColor: "blue" }}
      >
        <Select
          value={this.state.selectedOption.value}
          onChange={this.handleChange}
          options={[
            { value: "one", label: "One" },
            { value: "two", label: "Two" }
          ]}
        />
        I am a react App! Counter is at [{this.props.counter}]<button
          onClick={this.props.increment}
        >
          add one
        </button>
        <input
          onKeyUp={this.onSearchKeyUp}
          placeholder="Enter search here"
          onKeyDown={() => console.log("key down")}
        />
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
    increment: () => {
      dispatch(increment());
    },
    queryChanged: q => {
      dispatch(searchQueryUpdated(q));
    }
  };
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    query: state.query,
    results: state.results
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
