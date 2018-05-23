import 'foundation-sites/js/entries/foundation.js';
import $ from 'jquery';

import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config'; // eslint-disable-line import/no-unresolved

class MainNav extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		$(this.ref.current).foundation();
	}

	render() {
		const siteMap = config.get().siteMap;
		const siteMapLinks = siteMap.map(function(location) {
			return (
				<li key={location.path}>
					<Link to={location.path}>
						<i className={location.icon} />
						<span>{location.label}</span>
					</Link>
				</li>
			);
		});

		return (
			<nav className='site-nav' ref={this.ref}>
				<div className='site-nav__bar'>
					<Link to='/' className='show-for-medium'>
						<img className='logo' src='/images/logo.png' alt='' />
					</Link>
					<ul>
						{siteMapLinks}
					</ul>
				</div>
			</nav>
		);
	}
}

export default MainNav;
