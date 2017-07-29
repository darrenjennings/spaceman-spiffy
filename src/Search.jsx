// @flow

import React, { Component } from 'react';
import data from '../data.json';

class Search extends Component {
  state = {
    searchTerm: ''
  };

  handleSearchTermChange = (event: SyntheticKeyboardEvent & { target: HTMLInputElement }) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    let a = this.state.searchTerm.toUpperCase();

    return (
      <div id="search">
        <div className="ui fluid massive icon input">
          <input
            type="text"
            placeholder="Search"
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
          />
          <i className="search icon" />
        </div>
        {data.images
          .filter(
            image =>
              `${image['alt-text']} ${image.image_txt}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >=
                0 && this.state.searchTerm !== ''
          )
          .map(image => (
            <div key={image.date}>
              <div className="ui image">
                <img alt={image['alt-text']} src={image.comic_img_url} />
              </div>
            </div>
          ))
          .slice(0, 4)}
      </div>
    );
  }
}

export default Search;
