import React from 'react';
import PropTypes from 'prop-types';
import postPropType from 'js/prop-types/post.propType.js';
import Ajv from 'ajv';
import bus from 'js/events/bus.js';
import WithFormState from 'js/utils/WithFormState.js';
import config from 'config';
import Post from '../Post.jsx';
import ErrorMessage from '../../ErrorMessage.jsx';
import LoadingIndicator from '../../LoadingIndicator.jsx';
import api from '../../../services/flipperApi.js';

class PostForm extends React.Component {
	constructor(props) {
		super(props);
		this.containerRef = React.createRef();
		this.onSubmit = this.onSubmit.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onBodyChange = this.onBodyChange.bind(this);
		this.onModalClick = this.onModalClick.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.defaultState = {
			loading: false,
			success: false,
			apiError: false,
			titleText: '',
			bodyText: '',
			titleErrorText: '',
			bodyErrorText: ''
		};
		this.state = Object.assign({}, this.defaultState);

		this.ajvInstance = new Ajv();
		this.validateTitle = this.ajvInstance.compile(config.get().formSchema.title);
		this.validateBody = this.ajvInstance.compile(config.get().formSchema.body);
	}

	onSubmit(event) {
		event.preventDefault();
		if (this.state.titleErrorText || this.state.bodyErrorText) {
			return true;
		}
		else if (!this.state.titleText || !this.state.bodyText) {
			return true;
		}

		this.setState({ loading: true, apiError: false });
		const requestOptions = {
			title: this.state.titleText,
			body: this.state.bodyText
		};

		if (this.props.form.parentPost) {
			requestOptions.parent = this.props.form.parentPost.id;
			requestOptions.category = this.props.form.parentPost.category;
		}
		else {
			requestOptions.category = this.props.form.category;
		}

		api.makePost(requestOptions).then(
			() => {
				bus.emit(bus.eventTypes.POST_MADE, {
					category: this.props.form.category || this.props.form.parentPost.category,
					parentPost: this.props.form.parentPost
				});
				this.setState({ loading: false, apiError: false, success: true });
			},
			() => {
				this.setState({ loading: false, apiError: true, success: false });
			}
		);
	}

	onTitleChange(event) {
		const text = event.target.value;
		const isValid = this.validateTitle(text);
		let errorText = '';

		if (isValid === false) {
			errorText = this.ajvInstance.errorsText(this.validateTitle.errors, { dataVar: 'Title' });
		}
		else if (text.trim().length === 0) {
			errorText = 'No empty titles';
		}
		this.setState({ titleText: text, titleErrorText: errorText });
	}

	onBodyChange(event) {
		const text = event.target.value;
		const isValid = this.validateBody(text);
		let errorText = '';

		if (isValid === false) {
			errorText = this.ajvInstance.errorsText(this.validateBody.errors, { dataVar: 'Body' });
		}
		else if (text.trim().length === 0) {
			errorText = 'No empty bodies';
		}
		this.setState({ bodyText: text, bodyErrorText: errorText });
	}

	onModalClick(event) {
		if (event.target === this.containerRef.current) {
			this.closeModal();
		}
	}

	closeModal() {
		this.setState(this.defaultState);
		this.props.setPostForm(null, null);
	}

	createFormTitle() {
		let titleText;

		if (this.props.form.parentPost) {
			titleText = 'Reply to';
		}
		else if (this.props.form.category) {
			const category = this.props.form.category;
			titleText = `Make a post in ${category.charAt(0).toUpperCase() + category.substr(1)}`;
		}
		else {
			titleText = "No 'form.parentPost' or 'form.category' props have been passed to this form!";
		}

		return (
			<div className='post-form__title'>
				<p>{titleText}</p>
				<button onClick={this.closeModal}><i className='icon-cross' /></button>
			</div>
		);
	}
	createParentPreview() {
		if (!this.props.form.parentPost) {
			return null;
		}

		return <Post post={this.props.form.parentPost} disableInteraction />;
	}
	createFormInput() {
		const titleInputPlaceholder = 'Enter title';
		const bodyInputPlaceholder = 'Enter body';
		const disabledProp = {};
		let loadingIndicator = null;

		if (this.state.loading === true) {
			disabledProp.disabled = true;
			loadingIndicator = <LoadingIndicator />;
		}
		else if (this.state.success === true) {
			return (
				<p className='post-form__success'>Success</p>
			);
		}

		return (
			<form onSubmit={this.onSubmit}>
				<input type='text' value={this.state.titleText} onChange={this.onTitleChange} placeholder={titleInputPlaceholder} {...disabledProp} />
				<p className='post-form__error'>{this.state.titleErrorText}</p>
				<textarea value={this.state.bodyText} onChange={this.onBodyChange} placeholder={bodyInputPlaceholder} {...disabledProp} />
				{loadingIndicator}
				<p className='post-form__error'>{this.state.bodyErrorText}</p>
				<button type='submit' {...disabledProp}>Flip It</button>
			</form>
		);
	}

	render() {
		if (!this.props.form.category && !this.props.form.parentPost) {
			return null;
		}

		let errorMessage;

		if (this.state.apiError) {
			let errorText;
			if (this.props.form.parentPost) {
				errorText = 'Unable to create reply. Please try again later';
			}
			else {
				errorText = 'Unable to create post. Please try again later';
			}
			errorMessage = (
				<div className='post-styled-tab post-styled-tab--bottom'>
					<ErrorMessage>{errorText}</ErrorMessage>
				</div>
			);
		}


		return (
			<div className='modal'>
				<div className='modal__overlay' />
				<div className='modal__content' onClick={this.onModalClick} ref={this.containerRef}>
					<div className='post-form'>
						{this.createFormTitle()}
						{this.createParentPreview()}
						<div className='post-form__input'>
							{this.createFormInput()}
						</div>
						{errorMessage}
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	form: PropTypes.shape({
		category: PropTypes.string,
		parentPost: postPropType
	}).isRequired,
	setPostForm: PropTypes.func.isRequired
};

export default WithFormState(PostForm);
