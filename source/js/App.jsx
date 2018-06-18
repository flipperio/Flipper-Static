import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import config from 'config';

import store from './state/store.js';
import Home from './pages/Home.jsx';
import Wall from './pages/Wall.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import Header from './components/header/Header.jsx';
import PostDisplay from './components/post/modals/PostDisplay.jsx';
import PostForm from './components/post/modals/PostForm.jsx';

function App() {
	const siteMap = config.get().siteMap;

	return (
		<ErrorBoundary>
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Header />
						<main>
							<Switch>
								<Route path={siteMap.home.path} exact component={Home} />
								<Route path={siteMap.about.path} exact component={About} />
								<Route path={siteMap.wall.path} exact component={Wall} />

								<Route path='*' component={NotFound} />
							</Switch>
							<PostDisplay />
							<PostForm />
						</main>
					</div>
				</BrowserRouter>
			</Provider>
		</ErrorBoundary>
	);
} export default App;
