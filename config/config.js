import config from './config.js';

/**
* Return a copy of the config object
*/
export default function get() {
	return Object.assign({}, config);
}
