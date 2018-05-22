import actionTypes from '../enum/actionTypes.js';

export default {
	setCategory: function(category) {
		return { type: actionTypes.SET_CATEGORY, payload: { category } };
	},
	setWallMode: function(mode) {
		return { type: actionTypes.SET_WALL_MODE, payload: { mode } };
	},
	setPosting: function(isPosting, parentPost) {
		return { type: actionTypes.SET_POSTING, payload: { isPosting, parentPost } };
	},
};
