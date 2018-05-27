
const cookieHelp = {
	cookiesEnabled: function() {
		let enabled = navigator.cookiesEnabled;

		if (navigator.cookieenabled === undefined) {
			const testCookie = 'TEST-COOKIE';
			document.cookie = testCookie;

			if (document.cookie.indexOf(testCookie) === -1) {
				enabled = false;
			}
			else {
				enabled = true;
			}
		}

		return enabled;
	},
	setCookie: function(name, value, path, days) {
		let expireAttribute = '';
		let pathAttribute = '';
		const expireDate = new Date();
		if (days) {
			expireDate.setDate(expireDate.getDate() + days);
			expireAttribute = `;expires=${expireDate.toUTCString()}`;
		}
		if (path) {
			pathAttribute = `;path=${path}`;
		}

		const cookie = `${name}=${value}${pathAttribute}${expireAttribute}`;
		document.cookie = cookie;
	},
	getCookie: function(name) {
		if (document.cookie.length === 0) {
			return '';
		}

		let cookieStartIndex = document.cookie.indexOf(`${name}=`);
		if (cookieStartIndex === -1) {
			return '';
		}

		cookieStartIndex = cookieStartIndex + name.length + 1;
		let cookieEndIndex = document.cookie.indexOf(';', cookieStartIndex);
		if (cookieEndIndex === -1) {
			cookieEndIndex = document.cookie.length;
		}
		return unescape(document.cookie.substring(cookieStartIndex, cookieEndIndex));
	}
};

export default cookieHelp;
