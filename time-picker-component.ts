import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    OnInit
} from "@angular/core";
import { Timepicker } from "./daterangepicker-options";
declare var require: any;
var moment = require("moment");
require("moment-range");

@Component({
    selector: "time-picker",
    template: `
        <div class="col-md-8 time-picker" [ngClass]="{'col-md-offset-4': options.twentyFourHourFormat, 'col-md-offset-3': !options.twentyFourHourFormat}">
            <div class="col-md-1 time-breadcrumb">
                HH
            </div>
            <div class="col-md-2 text-center">
                <span class="clickable col-md-12" [ngClass]="{'disabled': !isValidToAddHour(1)}" (click)="addHour(1)"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDIyLjA2NCAyMi4wNjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyLjA2NCAyMi4wNjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjEuNDU2LDEzLjYwNWwtOC44MzUtOC44MzVjLTAuNDM0LTAuNDM1LTEuMDE3LTAuNjI4LTEuNTg5LTAuNTk4Yy0wLjU3MS0wLjAzLTEuMTU0LDAuMTYyLTEuNTg4LDAuNTk4bC04LjgzNiw4LjgzNSAgIGMtMC44MTIsMC44MS0wLjgxMiwyLjEzNSwwLDIuOTQ0bDAuNzM5LDAuNzM3YzAuODA4LDAuODEsMi4xMzQsMC44MSwyLjk0MiwwbDYuNzQyLTYuNzQybDYuNzQyLDYuNzQyICAgYzAuODA5LDAuODEsMi4xMzUsMC44MSwyLjk0MiwwbDAuNzM3LTAuNzM3QzIyLjI2NywxNS43NDEsMjIuMjY3LDE0LjQxNSwyMS40NTYsMTMuNjA1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></span>
                <span class="col-md-12"><b [innerHTML]="getCurrentHour()"></b></span>
                <span class="clickable col-md-12" [ngClass]="{'disabled': !isValidToAddHour(-1)}" (click)="addHour(-1)"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQzNC4yNTIsMTE0LjIwM2wtMjEuNDA5LTIxLjQxNmMtNy40MTktNy4wNC0xNi4wODQtMTAuNTYxLTI1Ljk3NS0xMC41NjFjLTEwLjA5NSwwLTE4LjY1NywzLjUyMS0yNS43LDEwLjU2MSAgIEwyMjIuNDEsMjMxLjU0OUw4My42NTMsOTIuNzkxYy03LjA0Mi03LjA0LTE1LjYwNi0xMC41NjEtMjUuNjk3LTEwLjU2MWMtOS44OTYsMC0xOC41NTksMy41MjEtMjUuOTc5LDEwLjU2MWwtMjEuMTI4LDIxLjQxNiAgIEMzLjYxNSwxMjEuNDM2LDAsMTMwLjA5OSwwLDE0MC4xODhjMCwxMC4yNzcsMy42MTksMTguODQyLDEwLjg0OCwyNS42OTNsMTg1Ljg2NCwxODUuODY1YzYuODU1LDcuMjMsMTUuNDE2LDEwLjg0OCwyNS42OTcsMTAuODQ4ICAgYzEwLjA4OCwwLDE4Ljc1LTMuNjE3LDI1Ljk3Ny0xMC44NDhsMTg1Ljg2NS0xODUuODY1YzcuMDQzLTcuMDQ0LDEwLjU2Ny0xNS42MDgsMTAuNTY3LTI1LjY5MyAgIEM0NDQuODE5LDEzMC4yODcsNDQxLjI5NSwxMjEuNjI5LDQzNC4yNTIsMTE0LjIwM3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></span>
            </div>
            <div class="col-md-1 time-breadcrumb">
                MM
            </div>
            <div class="col-md-2 text-center">
                <span class="clickable  col-md-12" [ngClass]="{'disabled': !isValidToAddMinute(options.minuteInterval)}" (click)="addMinute(options.minuteInterval)"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDIyLjA2NCAyMi4wNjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyLjA2NCAyMi4wNjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjEuNDU2LDEzLjYwNWwtOC44MzUtOC44MzVjLTAuNDM0LTAuNDM1LTEuMDE3LTAuNjI4LTEuNTg5LTAuNTk4Yy0wLjU3MS0wLjAzLTEuMTU0LDAuMTYyLTEuNTg4LDAuNTk4bC04LjgzNiw4LjgzNSAgIGMtMC44MTIsMC44MS0wLjgxMiwyLjEzNSwwLDIuOTQ0bDAuNzM5LDAuNzM3YzAuODA4LDAuODEsMi4xMzQsMC44MSwyLjk0MiwwbDYuNzQyLTYuNzQybDYuNzQyLDYuNzQyICAgYzAuODA5LDAuODEsMi4xMzUsMC44MSwyLjk0MiwwbDAuNzM3LTAuNzM3QzIyLjI2NywxNS43NDEsMjIuMjY3LDE0LjQxNSwyMS40NTYsMTMuNjA1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></span>
                <span class=" col-md-12"><b [innerHTML]="getCurrentMinute()" (mouseWheelUp)="addMinute(options.minuteInterval)"></b></span>
                <span class="clickable  col-md-12" [ngClass]="{'disabled': !isValidToAddMinute(-1 * options.minuteInterval)}" (click)="addMinute(-1 * options.minuteInterval)"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQzNC4yNTIsMTE0LjIwM2wtMjEuNDA5LTIxLjQxNmMtNy40MTktNy4wNC0xNi4wODQtMTAuNTYxLTI1Ljk3NS0xMC41NjFjLTEwLjA5NSwwLTE4LjY1NywzLjUyMS0yNS43LDEwLjU2MSAgIEwyMjIuNDEsMjMxLjU0OUw4My42NTMsOTIuNzkxYy03LjA0Mi03LjA0LTE1LjYwNi0xMC41NjEtMjUuNjk3LTEwLjU2MWMtOS44OTYsMC0xOC41NTksMy41MjEtMjUuOTc5LDEwLjU2MWwtMjEuMTI4LDIxLjQxNiAgIEMzLjYxNSwxMjEuNDM2LDAsMTMwLjA5OSwwLDE0MC4xODhjMCwxMC4yNzcsMy42MTksMTguODQyLDEwLjg0OCwyNS42OTNsMTg1Ljg2NCwxODUuODY1YzYuODU1LDcuMjMsMTUuNDE2LDEwLjg0OCwyNS42OTcsMTAuODQ4ICAgYzEwLjA4OCwwLDE4Ljc1LTMuNjE3LDI1Ljk3Ny0xMC44NDhsMTg1Ljg2NS0xODUuODY1YzcuMDQzLTcuMDQ0LDEwLjU2Ny0xNS42MDgsMTAuNTY3LTI1LjY5MyAgIEM0NDQuODE5LDEzMC4yODcsNDQxLjI5NSwxMjEuNjI5LDQzNC4yNTIsMTE0LjIwM3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></span>
            </div>
            <div class="col-md-2 text-center" *ngIf="!options.twentyFourHourFormat">
                <span class="clickable col-md-12 push--threeUnits-left" (click)="toggleAMPM()"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDIyLjA2NCAyMi4wNjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyLjA2NCAyMi4wNjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjEuNDU2LDEzLjYwNWwtOC44MzUtOC44MzVjLTAuNDM0LTAuNDM1LTEuMDE3LTAuNjI4LTEuNTg5LTAuNTk4Yy0wLjU3MS0wLjAzLTEuMTU0LDAuMTYyLTEuNTg4LDAuNTk4bC04LjgzNiw4LjgzNSAgIGMtMC44MTIsMC44MS0wLjgxMiwyLjEzNSwwLDIuOTQ0bDAuNzM5LDAuNzM3YzAuODA4LDAuODEsMi4xMzQsMC44MSwyLjk0MiwwbDYuNzQyLTYuNzQybDYuNzQyLDYuNzQyICAgYzAuODA5LDAuODEsMi4xMzUsMC44MSwyLjk0MiwwbDAuNzM3LTAuNzM3QzIyLjI2NywxNS43NDEsMjIuMjY3LDE0LjQxNSwyMS40NTYsMTMuNjA1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></span>
                <span class=" col-md-12"><b>AM</b></span>
                <span class="clickable  col-md-12 push--threeUnits-left" (click)="toggleAMPM()"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0NC44MTkgNDQ0LjgxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgxOSA0NDQuODE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQzNC4yNTIsMTE0LjIwM2wtMjEuNDA5LTIxLjQxNmMtNy40MTktNy4wNC0xNi4wODQtMTAuNTYxLTI1Ljk3NS0xMC41NjFjLTEwLjA5NSwwLTE4LjY1NywzLjUyMS0yNS43LDEwLjU2MSAgIEwyMjIuNDEsMjMxLjU0OUw4My42NTMsOTIuNzkxYy03LjA0Mi03LjA0LTE1LjYwNi0xMC41NjEtMjUuNjk3LTEwLjU2MWMtOS44OTYsMC0xOC41NTksMy41MjEtMjUuOTc5LDEwLjU2MWwtMjEuMTI4LDIxLjQxNiAgIEMzLjYxNSwxMjEuNDM2LDAsMTMwLjA5OSwwLDE0MC4xODhjMCwxMC4yNzcsMy42MTksMTguODQyLDEwLjg0OCwyNS42OTNsMTg1Ljg2NCwxODUuODY1YzYuODU1LDcuMjMsMTUuNDE2LDEwLjg0OCwyNS42OTcsMTAuODQ4ICAgYzEwLjA4OCwwLDE4Ljc1LTMuNjE3LDI1Ljk3Ny0xMC44NDhsMTg1Ljg2NS0xODUuODY1YzcuMDQzLTcuMDQ0LDEwLjU2Ny0xNS42MDgsMTAuNTY3LTI1LjY5MyAgIEM0NDQuODE5LDEzMC4yODcsNDQxLjI5NSwxMjEuNjI5LDQzNC4yNTIsMTE0LjIwM3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></span>
            </div>
        </div>
    `
})
export class TimePickerComponent implements OnInit, OnChanges {
    @Input()
    options: Timepicker = new Timepicker();
    @Input()
    selectedFromDate: any;
    @Input()
    selectedToDate: any;
    @Input()
    minDate: any;
    @Input()
    maxDate: any;
    @Input()
    format: string;
    @Input()
    isLeft: boolean;
    @Output()
    timeChanged = new EventEmitter();
    ngOnInit(): void {
        if (
            !this.options.minuteInterval ||
            this.options.minuteInterval % 60 === 0
        ) {
            this.options.minuteInterval = 1;
        }
        this.options.minuteInterval = this.options.minuteInterval % 60;
    }
    ngOnChanges(changes: SimpleChanges): void {
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
    }
    getCurrentHour() {
        let currentHour = this.isLeft
            ? this.selectedFromDate.get("hour")
            : this.selectedToDate.get("hour");
        return isNaN(currentHour)
            ? "&mdash;"
            : currentHour > 9
                ? currentHour
                : "0" + currentHour;
    }
    getCurrentMinute() {
        let currentMinute = this.isLeft
            ? this.selectedFromDate.get("minute")
            : this.selectedToDate.get("minute");
        return isNaN(currentMinute)
            ? "&mdash;"
            : currentMinute > 9
                ? currentMinute
                : "0" + currentMinute;
    }
    addHour(value) {
        if (this.isLeft) {
            this.selectedFromDate.set({
                hour: (this.selectedFromDate.get("hour") + value) % 24
            });
        } else {
            this.selectedToDate.set({
                hour: (this.selectedToDate.get("hour") + value) % 24
            });
        }
        this.triggerTimeChanged();
    }
    addMinute(value) {
        if (this.isLeft) {
            this.selectedFromDate.set({
                minute: (this.selectedFromDate.get("minute") + value) % 60
            });
        } else {
            this.selectedToDate.set({
                minute: (this.selectedToDate.get("minute") + value) % 60
            });
        }
        this.triggerTimeChanged();
    }
    isValidToAddMinute(value) {
        let possibleNewValue, possibleSelectedDate;
        if (this.isLeft) {
            possibleNewValue = this.selectedFromDate.get("minute") + value;
            possibleSelectedDate = this.selectedFromDate
                .clone()
                .add(value, "minutes");
        } else {
            possibleNewValue = this.selectedToDate.get("minute") + value;
            possibleSelectedDate = this.selectedToDate.clone().add(value, "minutes");
        }
        let retValue = possibleNewValue < 60 && possibleNewValue >= 0;
        if (this.minDate.isValid()) {
            retValue = retValue && possibleSelectedDate.isSameOrAfter(this.minDate);
        }
        if (this.maxDate.isValid()) {
            retValue = retValue && possibleSelectedDate.isSameOrBefore(this.maxDate);
        }
        return retValue;
    }
    isValidToAddHour(value) {
        let possibleNewValue, possibleSelectedDate;
        if (this.isLeft) {
            possibleNewValue = this.selectedFromDate.get("hour") + value;
            possibleSelectedDate = this.selectedFromDate.clone().add(value, "hour");
        } else {
            possibleNewValue = this.selectedToDate.get("hour") + value;
            possibleSelectedDate = this.selectedToDate.clone().add(value, "hour");
        }
        let retValue = possibleNewValue < 24 && possibleNewValue >= 0;
        if (this.minDate.isValid()) {
            retValue = retValue && possibleSelectedDate.isSameOrAfter(this.minDate);
        }
        if (this.maxDate.isValid()) {
            retValue = retValue && possibleSelectedDate.isSameOrBefore(this.maxDate);
        }
        return retValue;
    }
    triggerTimeChanged() {
        this.isLeft
            ? this.timeChanged.emit(this.selectedFromDate)
            : this.timeChanged.emit(this.selectedToDate);
    }
    toggleAMPM() { }
}
