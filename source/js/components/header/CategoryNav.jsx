/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, react/prop-types */
import 'foundation-sites/js/entries/foundation.js';
import $ from 'jquery';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from 'state/actions/index.js'; // eslint-disable-line import/no-unresolved
import config from 'config'; // eslint-disable-line import/no-unresolved

class CategoryNav extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
		this.setCategoryState = this.setCategoryState.bind(this);
	}

	componentDidMount() {
		$(this.ref.current).foundation();
	}

	setCategoryState(category) {
		// eslint-disable-next-line react/prop-types
		this.props.setCategory(category.toLowerCase());
	}

	render() {
		const categories = config.get().categories;

		const categoryLinks = categories.map(function(category) {
			const categoryLink = `/wall/${category.toLowerCase()}`;
			const clickAction = () => this.setCategoryState(category);
			let linkClass = '';
			if (this.props.match.params.category.toLowerCase() === category.toLowerCase()) {
				linkClass = 'is-active';
			}
			return (
				<li key={category} className={linkClass} onClick={clickAction}>
					<Link to={categoryLink}>{category}</Link>
				</li>
			);
		}, this);

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

function mapDispatchToProps(dispatch) {
	return {
		setCategory: category => dispatch(actions.setCategory(category)),
	};
}

export default connect(null, mapDispatchToProps)(CategoryNav);
