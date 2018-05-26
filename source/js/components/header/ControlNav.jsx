import 'foundation-sites/js/entries/foundation.js';
import $ from 'jquery';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import wallModes from 'state/enum/wallModes.js';
import WithWallState from 'js/utils/WithWallState.js';
import WithFormState from 'js/utils/WithFormState.js';

class ControlNav extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		$(this.ref.current).foundation();
	}

	createControlLink(name, modeEnum, iconName, altAction) {
		let clickAction;
		let linkClass = '';

		if (modeEnum) {
			clickAction = () => this.props.setWallState(this.props.wall.category, modeEnum);
		}
		else {
			clickAction = altAction;
		}
		if (this.props.wall.mode === modeEnum) {
			linkClass = 'is-active';
		}
		return (
			<li key={name} onClick={clickAction} className={linkClass}>
				<Link to="#">
					<i className={iconName} />
					<span>{name}</span>
				</Link>
			</li>
		);
	}

	render() {
		const controlLinks = [];
		controlLinks.push(this.createControlLink('Recent', wallModes.RECENT, 'icon-spin-alt'));
		// controlLinks.push(this.createControlLink('Updating', wallModes.UPDATING, 'icon-bolt'));
		controlLinks.push(this.createControlLink('Fire', wallModes.FIRE, 'icon-flame'));
		controlLinks.push(this.createControlLink('Post', null, 'icon-comments', () => {
			this.props.setPostForm(this.props.wall.category);
		}));

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

ControlNav.propTypes = {
	wall: PropTypes.shape({
		category: PropTypes.string.isRequired,
		mode: PropTypes.string.isRequired
	}).isRequired,
	setWallState: PropTypes.func.isRequired,
	setPostForm: PropTypes.func.isRequired
};

export default WithWallState(WithFormState(ControlNav, false, true));
