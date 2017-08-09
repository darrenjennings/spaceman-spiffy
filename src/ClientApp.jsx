// @flow

import React from 'react';
import { render } from 'react-dom';
// import perf from 'react-addons-perf';
import App from './App';

// window.perf = perf;
// perf.start();

const renderApp = () => {
	render(<App />, document.getElementById('app'));
};
renderApp();

if (module.hot) {
	module.hot.accept('./App', () => {
		renderApp();
	});
}
