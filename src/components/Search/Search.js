import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import styles from "./Search.css";
import { searchQueryUpdated } from "../../actions";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("mounted search");
  };

  state = {
    selectedIndex: 0
  };

  onQueryChange = evt => {
    this.props.queryChanged(evt.target.value);
  };

  onKeyDown = evt => {
    switch (evt.key) {
      case "ArrowDown":
        this.setState({ selectedIndex: this.state.selectedIndex + 1 });
        break;
      case "ArrowUp":
        this.setState({ selectedIndex: this.state.selectedIndex - 1 });
        break;
      case "Enter":
        console.log("go into entry");
        break;
      default:
        return;
    }

    evt.stopPropagation();
  };

  render() {
    console.log("rendering search");

    return (
      <div onKeyDown={this.onKeyDown}>
        <input
          onChange={this.onQueryChange}
          onKeyDown={this.onKeyDown}
          placeholder="Enter search here"
        />
        <ul className={styles.results}>
          {this.props.results.map((result, i) => (
            <li
              key={result}
              className={classnames({
                [styles.item]: true,
                [styles.selected]: this.state.selectedIndex === i
              })}
            >
              {result} <button>Hi</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

/*
Search.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
