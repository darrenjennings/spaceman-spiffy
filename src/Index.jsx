// @flow
import 'react-dates/lib/css/_datepicker.css';
import React, { Component } from 'react';

import '../public/css/main.css';
import Search from './Search';

class Index extends Component {
	state = {
		searchTerm: '',
		focused: false
	};

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div className="ui main container text">
				<Search debounce={1250} />
			</div>
		);
	}
}

export default Index;
