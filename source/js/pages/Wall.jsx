import React from 'react';
import PropTypes from 'prop-types';
import WithWallState from 'js/utils/WithWallState.js';
import PostWall from '../components/post/PostWall.jsx';

function Wall(props) {
	return (
		<div className='site-container site-container--small'>
			<PostWall wall={props.wall} />
		</div>
	);
}

Wall.propTypes = {
	wall: PropTypes.shape({
		category: PropTypes.string.isRequired,
		mode: PropTypes.string.isRequired
	}).isRequired
};

export default WithWallState(Wall);
