'use strict';

exports.default = function () {
	return {
		after: {
			namePrefix:      'After',
			priceMultiplier: 0.8
		},
		uber: {
			clientId:     this.env('UBER_CLIENT_ID'),
			clientSecret: this.env('UBER_CLIENT_SECRET'),
			serverToken:  this.env('UBER_SERVER_TOKEN'),
		}
	};
};
