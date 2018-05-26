import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config';

class MainNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activelink: '' };
	}

	setActiveLink(linkLabel) {
		this.setState({ activelink: linkLabel });
	}

	render() {
		const siteMap = config.get().siteMap;
		const siteMapKeys = Object.keys(siteMap);
		const siteMapLinks = siteMapKeys.map(function(key) {
			const location = siteMap[key];
			const setLink = () => {
				this.setActiveLink(location.label.toLowerCase());
			};
			let extraCss = '';

			if (location.label.toLowerCase() === this.state.activelink) {
				extraCss = 'is-active';
			}

			return (
				<li key={location.label} onClick={setLink} className={extraCss}>
					<Link to={location.defaultPath}>
						<i className={location.icon} />
						<span>{location.label}</span>
					</Link>
				</li>
			);
		}, this);

		return (
			<nav className='site-nav'>
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
