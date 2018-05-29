import React from 'react';
import PropTypes from 'prop-types';
import postPropType from 'js/prop-types/post.propType.js';
import WithFormState from 'js/utils/WithFormState.js';
import WithDisplayState from 'js/utils/WithDisplayState.js';
import api from 'js/services/flipperApi.js';
import spamCheck from 'js/services/spamCheck.js';
import ErrorMessage from '../ErrorMessage.jsx';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.onStarClick = this.onStarClick.bind(this);
		this.onCommentClick = this.onCommentClick.bind(this);
		this.isComment = this.isComment.bind(this);
		this.displayPost = this.displayPost.bind(this);
		this.state = { starErrorMessage: false };
	}


	onStarClick(event) {
		event.stopPropagation();
		if (spamCheck.cookiesEnabled() === false) {
			return this.setState({ starErrorMessage: 'Please enable cookies to star this post' });
		}
		else if (spamCheck.canStar(this.props.post.id) === false) {
			return this.setState({	starErrorMessage: "You've already stared this post" });
		}
		api.starPost({ postId: this.props.post.id }).then(
			() => {
				this.props.post.stars += 1;
				spamCheck.addStar(this.props.post.id);
				this.setState({ starErrorMessage: '' });
			},
			() => {
				this.setState({ starErrorMessage: 'Unable to star this post. Pease try again later' });
			}
		);
	}
	onCommentClick(event) {
		if (this.props.onDisplay === true) {
			event.stopPropagation();
			this.props.setPostForm(null, this.props.post);
		}
	}

	isComment() {
		return !!this.props.post.parent;
	}

	displayPost() {
		if (this.props.onDisplay === true && this.isComment() === false && !window.getSelection().toString()) {
			this.props.setPostForm(null, this.props.post);
		}
		else if (this.props.onDisplay === true || this.isComment() || window.getSelection().toString()) {
			// only display the post if it is not already on display, not a comment, and no text is currently highlighted
			return;
		}
		this.props.setPostDisplay(this.props.post);
	}

	createStarButton() {
		return (
			<button onClick={this.onStarClick} className='post__btn post__btn--star'>
				<i className='icon-star-full' />
				<span>{this.props.post.stars}</span>
			</button>
		);
	}
	createCommentButton() {
		if (this.isComment() === true) {
			return null;
		}

		return (
			<button onClick={this.onCommentClick} className='post__btn post__btn--comment'>
				<i className='icon-comments-full' />
				<span>{this.props.post.comments}</span>
			</button>
		);
	}

	createPostControls() {
		return (
			<div className='post__control'>
				<div>
					{this.createStarButton()}
					{this.createCommentButton()}
				</div>
				<div className='post__date'>{new Date(this.props.post.timestamp).toLocaleString()}</div>
			</div>
		);
	}

	createPostContent() {
		return (
			<section className='post__content'>
				<p className='post__title'>{this.props.post.title}</p>
				<p className='post__body'>{this.props.post.body}</p>
			</section>
		);
	}

	render() {
		let errorMessage;
		let extraCss = '';

		if (this.state.starErrorMessage) {
			errorMessage = <ErrorMessage>{this.state.starErrorMessage}</ErrorMessage>;
		}
		if (this.isComment() === false) {
			extraCss += 'post--can-hover';
		}
		if (this.props.onDisplay === true) {
			extraCss += ' post--large';
		}

		return (
			<article className={`post ${extraCss}`} onClick={this.displayPost}>
				{this.createPostContent()}
				{this.createPostControls()}
				<div>
					{errorMessage}
				</div>
			</article>
		);
	}
}

Post.propTypes = {
	onDisplay: PropTypes.bool,
	post: postPropType.isRequired,
	setPostDisplay: PropTypes.func.isRequired,
	setPostForm: PropTypes.func.isRequired
};
Post.defaultProps = {
	onDisplay: false
};

export default WithFormState(WithDisplayState(Post, false, true), false, true);
