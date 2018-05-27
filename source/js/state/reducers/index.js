import actionTypes from '../enum/actionTypes';

export default function(state, action) {
	switch (action.type) {
		case actionTypes.SET_WALL_STATE: {
			return { ...state, wall: { category: action.payload.category, mode: action.payload.mode } };
		}
		case actionTypes.SET_POST_FORM: {
			return { ...state, form: { category: action.payload.category, parentPost: action.payload.parentPost } };
		}
		case actionTypes.SET_POST_DISPLAY: {
			return { ...state, display: { post: action.payload.post } };
		}
		default: {
			return state;
		}
	}
}
