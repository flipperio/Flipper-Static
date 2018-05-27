import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import config from 'config';

import store from './state/store.js';
import Wall from './pages/Wall.jsx';
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
								<Route path='/' exact render={() => <Redirect to={siteMap.wall.defaultPath} />} />
								<Route path='/wall' exact component={() => <Redirect to={siteMap.wall.defaultPath} />} />
								<Route path={siteMap.wall.path} exact component={Wall} />
								<Route path='/404' exact component={NotFound} />
								<Redirect to='/404' />
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
