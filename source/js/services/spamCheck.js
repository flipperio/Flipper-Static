import cookieHelp from 'js/utils/cookieHelp.js';

export default new function() {
	const cookieName = 'starTrack';
	const cookieLifeSpan = 1; // days
	const starMap = new Map();

	const serializationDivider = '|';
	let serializedStars = cookieHelp.getCookie(cookieName);

	serializedStars.split(serializationDivider).forEach(function(postId) {
		if (postId) {
			starMap.set(postId, true);
		}
	});

	this.canStar = function(postId) {
		return !starMap.has(postId);
	};

	this.addStar = function(postId) {
		starMap.set(postId, true);

		if (serializedStars.length === '0') {
			serializedStars += `${postId}`;
		}
		else {
			serializedStars += `${serializationDivider}${postId}`;
		}

		cookieHelp.setCookie(cookieName, serializedStars, '/', cookieLifeSpan);
	};

	this.cookiesEnabled = cookieHelp.cookiesEnabled;
}();
