"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var moment = require('moment');
require('moment-range');
var CalendarComponent = (function () {
    function CalendarComponent() {
        this.singleCalendar = false;
        this.dateChanged = new core_1.EventEmitter();
        this.monthChanged = new core_1.EventEmitter();
        this.yearChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(CalendarComponent.prototype, "monthText", {
        get: function () {
            var months = moment.monthsShort();
            return months[this.month];
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.getWeekNumbers = function (monthRange) {
        var weekNumbers = [];
        var indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
                return i;
        } return -1; };
        monthRange.by('days', function (moment) {
            var ref;
            if (weekNumbers.length < 6 && (ref = moment.week(), indexOf.call(weekNumbers, ref)) < 0) {
                return weekNumbers.push(moment.week());
            }
        });
        return weekNumbers;
    };
    CalendarComponent.prototype.getWeeksRange = function (weeks, year, month) {
        var weeksRange = [];
        for (var i = 0, len = weeks.length; i < len; i++) {
            var week = weeks[i];
            var firstWeekDay = void 0, lastWeekDay = void 0;
            if (i > 0 && week < weeks[i - 1]) {
                firstWeekDay = moment([year, month]).add(1, "year").week(week).day(0);
                lastWeekDay = moment([year, month]).add(1, "year").week(week).day(6);
            }
            else {
                firstWeekDay = moment([year, month]).week(week).day(0);
                lastWeekDay = moment([year, month]).week(week).day(6);
            }
            var weekRange = moment.range(firstWeekDay, lastWeekDay);
            weeksRange.push(weekRange);
        }
        return weeksRange;
    };
    CalendarComponent.prototype.createCalendarGridData = function () {
        var year = this.year;
        var month = this.month;
        var startDate = moment([year, month]);
        var firstDay = moment(startDate).startOf('month');
        var endDay = moment(startDate).add(60, 'd');
        var monthRange = moment.range(firstDay, endDay);
        var weeksRange = [];
        var that = this;
        weeksRange = this.getWeeksRange(this.getWeekNumbers(monthRange), year, month);
        var weekList = [];
        weeksRange.map(function (week) {
            var daysList = [];
            week.by('days', function (day) {
                if (day.isSame(moment(that.minDate, that.format), 'date')) {
                    day = moment(that.minDate, that.format);
                }
                ;
                if (day.isSame(moment(that.maxDate, that.format), 'date')) {
                    day = moment(that.maxDate, that.format);
                }
                ;
                daysList.push(day);
            });
            weekList.push(daysList);
        });
        this.weekList = weekList;
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        this.createCalendarGridData();
    };
    CalendarComponent.prototype.isDisabled = function (day) {
        return (day.isBefore(moment(this.minDate, this.format)) || day.isAfter(moment(this.maxDate, this.format))) || (day.isBefore(moment(this.selectedFromDate, this.format)) && this.disableBeforeStart && !this.isLeft);
    };
    CalendarComponent.prototype.isDateAvailable = function (day) {
        if (day.get('month') !== this.month) {
            return false;
        }
        if (this.inactiveBeforeStart && day.isBefore(this.selectedFromDate, 'date')) {
            return false;
        }
        return true;
    };
    CalendarComponent.prototype.isSelectedDate = function (day) {
        if (day.get('month') === this.month && day.isSame(this.selectedFromDate, 'date')) {
            return true;
        }
        if (day.get('month') === this.month && day.isSameOrAfter(this.selectedFromDate, 'date') && day.isSameOrBefore(this.selectedToDate, 'date')) {
            return true;
        }
    };
    CalendarComponent.prototype.dateSelected = function (day) {
        this.dateChanged.emit({
            day: day,
            isLeft: this.isLeft
        });
    };
    CalendarComponent.prototype.monthSelected = function (value) {
        this.monthChanged.emit({
            value: value,
            isLeft: this.isLeft
        });
    };
    CalendarComponent.prototype.yearSelected = function (value) {
        this.yearChanged.emit({
            value: value,
            isLeft: this.isLeft
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "month", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "year", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "selectedFromDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "selectedToDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "isLeft", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "format", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "inactiveBeforeStart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "disableBeforeStart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "timePicker", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "singleCalendar", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "dateChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "monthChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "yearChanged", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendar',
            template: "\n        <div class=\"col-md-12 text-center bootstrap-flush push-bottom\">\n            <span class=\"col-md-2 nudge-top\">\n                <span class=\"col-md-6 flush clickable clickable-link\" (click)=\"yearSelected(-1)\">\n                    <img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDcuNDM2IDQwNy40MzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwNy40MzYgNDA3LjQzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxwb2x5Z29uIHBvaW50cz0iMjY2LjQ1MiwyMS4xNzggMjQ1LjIwNCwwIDQyLjE0OSwyMDMuNzE4IDI0NS4yMDQsNDA3LjQzNiAyNjYuNDUyLDM4Ni4yNTggODQuNTA3LDIwMy43MTggICIgZmlsbD0iIzAwMDAwMCIvPgoJPHBvbHlnb24gcG9pbnRzPSIzNjUuMjg2LDIxLjE3OCAzNDQuMDM4LDAgMTQwLjk4MywyMDMuNzE4IDM0NC4wMzgsNDA3LjQzNiAzNjUuMjg2LDM4Ni4yNTggMTgzLjM0MSwyMDMuNzE4ICAiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\" />\n                </span>\n            </span>\n            <span class=\"col-md-2 nudge-top\">\n                <span class=\"col-md-6 flush clickable clickable-link\" (click)=\"monthSelected(-1)\">\n                    <img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC41MzEgNDQ0LjUzMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjUzMSA0NDQuNTMxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTIxMy4xMywyMjIuNDA5TDM1MS44OCw4My42NTNjNy4wNS03LjA0MywxMC41NjctMTUuNjU3LDEwLjU2Ny0yNS44NDFjMC0xMC4xODMtMy41MTgtMTguNzkzLTEwLjU2Ny0yNS44MzUgICBsLTIxLjQwOS0yMS40MTZDMzIzLjQzMiwzLjUyMSwzMTQuODE3LDAsMzA0LjYzNywwcy0xOC43OTEsMy41MjEtMjUuODQxLDEwLjU2MUw5Mi42NDksMTk2LjQyNSAgIGMtNy4wNDQsNy4wNDMtMTAuNTY2LDE1LjY1Ni0xMC41NjYsMjUuODQxczMuNTIxLDE4Ljc5MSwxMC41NjYsMjUuODM3bDE4Ni4xNDYsMTg1Ljg2NGM3LjA1LDcuMDQzLDE1LjY2LDEwLjU2NCwyNS44NDEsMTAuNTY0ICAgczE4Ljc5NS0zLjUyMSwyNS44MzQtMTAuNTY0bDIxLjQwOS0yMS40MTJjNy4wNS03LjAzOSwxMC41NjctMTUuNjA0LDEwLjU2Ny0yNS42OTdjMC0xMC4wODUtMy41MTgtMTguNzQ2LTEwLjU2Ny0yNS45NzggICBMMjEzLjEzLDIyMi40MDl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==\" />\n                </span>\n            </span>\n            <span class=\"col-md-4 float-left text-center nudge-top flush-left flush-right\">\n                <label> {{monthText}} {{year}} </label>\n            </span>\n            <span class=\"col-md-2 nudge-top\">\n                <span class=\"col-md-6 pull-right flush clickable clickable-link\" (click)=\"monthSelected(1)\">\n                    <img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTM1Mi4wMjUsMTk2LjcxMkwxNjUuODg0LDEwLjg0OEMxNTkuMDI5LDMuNjE1LDE1MC40NjksMCwxNDAuMTg3LDBjLTEwLjI4MiwwLTE4Ljg0MiwzLjYxOS0yNS42OTcsMTAuODQ4TDkyLjc5MiwzMi4yNjQgICBjLTcuMDQ0LDcuMDQzLTEwLjU2NiwxNS42MDQtMTAuNTY2LDI1LjY5MmMwLDkuODk3LDMuNTIxLDE4LjU2LDEwLjU2NiwyNS45ODFsMTM4Ljc1MywxMzguNDczTDkyLjc4NiwzNjEuMTY4ICAgYy03LjA0Miw3LjA0My0xMC41NjQsMTUuNjA0LTEwLjU2NCwyNS42OTNjMCw5Ljg5NiwzLjUyMSwxOC41NjIsMTAuNTY0LDI1Ljk4bDIxLjcsMjEuNDEzICAgYzcuMDQzLDcuMDQzLDE1LjYxMiwxMC41NjQsMjUuNjk3LDEwLjU2NGMxMC4wODksMCwxOC42NTYtMy41MjEsMjUuNjk3LTEwLjU2NGwxODYuMTQ1LTE4NS44NjQgICBjNy4wNDYtNy40MjMsMTAuNTcxLTE2LjA4NCwxMC41NzEtMjUuOTgxQzM2Mi41OTcsMjEyLjMyMSwzNTkuMDcxLDIwMy43NTUsMzUyLjAyNSwxOTYuNzEyeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=\" />\n                </span>\n            </span>\n            <span class=\"col-md-2 nudge-top flush-right\">\n                <span class=\"col-md-6 flush clickable clickable-link\" (click)=\"yearSelected(1)\">\n                    <img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDcuNDM2IDQwNy40MzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwNy40MzYgNDA3LjQzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxwb2x5Z29uIHBvaW50cz0iMTYyLjIzMSwwIDE0MC45ODMsMjEuMTc4IDMyMi45MjksMjAzLjcxOCAxNDAuOTgzLDM4Ni4yNTggMTYyLjIzMSw0MDcuNDM2IDM2NS4yODYsMjAzLjcxOCAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjYzLjM5NywwIDQyLjE0OSwyMS4xNzggMjI0LjA5NSwyMDMuNzE4IDQyLjE0OSwzODYuMjU4IDYzLjM5Nyw0MDcuNDM2IDI2Ni40NTIsMjAzLjcxOCAgIiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==\" />\n                </span>\n            </span>\n        </div>\n        <div class=\"col-md-12 flush\">\n            <table class=\"table table-condensed flush\">\n                <thead>\n                    <th>Su</th>\n                    <th>Mo</th>\n                    <th>Tu</th>\n                    <th>We</th>\n                    <th>Th</th>\n                    <th>Fr</th>\n                    <th>Sa</th>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let week of weekList; let i = index\">\n                        <td *ngFor=\"let day of weekList[i]\" (click)=\"dateSelected(day)\" class=\"clickable\" [ngClass]=\"{'off':!isDateAvailable(day),'active':isSelectedDate(day),'disabled':isDisabled(day)}\">\n                            {{ day.format('D') }}\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <time-picker *ngIf=\"timePicker\" [options]=\"timePicker\" [selectedFromDate]=\"selectedFromDate\" [selectedToDate]=\"selectedToDate\" [minDate]=\"minDate\" [maxDate]=\"maxDate\" [format]=\"format\" [isLeft]=\"isLeft\" (timeChanged)=\"dateSelected($event)\"></time-picker>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
