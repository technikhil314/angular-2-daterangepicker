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
var moment = require("moment");
require("moment-range");
var TimePickerComponent = (function () {
    function TimePickerComponent() {
        this.options = new daterangepicker_options_1.Timepicker();
        this.timeChanged = new core_1.EventEmitter();
    }
    TimePickerComponent.prototype.ngOnInit = function () {
        if (!this.options.minuteInterval ||
            this.options.minuteInterval % 60 === 0) {
            this.options.minuteInterval = 1;
        }
        this.options.minuteInterval = this.options.minuteInterval % 60;
    };
    TimePickerComponent.prototype.ngOnChanges = function (changes) {
        this.selectedFromDate = changes["selectedFromDate"]
            ? moment(changes["selectedFromDate"].currentValue, this.format)
            : this["selectedFromDate"];
        this.selectedToDate = changes["selectedToDate"]
            ? moment(changes["selectedToDate"].currentValue, this.format)
            : this["selectedToDate"];
        this.maxDate = changes["maxDate"]
            ? moment(changes["maxDate"].currentValue, this.format)
            : this["maxDate"];
        this.minDate = changes["minDate"]
            ? moment(changes["minDate"].currentValue, this.format)
            : this["minDate"];
    };
    TimePickerComponent.prototype.getCurrentHour = function () {
        var currentHour = this.isLeft
            ? this.selectedFromDate.get("hour")
            : this.selectedToDate.get("hour");
        return isNaN(currentHour)
            ? "&mdash;"
            : currentHour > 9
                ? currentHour
                : "0" + currentHour;
    };
    TimePickerComponent.prototype.getCurrentMinute = function () {
        var currentMinute = this.isLeft
            ? this.selectedFromDate.get("minute")
            : this.selectedToDate.get("minute");
        return isNaN(currentMinute)
            ? "&mdash;"
            : currentMinute > 9
                ? currentMinute
                : "0" + currentMinute;
    };
    TimePickerComponent.prototype.addHour = function (value) {
        if (this.isLeft) {
            this.selectedFromDate.set({
                hour: (this.selectedFromDate.get("hour") + value) % 24
            });
        }
        else {
            this.selectedToDate.set({
                hour: (this.selectedToDate.get("hour") + value) % 24
            });
        }
        this.triggerTimeChanged();
    };
    TimePickerComponent.prototype.addMinute = function (value) {
        if (this.isLeft) {
            this.selectedFromDate.set({
                minute: (this.selectedFromDate.get("minute") + value) % 60
            });
        }
        else {
            this.selectedToDate.set({
                minute: (this.selectedToDate.get("minute") + value) % 60
            });
        }
        this.triggerTimeChanged();
    };
    TimePickerComponent.prototype.isValidToAddMinute = function (value) {
        var possibleNewValue, possibleSelectedDate;
        if (this.isLeft) {
            possibleNewValue = this.selectedFromDate.get("minute") + value;
            possibleSelectedDate = this.selectedFromDate
                .clone()
                .add(value, "minutes");
        }
        else {
            possibleNewValue = this.selectedToDate.get("minute") + value;
            possibleSelectedDate = this.selectedToDate.clone().add(value, "minutes");
        }
        var retValue = possibleNewValue < 60 && possibleNewValue >= 0;
        if (this.minDate.isValid()) {
            retValue = retValue && possibleSelectedDate.isSameOrAfter(this.minDate);
        }
        if (this.maxDate.isValid()) {
            retValue = retValue && possibleSelectedDate.isSameOrBefore(this.maxDate);
        }
        return retValue;
    };
    TimePickerComponent.prototype.isValidToAddHour = function (value) {
        var possibleNewValue, possibleSelectedDate;
        if (this.isLeft) {
            possibleNewValue = this.selectedFromDate.get("hour") + value;
            possibleSelectedDate = this.selectedFromDate.clone().add(value, "hour");
        }
        else {
            possibleNewValue = this.selectedToDate.get("hour") + value;
            possibleSelectedDate = this.selectedToDate.clone().add(value, "hour");
        }
        var retValue = possibleNewValue < 24 && possibleNewValue >= 0;
        if (this.minDate.isValid()) {
            retValue = retValue && possibleSelectedDate.isSameOrAfter(this.minDate);
        }
        if (this.maxDate.isValid()) {
            retValue = retValue && possibleSelectedDate.isSameOrBefore(this.maxDate);
        }
        return retValue;
    };
    TimePickerComponent.prototype.triggerTimeChanged = function () {
        this.isLeft
            ? this.timeChanged.emit(this.selectedFromDate)
            : this.timeChanged.emit(this.selectedToDate);
    };
    TimePickerComponent.prototype.toggleAMPM = function () { };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', daterangepicker_options_1.Timepicker)
    ], TimePickerComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TimePickerComponent.prototype, "selectedFromDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TimePickerComponent.prototype, "selectedToDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TimePickerComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TimePickerComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TimePickerComponent.prototype, "format", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimePickerComponent.prototype, "isLeft", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TimePickerComponent.prototype, "timeChanged", void 0);
    TimePickerComponent = __decorate([
        core_1.Component({
            selector: "time-picker",
            template: "\n        <div class=\"col-md-8 time-picker\" [ngClass]=\"{'col-md-offset-4': options.twentyFourHourFormat, 'col-md-offset-3': !options.twentyFourHourFormat}\">\n            <div class=\"col-md-1 time-breadcrumb\">\n                HH\n            </div>\n            <div class=\"col-md-2 text-center\">\n                <span class=\"clickable col-md-12\" [ngClass]=\"{'disabled': !isValidToAddHour(1)}\" (click)=\"addHour(1)\"><img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDIyLjA2NCAyMi4wNjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyLjA2NCAyMi4wNjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjEuNDU2LDEzLjYwNWwtOC44MzUtOC44MzVjLTAuNDM0LTAuNDM1LTEuMDE3LTAuNjI4LTEuNTg5LTAuNTk4Yy0wLjU3MS0wLjAzLTEuMTU0LDAuMTYyLTEuNTg4LDAuNTk4bC04LjgzNiw4LjgzNSAgIGMtMC44MTIsMC44MS0wLjgxMiwyLjEzNSwwLDIuOTQ0bDAuNzM5LDAuNzM3YzAuODA4LDAuODEsMi4xMzQsMC44MSwyLjk0MiwwbDYuNzQyLTYuNzQybDYuNzQyLDYuNzQyICAgYzAuODA5LDAuODEsMi4xMzUsMC44MSwyLjk0MiwwbDAuNzM3LTAuNzM3QzIyLjI2NywxNS43NDEsMjIuMjY3LDE0LjQxNSwyMS40NTYsMTMuNjA1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=\" /></span>\n                <span class=\"col-md-12\"><b [innerHTML]=\"getCurrentHour()\"></b></span>\n                <span class=\"clickable col-md-12\" [ngClass]=\"{'disabled': !isValidToAddHour(-1)}\" (click)=\"addHour(-1)\"><img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQzNC4yNTIsMTE0LjIwM2wtMjEuNDA5LTIxLjQxNmMtNy40MTktNy4wNC0xNi4wODQtMTAuNTYxLTI1Ljk3NS0xMC41NjFjLTEwLjA5NSwwLTE4LjY1NywzLjUyMS0yNS43LDEwLjU2MSAgIEwyMjIuNDEsMjMxLjU0OUw4My42NTMsOTIuNzkxYy03LjA0Mi03LjA0LTE1LjYwNi0xMC41NjEtMjUuNjk3LTEwLjU2MWMtOS44OTYsMC0xOC41NTksMy41MjEtMjUuOTc5LDEwLjU2MWwtMjEuMTI4LDIxLjQxNiAgIEMzLjYxNSwxMjEuNDM2LDAsMTMwLjA5OSwwLDE0MC4xODhjMCwxMC4yNzcsMy42MTksMTguODQyLDEwLjg0OCwyNS42OTNsMTg1Ljg2NCwxODUuODY1YzYuODU1LDcuMjMsMTUuNDE2LDEwLjg0OCwyNS42OTcsMTAuODQ4ICAgYzEwLjA4OCwwLDE4Ljc1LTMuNjE3LDI1Ljk3Ny0xMC44NDhsMTg1Ljg2NS0xODUuODY1YzcuMDQzLTcuMDQ0LDEwLjU2Ny0xNS42MDgsMTAuNTY3LTI1LjY5MyAgIEM0NDQuODE5LDEzMC4yODcsNDQxLjI5NSwxMjEuNjI5LDQzNC4yNTIsMTE0LjIwM3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\" /></span>\n            </div>\n            <div class=\"col-md-1 time-breadcrumb\">\n                MM\n            </div>\n            <div class=\"col-md-2 text-center\">\n                <span class=\"clickable  col-md-12\" [ngClass]=\"{'disabled': !isValidToAddMinute(options.minuteInterval)}\" (click)=\"addMinute(options.minuteInterval)\"><img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDIyLjA2NCAyMi4wNjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyLjA2NCAyMi4wNjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjEuNDU2LDEzLjYwNWwtOC44MzUtOC44MzVjLTAuNDM0LTAuNDM1LTEuMDE3LTAuNjI4LTEuNTg5LTAuNTk4Yy0wLjU3MS0wLjAzLTEuMTU0LDAuMTYyLTEuNTg4LDAuNTk4bC04LjgzNiw4LjgzNSAgIGMtMC44MTIsMC44MS0wLjgxMiwyLjEzNSwwLDIuOTQ0bDAuNzM5LDAuNzM3YzAuODA4LDAuODEsMi4xMzQsMC44MSwyLjk0MiwwbDYuNzQyLTYuNzQybDYuNzQyLDYuNzQyICAgYzAuODA5LDAuODEsMi4xMzUsMC44MSwyLjk0MiwwbDAuNzM3LTAuNzM3QzIyLjI2NywxNS43NDEsMjIuMjY3LDE0LjQxNSwyMS40NTYsMTMuNjA1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=\" /></span>\n                <span class=\" col-md-12\"><b [innerHTML]=\"getCurrentMinute()\" (mouseWheelUp)=\"addMinute(options.minuteInterval)\"></b></span>\n                <span class=\"clickable  col-md-12\" [ngClass]=\"{'disabled': !isValidToAddMinute(-1 * options.minuteInterval)}\" (click)=\"addMinute(-1 * options.minuteInterval)\"><img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQzNC4yNTIsMTE0LjIwM2wtMjEuNDA5LTIxLjQxNmMtNy40MTktNy4wNC0xNi4wODQtMTAuNTYxLTI1Ljk3NS0xMC41NjFjLTEwLjA5NSwwLTE4LjY1NywzLjUyMS0yNS43LDEwLjU2MSAgIEwyMjIuNDEsMjMxLjU0OUw4My42NTMsOTIuNzkxYy03LjA0Mi03LjA0LTE1LjYwNi0xMC41NjEtMjUuNjk3LTEwLjU2MWMtOS44OTYsMC0xOC41NTksMy41MjEtMjUuOTc5LDEwLjU2MWwtMjEuMTI4LDIxLjQxNiAgIEMzLjYxNSwxMjEuNDM2LDAsMTMwLjA5OSwwLDE0MC4xODhjMCwxMC4yNzcsMy42MTksMTguODQyLDEwLjg0OCwyNS42OTNsMTg1Ljg2NCwxODUuODY1YzYuODU1LDcuMjMsMTUuNDE2LDEwLjg0OCwyNS42OTcsMTAuODQ4ICAgYzEwLjA4OCwwLDE4Ljc1LTMuNjE3LDI1Ljk3Ny0xMC44NDhsMTg1Ljg2NS0xODUuODY1YzcuMDQzLTcuMDQ0LDEwLjU2Ny0xNS42MDgsMTAuNTY3LTI1LjY5MyAgIEM0NDQuODE5LDEzMC4yODcsNDQxLjI5NSwxMjEuNjI5LDQzNC4yNTIsMTE0LjIwM3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\" /></span>\n            </div>\n            <div class=\"col-md-2 text-center\" *ngIf=\"!options.twentyFourHourFormat\">\n                <span class=\"clickable col-md-12 push--threeUnits-left\" (click)=\"toggleAMPM()\"><img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDIyLjA2NCAyMi4wNjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyLjA2NCAyMi4wNjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjEuNDU2LDEzLjYwNWwtOC44MzUtOC44MzVjLTAuNDM0LTAuNDM1LTEuMDE3LTAuNjI4LTEuNTg5LTAuNTk4Yy0wLjU3MS0wLjAzLTEuMTU0LDAuMTYyLTEuNTg4LDAuNTk4bC04LjgzNiw4LjgzNSAgIGMtMC44MTIsMC44MS0wLjgxMiwyLjEzNSwwLDIuOTQ0bDAuNzM5LDAuNzM3YzAuODA4LDAuODEsMi4xMzQsMC44MSwyLjk0MiwwbDYuNzQyLTYuNzQybDYuNzQyLDYuNzQyICAgYzAuODA5LDAuODEsMi4xMzUsMC44MSwyLjk0MiwwbDAuNzM3LTAuNzM3QzIyLjI2NywxNS43NDEsMjIuMjY3LDE0LjQxNSwyMS40NTYsMTMuNjA1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=\" /></span>\n                <span class=\" col-md-12\"><b>AM</b></span>\n                <span class=\"clickable  col-md-12 push--threeUnits-left\" (click)=\"toggleAMPM()\"><img src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQzNC4yNTIsMTE0LjIwM2wtMjEuNDA5LTIxLjQxNmMtNy40MTktNy4wNC0xNi4wODQtMTAuNTYxLTI1Ljk3NS0xMC41NjFjLTEwLjA5NSwwLTE4LjY1NywzLjUyMS0yNS43LDEwLjU2MSAgIEwyMjIuNDEsMjMxLjU0OUw4My42NTMsOTIuNzkxYy03LjA0Mi03LjA0LTE1LjYwNi0xMC41NjEtMjUuNjk3LTEwLjU2MWMtOS44OTYsMC0xOC41NTksMy41MjEtMjUuOTc5LDEwLjU2MWwtMjEuMTI4LDIxLjQxNiAgIEMzLjYxNSwxMjEuNDM2LDAsMTMwLjA5OSwwLDE0MC4xODhjMCwxMC4yNzcsMy42MTksMTguODQyLDEwLjg0OCwyNS42OTNsMTg1Ljg2NCwxODUuODY1YzYuODU1LDcuMjMsMTUuNDE2LDEwLjg0OCwyNS42OTcsMTAuODQ4ICAgYzEwLjA4OCwwLDE4Ljc1LTMuNjE3LDI1Ljk3Ny0xMC44NDhsMTg1Ljg2NS0xODUuODY1YzcuMDQzLTcuMDQ0LDEwLjU2Ny0xNS42MDgsMTAuNTY3LTI1LjY5MyAgIEM0NDQuODE5LDEzMC4yODcsNDQxLjI5NSwxMjEuNjI5LDQzNC4yNTIsMTE0LjIwM3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\" /></span>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TimePickerComponent);
    return TimePickerComponent;
}());
exports.TimePickerComponent = TimePickerComponent;
