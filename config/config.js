import config from './default.js';

/**
* Return a copy of the config object
*/
export default {
	get: function() {
		return Object.assign({}, config);
	},
};
