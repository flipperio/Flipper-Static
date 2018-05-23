import 'foundation-sites/js/entries/foundation.js';
import $ from 'jquery';

import React from 'react';
import { Route, Link } from 'react-router-dom';
import MainNav from './MainNav.jsx';
import CategoryNav from './CategoryNav.jsx';
import ControlNav from './ControlNav.jsx';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		$(this.ref.current).foundation();
	}

	render() {
		const header = (
			<header ref={this.ref}>
				<div className='site-nav-toggle-bar' data-responsive-toggle='main-header' data-hide-for='medium'>
					<Link to='/'><img src='/images/logo.png' alt='' className='logo' /></Link>
					<button data-toggle='main-header'>Menu</button>
				</div>
				<div id='main-header' className='site-nav-group'>
					<MainNav />
					<Route path='/wall/:category' component={CategoryNav} />
					<Route path='/wall/:category' component={ControlNav} />
				</div>
			</header>
		);

		return header;
	}
}


export default Header;
