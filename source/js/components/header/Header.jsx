import 'foundation-sites/js/entries/foundation.js';
import $ from 'jquery';

import React from 'react';
import { Route, Link } from 'react-router-dom';
import config from 'config';
import MainNav from './MainNav.jsx';
import CategoryNav from './CategoryNav.jsx';
import ControlNav from './ControlNav.jsx';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.headerRef = React.createRef();
	}

	componentDidMount() {
		$(this.headerRef.current).foundation();
	}

	render() {
		const siteMap = config.get().siteMap;

		const header = (
			<header ref={this.headerRef}>
				<div className='site-nav-toggle-bar' data-responsive-toggle='main-header' data-hide-for='medium'>
					<Link to={siteMap.home.defaultPath}>
						<img src='/images/logo.png' alt='' className='logo' />
					</Link>
					<button data-toggle='main-header'>Menu</button>
				</div>
				<div id='main-header' className='site-nav-group'>
					<MainNav />
					<Route path={siteMap.wall.path} component={CategoryNav} />
					<Route path={siteMap.wall.path} component={ControlNav} />
				</div>
			</header>
		);

		return header;
	}
}


export default Header;
