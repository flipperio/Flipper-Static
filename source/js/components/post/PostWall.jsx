import React from 'react';
import PropTypes from 'prop-types';
import PagingManager from 'js/utils/pagingManager.js';
import PostList from './PostList.jsx';


class PostWall extends React.Component {
	constructor(props) {
		super(props);
		this.wallRef = React.createRef();
		this.paging = new PagingManager();
	}

	componentDidMount() {
		this.paging.trackPaging(window, this.wallRef.current);
	}

	render() {
		const listOptions = {
			pagingManager: this.paging,
			category: this.props.wall.category,
			wallMode: this.props.wall.mode,
			count: 10
		};
		return (
			<div className='post-wall' ref={this.wallRef}>
				<PostList {...listOptions} />
			</div>
		);
	}
}

PostWall.propTypes = {
	wall: PropTypes.shape({
		category: PropTypes.string.isRequired,
		mode: PropTypes.string.isRequired
	}).isRequired
};

export default PostWall;
