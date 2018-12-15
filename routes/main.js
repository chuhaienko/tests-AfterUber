'use strict';

module.exports = function () {
	return [
		['GET', '/prices', this.controllers.prices.list],
	];
};
