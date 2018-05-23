/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/anchor-is-valid, no-script-url, react/prop-types */
import 'foundation-sites/js/entries/foundation.js';
import $ from 'jquery';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from 'state/actions/index.js'; // eslint-disable-line import/no-unresolved
import wallModes from 'state/enum/wallModes.js'; // eslint-disable-line import/no-unresolved

class ControlNav extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		$(this.ref.current).foundation();
	}

	setWallMode(mode) {
		// eslint-disable-next-line react/prop-types
		this.props.setWallMode(mode);
	}

	render() {
		const controlLinks = [];
		const addLink = (name, mode, iconName) => {
			const clickAction = () => this.setWallMode(mode);
			let linkClass = '';

			if (this.props.wallMode === mode) {
				linkClass = 'is-active';
			}
			const newLink = (
				<li key={name} onClick={clickAction} className={linkClass}>
					<Link to="#">
						<i className={iconName} />
						<span>{name}</span>
					</Link>
				</li>
			);

			controlLinks.push(newLink);
		};

		addLink('Recent', wallModes.RECENT, 'icon-spin-alt');
		addLink('Updating', wallModes.UPDATING, 'icon-bolt');
		addLink('Fire', wallModes.FIRE, 'icon-flame');

		return (
			<nav className='site-nav' ref={this.ref}>
				<div className='site-nav-toggle-bar' data-responsive-toggle='control-menu' data-hide-for='medium'>
					<button data-toggle='control-menu'>Control</button>
				</div>
				<div id='control-menu' className='site-nav__bar'>
					<ul>
						{controlLinks}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { wallMode: state.wallMode };
}

function mapDispatchToProps(dispatch) {
	return {
		setWallMode: wallMode => dispatch(actions.setWallMode(wallMode)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlNav);
