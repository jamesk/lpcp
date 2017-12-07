import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { increment } from "../actions/counter";
import { searchQueryUpdated } from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
  }

  onSearchKeyUp = evt => {
    console.log(`key up recieved event target value was ${evt.target.value}`);
    console.log(evt);
    this.props.queryChanged(evt.target.value);
  };

  render() {
    return (
      <div>
        I am a react App! Counter is at [{this.props.counter}]<button
          onClick={this.props.increment}
        >
          add one
        </button>
        <input onKeyUp={this.onSearchKeyUp} placeholder="Enter search here" />
        <ol style={{ maxHeight: "300px", overflowY: "scroll" }}>
          {this.props.results.map(x => <li>{x}</li>)}
        </ol>
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
