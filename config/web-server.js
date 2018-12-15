'use strict';

exports.default = function () {
	return {
		port: this.env('WEB_PORT', 8080)
	};
};

exports.test = function () {
	return {
		port: 0
	};
};
