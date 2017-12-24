import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import styles from "./App.css";
import { increment } from "../actions/counter";
import { searchQueryUpdated } from "../actions";

import Search from "../components/Search";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("mounted");
  };

  bob = "bye";

  state = {
    selectedIndex: null
  };

  onQueryChange = evt => {
    this.props.queryChanged(evt.target.value);
  };

  onKeyDown = evt => {
    console.log(this.bob);
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
