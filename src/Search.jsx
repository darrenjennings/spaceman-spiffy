// @flow

import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import ComicImage from './ComicImage';
import data from '../data.json';

class Search extends Component {
  state = {
    searchTerm: '',
    timeout: setTimeout(() => {}),
    images: [],
    date: moment('1985-11-18'),
    minimumDate: moment('1985-11-18'),
    maximumDate: moment('1995-12-31'),
    focused: false,
    useDate: false,
    imageCollectionLabel: ''
  };

  props: {
    debounce: number
  };

  updateImages = (text: string) => {
    this.setState({ images: this.filterImages(text, data.images) });
  };

  filterImages = (text: string, images: Array<Comic>) => {
    const imgsFiltered = images
      .filter(image => (this.state.date == null ? true : image.date === this.state.date.format('YYYYMMDD')))
      .filter(
        image =>
          this.state.searchTerm === '' ? true : `${image['alt-text']}`.toUpperCase().indexOf(text.toUpperCase()) >= 0
      );
    const sliced = imgsFiltered.slice(0, 10);
    this.setState({ imageCollectionLabel: `${sliced.length}/${imgsFiltered.length}` });
    return sliced;
  };

  handleDatePicked = (date: moment$Moment) => {
    this.setState({ date }, this.updateImages(''));
  };

  handleDateToggle = () => {
    this.setState({ useDate: !this.state.useDate, searchTerm: '' }, () => {
      if (this.state.useDate) {
        this.setState({ date: this.state.minimumDate }, this.updateImages(this.state.searchTerm));
      } else {
        this.setState({ date: null }, this.updateImages(this.state.searchTerm));
      }
    });
  };

  handleSearchTermChange = (event: SyntheticKeyboardEvent & { target: HTMLInputElement }) => {
    const text = event.target.value;
    const bounceDelay = this.props.debounce;

    this.setState({ searchTerm: text, date: null }, () => {
      clearTimeout(this.state.timeout);
      this.setState({
        timeout: setTimeout(() => {
          this.setState({ images: this.filterImages(text, data.images) });
        }, bounceDelay)
      });
    });
  };

  render() {
    return (
      <div id="search">
        <div className="ui toggle checkbox padding10">
          <input
            type="checkbox"
            name="use_date"
            id="use_date"
            tabIndex="0"
            className="hidden"
            onChange={this.handleDateToggle}
            value={this.state.useDate ? 'on' : 'off'}
          />
          <label htmlFor="use_date">Filter By Date</label>
        </div>
        <div style={{ display: this.state.useDate ? '' : 'none' }}>
          <SingleDatePicker
            numberOfMonths={1}
            isOutsideRange={day => day.isBefore(this.state.minimumDate) || day.isAfter(this.state.maximumDate)}
            date={this.state.date}
            onDateChange={this.handleDatePicked}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
          />
        </div>
        <div className="ui fluid massive icon input" style={{ display: !this.state.useDate ? '' : 'none' }}>
          <input
            type="text"
            id="search__input"
            placeholder="Search"
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
          />
          <i className="search icon" />
        </div>
        <div
          className="padding10"
          style={{ display: this.state.useDate || this.state.searchTerm === '' ? 'none' : '' }}
        >
          <em>
            Displaying {this.state.imageCollectionLabel} Results with current search term {`"${this.state.searchTerm}"`}
          </em>
        </div>
        {this.state.images.length > 0
          ? this.state.images.map(image => <ComicImage key={image.date} image={image} />)
          : ''}
      </div>
    );
  }
}

export default Search;
