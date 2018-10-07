import React from 'react';
import { Route } from 'react-router-dom';

// Pages
import Home from '../components/pages/Home';
import Gallery from '../components/pages/Gallery';

export default (props) => (
	<div className="routes">
		<Route path="/" exact render={() => <Home {...props} />} />
		<Route path="/home" exact render={() => <Home {...props} />} />
		<Route path="/gallery" exact render={() => <Gallery {...props} />} />
	</div>
);
