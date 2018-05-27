/**
* @namespace
* Fetches data from the Flipper API.
* Each API method returns a promse that resolves with the API response or rejects with either a native Error object or an error response from the API.
* NOTE: 4xx and 5xx API responses will cause a rejection.
*/
export default (function() {
	const settings = {
		developmentUrl: process.env.DEVELOPMENT_API_URL,
		productionUrl: process.env.PRODUCTION_API_URL,
		apiUrl: '',
		defaultCategory: 'main',
		defaultPage: 1,
		defaultCount: 10,
		POSTContentType: 'application/json'
	};

	if (process.env.NODE_ENV === 'production') {
		settings.apiUrl = settings.productionUrl;
	}
	else {
		settings.apiUrl = settings.developmentUrl;
	}

	function _handleFetchResponse(response) {
		if (response.ok === false) {
			if (response.json) {
				return response.json().then(data => Promise.reject(data));
			}

			return Promise.reject(response);
		}

		return response.json();
	}

	function _makeRequest(url, fetchOptions) {
		return fetch(url, fetchOptions).then(_handleFetchResponse);
	}

	function set(name, value) {
		settings[name] = value;
	}

	function getPosts({ category = settings.defaultCategory, page = settings.defaultPage, count = settings.defaultCount } = {}) {
		const requestUrl = `${settings.apiUrl}/posts/?category=${category}&page=${page}&count=${count}`;
		return _makeRequest(requestUrl);
	}

	function getComments({ parentId, page = settings.defaultPage, count = settings.defaultCount } = {}) {
		const requestUrl = `${settings.apiUrl}/posts/${parentId}/comments/?page=${page}&count=${count}`;
		return _makeRequest(requestUrl);
	}

	function getFire({ category = settings.defaultCategory } = {}) {
		const requestUrl = `${settings.apiUrl}/posts/fire/?category=${category}`;
		return _makeRequest(requestUrl);
	}

	function makePost({ category = settings.defaultCategory, title, body, parent } = {}) {
		const requestUrl = `${settings.apiUrl}/posts`;
		const requestBody = JSON.stringify({ category, title, body, parent });

		const headers = new Headers();
		headers.set('Content-Type', settings.POSTContentType);

		return _makeRequest(requestUrl, { method: 'POST', body: requestBody, headers });
	}

	function starPost({ postId } = {}) {
		const requestUrl = `${settings.apiUrl}/posts/${postId}`;
		const requestBody = JSON.stringify({ star: true });

		const headers = new Headers();
		headers.set('Content-Type', settings.POSTContentType);

		return _makeRequest(requestUrl, { method: 'POST', body: requestBody, headers });
	}

	return {
		set,
		getPosts,
		getComments,
		getFire,
		makePost,
		starPost
	};
}());
