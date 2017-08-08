// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'jquery';
import Index from './Index';

const FourOhFour = () => <h1>Oops, no Calvin and Hobbes for you right now.</h1>;

const App = () => (
	<BrowserRouter>
		<div className="app">
			<Switch>
				<Route exact path="/spaceman-spiffy/" component={Index} />
				<Route component={FourOhFour} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default App;
