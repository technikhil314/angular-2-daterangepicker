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
var forms_1 = require('@angular/forms');
var daterangepicker_component_1 = require('./daterangepicker-component');
var common_1 = require('@angular/common');
var calendar_component_1 = require('./calendar-component');
var format_moment_date_pipe_1 = require('./format-moment-date-pipe');
var time_picker_component_1 = require('./time-picker-component');
var DaterangepickerModule = (function () {
    function DaterangepickerModule() {
    }
    DaterangepickerModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, common_1.CommonModule],
            exports: [daterangepicker_component_1.DaterangepickerComponent],
            declarations: [daterangepicker_component_1.DaterangepickerComponent, calendar_component_1.CalendarComponent, time_picker_component_1.TimePickerComponent, format_moment_date_pipe_1.FormatMomentDatePipe],
            bootstrap: [daterangepicker_component_1.DaterangepickerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], DaterangepickerModule);
    return DaterangepickerModule;
}());
exports.DaterangepickerModule = DaterangepickerModule;
