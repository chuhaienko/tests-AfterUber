'use strict';
process.env.NODE_ENV = 'test';

const {App}   = require('mif');
const request = require('request-promise');


const app = new App();
exports.app = app;

exports.start = async function () {
	await app.init();
	await app.start();
};

exports.stop = async function () {
	return app.stop();
};

exports.getUrl = function () {
	return `http://localhost:${app.modules['web-server'].netServer.address().port}`;
};

exports.request = function (method, path, body, auth) {
	return request({
		method: method,
		url:    `${exports.getUrl()}${path}`,
		body:   body,
		auth:   auth,

		json:                    true,
		simple:                  false,
		resolveWithFullResponse: true,
	});
};
