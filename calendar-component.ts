import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
declare var require: any;
var moment = require('moment');
require('moment-range');

@Component({
    selector: 'calendar',
    template: `
        <div class="col-md-12 text-center bootstrap-flush push-bottom">
            <span class="col-md-2 nudge-top">
                <span class="col-md-6 flush clickable clickable-link" (click)="yearSelected(-1)">
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDcuNDM2IDQwNy40MzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwNy40MzYgNDA3LjQzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxwb2x5Z29uIHBvaW50cz0iMjY2LjQ1MiwyMS4xNzggMjQ1LjIwNCwwIDQyLjE0OSwyMDMuNzE4IDI0NS4yMDQsNDA3LjQzNiAyNjYuNDUyLDM4Ni4yNTggODQuNTA3LDIwMy43MTggICIgZmlsbD0iIzAwMDAwMCIvPgoJPHBvbHlnb24gcG9pbnRzPSIzNjUuMjg2LDIxLjE3OCAzNDQuMDM4LDAgMTQwLjk4MywyMDMuNzE4IDM0NC4wMzgsNDA3LjQzNiAzNjUuMjg2LDM4Ni4yNTggMTgzLjM0MSwyMDMuNzE4ICAiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </span>
            </span>
            <span class="col-md-2 nudge-top">
                <span class="col-md-6 flush clickable clickable-link" (click)="monthSelected(-1)">
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC41MzEgNDQ0LjUzMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjUzMSA0NDQuNTMxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTIxMy4xMywyMjIuNDA5TDM1MS44OCw4My42NTNjNy4wNS03LjA0MywxMC41NjctMTUuNjU3LDEwLjU2Ny0yNS44NDFjMC0xMC4xODMtMy41MTgtMTguNzkzLTEwLjU2Ny0yNS44MzUgICBsLTIxLjQwOS0yMS40MTZDMzIzLjQzMiwzLjUyMSwzMTQuODE3LDAsMzA0LjYzNywwcy0xOC43OTEsMy41MjEtMjUuODQxLDEwLjU2MUw5Mi42NDksMTk2LjQyNSAgIGMtNy4wNDQsNy4wNDMtMTAuNTY2LDE1LjY1Ni0xMC41NjYsMjUuODQxczMuNTIxLDE4Ljc5MSwxMC41NjYsMjUuODM3bDE4Ni4xNDYsMTg1Ljg2NGM3LjA1LDcuMDQzLDE1LjY2LDEwLjU2NCwyNS44NDEsMTAuNTY0ICAgczE4Ljc5NS0zLjUyMSwyNS44MzQtMTAuNTY0bDIxLjQwOS0yMS40MTJjNy4wNS03LjAzOSwxMC41NjctMTUuNjA0LDEwLjU2Ny0yNS42OTdjMC0xMC4wODUtMy41MTgtMTguNzQ2LTEwLjU2Ny0yNS45NzggICBMMjEzLjEzLDIyMi40MDl6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                </span>
            </span>
            <span class="col-md-4 float-left text-center nudge-top flush-left flush-right">
                <label> {{monthText}} {{year}} </label>
            </span>
            <span class="col-md-2 nudge-top">
                <span class="col-md-6 pull-right flush clickable clickable-link" (click)="monthSelected(1)">
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTM1Mi4wMjUsMTk2LjcxMkwxNjUuODg0LDEwLjg0OEMxNTkuMDI5LDMuNjE1LDE1MC40NjksMCwxNDAuMTg3LDBjLTEwLjI4MiwwLTE4Ljg0MiwzLjYxOS0yNS42OTcsMTAuODQ4TDkyLjc5MiwzMi4yNjQgICBjLTcuMDQ0LDcuMDQzLTEwLjU2NiwxNS42MDQtMTAuNTY2LDI1LjY5MmMwLDkuODk3LDMuNTIxLDE4LjU2LDEwLjU2NiwyNS45ODFsMTM4Ljc1MywxMzguNDczTDkyLjc4NiwzNjEuMTY4ICAgYy03LjA0Miw3LjA0My0xMC41NjQsMTUuNjA0LTEwLjU2NCwyNS42OTNjMCw5Ljg5NiwzLjUyMSwxOC41NjIsMTAuNTY0LDI1Ljk4bDIxLjcsMjEuNDEzICAgYzcuMDQzLDcuMDQzLDE1LjYxMiwxMC41NjQsMjUuNjk3LDEwLjU2NGMxMC4wODksMCwxOC42NTYtMy41MjEsMjUuNjk3LTEwLjU2NGwxODYuMTQ1LTE4NS44NjQgICBjNy4wNDYtNy40MjMsMTAuNTcxLTE2LjA4NCwxMC41NzEtMjUuOTgxQzM2Mi41OTcsMjEyLjMyMSwzNTkuMDcxLDIwMy43NTUsMzUyLjAyNSwxOTYuNzEyeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                </span>
            </span>
            <span class="col-md-2 nudge-top flush-right">
                <span class="col-md-6 flush clickable clickable-link" (click)="yearSelected(1)">
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDcuNDM2IDQwNy40MzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwNy40MzYgNDA3LjQzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxwb2x5Z29uIHBvaW50cz0iMTYyLjIzMSwwIDE0MC45ODMsMjEuMTc4IDMyMi45MjksMjAzLjcxOCAxNDAuOTgzLDM4Ni4yNTggMTYyLjIzMSw0MDcuNDM2IDM2NS4yODYsMjAzLjcxOCAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjYzLjM5NywwIDQyLjE0OSwyMS4xNzggMjI0LjA5NSwyMDMuNzE4IDQyLjE0OSwzODYuMjU4IDYzLjM5Nyw0MDcuNDM2IDI2Ni40NTIsMjAzLjcxOCAgIiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                </span>
            </span>
        </div>
        <div class="col-md-12 flush">
            <table class="table table-condensed flush">
                <thead>
                    <th>Su</th>
                    <th>Mo</th>
                    <th>Tu</th>
                    <th>We</th>
                    <th>Th</th>
                    <th>Fr</th>
                    <th>Sa</th>
                </thead>
                <tbody>
                    <tr *ngFor="let week of weekList; let i = index">
                        <td *ngFor="let day of weekList[i]" (click)="dateSelected(day)" class="clickable" [ngClass]="{'off':!isDateAvailable(day),'active':isSelectedDate(day),'disabled':isDisabled(day)}">
                            {{ day.format('D') }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <time-picker *ngIf="timePicker" [options]="timePicker" [selectedFromDate]="selectedFromDate" [selectedToDate]="selectedToDate" [minDate]="minDate" [maxDate]="maxDate" [format]="format" [isLeft]="isLeft" (timeChanged)="dateSelected($event)"></time-picker>
    `
})
export class CalendarComponent implements OnChanges {
    @Input() month: string;
    @Input() year: string;
    @Input() selectedFromDate: string;
    @Input() selectedToDate: string;
    @Input() isLeft: boolean;
    @Input() format: string;
    @Input() minDate: string;
    @Input() maxDate: string;
    @Input() inactiveBeforeStart: boolean;
    @Input() disableBeforeStart: boolean;
    @Input() timePicker: any;
    @Input() singleCalendar: boolean = false;
    get monthText() {
        let months = moment.monthsShort()
        return months[this.month];
    }
    @Output() dateChanged = new EventEmitter();
    @Output() monthChanged = new EventEmitter();
    @Output() yearChanged = new EventEmitter();

    weekList: any;

    getWeekNumbers(monthRange: any) {
        let weekNumbers = [];
        let indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
        monthRange.by('days', function(moment) {
            let ref;
            if (weekNumbers.length < 6 && (ref = moment.week(), indexOf.call(weekNumbers, ref)) < 0) {
                return weekNumbers.push(moment.week());
            }
        });
        return weekNumbers;
    }
    getWeeksRange(weeks: any, year: any, month: any) {
        let weeksRange = [];

        for (let i = 0, len = weeks.length; i < len; i++) {
            let week = weeks[i];
            let firstWeekDay, lastWeekDay;
            if (i > 0 && week < weeks[i - 1]) {
                firstWeekDay = moment([year, month]).add(1, "year").week(week).day(0);
                lastWeekDay = moment([year, month]).add(1, "year").week(week).day(6);
            }
            else {
                firstWeekDay = moment([year, month]).week(week).day(0);
                lastWeekDay = moment([year, month]).week(week).day(6);
            }
            let weekRange = moment.range(firstWeekDay, lastWeekDay);
            weeksRange.push(weekRange);
        }
        return weeksRange;
    }
    createCalendarGridData(): void {
        let year = this.year;
        let month = this.month;
        let startDate = moment([year, month]);
        let firstDay = moment(startDate).startOf('month');
        let endDay = moment(startDate).add(60, 'd');
        let monthRange = moment.range(firstDay, endDay);
        let weeksRange = [];
        let that = this;
        weeksRange = this.getWeeksRange(this.getWeekNumbers(monthRange), year, month);

        let weekList = [];
        weeksRange.map(function(week) {
            let daysList = [];
            week.by('days', function(day) {
                if (day.isSame(moment(that.minDate, that.format), 'date')) {
                    day = moment(that.minDate, that.format);
                };
                if (day.isSame(moment(that.maxDate, that.format), 'date')) {
                    day = moment(that.maxDate, that.format);
                };
                daysList.push(day);
            });
            weekList.push(daysList);
        });
        this.weekList = weekList;
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.createCalendarGridData();
    }
    isDisabled(day) {
        return (day.isBefore(moment(this.minDate, this.format)) || day.isAfter(moment(this.maxDate, this.format))) || (day.isBefore(moment(this.selectedFromDate, this.format)) && this.disableBeforeStart && !this.isLeft)
    }
    isDateAvailable(day) {
        if (day.get('month') !== this.month) {
            return false;
        }
        if (this.inactiveBeforeStart && day.isBefore(this.selectedFromDate, 'date')) {
            return false;
        }
        return true;
    }
    isSelectedDate(day) {
        if (day.get('month') === this.month && day.isSame(this.selectedFromDate, 'date')) {
            return true;
        }
        if (day.get('month') === this.month && day.isSameOrAfter(this.selectedFromDate, 'date') && day.isSameOrBefore(this.selectedToDate, 'date')) {
            return true;
        }
    }
    dateSelected(day) {
        this.dateChanged.emit({
            day: day,
            isLeft: this.isLeft
        });
    }
    monthSelected(value) {
        this.monthChanged.emit({
            value: value,
            isLeft: this.isLeft
        })
    }
    yearSelected(value) {
        this.yearChanged.emit({
            value: value,
            isLeft: this.isLeft
        })
    }
}
