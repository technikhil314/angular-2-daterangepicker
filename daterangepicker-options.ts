import * as moment from 'moment';

class DateRange {
    start: any;
    end: any;
}

class DefinedDateRange {
    name: string;
    value: DateRange;
}

export class Timepicker {
    minuteInterval: number = 1;
    twentyFourHourFormat: boolean = true;
}

export class Options {
    startDate: string | moment.Moment | any = null;
    endDate: string | moment.Moment | any = null;
    minDate: string | moment.Moment | any = null;
    maxDate: string | moment.Moment | any = null;
    format: string = "YYYY-MM-DD";
    displayFormat: string = "YYYY-MM-DD";
    inactiveBeforeStart: boolean = false;
    autoApply: boolean = false;
    singleCalendar: boolean = false;
    preDefinedRanges: DefinedDateRange[];
    noDefaultRangeSelected: boolean = false;
    showRanges: boolean = false;
    position: string = 'left';
    disabled: boolean = false;
    timePicker: Timepicker = null;
    disableBeforeStart: boolean = false;
    alwaysOpen: boolean = false;
}