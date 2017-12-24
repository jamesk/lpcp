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
        this.setState({
          selectedIndex: Math.min(
            this.props.results.length - 1,
            this.state.selectedIndex + 1
          )
        });
        break;
      case "ArrowUp":
        this.setState({
          selectedIndex: Math.max(0, this.state.selectedIndex - 1)
        });
        break;
      case "Enter":
        console.log("go into entry");
        break;
      default:
        return;
    }

    evt.preventDefault();
    evt.stopPropagation();
  };

  render() {
    console.log("rendering search");
    const itemsToShow = 10;
    const startIndex = Math.max(0, this.state.selectedIndex - itemsToShow + 1);
    const endIndex = startIndex + itemsToShow;

    return (
      <div>
        <input
          onChange={this.onQueryChange}
          onKeyDown={this.onKeyDown}
          placeholder="Enter search here"
        />
        <ul className={styles.results} onKeyDown={this.onKeyDown}>
          {this.props.results.slice(startIndex, endIndex).map((result, i) => (
            <li
              key={result}
              className={classnames({
                [styles.item]: true,
                [styles.selected]: this.state.selectedIndex === startIndex + i
              })}
            >
              {result} <input type="text" value="hi" />
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
