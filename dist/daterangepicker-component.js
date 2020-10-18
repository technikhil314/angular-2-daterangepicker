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
var core_1 = require("@angular/core");
var daterangepicker_options_1 = require("./daterangepicker-options");
var daterangepicker_default_ranges_1 = require("./daterangepicker-default-ranges");
var moment = require("moment");
var DaterangepickerComponent = (function () {
    function DaterangepickerComponent(elem) {
        this.elem = elem;
        //outputs
        this.rangeSelected = new core_1.EventEmitter();
        this.range = "";
        this.enableApplyButton = false;
        this.areOldDatesStored = false;
    }
    //handle outside/inside click to show rangepicker
    DaterangepickerComponent.prototype.handleOutsideClick = function (event) {
        if (!this.options.disabled) {
            var current = event.target;
            var host = this.elem.nativeElement;
            if (host.compareDocumentPosition) {
                if (host.compareDocumentPosition(current) &
                    window.Node.DOCUMENT_POSITION_CONTAINED_BY) {
                    this.storeOldDates();
                    return this.toggleCalendars(true);
                }
            }
            else if (host.contains) {
                if (host.contains(current)) {
                    this.storeOldDates();
                    return this.toggleCalendars(true);
                }
            }
            else {
                do {
                    if (current === host) {
                        this.storeOldDates();
                        return this.toggleCalendars(true);
                    }
                    current = current.parentNode;
                } while (current);
            }
            if (this.showCalendars) {
                if (!this.isAutoApply()) {
                    this.restoreOldDates();
                }
                this.toggleCalendars(false);
            }
        }
    };
    DaterangepickerComponent.prototype.toggleCalendars = function (value) {
        this.showCalendars = value;
        if (!value) {
            this.areOldDatesStored = false;
            this.updateCalendar();
        }
    };
    DaterangepickerComponent.prototype.updateCalendar = function () {
        //get month and year to show calendar
        var fromDate = this.fromDate || this.tempFromDate;
        var toDate = this.toDate || this.tempToDate;
        var tDate = moment(fromDate, this.format);
        this.fromMonth = tDate.get("month");
        this.fromYear = tDate.get("year");
        tDate = moment(toDate, this.format);
        this.toMonth = tDate.get("month");
        this.toYear = tDate.get("year");
        this.setRange();
    };
    DaterangepickerComponent.prototype.ngOnInit = function () {
        //get default options provided by user
        this.setFormat();
        this.validateMinMaxDates();
        this.setFromDate(this.options.startDate);
        this.setToDate(this.options.endDate);
        this.defaultRanges = this.validatePredefinedRanges(this.options.preDefinedRanges || daterangepicker_default_ranges_1.Defaults.ranges);
        //update calendar grid
        this.updateCalendar();
    };
    DaterangepickerComponent.prototype.getPositionClass = function () {
        var positionClass = "open-left";
        if (this.options.position === "right") {
            positionClass = "open-right";
        }
        if (this.options.position === "center" && !this.options.singleCalendar) {
            positionClass = "open-center";
        }
        return positionClass;
    };
    DaterangepickerComponent.prototype.setFormat = function () {
        if (this.options) {
            this.format = this.options.format || "YYYY-MM-DD";
        }
        else {
            this.format = "YYYY-MM-DD";
        }
    };
    DaterangepickerComponent.prototype.validateMinMaxDates = function () {
        if (this.options) {
            //only mindate is suppplied
            if (this.options.minDate && !this.options.maxDate) {
                this.options.minDate = this.getMoment(this.options.minDate);
            }
            //only maxdate is supplied
            if (!this.options.minDate && this.options.maxDate) {
                this.options.maxDate = this.getMoment(this.options.maxDate);
            }
            //both min and max dates are supplied
            if (this.options.minDate && this.options.maxDate) {
                this.options.minDate = this.getMoment(this.options.minDate);
                this.options.maxDate = this.getMoment(this.options.maxDate);
                if (this.options.maxDate.isBefore(this.options.minDate, "date")) {
                    this.options.minDate = "";
                    this.options.maxDate = "";
                    console.warn("supplied minDate is after maxDate. Discarding options for minDate and maxDate");
                }
            }
            if (this.options.minDate &&
                this.options.minDate.format("HH:mm") === "00:00") {
                this.options.minDate.set({
                    hour: 0,
                    minutes: 0,
                    seconds: 0
                });
            }
            if (this.options.maxDate &&
                this.options.maxDate.format("HH:mm") === "00:00") {
                this.options.maxDate.set({
                    hour: 23,
                    minutes: 59,
                    seconds: 59
                });
            }
        }
    };
    DaterangepickerComponent.prototype.setFromDate = function (value) {
        if (this.options.noDefaultRangeSelected && !value) {
            this.fromDate = "";
            this.tempFromDate = this.getActualFromDate(value);
        }
        else {
            this.fromDate = this.getActualFromDate(value);
        }
    };
    DaterangepickerComponent.prototype.getActualFromDate = function (value) {
        var temp;
        if ((temp = this.getValidateMoment(value))) {
            return this.getValidateFromDate(temp);
        }
        else {
            return this.getValidateFromDate(moment());
        }
    };
    DaterangepickerComponent.prototype.getValidateFromDate = function (value) {
        if (!this.options.timePicker) {
            if (this.options.minDate &&
                this.options.maxDate &&
                value.isSameOrAfter(this.options.minDate, "date") &&
                value.isSameOrBefore(this.options.maxDate, "date")) {
                return value;
            }
            else if (this.options.minDate &&
                !this.options.maxDate &&
                value.isAfter(this.options.minDate, "date")) {
                return value;
            }
            else if (this.options.minDate) {
                return this.options.minDate.clone();
            }
            else {
                return moment();
            }
        }
        else {
            if (this.options.minDate &&
                this.options.maxDate &&
                value.isSameOrAfter(this.options.minDate, this.options.format) &&
                value.isSameOrBefore(this.options.maxDate, this.options.format)) {
                return value;
            }
            else if (this.options.minDate &&
                !this.options.maxDate &&
                value.isAfter(this.options.minDate, this.options.format)) {
                return value;
            }
            else if (this.options.minDate) {
                return this.options.minDate.clone();
            }
            else {
                return moment();
            }
        }
    };
    DaterangepickerComponent.prototype.setToDate = function (value) {
        if (this.options.noDefaultRangeSelected && !value) {
            this.toDate = "";
            this.tempToDate = this.getActualToDate(value);
        }
        else {
            this.toDate = this.getActualToDate(value);
        }
    };
    DaterangepickerComponent.prototype.getActualToDate = function (value) {
        var temp;
        if ((temp = this.getValidateMoment(value))) {
            return this.getValidateToDate(temp);
        }
        else {
            return this.getValidateToDate(moment());
        }
    };
    DaterangepickerComponent.prototype.getValidateToDate = function (value) {
        if (!this.options.timePicker) {
            if ((this.options.maxDate && value.isSameOrAfter(this.fromDate, "date"),
                value.isSameOrBefore(this.options.maxDate, "date"))) {
                return value;
            }
            else if (this.options.maxDate) {
                return this.options.maxDate.clone();
            }
            else {
                return moment();
            }
        }
        else {
            if ((this.options.maxDate &&
                value.isSameOrAfter(this.fromDate, this.options.format),
                value.isSameOrBefore(this.options.maxDate, this.options.format))) {
                return value;
            }
            else if (this.options.maxDate) {
                return this.options.maxDate.clone();
            }
            else {
                return moment();
            }
        }
    };
    //detects which date to set from or to and validates
    DaterangepickerComponent.prototype.dateChanged = function (data) {
        var value = data.day;
        var isLeft = data.isLeft;
        if (isLeft) {
            if (!this.options.timePicker) {
                value.set({
                    hour: 0,
                    minute: 0,
                    second: 0
                });
            }
            this.fromDate = value;
            if (!this.options.timePicker) {
                if (value.isAfter(this.toDate, "date")) {
                    this.toDate = this.fromDate.clone();
                }
            }
            else {
                if (value.isAfter(this.toDate, this.options.format)) {
                    this.toDate = this.fromDate.clone();
                }
            }
        }
        else {
            if (!this.options.timePicker) {
                value.set({
                    hour: 23,
                    minute: 59,
                    second: 59
                });
            }
            //this.setToDate(value.format(this.format));
            this.toDate = value;
            if (!this.options.timePicker) {
                if (value.isBefore(this.fromDate, "date")) {
                    this.fromDate = this.toDate.clone();
                }
            }
            else {
                if (value.isBefore(this.fromDate, this.options.format)) {
                    this.fromDate = this.toDate.clone();
                }
            }
        }
        if (this.isAutoApply()) {
            if (this.options.singleCalendar || !isLeft) {
                this.toggleCalendars(false);
                this.setRange();
                this.emitRangeSelected();
            }
        }
        else if (!this.options.singleCalendar && !isLeft) {
            this.enableApplyButton = true;
        }
        else if (this.options.singleCalendar) {
            this.enableApplyButton = true;
        }
        this.fromMonth = this.fromDate
            ? this.fromDate.get("month")
            : this.fromMonth;
        this.toMonth = this.toDate ? this.toDate.get("month") : this.toMonth;
    };
    DaterangepickerComponent.prototype.emitRangeSelected = function () {
        var data = {};
        if (this.options.singleCalendar) {
            data = {
                start: this.getMoment(this.fromDate)
            };
        }
        else {
            data = {
                start: this.getMoment(this.fromDate),
                end: this.getMoment(this.toDate)
            };
        }
        this.rangeSelected.emit(data);
    };
    DaterangepickerComponent.prototype.getMoment = function (value) {
        return moment(value, this.format);
    };
    DaterangepickerComponent.prototype.getValidateMoment = function (value) {
        var momentValue = null;
        if (moment(value, this.format, true).isValid()) {
            momentValue = moment(value, this.format, true);
        }
        return momentValue;
    };
    DaterangepickerComponent.prototype.setRange = function () {
        var displayFormat = this.options.displayFormat !== undefined
            ? this.options.displayFormat
            : this.format;
        if (this.options.singleCalendar && this.fromDate) {
            this.range = this.fromDate.format(displayFormat);
        }
        else if (this.fromDate && this.toDate) {
            this.range =
                this.fromDate.format(displayFormat) +
                    " - " +
                    this.toDate.format(displayFormat);
        }
        else {
            this.range = "";
        }
    };
    DaterangepickerComponent.prototype.formatFromDate = function (event) {
        if (event.target.value !== this.fromDate.format(this.format)) {
            this.dateChanged({
                day: event.target.value ? this.getMoment(event.target.value) : moment(),
                isLeft: true
            });
        }
    };
    DaterangepickerComponent.prototype.formatToDate = function (event) {
        if (event.target.value !== this.toDate.format(this.format)) {
            this.dateChanged({
                day: event.target.value ? this.getMoment(event.target.value) : moment(),
                isLeft: false
            });
        }
    };
    DaterangepickerComponent.prototype.monthChanged = function (data) {
        var temp;
        if (data.isLeft) {
            temp = moment([this.fromYear, this.fromMonth]).add(data.value, "months");
            this.fromMonth = temp.get("month");
            this.fromYear = temp.get("year");
        }
        else {
            temp = moment([this.toYear, this.toMonth]).add(data.value, "months");
            this.toMonth = temp.get("month");
            this.toYear = temp.get("year");
        }
    };
    DaterangepickerComponent.prototype.yearChanged = function (data) {
        var temp;
        if (data.isLeft) {
            temp = moment([this.fromYear, this.fromMonth]).add(data.value, "year");
            this.fromMonth = temp.get("month");
            this.fromYear = temp.get("year");
        }
        else {
            temp = moment([this.toYear, this.toMonth]).add(data.value, "year");
            this.toMonth = temp.get("month");
            this.toYear = temp.get("year");
        }
    };
    DaterangepickerComponent.prototype.storeOldDates = function () {
        if (!this.areOldDatesStored) {
            this.oldFromDate = this.fromDate;
            this.oldToDate = this.toDate;
            this.areOldDatesStored = true;
        }
    };
    DaterangepickerComponent.prototype.restoreOldDates = function () {
        this.fromDate = this.oldFromDate;
        this.toDate = this.oldToDate;
    };
    DaterangepickerComponent.prototype.apply = function () {
        this.toggleCalendars(false);
        this.setRange();
        this.emitRangeSelected();
    };
    DaterangepickerComponent.prototype.cancel = function () {
        this.restoreOldDates();
        this.toggleCalendars(false);
    };
    DaterangepickerComponent.prototype.clear = function () {
        this.fromDate = this.toDate = "";
        this.apply();
        this.enableApplyButton = false;
        this.emitRangeSelected();
    };
    DaterangepickerComponent.prototype.applyPredefinedRange = function (data) {
        this.setFromDate(data.value.start);
        this.setToDate(data.value.end);
        this.toggleCalendars(false);
        this.emitRangeSelected();
    };
    DaterangepickerComponent.prototype.validatePredefinedRanges = function (ranges) {
        var _this = this;
        return ranges.filter(function (range) {
            if (range.value.start.isAfter(range.value.end, "date")) {
                return false;
            }
            if (_this.options.minDate &&
                range.value.start.isBefore(_this.options.minDate, _this.options.format)) {
                return false;
            }
            if (_this.options.maxDate &&
                range.value.end.isAfter(_this.options.maxDate, _this.options.format)) {
                return false;
            }
            return true;
        });
    };
    DaterangepickerComponent.prototype.isAutoApply = function () {
        if (this.options.timePicker) {
            return false;
        }
        else if (this.options.singleCalendar) {
            return true;
        }
        else {
            return this.options.autoApply;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', daterangepicker_options_1.Options)
    ], DaterangepickerComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DaterangepickerComponent.prototype, "class", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DaterangepickerComponent.prototype, "rangeSelected", void 0);
    __decorate([
        core_1.HostListener("document:mousedown", ["$event"]),
        core_1.HostListener("document:mouseup", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DaterangepickerComponent.prototype, "handleOutsideClick", null);
    DaterangepickerComponent = __decorate([
        core_1.Component({
            selector: "date-range-picker",
            template: "\n    <div class=\"daterangepicker-wrapper\">\n      <input\n        class=\"{{class}} dateRangePicker-input\"\n        type=\"text\"\n        [ngModel]=\"range\"\n        [disabled]=\"options.disabled\"\n        [ngClass]=\"{ hidden: options.alwaysOpen }\"\n      />\n      <div\n        class=\"daterangepicker col-md-12 text-center flush {{getPositionClass()}}\"\n        [ngClass]=\"{\n          hidden: !(showCalendars || options.alwaysOpen),\n          singledatepicker: options.singleCalendar,\n          'tooltip-chevron': !options.alwaysOpen,\n          'always-open': options.alwaysOpen\n        }\"\n      >\n        <div class=\"col-md-12 flush text-center\">\n          <div\n            class=\"flush-bottom text-center flush-left nudge-half--right\"\n            [ngClass]=\"{\n              'col-md-6': !options.singleCalendar,\n              'col-md-12': options.singleCalendar\n            }\"\n          >\n            <div class=\"col-md-12 flush-bottom\" *ngIf=\"!options.singleCalendar\">\n              <input\n                class=\"input-mini form-control\"\n                [ngModel]=\"fromDate | formatMomentDate: format\"\n                (blur)=\"formatFromDate($event)\"\n                type=\"text\"\n                name=\"daterangepicker_start\"\n              />\n            </div>\n            <div class=\"col-md-12 flush\">\n              <calendar\n                class=\"col-md-12 flush\"\n                [isLeft]=\"true\"\n                [month]=\"fromMonth\"\n                [year]=\"fromYear\"\n                (monthChanged)=\"monthChanged($event)\"\n                (yearChanged)=\"yearChanged($event)\"\n                (dateChanged)=\"dateChanged($event)\"\n                [format]=\"format\"\n                [selectedFromDate]=\"fromDate\"\n                [selectedToDate]=\"toDate\"\n                [minDate]=\"options.minDate\"\n                [maxDate]=\"options.maxDate\"\n                [inactiveBeforeStart]=\"options.inactiveBeforeStart\"\n                [disableBeforeStart]=\"options.disableBeforeStart\"\n                [timePicker]=\"options.timePicker\"\n                [singleCalendar]=\"options.singleCalendar\"\n              ></calendar>\n            </div>\n          </div>\n          <div\n            class=\"col-md-6 flush-bottom flush-right nudge-half--left\"\n            *ngIf=\"!options.singleCalendar\"\n          >\n            <div class=\"col-md-12 flush-bottom text-center\">\n              <input\n                class=\"input-mini form-control\"\n                [ngModel]=\"toDate | formatMomentDate: format\"\n                (blur)=\"formatToDate($event)\"\n                name=\"daterangepicker_end\"\n              />\n            </div>\n            <div class=\"col-md-12 flush\">\n              <calendar\n                class=\"col-md-12 flush\"\n                [month]=\"toMonth\"\n                [year]=\"toYear\"\n                [format]=\"format\"\n                (dateChanged)=\"dateChanged($event)\"\n                (monthChanged)=\"monthChanged($event)\"\n                (yearChanged)=\"yearChanged($event)\"\n                [selectedFromDate]=\"fromDate\"\n                [selectedToDate]=\"toDate\"\n                [minDate]=\"options.minDate\"\n                [maxDate]=\"options.maxDate\"\n                [inactiveBeforeStart]=\"options.inactiveBeforeStart\"\n                [disableBeforeStart]=\"options.disableBeforeStart\"\n                [timePicker]=\"options.timePicker\"\n              ></calendar>\n            </div>\n          </div>\n        </div>\n        <div class=\"text-center ranges\">\n          <button\n            [class.hidden]=\"isAutoApply()\"\n            class=\"btn btn-success btn-sm\"\n            [disabled]=\"!enableApplyButton\"\n            (click)=\"apply()\"\n            type=\"button\"\n          >\n            Apply\n          </button>\n          <button\n            [class.hidden]=\"isAutoApply()\"\n            class=\"btn btn-default btn-sm\"\n            (click)=\"cancel()\"\n            type=\"button\"\n          >\n            Cancel\n          </button>\n          <button\n            [disabled]=\"!this.range\"\n            class=\"btn btn-default btn-link\"\n            (click)=\"clear()\"\n            type=\"button\"\n          >\n            Clear\n          </button>\n          <div\n            class=\"flush text-center\"\n            *ngIf=\"options.showRanges && !options.singleCalendar\"\n          >\n            <button\n              *ngFor=\"let range of defaultRanges\"\n              class=\"btn btn-link\"\n              (click)=\"applyPredefinedRange(range)\"\n              type=\"button\"\n            >\n              {{ range.name }}\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DaterangepickerComponent);
    return DaterangepickerComponent;
}());
exports.DaterangepickerComponent = DaterangepickerComponent;
