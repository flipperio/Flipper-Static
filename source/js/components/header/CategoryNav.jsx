import 'foundation-sites/js/entries/foundation.js';
import $ from 'jquery';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import config from 'config';
import WithWallState from 'js/utils/WithWallState.js';

class CategoryNav extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		$(this.ref.current).foundation();
	}

	createCategoryLink(category) {
		const siteMap = config.get().siteMap;

		const categoryLink = `${siteMap.wall.basePath}/${category.toLowerCase()}`;
		const clickAction = () => this.props.setWallState(category, this.props.wall.mode);

		let linkClass = '';
		if (this.props.match.params.category.toLowerCase() === category.toLowerCase()) {
			linkClass = 'is-active';
		}
		return (
			<li key={category} className={linkClass} onClick={clickAction}>
				<Link to={categoryLink}>{category}</Link>
			</li>
		);
	}

	render() {
		const categories = config.get().categories;
		const categoryLinks = categories.map(this.createCategoryLink, this);

		return (
			<nav className='site-nav site-nav--grand' ref={this.ref}>
				<div className='site-nav-toggle-bar' data-responsive-toggle='category-menu' data-hide-for='medium'>
					<button data-toggle='category-menu'>Categories</button>
				</div>
				<div id='category-menu' className='site-nav__bar'>
					<ul>
						{categoryLinks}
					</ul>
				</div>
			</nav>
		);
	}
}

CategoryNav.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			category: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	wall: PropTypes.shape({
		mode: PropTypes.string.isRequired
	}).isRequired,
	setWallState: PropTypes.func.isRequired
};

export default WithWallState(CategoryNav);
