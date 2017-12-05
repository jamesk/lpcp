import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { increment } from "../actions/counter";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        I am a react App! Counter is at [{this.props.counter}]<button
          onClick={this.props.increment}
        >
          add one
        </button>
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
    }
  };
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
