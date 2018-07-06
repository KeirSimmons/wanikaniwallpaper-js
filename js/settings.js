define(function() {

	var url_string = window.location.href
	var url = new URL(url_string);
	var api_key = url.searchParams.get("api_key");

	var defaults_ = {
		api_key: api_key,
		width: window.innerWidth,
		height: window.innerHeight,
		margin: {
			top: 10,
			bottom: 10,
			left: 10,
			right: 30
		},
		colors: {
			background: '#000000',
			unseen: '#303030',
			apprentice: '#DD0093',
			guru: '#882D9E',
			master: '#294DDB',
			enlighten: '#0093DD',
			burned: '#FFFFFF'
		}
	};
	var settings_ = {};

    function writeCookie() {
		var variable = 'wkw_settings=' + window.btoa(JSON.stringify(settings_));
		var date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
		var expires = 'expires=' + date.toGMTString();
		document.cookie = variable + ';' + expires;
	}

	function readCookie() {
		document.cookie.split(';').forEach(function(cookie) {
			var cookieParts = cookie.split('=');
			var key = cookieParts[0];
			var value = cookieParts[1];
			if (key === 'wkw_settings') {
				settings_ = JSON.parse(window.atob(value));
				return;
			}
		});
	}

	function read(property) {
		if (settings_[property] === undefined) {
			settings_[property] = defaults_[property];
			writeCookie();
		}
		return settings_[property];
	}

	function write(property, value) {
		settings_[property] = value;
		writeCookie();
	}

	readCookie();

	return {
		get api_key() { return read('api_key'); },
		get width() { return read('width'); },
		get height() { return read('height'); },
		get margin() { return read('margin'); },
		get colors() { return read('colors'); }
	};
});
