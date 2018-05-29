import React from 'react';
import PropTypes from 'prop-types';
import postPropType from 'js/prop-types/post.propType.js';
import PagingManager from 'js/utils/pagingManager.js';
import WithDisplayState from 'js/utils/WithDisplayState.js';
import Post from '../Post.jsx';
import PostList from '../PostList.jsx';

class PostDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.containerRef = React.createRef();
		this.displayRef = React.createRef();
		this.onModalClick = this.onModalClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.paging = new PagingManager();
	}

	componentDidUpdate() {
		if (this.containerRef.current && this.displayRef.current) {
			this.paging.trackPaging(this.containerRef.current, this.displayRef.current);
		}
	}

	onModalClick(event) {
		if (event.target === this.containerRef.current) {
			this.closeModal();
		}
	}

	closeModal() {
		this.props.setPostDisplay(null);
	}

	render() {
		if (!this.props.display.post) {
			return null;
		}

		const postListOptions = {
			pagingManager: this.paging,
			parentId: this.props.display.post.id,
			count: 10
		};

		return (
			<div className='modal'>
				<div className='modal__overlay' />
				<div className='modal__content' onClick={this.onModalClick} ref={this.containerRef}>
					<div className='post-display' ref={this.displayRef}>
						<button className='post-top-button' onClick={this.closeModal}>Go Back</button>
						<Post post={this.props.display.post} onDisplay />
						<PostList {...postListOptions} />
					</div>
				</div>
			</div>
		);
	}
}

PostDisplay.propTypes = {
	display: PropTypes.shape({
		post: postPropType
	}).isRequired,
	setPostDisplay: PropTypes.func.isRequired
};

export default WithDisplayState(PostDisplay);
