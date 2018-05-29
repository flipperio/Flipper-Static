import React from 'react';
import PropTypes from 'prop-types';
import wallModes from 'state/enum/wallModes.js';
import bus from 'js/events/bus.js';
import api from 'js/services/flipperApi.js';
import Post from './Post.jsx';
import ErrorMessage from '../ErrorMessage.jsx';
import LoadingIndicator from '../LoadingIndicator.jsx';

class PostList extends React.Component {
	constructor(props) {
		super(props);
		this.onNewPostMade = this.onNewPostMade.bind(this);
		this.loadNextPage = this.loadNextPage.bind(this);
		this.state = { posts: null, apiError: false, loading: false };
		this.mounted = true;
		this.paging = {
			page: 1,
			lastPageLoaded: -1,
			lastPageEmpty: false
		};
	}

	componentDidMount() {
		bus.on(bus.eventTypes.POST_MADE, this.onNewPostMade);
		this.props.pagingManager.on('page', this.loadNextPage);
		this.loadNewPosts(true);
	}

	componentDidUpdate(prevProps) {
		const newCategory = this.props.category !== prevProps.category;
		const newWallMode = this.props.wallMode !== prevProps.wallMode;
		const newParent = this.props.parentId !== prevProps.parentId;

		if (newCategory || newWallMode || newParent) {
			this.resetPaging();
			this.loadNewPosts(true);
		}
	}
	componentWillUnmount() {
		this.mounted = false;
		bus.off(bus.eventTypes.POST_MADE, this.onNewPostMade);
	}

	onNewPostMade({ category, parentPost } = {}) {
		if (this.props.parentId && parentPost && this.props.parentId === parentPost.id) {
			this.refresh();
		}
		else if (this.props.category === category) {
			this.refresh();
		}
	}

	canPage() {
		if (this.props.wallMode !== wallModes.RECENT && !this.props.parentId) {
			return false;
		}

		return true;
	}

	loadNextPage() {
		if (this.canPage() && this.paging.lastPageLoaded === this.paging.page && this.paging.lastPageEmpty === false) {
			this.paging.page += 1;
			this.loadNewPosts(false);
		}
	}

	resetPaging() {
		this.paging.page = 1;
		this.paging.lastPageLoaded = -1;
		this.paging.lastPageEmpty = false;
	}

	refresh() {
		this.resetPaging();
		this.loadNewPosts(true);
	}

	loadNewPosts(clear = false) {
		this.setState({ loading: true });
		let requestPromise;


		if (this.props.parentId) {
			requestPromise = api.getComments({
				parentId: this.props.parentId,
				count: this.props.count,
				page: this.paging.page
			});
		}
		else if (this.props.wallMode === wallModes.RECENT) {
			requestPromise = api.getPosts({
				category: this.props.category,
				count: this.props.count,
				page: this.paging.page
			});
		}
		else if (this.props.wallMode === wallModes.FIRE) {
			requestPromise = api.getFire({ category: this.props.category });
		}
		else {
			return this.setState({ posts: null, apiError: false, loading: false });
		}

		requestPromise.then(
			(newPosts) => {
				if (this.mounted === false) {
					return;
				}

				let posts;
				if (clear === true) {
					posts = newPosts;
				}
				else {
					posts = [...this.state.posts || [], ...newPosts];
				}

				if (!newPosts.length) {
					this.paging.lastPageEmpty = true;
				}
				else {
					this.paging.lastPageEmpty = false;
				}

				this.paging.lastPageLoaded = this.paging.page;
				this.setState({ posts: posts, apiError: null, loading: false });
			},
			(error) => {
				if (this.mounted === false) {
					return;
				}

				let posts;
				if (clear === true) {
					posts = null;
				}
				else {
					posts = this.state.posts;
				}

				this.paging.lastPageEmpty = true;
				this.setState({ posts: posts, apiError: error, loading: false });
			}
		);
	}

	render() {
		let errorMessage;
		let loadingIndicator;

		if (this.state.apiError) {
			errorMessage = (
				<div className='post-styled-tab post-styled-tab--bottom'>
					<ErrorMessage>An error has occured. Please try again later</ErrorMessage>
				</div>
			);
		}
		else if (this.state.loading) {
			loadingIndicator = <LoadingIndicator />;
		}

		let posts;
		if (this.state.posts) {
			posts = this.state.posts.map(postData => <Post key={`${postData.title}--${postData.id}`} post={postData} {...this.props.passDown} />);
		}

		return (
			<div className='post-list'>
				{posts}
				{errorMessage}
				{loadingIndicator}
			</div>
		);
	}
}

PostList.propTypes = {
	count: PropTypes.number.isRequired,
	parentId: (props, propName, componentName) => {
		if (props[propName] && props.category) {
			return new Error(`Property '${propName}' can not be defined if property 'category' is also defined. Validation failed for ${componentName}.`);
		}
		else if (props[propName] && props.wallMode) {
			return new Error(`Property '${propName}' can not be defined if property 'wallMode' is also defined. Validation failed for ${componentName}.`);
		}
		else if (!props[propName] && !props.category) {
			return new Error(`At least one of props '${propName}' or 'category' is required. Validation failed for ${componentName}.`);
		}
	},
	category: (props, propName, componentName) => {
		if (props[propName] && !props.wallMode) {
			return new Error(`Prop '${propName}' must be defined with prop 'wallMode'. Validation failed for $${componentName}`);
		}
	},
	wallMode: PropTypes.string,
	pagingManager: PropTypes.shape({
		on: PropTypes.func.isRequired
	}).isRequired,
	passDown: PropTypes.object
};

PostList.defaultProps = {
	parentId: null,
	category: null,
	wallMode: null,
	passDown: null
};

export default PostList;
