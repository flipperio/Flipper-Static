import 'foundation-sites/js/entries/foundation.js';
import $ from 'jquery';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './state/store.js';
import Header from './components/header/Header.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$(document).foundation();
	}

	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Header />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
} export default App;
