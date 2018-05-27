import actionTypes from '../enum/actionTypes.js';

export default {
	setWallState: function(category, mode) {
		if (typeof category === 'string') {
			category = category.toLowerCase();
		}
		return { type: actionTypes.SET_WALL_STATE, payload: { category, mode } };
	},
	setPostForm: function(category, parentPost) {
		return { type: actionTypes.SET_POST_FORM, payload: { category, parentPost } };
	},
	setPostDisplay: function(post) {
		return { type: actionTypes.SET_POST_DISPLAY, payload: { post } };
	}
};
