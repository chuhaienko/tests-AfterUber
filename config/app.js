'use strict';

exports.default = function () {
	return {
		after: {
			namePrefix:      'After',
			priceMultiplier: 0.8
		},
		uber: {
			serverToken: this.env('UBER_SERVER_TOKEN'),
		},
		here: {
			appId:   this.env('HERE_APP_ID'),
			appCode: this.env('HERE_APP_CODE'),
		}
	};
};
