"use strict";
var moment = require('moment');
exports.Defaults = {
    ranges: [{
            name: 'Today',
            value: {
                start: moment(),
                end: moment()
            }
        }, {
            name: 'Yesterday',
            value: {
                start: moment().subtract(1, 'days'),
                end: moment().subtract(1, 'days')
            }
        }, {
            name: 'last 7 days',
            value: {
                start: moment().subtract(6, 'days'),
                end: moment()
            }
        }, {
            name: 'This month',
            value: {
                start: moment().startOf('month'),
                end: moment().endOf('month')
            }
        }, {
            name: 'Last Month',
            value: {
                start: moment().subtract(1, 'month').startOf('month'),
                end: moment().subtract(1, 'month').endOf('month')
            }
        }]
};
