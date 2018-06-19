import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import flipperApi from 'js/services/flipperApi.js';
import { BaseComponent as Post } from 'js/components/post/post.jsx';

enzyme.configure({ adapter: new Adapter() });
jest.mock('js/services/flipperApi.js', () => ({}));

describe('Post component', function() {
	const data = {
		post: {},
		props: {}
	};

	const utils = {
		findStarButton: renderedPost => renderedPost.find('button').at(0),
		findCommentButton: renderedPost => renderedPost.find('button').at(1)
	};

	const mockClickEvent = { stopPropagation: () => undefined };

	beforeAll(function() {
		global.window.getSelection = jest.fn().mockReturnValue('');
	});

	beforeEach(function() {
		flipperApi.starPost = jest.fn().mockReturnValueOnce(Promise.resolve());

		data.post = {
			id: '12abc3',
			title: 'A SAMPLE TITLE FOR A SAMPLE POST',
			body: 'BODY OF THE SAMPLE POST',
			category: 'Main',
			timestamp: new Date().toISOString(),
			comments: 3,
			stars: 4,
			parent: null
		};

		data.props = {
			post: data.post,
			setPostDisplay: jest.fn(),
			setPostForm: jest.fn()
		};
	});

	it('Sets post display on click', function() {
		const output = enzyme.shallow(<Post {...data.props} />);
		output.first().simulate('click');
		expect(data.props.setPostDisplay.mock.calls.length).toBe(1);
		expect(data.props.setPostForm.mock.calls.length).toBe(0);
	});

	it('Sets post form on click', function() {
		data.props.onDisplay = true;
		const output = enzyme.shallow(<Post {...data.props} />);
		output.first().simulate('click');
		expect(data.props.setPostForm.mock.calls.length).toBe(1);
	});

	it('Sets post form on comment button click', function() {
		data.props.onDisplay = true;
		const output = enzyme.shallow(<Post {...data.props} />);
		const commentButton = utils.findCommentButton(output);
		commentButton.simulate('click', mockClickEvent);

		expect(data.props.setPostForm.mock.calls.length).toBe(1);
	});

	it('Calls API method on star click', function() {
		const output = enzyme.shallow(<Post {...data.props} />);
		const starButton = utils.findStarButton(output);
		starButton.simulate('click', mockClickEvent);
		expect(flipperApi.starPost.mock.calls.length).toBe(1);
	});

	it('Does not call API method on multiple star click', function() {
		// relys on a previous test to have clicked the star button already
		const output = enzyme.shallow(<Post {...data.props} />);
		const starButton = utils.findStarButton(output);
		starButton.simulate('click', mockClickEvent);
		expect(flipperApi.starPost.mock.calls.length).toBe(0);
	});
});
