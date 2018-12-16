'use strict';

const {BaseModule} = require('mif');


module.exports = class Cors extends BaseModule {
	async init () {
		this.app.modules['web-server'].addPre('response', function (req, controller, response, params) {
			params.headers['Access-Control-Allow-Origin'] = '*';

			return response;
		});
	}

	async start () {
		// do nothing
	}

	async stop () {
		// do nothing
	}
};
