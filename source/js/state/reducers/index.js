import actionTypes from '../enum/actionTypes';

export default function(state, action) {
	switch (action.type) {
		case actionTypes.SET_CATEGORY: {
			return { ...state, category: action.payload.category };
		}
		case actionTypes.SET_WALL_MODE: {
			return { ...state, wallMode: action.payload.mode };
		}
		case actionTypes.SET_POSTING: {
			return { ...state, isPosting: action.payload.isPosting, parentPost: action.payload.parentPost };
		}
		default: {
			return state;
		}
	}
}
