import React, { Component } from "react";

class Searchbar extends Component {
  state = {
    search: "",
  };

  handleChange = (e) => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.search.trim() === "") {
      return;
    }
    this.props.onSubmit(this.state.search);
    this.reset();
  };

  reset = () => {
    this.setState({ search: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={this.state.search}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
